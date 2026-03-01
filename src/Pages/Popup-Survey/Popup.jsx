// // components/SurveyModal/SurveyModal.jsx
// import React, { useState, useEffect } from 'react';
// import { X, ChevronLeft, ChevronRight, CheckCircle, Store } from 'lucide-react';
// import { toast } from 'sonner';

// const SurveyModal = ({ isOpen, onClose, surveyData }) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
  
//   const questionsPerPage = 2;
//   const totalQuestions = surveyData?.questions?.length || 0;
//   const totalPages = Math.ceil(totalQuestions / questionsPerPage);
  
//   // Get current page questions
//   const getCurrentPageQuestions = () => {
//     const start = currentPage * questionsPerPage;
//     const end = start + questionsPerPage;
//     return surveyData?.questions?.slice(start, end) || [];
//   };

//   // Check if all questions on current page are answered
//   const areCurrentQuestionsAnswered = () => {
//     const currentQuestions = getCurrentPageQuestions();
//     return currentQuestions.every(q => answers[q.id]);
//   };

//   // Check if all questions in the entire survey are answered
//   const areAllQuestionsAnswered = () => {
//     return surveyData?.questions?.every(q => answers[q.id]) || false;
//   };

//   // Handle answer selection
//   const handleAnswerChange = (questionId, answer) => {
//     setAnswers(prev => ({
//       ...prev,
//       [questionId]: answer
//     }));
//   };

//   // Handle modal close with toast
//   const handleClose = () => {
//     if (Object.keys(answers).length === 0) {
//       toast.error('Survey closed without being attempted', {
//         description: 'No questions were answered',
//         duration: 4000,
//         icon: '📝',
//       });
//     } else {
//     //   toast.info('Survey progress saved', {
//     //     description: `${Object.keys(answers).length} out of ${totalQuestions} questions answered`,
//     //     duration: 3000,
//     //     icon: '💾',
//     //   });
//     }
    
//     // Re-enable body scrolling
//     document.body.style.overflow = 'unset';
//     onClose();
    
//     // Reset state after modal closes
//     setTimeout(() => {
//       setCurrentPage(0);
//       setAnswers({});
//       setIsSubmitting(false);
//       setShowSuccess(false);
//     }, 300);
//   };

//   // Handle next page
//   const handleNext = () => {
//     if (!areCurrentQuestionsAnswered()) {
//       toast.warning('Please answer all questions', {
//         description: 'All questions on this page must be answered before proceeding',
//         duration: 3000,
//         icon: '⚠️',
//       });
//       return;
//     }
//     setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
//   };

//   // Handle previous page
//   const handlePrevious = () => {
//     setCurrentPage(prev => Math.max(prev - 1, 0));
//   };

//   // Handle submit button click
//   const handleSubmitClick = () => {
//     if (!areAllQuestionsAnswered()) {
//       toast.warning('Please answer all questions', {
//         description: `You have answered ${Object.keys(answers).length} out of ${totalQuestions} questions`,
//         duration: 4000,
//         icon: '⚠️',
//       });
//       return;
//     }
//     handleSubmit();
//   };

//   // Handle submit
//   const handleSubmit = async () => {
//     setIsSubmitting(true);

//     // Prepare submission data
//     const submissionData = {
//       storeId: surveyData.storeId,
//       storeName: surveyData.storeName,
//       submittedAt: new Date().toISOString(),
//       totalQuestions: totalQuestions,
//       answeredQuestions: Object.keys(answers).length,
//       answers: Object.entries(answers).map(([questionId, answer]) => {
//         const question = surveyData.questions.find(q => q.id === parseFloat(questionId));
//         return {
//           questionId: parseFloat(questionId),
//           questionNumber: question?.number,
//           questionText: question?.text,
//           answer: answer
//         };
//       })
//     };

//     // Simulate API call
//     setTimeout(() => {
//       console.log('Survey Submission:', submissionData);
//       setIsSubmitting(false);
//       setShowSuccess(true);
      
//       toast.success('Survey submitted successfully!', {
//         description: 'Thank you for your valuable feedback',
//         duration: 4000,
//         icon: '🎉',
//       });

//       // Close modal after success
//       setTimeout(() => {
//         handleClose();
//       }, 2000);
//     }, 1500);
//   };

//   // Handle escape key
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape' && isOpen) {
//         handleClose();
//       }
//     };
    
