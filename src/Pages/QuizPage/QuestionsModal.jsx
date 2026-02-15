import { useState,useEffect } from "react";
import { 
  X, Trophy, Target, CheckCircle, XCircle, BarChart, Users, 
  Clock, Award, ChevronLeft, ChevronRight, BookOpen, AlertCircle 
} from 'lucide-react';

export default function QuestionsModal  ({ 
  isOpen, 
  onClose, 
  questions, 
  title,
  type // 'correct' or 'incorrect'
}) {
  const [showModal, setShowModal] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setTimeout(() => setFadeIn(true), 10);
      setCurrentQuestionIndex(0); // Reset to first question
    } else {
      setFadeIn(false);
      setTimeout(() => setShowModal(false), 300);
    }
  }, [isOpen]);

  if (!showModal) return null;

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handlePageSelect = (pageIndex) => {
    setCurrentQuestionIndex(pageIndex);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative w-full max-w-lg bg-white rounded-xl shadow-xl transform transition-all duration-300 max-h-[85vh] overflow-hidden ${
          fadeIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className={`px-5 py-3 ${
          type === 'correct' ? 'bg-[#5b59bc]' : 'bg-[#5b59bc]'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/20 rounded-lg">
                {type === 'correct' ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{title}</h2>
                <p className="text-white/90 text-xs">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-5 overflow-y-auto max-h-[calc(85vh-56px)]">
          {/* Question */}
          <div className="mb-5">
            <div className="flex items-start gap-2 mb-4">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                type === 'correct' ? 'bg-[#5b59bc] text-white' : 'bg-[#5b59bc] text-white'
              }`}>
                <span className="font-bold">{currentQuestionIndex + 1}</span>
              </div>
              <h3 className="text-base font-semibold text-gray-800 leading-tight">
                {currentQuestion.question}
              </h3>
            </div>
            
            {/* Options */}
            <div className="space-y-2 ml-2">
              {currentQuestion.options.map((option, optIndex) => {
                const isCorrectAnswer = option.id === currentQuestion.correctAnswer;
                const isUserAnswer = option.id === currentQuestion.userAnswer;
                
                let bgColor = 'bg-white';
                let borderColor = 'border-gray-200';
                let textColor = 'text-gray-700';
                
                if (type === 'incorrect') {
                  if (isCorrectAnswer) {
                    bgColor = 'bg-emerald-50';
                    borderColor = 'border-emerald-200';
                    textColor = 'text-emerald-700';
                  } else if (isUserAnswer) {
                    bgColor = 'bg-rose-50';
                    borderColor = 'border-rose-200';
                    textColor = 'text-rose-700';
                  }
                } else if (type === 'correct' && isUserAnswer) {
                  bgColor = 'bg-emerald-50';
                  borderColor = 'border-emerald-200';
                  textColor = 'text-emerald-700';
                }
                
                return (
                  <div
                    key={option.id}
                    className={`p-3 rounded border ${bgColor} ${borderColor} ${textColor} text-sm transition-all duration-200`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-medium ${
                        type === 'incorrect' && isCorrectAnswer ? 'bg-emerald-500 text-white' :
                        type === 'incorrect' && isUserAnswer && !isCorrectAnswer ? 'bg-rose-500 text-white' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <span>{String.fromCharCode(65 + optIndex)}</span>
                      </div>
                      <span className="font-medium">{option.text}</span>
                      {type === 'incorrect' && isCorrectAnswer && (
                        <span className="ml-auto text-xs font-semibold px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded">
                          Correct
                        </span>
                      )}
                      {type === 'incorrect' && isUserAnswer && !isCorrectAnswer && (
                        <span className="ml-auto text-xs font-semibold px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded">
                          Your Answer
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Explanation */}
            {/* {currentQuestion.explanation && (
              <div className={`mt-4 ml-2 p-3 rounded-lg border-2 ${
                currentQuestion.explanation.status === 'correct' || currentQuestion.explanation.color === 'green'
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-amber-50 border-amber-200'
              }`}>
                <div className="flex items-start gap-2">
                  {currentQuestion.explanation.status === 'correct' || currentQuestion.explanation.color === 'green' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    {currentQuestion.explanation.message && (
                      <p className={`text-sm font-medium ${
                        currentQuestion.explanation.status === 'correct' || currentQuestion.explanation.color === 'green'
                          ? 'text-emerald-800'
                          : 'text-amber-800'
                      }`}>
                        {currentQuestion.explanation.message}
                      </p>
                    )}
                    {currentQuestion.explanation.correct_answer && (
                      <p className={`text-sm mt-1 ${
                        currentQuestion.explanation.status === 'correct' || currentQuestion.explanation.color === 'green'
                          ? 'text-emerald-700'
                          : 'text-amber-700'
                      }`}>
                        {currentQuestion.explanation.correct_answer}
                      </p>
                    )}
                    {currentQuestion.explanation.suggestion && (
                      <p className={`text-xs mt-1 ${
                        currentQuestion.explanation.status === 'correct' || currentQuestion.explanation.color === 'green'
                          ? 'text-emerald-700'
                          : 'text-amber-700'
                      }`}>
                        {currentQuestion.explanation.suggestion}
                      </p>
                    )}
                    {currentQuestion.explanation.learning_tip && (
                      <p className={`text-xs mt-1 italic ${
                        currentQuestion.explanation.status === 'correct' || currentQuestion.explanation.color === 'green'
                          ? 'text-emerald-600'
                          : 'text-amber-600'
                      }`}>
                        💡 {currentQuestion.explanation.learning_tip}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}*/}
  
          </div>

          {/* Pagination */}
          <div className="mt-6 pt-5 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Question counter */}
              {/* <div className="text-xs text-gray-600 font-medium">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div> */}
              
              {/* Navigation buttons */}
              <div className="flex items-center gap-2 mx-auto">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`p-1 rounded flex items-center gap-1 border-2 text-sm ${
                    currentQuestionIndex === 0 
                      ? 'text-gray-400 bg-white border-gray-300  cursor-not-allowed' 
                      : 'text-white bg-[#5b59bc] border-[#5b59bc] font-semibold '
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                
                {/* Page numbers - compact */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, questions.length) }, (_, i) => {
                    // Show page numbers around current page
                    let pageNum;
                    if (questions.length <= 5) {
                      pageNum = i;
                    } else if (currentQuestionIndex < 3) {
                      pageNum = i;
                    } else if (currentQuestionIndex > questions.length - 4) {
                      pageNum = questions.length - 5 + i;
                    } else {
                      pageNum = currentQuestionIndex - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageSelect(pageNum)}
                        className={`w-7 h-7 rounded-full text-xs font-medium ${
                          currentQuestionIndex === pageNum
                            ? type === 'correct' 
                              ? 'bg-emerald-500  text-white' 
                              : 'bg-[#5b59bc] text-white'
                            : 'text-gray-600 border-gray-400 border hover:bg-gray-100'
                        }`}
                      >
                        {pageNum + 1}
                      </button>
                    );
                  })}
                  
                  {questions.length > 5 && (
                    <span className="text-gray-400 text-xs mx-1">...</span>
                  )}
                </div>
                
                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className={`p-1.5 rounded flex items-center gap-1 text-sm  border-2  ${
                    currentQuestionIndex === questions.length - 1
                      ? 'text-gray-400 bg-white border-gray-300  cursor-not-allowed'
                      : 'text-white bg-[#5b59bc] border-[#5b59bc]  font-semibold '
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};