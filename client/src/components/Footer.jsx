const Footer = () => {
  return (
    <footer className="bg-black text-white p-10">
      <div className="grid md:grid-cols-3 gap-8">

        {/* Enquiry */}
        <div>
          <h3 className="text-lg font-bold mb-3">Send Enquiry</h3>
          <input placeholder="Your Name" className="w-full mb-2 p-2 text-black" />
          <input placeholder="Your Email" className="w-full mb-2 p-2 text-black" />
          <textarea placeholder="Message" className="w-full mb-2 p-2 text-black"></textarea>
          <button className="bg-yellow-500 px-4 py-2 rounded">
            Submit
          </button>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-3">Contact Us</h3>
          <p>📞 +91 98765 43210</p>
          <p>📧 support@pageturn.com</p>
          <p>📍 New Delhi, India</p>
        </div>

        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-3">About Us</h3>
          <p>
            PageTurn Bookstore is your one-stop destination
            for books, stationery and toys.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;