//     if (isOpen) {
//       document.addEventListener('keydown', handleEscape);
//       // Disable body scrolling when modal is open
//       document.body.style.overflow = 'hidden';
//     }
    
//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen, answers]);

//   if (!isOpen || !surveyData) return null;

//   const currentQuestions = getCurrentPageQuestions();
//   const progress = ((currentPage + 1) / totalPages) * 100;
//   const answeredCount = Object.keys(answers).length;
//   const totalAnswered = totalQuestions;
//   const allQuestionsAnswered = areAllQuestionsAnswered();

//   return (
//     <div className="fixed inset-0 z-[9999] overflow-y-auto">
//       {/* Backdrop with high z-index */}
//       <div 
//         className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
//         onClick={handleClose}
//       />

//       {/* Modal Container - Centered */}
//       <div className="flex min-h-full items-center justify-center p-4 relative z-[10000]">
//         <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          
//           {/* Header with purple gradient */}
//           <div className="relative h-24 bg-[#5b59bc]">
//             {/* Close button */}
//             <button
//               onClick={handleClose}
//               className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 backdrop-blur-sm z-10"
//               aria-label="Close survey"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             {/* Store info */}
//             <div className="absolute bottom-0 left-0 right-0 p-6">
//               <h2 className="text-xl font-bold text-white mb-1 drop-shadow-lg line-clamp-2">
//                 {surveyData.storeName} Questionnaire
//               </h2>
//               <p className="text-white text-sm flex items-center gap-2 font-medium">
//                 <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                 {totalAnswered} Questions 
//               </p>
//             </div>
//           </div>

//           {/* Content */}
//           {showSuccess ? (
//             <div className="p-8 text-center">
//               <div className="mb-4 flex justify-center">
//                 <div className="w-20 h-20 bg-[#5b59bc] rounded-full flex items-center justify-center animate-bounce">
//                   <CheckCircle className="w-12 h-12 text-white" />
//                 </div>
//               </div>
//               <h3 className="text-2xl font-bold text-[#5b59bc] mb-2">Thank You!</h3>
//               <p className="text-[#5b59bc] font-medium">Your responses have been recorded</p>
//               <p className="text-[#5b59bc] text-sm mt-4 font-medium">Closing automatically...</p>
//             </div>
//           ) : (
//             <div className="p-6">
//               {/* Questions */}
//               <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
//                 {currentQuestions.map((question, index) => (
//                   <div 
//                     key={question.id}
//                     className="bg-purple-50 rounded-xl p-5 border-2 border-purple-100 hover:border-purple-300 transition-all duration-200"
//                   >
//                     <div className="flex items-start gap-3">
//                       <span className="flex-shrink-0 w-7 h-7 bg-[#5b59bc] rounded-full flex items-center justify-center text-white font-bold text-xs">
//                         {question.number}
//                       </span>
//                       <div className="flex-1">
//                         <h3 className="text-gray-800 text-sm font-medium mb-3">
//                           {question.text}
//                         </h3>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                           {question.options.map((option, optIndex) => (
//                             <label
//                               key={optIndex}
//                               className={`
//                                 flex items-center p-2.5 rounded-lg text-center font-medium justify-center border-2 cursor-pointer
//                                 transition-all duration-200 text-sm 
//                                 ${answers[question.id] === option 
//                                   ? 'bg-[#5b59bc] border-[#5b59bc] text-white shadow-md scale-[1.02]' 
//                                   : 'bg-white border-purple-300 text-gray-700 hover:border-purple-600 hover:bg-purple-200'
//                                 }
//                               `}
//                             >
//                               <input
//                                 type="radio"
//                                 name={`question-${question.id}`}
//                                 value={option}
//                                 checked={answers[question.id] === option}
//                                 onChange={() => handleAnswerChange(question.id, option)}
//                                 className="sr-only"
//                               />
//                               <span className="text-xs sm:text-sm">{option}</span>
//                             </label>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Page indicator */}
//               <div className="flex justify-between items-center mb-4 mt-4">
//                 <span className="text-sm text-[#5b59bc] font-medium">
//                   Page {currentPage + 1} of {totalPages}
//                 </span>
//                 <span className="text-sm text-[#5b59bc] font-medium">
//                   {answeredCount}/{totalAnswered} answered
//                 </span>
//               </div>

