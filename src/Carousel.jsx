// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// export default function Carousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const autoPlayRef = useRef(null);

//   // Your review data
//   const reviews = [
//     {
//       "user_name": "zeynep dark",
//       "user_total_reviews": 36,
//       "user_total_photos": 205,
//       "user_avatar": "https://lh3.googleusercontent.com/a/ACg8ocLvd8R2M2BHwh5iPkRYc9Py_LD_b6kwX2Q9BPssVv8rzycnUQ=s120-c-rp-mo-ba4-br100",
//       "iso_date": "2026-01-14 20:26:50",
//       "iso_date_of_last_edit": "2026-01-14 20:26:50",
//       "review_time": "6 days ago",
//       "review_text": "This coffee shop in Midtown offers a taste of authentic coffee, which is quite impressive compared to the other coffee shops in the area.",
//       "review_services": {
//         "Food": 5,
//         "Service": 4,
//         "Atmosphere": 4
//       },
//       "translations": {
//         "en": "This coffee shop in Midtown offers a taste of authentic coffee, which is quite impressive compared to the other coffee shops in the area."
//       },
//       "review_rate": 5
//     },
//     {
//       "user_name": "J W",
//       "user_total_reviews": 41,
//       "user_total_photos": 28,
//       "user_avatar": "https://lh3.googleusercontent.com/a/ACg8ocL3R3uhA23zytBihMocpAib2LEfgEfcXNsVtlKVskGUa9VCgns=s120-c-rp-mo-ba3-br100",
//       "iso_date": "2026-01-14 18:26:30",
//       "iso_date_of_last_edit": "2026-01-14 18:26:30",
//       "review_time": "6 days ago",
//       "review_text": "I've been here on and off since it first opened almost 20 years ago. Coffee is always high quality. This shop provides the real Italian coffee shop experience, grab a cup staying at the counter, chat with the barista.",
//       "review_services": {
//         "Service": 5,
//         "Meal type": "Other",
//         "Food": 5,
//         "Atmosphere": 5,
//         "Group size": "1 person, 2 people",
//         "Wait time": "No wait"
//       },
//       "translations": {
//         "en": "I've been here on and off since it first opened almost 20 years ago. Coffee is always high quality. This shop provides the real Italian coffee shop experience, grab a cup staying at the counter, chat with the barista."
//       },
//       "review_rate": 5
//     },
//     {
//       "user_name": "Alex Johnson",
//       "user_total_reviews": 25,
//       "user_total_photos": 12,
//       "user_avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
//       "iso_date": "2026-01-13 15:30:00",
//       "iso_date_of_last_edit": "2026-01-13 15:30:00",
//       "review_time": "1 week ago",
//       "review_text": "Amazing coffee and pastries! The atmosphere is cozy and perfect for working or catching up with friends.",
//       "review_services": {
//         "Food": 5,
//         "Service": 5,
//         "Atmosphere": 5
//       },
//       "translations": {
//         "en": "Amazing coffee and pastries! The atmosphere is cozy and perfect for working or catching up with friends."
//       },
//       "review_rate": 5
//     },
//     {
//       "user_name": "Maria Garcia",
//       "user_total_reviews": 58,
//       "user_total_photos": 89,
//       "user_avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
//       "iso_date": "2026-01-12 10:15:00",
//       "iso_date_of_last_edit": "2026-01-12 10:15:00",
//       "review_time": "2 weeks ago",
//       "review_text": "Best espresso in town! The baristas are knowledgeable and friendly. Highly recommended for coffee enthusiasts.",
//       "review_services": {
//         "Food": 4,
//         "Service": 5,
//         "Atmosphere": 4
//       },
//       "translations": {
//         "en": "Best espresso in town! The baristas are knowledgeable and friendly. Highly recommended for coffee enthusiasts."
//       },
//       "review_rate": 4
//     },
//     {
//       "user_name": "Robert Chen",
//       "user_total_reviews": 32,
//       "user_total_photos": 45,
//       "user_avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
//       "iso_date": "2026-01-10 14:45:00",
//       "iso_date_of_last_edit": "2026-01-10 14:45:00",
//       "review_time": "3 weeks ago",
//       "review_text": "Great spot for a quick coffee break. The seating is comfortable and the WiFi is fast. Perfect for remote workers.",
//       "review_services": {
//         "Food": 3,
//         "Service": 4,
//         "Atmosphere": 5
//       },
//       "translations": {
//         "en": "Great spot for a quick coffee break. The seating is comfortable and the WiFi is fast. Perfect for remote workers."
//       },
//       "review_rate": 4
//     }
//   ];

