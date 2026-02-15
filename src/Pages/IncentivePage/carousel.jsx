import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CarouselGraph({ reviews = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !reviews || reviews.length === 0) return;

    // Time to shufftle between 10 sec //

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, reviews]);

  const goToSlide = (index) => {
    if (!reviews || reviews.length === 0) return;
    setCurrentIndex(index);
    resetAutoPlay();
  };

  const goToPrevious = () => {
    if (!reviews || reviews.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
    resetAutoPlay();
  };

  const goToNext = () => {
    if (!reviews || reviews.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    if (isAutoPlaying && reviews && reviews.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
      }, 30000);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (!isAutoPlaying) {
      resetAutoPlay();
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <span
        key={index}
        className={`${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      >
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  // Handle empty or undefined reviews
  if (!reviews || reviews.length === 0) {
    return (
      <div className="w-full mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-lg border-2 border-gray-300">
        <div className="text-center py-6">
          <p className="text-gray-600 text-sm italic font-medium">No reviews available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  bg-white ">
      {/* Carousel Container */}
      <div className="relative w-full  bg-white rounded-2xl overflow-hidden">
        
        {/* Navigation Arrows with Lucide Chevron Icons */}
        <button
          onClick={goToPrevious}
          className="absolute left-1 top-[75%] -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-2 border-gray-200 text-gray-600 hover:text-[#5b59bc] p-1 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm group"
          aria-label="Previous review"
        >
          <ChevronLeft className="size-4 group-hover:scale-110 transition-transform" strokeWidth={3} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-1 top-[75%] -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-2 border-gray-200 text-gray-600 hover:text-[#5b59bc] p-1 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm group"
          aria-label="Next review"
        >
          <ChevronRight className="size-4 group-hover:scale-110 transition-transform" strokeWidth={3}/>
        </button>

        {/* Single Review Tile */}
        <div className="">
          <div className="mx-auto">
            {/* User Info Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-6">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="relative">
                  <img
                    src={reviews[currentIndex]?.user_avatar}
                    alt={reviews[currentIndex]?.user_name}
                    className="size-8 md:size-12 rounded-full  shadow-md object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(reviews[currentIndex]?.user_name || 'User')}&background=3b82f6&color=fff&size=128`;
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-[#5b59bc] text-lg md:text-base ">
                    {reviews[currentIndex]?.user_name || 'Anonymous User'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex text-lg">
                      {renderStars(reviews[currentIndex]?.rating ?? reviews[currentIndex]?.review_rate ?? 0)}
                    </div>
                    <span className="text-yellow-600 font-semibold text-sm px-2 bg-yellow-100 border-2 border-yellow-400/50 rounded-full">
                      {reviews[currentIndex]?.rating ?? reviews[currentIndex]?.review_rate ?? 0}/5
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-gray-500 text-xs bg-gray-50 px-2 py-1 font-medium rounded-full border-2 border-gray-300">
                {reviews[currentIndex]?.review_time || 'Recently'}
              </span>
            </div>

            {/* Review Text */}
            <div className="mb-2 mx-auto w-[75%] ">
              <div className="relative">
                <p className="text-gray-600 text-sm md:text-xs leading-relaxed font-medium italic">
                  {reviews[currentIndex]?.review_text || 'No review text available.'}
                </p>
              </div>
            </div>

        
          </div>
        </div>
      </div>

      {/* Navigation Dots & Status */}
      <div className="mt-2">
        {/* Dots Navigation */}
        <div className="flex justify-center items-center gap-3">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`size-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-[#5b59bc] scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}