//               {/* Navigation buttons */}
//               <div className="mt-6 flex justify-between items-center">
//                 <button
//                   onClick={handlePrevious}
//                   disabled={currentPage === 0}
//                   className={`
//                     flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
//                     transition-all duration-200
//                     ${currentPage === 0
//                       ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                       : 'bg-white text-[#5b59bc] border-2 border-[#5b59bc] hover:scale-110 hover:transition-all'
//                     }
//                   `}
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                   Previous
//                 </button>

//                 {currentPage === totalPages - 1 ? (
//                   <button
//                     onClick={handleSubmitClick}
//                     disabled={isSubmitting || !allQuestionsAnswered}
//                     className={`
//                       flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm
//                       transition-all duration-200
//                       ${allQuestionsAnswered && !isSubmitting
//                         ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-600 hover:to-green-700 hover:scale-105' 
//                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       }
//                     `}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         Submitting...
//                       </>
//                     ) : (
//                       <>
//                         Submit Survey
//                         <CheckCircle className="w-4 h-4" />
//                       </>
//                     )}
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleNext}
//                     className="flex items-center gap-2 px-4 py-2 bg-[#5b59bc] text-white rounded-lg font-medium text-sm hover:scale-105 transition-all duration-200"
//                   >
//                     Next
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>

//               {/* Optional: Show message when not all questions are answered */}
//               {currentPage === totalPages - 1 && !allQuestionsAnswered && (
//                 <p className="text-xs text-red-500 font-medium text-center mt-3">
//                   Please answer all questions to enable submission
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SurveyModal;



///////////////////////////////////////////////////////////////////////////////////////////////////////////



// components/SurveyModal/SurveyModal.jsx
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, Store } from 'lucide-react';
import { toast } from 'sonner';