//   // Auto-play functionality
//   useEffect(() => {
//     if (!isAutoPlaying) return;

//     autoPlayRef.current = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 4000);

//     return () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     };
//   }, [isAutoPlaying, reviews.length]);

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//     resetAutoPlay();
//   };

//   const goToPrevious = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
//     );
//     resetAutoPlay();
//   };

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
//     );
//     resetAutoPlay();
//   };

//   const resetAutoPlay = () => {
//     if (autoPlayRef.current) {
//       clearInterval(autoPlayRef.current);
//     }
//     if (isAutoPlaying) {
//       autoPlayRef.current = setInterval(() => {
//         setCurrentIndex((prevIndex) => 
//           prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
//         );
//       }, 30000);
//     }
//   };

//   const toggleAutoPlay = () => {
//     setIsAutoPlaying(!isAutoPlaying);
//     if (!isAutoPlaying) {
//       resetAutoPlay();
//     } else {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     }
//   };

//   const renderStars = (rating) => {
//     return Array(5).fill(0).map((_, index) => (
//       <span
//         key={index}
//         className={`${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
//       >
//         {index < rating ? '★' : '☆'}
//       </span>
//     ));
//   };

//   const renderServiceStars = (rating) => {
//     return Array(5).fill(0).map((_, index) => (
//       <span
//         key={index}
//         className={`${index < rating ? 'text-yellow-500' : 'text-gray-300'} text-xl`}
//       >
//         {index < rating ? '★' : '☆'}
//       </span>
//     ));
//   };

//   // Filter to show only Food, Service, and Atmosphere
//   const getFilteredServices = (services) => {
//     const filtered = {};
//     const desiredKeys = ['Food', 'Service', 'Atmosphere'];
    
//     desiredKeys.forEach(key => {
//       if (services && services[key] !== undefined) {
//         filtered[key] = services[key];
//       }
//     });
    
//     return filtered;
//   };

//   const renderServiceRatings = (services) => {
//     // Filter services to show only Food, Service, Atmosphere
//     const filteredServices = getFilteredServices(services);
    
//     // Always render all three categories, even if some are missing from data
//     const categories = ['Food', 'Service', 'Atmosphere'];
    
//     return categories.map((key) => {
//       const value = filteredServices[key];
//       return (
//         <div
//           key={key}
//           className="flex flex-row items-center justify-between py-2 px-1"
//         >
//           <span className="text-base text-gray-600 font-medium">{key}:</span>
//           <span className="text-sm font-medium text-gray-800 ml-4">
//             {value !== undefined ? (
//               <div className="flex gap-0.5">
//                 {renderServiceStars(value)}
//               </div>
//             ) : (
//               <span className="text-sm text-gray-400">—</span>
//             )}
//           </span>
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="w-full mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-lg">
//       {/* Carousel Container */}
//       <div className="relative w-full bg-white rounded-2xl overflow-hidden">
        
//         {/* Navigation Arrows with Lucide Chevron Icons */}
//         <button
//           onClick={goToPrevious}
//           className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-2 border-gray-200 text-gray-600 hover:text-[#5b59bc] p-1 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm group"
//           aria-label="Previous review"
//         >
//           <ChevronLeft className="size-5 group-hover:scale-110 transition-transform" />
//         </button>

//         <button
//           onClick={goToNext}
//           className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-2 border-gray-200 text-gray-600 hover:text-[#5b59bc] p-1 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm group"
//           aria-label="Next review"
//         >
//           <ChevronRight className="size-5 group-hover:scale-110 transition-transform" />
//         </button>

//         {/* Single Review Tile */}
//         <div className="p-6 md:p-8 lg:p-12">
//           <div className="mx-auto">
//             {/* User Info Section */}
//             <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8">
//               <div className="flex items-center gap-4 mb-4 md:mb-0">
//                 <div className="relative">
//                   <img
//                     src={reviews[currentIndex].user_avatar}
//                     alt={reviews[currentIndex].user_name}
//                     className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-md object-cover"
//                     onError={(e) => {
//                       e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(reviews[currentIndex].user_name)}&background=3b82f6&color=fff&size=128`;
//                     }}
//                   />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-gray-900 text-xl md:text-2xl">
//                     {reviews[currentIndex].user_name}
//                   </h3>
//                   <div className="flex items-center gap-4 mt-1">
//                     <div className="flex text-xl">
//                       {renderStars(reviews[currentIndex].review_rate)}
//                     </div>
//                     <span className="text-yellow-600 font-bold text-lg">
//                       {reviews[currentIndex].review_rate}/5
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <span className="text-gray-500 text-xs bg-gray-50 px-2 py-1 font-medium rounded-full border-2 border-gray-300">
//                 {reviews[currentIndex].review_time}
//               </span>
//             </div>

