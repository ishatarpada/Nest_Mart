import React, { useState } from 'react';
import slide1 from '../../assets/Image/slider-1.png';
import slide2 from '../../assets/Image/slider-2.png';

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [slide1, slide2];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <div id="indicators-carousel" className="relative container my-2 w-full h-[600px] rounded" data-carousel="static">
       
        <div className="relative overflow-hidden rounded-lg h-[600px] ">
          {slides.map((slide, index) => (
           
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
              data-carousel-item={index === activeIndex ? 'active' : undefined}
            >
                
              <img
                src={slide}
                className="absolute block w-full rounded -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt={`Slide ${index + 1}`}
              />
              <div className="absolute w-5/12 p-10 rounded-lg ms-10 top-1/4 left-10">
                    <h1 className="text-5xl font-bold text-gray-800">Don't miss amazing grocery deals</h1>
                    <p className="mt-3 text-xl text-gray-600">Save up to 50% on your favorite products. Limited time offer!</p>

                    <form action="" className='mt-10'>
                        <div className="flex justify-between overflow-hidden text-black bg-white rounded-full input-group">
                            <input type="email" className='py-2 px-5 text-black rounded-full focus:outline-none w-96'placeholder='Enter Your Email Address' />
                            <button className='px-10 py-3 text-white bg-green-500 rounded-full'>Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
          ))}
        </div>
        {/* Slider indicators */}
        <div className="absolute z-30 flex space-x-3 -translate-x-1/2 rtl:space-x-reverse bottom-5 left-1/2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-green-500' : 'bg-gray-300'}`}
              aria-current={index === activeIndex ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
              onClick={() => handleIndicatorClick(index)}
            ></button>
          ))}
        </div>
        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-green-500 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-black hover:text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-green-500 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-black hover:text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
}