const SurveyModal = ({ isOpen, onClose, surveyData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const questionsPerPage = 2;
  const totalQuestions = surveyData?.questions?.length || 0;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);
  
  // Get current page questions
  const getCurrentPageQuestions = () => {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    return surveyData?.questions?.slice(start, end) || [];
  };

  // Check if all questions on current page are answered
  const areCurrentQuestionsAnswered = () => {
    const currentQuestions = getCurrentPageQuestions();
    return currentQuestions.every(q => answers[q.id]);
  };

  // Check if all questions in the entire survey are answered
  const areAllQuestionsAnswered = () => {
    return surveyData?.questions?.every(q => answers[q.id]) || false;
  };

  // Handle answer selection
  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Handle modal close with toast
  const handleClose = () => {
    // Check if user has attempted all questions
    if (!areAllQuestionsAnswered()) {
      // Check if any answers were given at all
      if (Object.keys(answers).length === 0) {
        toast.error('Survey closed without being attempted', {
          description: 'No questions were answered',
          duration: 4000,
          icon: '📝',
        });
      } else {
        // User answered some but not all questions
        toast.warning('Survey closed without completing all questions', {
          description: `You have answered ${Object.keys(answers).length} out of ${totalQuestions} questions`,
          duration: 4000,
          icon: '⚠️',
        });
      }
    } else {
      // User answered all questions but didn't submit
      toast.info('Survey progress saved', {
        description: `All ${totalQuestions} questions answered but not submitted`,
        duration: 3000,
        icon: '💾',
      });
    }
    
    // Re-enable body scrolling
    document.body.style.overflow = 'unset';
    onClose();
    
    // Reset state after modal closes
    setTimeout(() => {
      setCurrentPage(0);
      setAnswers({});
      setIsSubmitting(false);
      setShowSuccess(false);
    }, 300);
  };

  // Handle next page
  const handleNext = () => {
    if (!areCurrentQuestionsAnswered()) {
      toast.warning('Please answer all questions', {
        description: 'All questions on this page must be answered before proceeding',
        duration: 3000,
        icon: '⚠️',
      });
      return;
    }
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };

  // Handle previous page
  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  // Handle submit button click
  const handleSubmitClick = () => {
    if (!areAllQuestionsAnswered()) {
      toast.warning('Please answer all questions', {
        description: `You have answered ${Object.keys(answers).length} out of ${totalQuestions} questions`,
        duration: 4000,
        icon: '⚠️',
      });
      return;
    }
    handleSubmit();
  };

  // Handle submit
  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Prepare submission data
    const submissionData = {
      storeId: surveyData.storeId,
      storeName: surveyData.storeName,
      submittedAt: new Date().toISOString(),
      totalQuestions: totalQuestions,
      answeredQuestions: Object.keys(answers).length,
      answers: Object.entries(answers).map(([questionId, answer]) => {
        const question = surveyData.questions.find(q => q.id === parseFloat(questionId));
        return {
          questionId: parseFloat(questionId),
          questionNumber: question?.number,
          questionText: question?.text,
          answer: answer
        };
      })
    };

    // Simulate API call
    setTimeout(() => {
      console.log('Survey Submission:', submissionData);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      toast.success('Survey submitted successfully!', {
        description: 'Thank you for your valuable feedback',
        duration: 4000,
        icon: '🎉',
      });

      // Close modal after success
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 1500);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Disable body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, answers]);

  if (!isOpen || !surveyData) return null;

  const currentQuestions = getCurrentPageQuestions();
  const progress = ((currentPage + 1) / totalPages) * 100;
  const answeredCount = Object.keys(answers).length;
  const totalAnswered = totalQuestions;
  const allQuestionsAnswered = areAllQuestionsAnswered();

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop with high z-index */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container - Centered */}
      <div className="flex min-h-full items-center justify-center p-4 relative z-[10000]">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          
          {/* Header with purple gradient */}
          <div className="relative h-24 bg-[#5b59bc]">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 backdrop-blur-sm z-10"
              aria-label="Close survey"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Store info */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-xl font-bold text-white mb-1 drop-shadow-lg line-clamp-2">
                {surveyData.storeName} Questionnaire
              </h2>
              <p className="text-white text-sm flex items-center gap-2 font-medium">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                {totalAnswered} Questions 
              </p>
            </div>
          </div>

          {/* Content */}
          {showSuccess ? (
            <div className="p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 bg-[#5b59bc] rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#5b59bc] mb-2">Thank You!</h3>
              <p className="text-[#5b59bc] font-medium">Your responses have been recorded</p>
              <p className="text-[#5b59bc] text-sm mt-4 font-medium">Closing automatically...</p>
            </div>
          ) : (
            <div className="p-6">
              {/* Questions */}
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                {currentQuestions.map((question, index) => (
                  <div 
                    key={question.id}
                    className="bg-purple-50 rounded-xl p-5 border-2 border-purple-100 hover:border-purple-300 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-[#5b59bc] rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {question.number}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-gray-800 text-sm font-medium mb-3">
                          {question.text}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {question.options.map((option, optIndex) => (
                            <label
                              key={optIndex}
                              className={`
                                flex items-center p-2.5 rounded-lg text-center font-medium justify-center border-2 cursor-pointer
                                transition-all duration-200 text-sm 
                                ${answers[question.id] === option 
                                  ? 'bg-[#5b59bc] border-[#5b59bc] text-white shadow-md scale-[1.02]' 
                                  : 'bg-white border-purple-300 text-gray-700 hover:border-purple-600 hover:bg-purple-200'
                                }
                              `}
                            >
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option}
                                checked={answers[question.id] === option}
                                onChange={() => handleAnswerChange(question.id, option)}
                                className="sr-only"
                              />
                              <span className="text-xs sm:text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Page indicator */}
              <div className="flex justify-between items-center mb-4 mt-4">
                <span className="text-sm text-[#5b59bc] font-medium">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <span className="text-sm text-[#5b59bc] font-medium">
                  {answeredCount}/{totalAnswered} answered
                </span>
              </div>

              {/* Navigation buttons */}
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
                    transition-all duration-200
                    ${currentPage === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-[#5b59bc] border-2 border-[#5b59bc] hover:scale-110 hover:transition-all'
                    }
                  `}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {currentPage === totalPages - 1 ? (
                  <button
                    onClick={handleSubmitClick}
                    disabled={isSubmitting || !allQuestionsAnswered}
                    className={`
                      flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm
                      transition-all duration-200
                      ${allQuestionsAnswered && !isSubmitting
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-600 hover:to-green-700 hover:scale-105' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Survey
                        <CheckCircle className="w-4 h-4" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 bg-[#5b59bc] text-white rounded-lg font-medium text-sm hover:scale-105 transition-all duration-200"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Show message when not all questions are answered */}
              {currentPage === totalPages - 1 && !allQuestionsAnswered && (
                <p className="text-xs text-red-500 font-medium text-center mt-3">
                  Please answer all questions to enable submission
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;