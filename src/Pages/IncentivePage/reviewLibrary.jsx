
/////////////////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import { X, Star, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';

// const ReviewModal = ({ isOpen, onClose, storeName, allreviews }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const reviewsPerPage = 6;

//   useEffect(() => {
//     console.log('Review Comp: ', allreviews);
//   }, [allreviews]);

//   // Reset to page 1 when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       setCurrentPage(1);
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   // Calculate total pages
//   const totalPages = Math.ceil(allreviews.length / reviewsPerPage);
  
//   // Get current reviews
//   const indexOfLastReview = currentPage * reviewsPerPage;
//   const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
//   const currentReviews = allreviews.slice(indexOfFirstReview, indexOfLastReview);
  
//   // Calculate average rating
//   const averageRating = (allreviews.reduce((sum, review) => sum + review.review_rate, 0) / allreviews.length).toFixed(1);

//   // Handle page change
//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Format date from iso_date to a more readable format
//   const formatDate = (isoDate) => {
//     const date = new Date(isoDate);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
//         <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
//           {/* Header */}
//           <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800">
//                   {storeName} - Customer Reviews
//                 </h2>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Total {allreviews.length} reviews • Average rating: {averageRating}/5
//                 </p>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
//           </div>

//           {/* Reviews List */}
//           <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {currentReviews.map((review, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//                   >
//                     {/* Review Header */}
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-100 to-purple-100">
//                           {review.user_image ? (
//                             <img 
//                               src={review.user_image} 
//                               alt={review.user_name}
//                               className="w-full h-full object-cover"
//                               onError={(e) => {
//                                 e.target.style.display = 'none';
//                                 // Fixed: Remove optional chaining assignment
//                                 if (e.target.nextSibling) {
//                                   e.target.nextSibling.style.display = 'flex';
//                                 }
//                               }}
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center">
//                               <User className="w-5 h-5 text-blue-600" />
//                             </div>
//                           )}
//                           {review.user_image && (
//                             <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
//                               <User className="w-5 h-5 text-blue-600" />
//                             </div>
//                           )}
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-800">
//                             {review.user_name}
//                           </h4>
//                           <div className="flex items-center gap-1 mt-1">
//                             {[...Array(5)].map((_, i) => (
//                               <Star
//                                 key={i}
//                                 className={`w-4 h-4 ${
//                                   i < review.review_rate
//                                     ? 'fill-yellow-400 text-yellow-400'
//                                     : 'fill-gray-200 text-gray-200'
//                                 }`}
//                               />
//                             ))}
//                             <span className="text-sm text-gray-500 ml-2">
//                               {review.review_rate}.0
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-500">
//                         <Calendar className="w-4 h-4 flex-shrink-0" />
//                         <span>{formatDate(review.iso_date)}</span>
//                       </div>
//                     </div>

//                     {/* Review Content */}
//                     <div className="mb-3">
//                       <p className="text-gray-600 text-sm">{review.review_text}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Pagination */}
//           {allreviews.length > reviewsPerPage && (
//             <div className="sticky bottom-0 border-t border-gray-200 bg-white px-6 py-4">
//               <div className="flex items-center justify-between">
//                 {/* Page Info */}
//                 <div className="text-sm text-gray-500">
//                   Showing <span className="font-medium">{indexOfFirstReview + 1}</span> -{' '}
//                   <span className="font-medium">
//                     {Math.min(indexOfLastReview, allreviews.length)}
//                   </span>{' '}
//                   of <span className="font-medium">{allreviews.length}</span> reviews
//                 </div>

//                 {/* Pagination Controls */}
//                 <div className="flex items-center gap-2">
//                   {/* Previous Button */}
//                   <button
//                     onClick={prevPage}
//                     disabled={currentPage === 1}
//                     className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium ${
//                       currentPage === 1
//                         ? 'border-gray-200 text-gray-400 cursor-not-allowed'
//                         : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
//                     }`}
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                     <span>Previous</span>
//                   </button>

//                   {/* Page Numbers */}
//                   <div className="flex items-center gap-1">
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                       <button
//                         key={page}
//                         onClick={() => setCurrentPage(page)}
//                         className={`min-w-[40px] h-10 px-3 rounded-lg border text-sm font-medium ${
//                           page === currentPage
//                             ? 'bg-blue-600 text-white border-blue-600'
//                             : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                   </div>

//                   {/* Next Button */}
//                   <button
//                     onClick={nextPage}
//                     disabled={currentPage === totalPages}
//                     className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium ${
//                       currentPage === totalPages
//                         ? 'border-gray-200 text-gray-400 cursor-not-allowed'
//                         : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
//                     }`}
//                   >
//                     <span>Next</span>
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewModal;

//////////////////


import React, { useState, useEffect } from 'react';
import { X, Star, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';

const ReviewModal = ({ isOpen, onClose, storeName, allreviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

//   useEffect(() => {
//     console.log('Review Comp: ', allreviews);
//   }, [allreviews]);

  // Reset to page 1 when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculate total pages
  const totalPages = Math.ceil(allreviews.length / reviewsPerPage);
  
  // Get current reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = allreviews.slice(indexOfFirstReview, indexOfLastReview);
  
  // Calculate average rating
  const averageRating = (allreviews.reduce((sum, review) => sum + review.review_rate, 0) / allreviews.length).toFixed(1);

  // Handle page change
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Format date from iso_date to a more readable format
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b-2 border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#5b59bc]">
                  {storeName} - Reviews
                </h2>
                <p className="text-sm font-medium text-gray-600 mt-2">
                  Total {allreviews.length} reviews • Average rating: <span className='px-2.5 py-0.5 rounded-full border-2 border-yellow-500/80 bg-yellow-50 font-medium text-yellow-700'>{averageRating}&nbsp;/&nbsp;5.0 </span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentReviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded-full overflow-hidden border-2 border-[#5b59bc] flex-shrink-0 bg-gradient-to-br from-blue-100 to-purple-100">
                          {review.user_avatar ? (
                            <img 
                              src={review.user_avatar} 
                              alt={review.user_name}
                              className="w-full h-full object-cover "
                              onError={(e) => {
                                e.target.style.display = 'none';
                                // Fixed: Remove optional chaining assignment
                                if (e.target.nextSibling) {
                                  e.target.nextSibling.style.display = 'flex';
                                }
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                          )}
                          {review.user_avatar && (
                            <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {review.user_name}
                          </h4>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.review_rate
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-gray-200 text-gray-200 '
                                }`}
                              />
                            ))}
                            <span className="text-xs text-gray-700 font-medium ml-2 ">
                              {review.review_rate}.0 Star Review
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs px-2 text-[#5b59bc] p-1.5 border-2 border-[#5b59bc]/50 rounded-full bg-purple-100 border-purple-400/50">
                        <Calendar className="size-3 flex-shrink-0" strokeWidth={2}/>
                        <span className='font-medium'>{formatDate(review.iso_date)}</span>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="mb-3">
                      <p className="text-gray-700 font-normal  text-sm">{review.review_text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination */}
          {allreviews.length > reviewsPerPage && (
            <div className="sticky bottom-0 border-t border-gray-200 bg-white px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Page Info */}
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">{indexOfFirstReview + 1}</span> -{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastReview, allreviews.length)}
                  </span>{' '}
                  of <span className="font-medium">{allreviews.length}</span> reviews
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium ${
                      currentPage === 1
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[40px] h-10 px-3 rounded-lg border text-sm font-medium ${
                          page === currentPage
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium ${
                      currentPage === totalPages
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;