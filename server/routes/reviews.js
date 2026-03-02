const express = require('express');
const Review = require('../models/Review');
const Product = require('../models/Product');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a review
router.post('/', auth, async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ user: req.user._id, product });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    // Create review
    const review = new Review({
      user: req.user._id,
      product,
      rating,
      comment
    });

    await review.save();

    // Update product's rating and number of reviews
    const allReviews = await Review.find({ product });
    const numReviews = allReviews.length;
    const avgRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / numReviews;

    await Product.findByIdAndUpdate(product, {
      numReviews,
      rating: avgRating
    });

    // Populate user info for response
    await review.populate('user', 'username');

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a review
router.put('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    const { rating, comment } = req.body;
    review.rating = rating;
    review.comment = comment;

    await review.save();

    // Update product's rating
    const allReviews = await Review.find({ product: review.product });
    const numReviews = allReviews.length;
    const avgRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / numReviews;

    await Product.findByIdAndUpdate(review.product, {
      numReviews,
      rating: avgRating
    });

    await review.populate('user', 'username');

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a review
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review or is admin
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    const productId = review.product;
    await review.deleteOne();

    // Update product's rating
    const allReviews = await Review.find({ product: productId });
    const numReviews = allReviews.length;
    const avgRating = numReviews > 0 
      ? allReviews.reduce((sum, review) => sum + review.rating, 0) / numReviews 
      : 0;

    await Product.findByIdAndUpdate(productId, {
      numReviews,
      rating: avgRating
    });

    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;