//             {/* Review Text */}
//             <div className="mb-2">
//               <div className="relative">
              
//                 <p className="text-gray-700 text-lg md:text-xl leading-relaxed pl-4 md:pl-8 italic">
//                   {reviews[currentIndex].review_text}
//                 </p>
              
//               </div>
//             </div>

//             {/* Service Ratings - Always show Food, Service, Atmosphere */}
//             {reviews[currentIndex].review_services && (
//               <div className=" max-w-2xl mx-auto">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {renderServiceRatings(reviews[currentIndex].review_services)}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Navigation Dots & Status */}
//       <div className="">
//         {/* Dots Navigation */}
//         <div className="flex justify-center items-center gap-3 mb-2">
//           {reviews.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`size-1.5 rounded-full transition-all duration-300 ${
//                 index === currentIndex
//                   ? 'bg-[#5b59bc] scale-125'
//                   : 'bg-gray-300 hover:bg-gray-400'
//               }`}
//               aria-label={`Go to review ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>


//     </div>
//   );
// }



//////////////////////////////////////////////////////////



import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  // Your review data
  const reviews = [
    {
      "user_name": "zeynep dark",
      "user_total_reviews": 36,
      "user_total_photos": 205,
      "user_avatar": "https://lh3.googleusercontent.com/a/ACg8ocLvd8R2M2BHwh5iPkRYc9Py_LD_b6kwX2Q9BPssVv8rzycnUQ=s120-c-rp-mo-ba4-br100",
      "iso_date": "2026-01-14 20:26:50",
      "iso_date_of_last_edit": "2026-01-14 20:26:50",
      "review_time": "6 days ago",
      "review_text": "This coffee shop in Midtown offers a taste of authentic coffee, which is quite impressive compared to the other coffee shops in the area.",
      "review_services": {
        "Food": 5,
        "Service": 4,
        "Atmosphere": 4
      },
      "translations": {
        "en": "This coffee shop in Midtown offers a taste of authentic coffee, which is quite impressive compared to the other coffee shops in the area."
      },
      "review_rate": 5
    },
    {
      "user_name": "J W",
      "user_total_reviews": 41,
      "user_total_photos": 28,
      "user_avatar": "https://lh3.googleusercontent.com/a/ACg8ocL3R3uhA23zytBihMocpAib2LEfgEfcXNsVtlKVskGUa9VCgns=s120-c-rp-mo-ba3-br100",
      "iso_date": "2026-01-14 18:26:30",
      "iso_date_of_last_edit": "2026-01-14 18:26:30",
      "review_time": "6 days ago",
      "review_text": "I've been here on and off since it first opened almost 20 years ago. Coffee is always high quality. This shop provides the real Italian coffee shop experience, grab a cup staying at the counter, chat with the barista.",
      "review_services": {
        "Service": 5,
        "Meal type": "Other",
        "Food": 5,
        "Atmosphere": 5,
        "Group size": "1 person, 2 people",
        "Wait time": "No wait"
      },
      "translations": {
        "en": "I've been here on and off since it first opened almost 20 years ago. Coffee is always high quality. This shop provides the real Italian coffee shop experience, grab a cup staying at the counter, chat with the barista."
      },
      "review_rate": 5
    },
    {
      "user_name": "Alex Johnson",
      "user_total_reviews": 25,
      "user_total_photos": 12,
      "user_avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      "iso_date": "2026-01-13 15:30:00",
      "iso_date_of_last_edit": "2026-01-13 15:30:00",
      "review_time": "1 week ago",
      "review_text": "Amazing coffee and pastries! The atmosphere is cozy and perfect for working or catching up with friends.",
      "review_services": {
        "Food": 5,
        "Service": 5,
        "Atmosphere": 5
      },
      "translations": {
        "en": "Amazing coffee and pastries! The atmosphere is cozy and perfect for working or catching up with friends."
      },
      "review_rate": 5
    },
    {
      "user_name": "Maria Garcia",
      "user_total_reviews": 58,
      "user_total_photos": 89,
      "user_avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      "iso_date": "2026-01-12 10:15:00",
      "iso_date_of_last_edit": "2026-01-12 10:15:00",
      "review_time": "2 weeks ago",
      "review_text": "Best espresso in town! The baristas are knowledgeable and friendly. Highly recommended for coffee enthusiasts.",
      "review_services": {
        "Food": 4,
        "Service": 5,
        "Atmosphere": 4
      },
      "translations": {
        "en": "Best espresso in town! The baristas are knowledgeable and friendly. Highly recommended for coffee enthusiasts."
      },
      "review_rate": 4
    },
    {
      "user_name": "Robert Chen",
      "user_total_reviews": 32,
      "user_total_photos": 45,
      "user_avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      "iso_date": "2026-01-10 14:45:00",
      "iso_date_of_last_edit": "2026-01-10 14:45:00",
      "review_time": "3 weeks ago",
      "review_text": "Great spot for a quick coffee break. The seating is comfortable and the WiFi is fast. Perfect for remote workers.",
      "review_services": {
        "Food": 3,
        "Service": 4,
        "Atmosphere": 5
      },
      "translations": {
        "en": "Great spot for a quick coffee break. The seating is comfortable and the WiFi is fast. Perfect for remote workers."
      },
      "review_rate": 4
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, reviews.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
    resetAutoPlay();
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    if (isAutoPlaying) {
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

  const renderServiceStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <span
        key={index}
        className={`${index < rating ? 'text-yellow-500' : 'text-gray-300'} text-xl`}
      >
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  // Filter to show only Food, Service, and Atmosphere
  const getFilteredServices = (services) => {
    const filtered = {};
    const desiredKeys = ['Food', 'Service', 'Atmosphere'];
    
    desiredKeys.forEach(key => {
      if (services && services[key] !== undefined) {
        filtered[key] = services[key];
      }
    });
    
    return filtered;
  };

  const renderServiceRatings = (services) => {
    // Filter services to show only Food, Service, Atmosphere
    const filteredServices = getFilteredServices(services);
    
    // Always render all three categories, even if some are missing from data
    const categories = ['Food', 'Service', 'Atmosphere'];
    
    return categories.map((key) => {
      const value = filteredServices[key];
      return (
        <div
          key={key}
          className="flex flex-row items-center justify-between py-2 px-1"
        >
          <span className="text-base text-gray-600 font-medium">{key}:</span>
          <span className="text-sm font-medium text-gray-800 ml-4">
            {value !== undefined ? (
              <div className="flex gap-0.5">
                {renderServiceStars(value)}
              </div>
            ) : (
              <span className="text-sm text-gray-400">—</span>
            )}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="w-full mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-lg">
      {/* Carousel Container */}
      <div className="relative w-full bg-white rounded-2xl overflow-hidden">
        
        {/* Navigation Arrows with Lucide Chevron Icons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-2 border-gray-200 text-gray-600 hover:text-[#5b59bc] p-1 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm group"
          aria-label="Previous review"
        >
          <ChevronLeft className="size-5 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-2 border-gray-200 text-gray-600 hover:text-[#5b59bc] p-1 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm group"
          aria-label="Next review"
        >
          <ChevronRight className="size-5 group-hover:scale-110 transition-transform" />
        </button>

        {/* Single Review Tile */}
        <div className="p-6 md:p-8 lg:p-12">
          <div className="mx-auto">
            {/* User Info Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="relative">
                  <img
                    src={reviews[currentIndex].user_avatar}
                    alt={reviews[currentIndex].user_name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-md object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(reviews[currentIndex].user_name)}&background=3b82f6&color=fff&size=128`;
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl md:text-2xl">
                    {reviews[currentIndex].user_name}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex text-xl">
                      {renderStars(reviews[currentIndex].review_rate)}
                    </div>
                    <span className="text-yellow-600 font-bold text-lg">
                      {reviews[currentIndex].review_rate}/5
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-gray-500 text-xs bg-gray-50 px-2 py-1 font-medium rounded-full border-2 border-gray-300">
                {reviews[currentIndex].review_time}
              </span>
            </div>

            {/* Review Text */}
            <div className="mb-2">
              <div className="relative">
              
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed pl-4 md:pl-8 italic">
                  {reviews[currentIndex].review_text}
                </p>
              
              </div>
            </div>

            {/* Service Ratings - Always show Food, Service, Atmosphere */}
            {reviews[currentIndex].review_services && (
              <div className=" max-w-2xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderServiceRatings(reviews[currentIndex].review_services)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Dots & Status */}
      <div className="">
        {/* Dots Navigation */}
        <div className="flex justify-center items-center gap-3 mb-2">
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