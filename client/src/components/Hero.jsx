import Slider from "react-slick";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>

        {/* Slide 1 - With Overlay */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            className="w-full h-[400px] object-cover"
            alt="Books"
          />

          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Mega Book Sale
            </h2>
            <a
              href="https://www.amazon.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 px-6 py-2 rounded hover:bg-yellow-600"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Slide 2 */}
        <div>
          <a href="/stationery">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              className="w-full h-[400px] object-cover"
              alt="Stationery"
            />
          </a>
        </div>

        {/* Slide 3 */}
        <div>
          <a href="/toys">
            <img
              src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
              className="w-full h-[400px] object-cover"
              alt="Toys"
            />
          </a>
        </div>

      </Slider>
    </div>
  );
};

export default Hero;