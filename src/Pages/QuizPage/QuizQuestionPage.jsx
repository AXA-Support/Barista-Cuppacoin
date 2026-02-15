import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertCircle,
  Trophy, Users, X, BarChart, BookOpen, Clock, ArrowLeftToLine, Undo2
} from 'lucide-react';
import QuestionsModal from './QuestionsModal';
import { startQuizAttempt, submitQuizAttempt, clearQuizDetails, clearAttempt, fetchEmployeeQuizzes } from '../../store/slices/quizSlice';

const QuizQuestionPage = ({ quizTitle, quizId, assignmentId, onClose }) => {
  const dispatch = useDispatch();
  const { 
    quizQuestions: apiQuestions, 
    quizLoading, 
    quizError, 
    currentQuiz,
    currentAttempt,
    attemptLoading,
    attemptError,
    submitLoading,
    submitError,
    submitResult
  } = useSelector((state) => state.quiz);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [showIncorrectQuestions, setShowIncorrectQuestions] = useState(false);
  const [scoreProgress, setScoreProgress] = useState(0);

  // Start quiz attempt on mount
  useEffect(() => {
    if (assignmentId) {
      dispatch(startQuizAttempt(assignmentId));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearQuizDetails());
      dispatch(clearAttempt());
    };
  }, [assignmentId, dispatch]);

  // Convert API questions to component format
  // API returns correctAnswer as "A", "B", "C", "D" which maps to option index
  const quizQuestions = apiQuestions.map((q) => {
    const correctAnswerIndex = q.correctAnswer ? q.correctAnswer.charCodeAt(0) - 65 : 0; // A=0, B=1, C=2, D=3
    const correctAnswerValue = q.options[correctAnswerIndex] || q.options[0];

    return {
      id: q.id,
      question: q.question,
      options: q.options,
      correctAnswer: correctAnswerValue,
      correctAnswerIndex: correctAnswerIndex,
      points: q.points || 1,
      order: q.order || 0,
    };
  }).sort((a, b) => a.order - b.order); // Sort by order

  // Build incorrect questions data for review modal
  const [questionsData, setQuestionsData] = useState({
    incorrectQuestions: []
  });

  // Update incorrect questions when quiz is completed using API response
  useEffect(() => {
    if (quizCompleted && submitResult?.question_results) {
      // Filter for incorrect questions and transform to QuestionsModal format
      const incorrect = submitResult.question_results
        .filter(qr => !qr.is_correct)
        .map(qr => {
          // Transform options to format expected by QuestionsModal
          const formattedOptions = qr.options.map(opt => ({
            id: opt.letter.toLowerCase(), // Convert 'A' to 'a'
            text: opt.text
          }));

          return {
            id: qr.question_id,
            question: qr.question_text,
            options: formattedOptions,
            correctAnswer: qr.correct_answer.letter.toLowerCase(), // Convert 'A' to 'a'
            userAnswer: qr.submitted_answer_letter?.toLowerCase() || null, // Convert 'A' to 'a'
            explanation: qr.explanation || null
          };
        });

      setQuestionsData({ incorrectQuestions: incorrect });
    }
  }, [quizCompleted, submitResult]);

  // Calculate progress
  const progress = quizQuestions.length > 0 ? ((currentQuestionIndex + 1) / quizQuestions.length) * 100 : 0;

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setAnsweredQuestions({
      ...answeredQuestions,
      [currentQuestionIndex]: answer
    });
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answeredQuestions[currentQuestionIndex + 1] || null);
    }
  };

  // Navigate to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answeredQuestions[currentQuestionIndex - 1] || null);
    }
  };

  // Handle quiz submission
  const handleSubmitQuiz = async () => {
    setShowConfirmModal(false);
    
    if (!currentAttempt?.id) {
      console.error('No attempt ID found');
      return;
    }

    // Format answers for API
    const formattedAnswers = quizQuestions.map((question, index) => {
      const userAnswer = answeredQuestions[index];
      // Find the option index for the user's answer
      const answerIndex = question.options.findIndex(opt => opt === userAnswer);
      // Convert to letter format (A, B, C, D) or keep as is if API expects the option text
      // Based on backend, it expects the answer text, not the letter
      return {
        question_id: question.id,
        answer: userAnswer || '' // Send the actual answer text
      };
    });

    try {
      const result = await dispatch(submitQuizAttempt({
        attemptId: currentAttempt.id,
        answers: formattedAnswers
      }));

      if (submitQuizAttempt.fulfilled.match(result)) {
        setQuizCompleted(true);
        setShowResultsModal(true);
        // Start score progress animation
        setTimeout(() => setScoreProgress(100), 500);
        // Refresh the quiz list to update status
        dispatch(fetchEmployeeQuizzes());
      } else {
        // Handle submission error
        console.error('Failed to submit quiz:', result.payload);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  // Close results and go back to quizzes
  const handleCloseResults = () => {
    setShowResultsModal(false);
    setQuizCompleted(false);
    onClose();
  };

  // Check if all questions are answered
  const allQuestionsAnswered = Object.keys(answeredQuestions).length === quizQuestions.length;

  // Get current question
  const currentQuestion = quizQuestions.length > 0 ? quizQuestions[currentQuestionIndex] : null;

  // Check if current question is the last one
  const isLastQuestion = quizQuestions.length > 0 && currentQuestionIndex === quizQuestions.length - 1;

  // Calculate results - use API response if available, otherwise calculate locally
  const apiSummary = submitResult?.summary;
  const correctAnswers = apiSummary?.correct_answers ?? Object.keys(answeredQuestions).filter(index =>
    answeredQuestions[index] === quizQuestions[index]?.correctAnswer
  ).length;

  const wrongAnswers = apiSummary 
    ? (apiSummary.total_questions - apiSummary.correct_answers)
    : (Object.keys(answeredQuestions).length - correctAnswers);
  
  const totalQuestions = apiSummary?.total_questions ?? quizQuestions.length;
  const score = parseFloat(apiSummary?.percentage) ?? Math.round((correctAnswers / totalQuestions) * 100);

  // Get ranking data from leaderboard_summary
  const leaderboardSummary = submitResult?.leaderboard_summary;
  const currentEmployeePosition = leaderboardSummary?.current_employee_position;
  const employeeRank = currentEmployeePosition?.rank ?? null;
  const totalParticipants = leaderboardSummary?.total_participants ?? null;

  // Calculate percentages
  const correctPercentage = Math.round((correctAnswers / totalQuestions) * 100);
  const wrongPercentage = Math.round((wrongAnswers / totalQuestions) * 100);

  // Show loading state
  if (quizLoading) {
    return (
      <div className="min-h-screen bg-white pt-4">
        <div className="mx-auto">
          <div className="mb-6 md:mb-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 bg-[#5b59bb] text-white border border-[#5b59bb] rounded-lg px-2 py-2 transition-all duration-300 mb-3 shadow-sm hover:shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to Quizzes</span>
            </button>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500 text-lg">Starting quiz...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (attemptError || quizError) {
    const errorMessage = attemptError?.message || quizError?.message || 'Failed to start quiz';
    return (
      <div className="min-h-screen bg-white pt-4">
        <div className="mx-auto">
          <div className="mb-6 md:mb-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 bg-[#5b59bb] text-white border border-[#5b59bb] rounded-lg px-2 py-2 transition-all duration-300 mb-3 shadow-sm hover:shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to Quizzes</span>
            </button>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="text-red-500 text-lg">{errorMessage}</div>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no questions
  // if (quizQuestions.length === 0) {
  //   return (
  //     <div className="min-h-screen bg-white pt-4">
  //       <div className="mx-auto">
  //         <div className="mb-6 md:mb-4">
  //           <button
  //             onClick={onClose}
  //             className="flex items-center gap-2 bg-[#5b59bb] text-white border border-[#5b59bb] rounded-lg px-2 py-2 transition-all duration-300 mb-3 shadow-sm hover:shadow-md"
  //           >
  //             <ChevronLeft className="w-5 h-5" />
  //             <span className="font-medium">Back to Quizzes</span>
  //           </button>
  //         </div>
  //         <div className="flex items-center justify-center py-12">
  //           <div className="text-gray-500 text-lg">No questions available for this quiz.</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-white pt-4">
      {/* Header */}
      <div className="mx-auto">
        <div className="mb-6 md:mb-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-[#5b59bb] text-white border border-[#5b59bb] rounded-lg px-2 py-2 transition-all duration-300 mb-3 shadow-sm hover:shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Quizzes</span>
          </button>

          <div className="flex flex-row md:flex-row md:items-center justify-between gap-4 mt-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-gray-700 sm:mt-0 mt-4">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-2 bg-gray-300 rounded-sm overflow-hidden">
            <div
              className="h-full rounded-r-full bg-gradient-to-r from-[#5b59bb] to-[#7b79db] transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-1.5 text-right text-sm text-[#5b59bb] font-medium">
            {Math.round(progress)}% Complete
          </div>
        </div>

        {/* Main content */}
        <div className="transition-all duration-500">
          {/* Question Interface */}
          <div className="w-full mx-auto sm:w-[70%]">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 border-2 border-gray-300 w-full min-h-0">
              {/* Question header */}
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span className="text-lg font-medium text-[#5b59bb] uppercase tracking-wide">
                    Question {currentQuestionIndex + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    {answeredQuestions[currentQuestionIndex] && (
                      <div className="flex items-center gap-2 px-2 py-1.5 bg-green-100 rounded-lg">
                        <CheckCircle className="size-4 text-green-600" />
                        <span className="text-base text-green-700 font-medium">Answered</span>
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="text-base md:text-base font-medium text-gray-700 leading-relaxed line-clamp-2">
                  {currentQuestion?.question || ''}
                </h2>
              </div>

              {/* Answer options */}
              <div className="space-y-2 mb-4">
                {currentQuestion?.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-300 ${selectedAnswer === option
                      ? 'border-[#5b59bb] bg-[#5b59bb]/5 transform scale-[1.01] shadow-sm shadow-[#5b59bb]/5'
                      : 'border-gray-200 hover:border-[#5b59bb]/50 hover:bg-[#5b59bb]/3'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${selectedAnswer === option
                        ? 'border-[#5b59bb] bg-[#5b59bb]'
                        : 'border-gray-400'
                        }`}>
                        {selectedAnswer === option && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="text-base text-gray-800 font-medium truncate ml-3">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex flex-row sm:flex-row items-center justify-between gap-5 pt-4">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium border transition-all duration-300 w-full sm:w-auto justify-center text-sm ${currentQuestionIndex === 0
                    ? 'text-gray-600 border-gray-400 cursor-not-allowed'
                    : 'text-[#5b59bb] border border-[#5b59bb] hover:bg-[#5b59bb]/5'
                    }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {!isLastQuestion ? (
                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-[#5b59bb] to-[#7b79db] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#5b59bb]/30 transition-all duration-300 w-full sm:w-auto justify-center text-sm"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowConfirmModal(true)}
                      disabled={!answeredQuestions[currentQuestionIndex]}
                      className={`flex items-center gap-2 px-3 py-2.5 font-medium rounded-lg transition-all duration-300 w-full sm:w-auto justify-center text-sm ${answeredQuestions[currentQuestionIndex]
                        ? 'bg-gradient-to-r from-[#5b59bb] to-[#7b79db] text-white hover:shadow-lg hover:shadow-[#5b59bb]/30'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      Submit Quiz
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-r from-[#5b59bb] to-[#7b79db] rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-medium text-gray-800 mb-2">Submit Quiz?</h3>
              <p className="text-gray-600 mb-4 text-sm">
                {allQuestionsAnswered
                  ? "You've answered all questions. Are you ready to submit your quiz?"
                  : "You still have unanswered questions. Are you sure you want to submit?"}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2.5 border border-gray-400 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitQuiz}
                  disabled={submitLoading}
                  className={`flex-1 py-2.5 bg-gradient-to-r from-[#5b59bb] to-[#7b79db] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#5b59bb]/30 transition-all duration-300 text-sm ${submitLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {submitLoading ? 'Submitting...' : 'Submit Quiz'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {showResultsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm -top-2 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b-2 border-gray-200 p-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#5b59bb]/10 rounded-lg">
                  <Trophy className="w-5 h-5 text-[#5b59bb]" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-[#5b59bc]">Quiz Results</h2>
                  <p className="text-gray-600 text-xs md:text-sm">{quizTitle}</p>
                </div>
              </div>
              <button
                onClick={handleCloseResults}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {/* Quiz Submitted Section */}


              {/* Main Results Section */}
              <div className="space-y-4">
                <div className='w-full flex sm:flex-row flex-col space-y-4 sm:space-y-0 sm:space-x-4 items-stretch'>
                  {/* Score Progress Circle */}
                  <div className="bg-gray-50 rounded-xl md:p-6 p-3 border-2 border-gray-200 w-full  sm:w-[60%] flex flex-col">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 flex-1">
                      <div className="relative w-40 h-40 flex-shrink-0">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                          <circle
                            cx="50" cy="50" r="45" fill="none"
                            stroke="#5b59bb" strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={`${scoreProgress * 2.827} 282.7`}
                            transform="rotate(-90 50 50)"
                            className="transition-all duration-1500 ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold text-[#5b59bb]">{score}%</span>
                          <span className="text-gray-600 font-medium text-sm mt-2">Overall Score</span>
                        </div>
                      </div>

                      <div className="flex-1">
                        {/* <h3 className="text-lg font-semibold text-[#5b59bc] mb-4">Performance Breakdown</h3> */}

                        {/* Correct Answers */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-600" />
                              <span className="text-sm font-medium text-gray-700">Correct Answers</span>
                            </div>
                            <span className="text-base font-semibold text-gray-600 ml-8">
                              {correctAnswers}/{totalQuestions}
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-600 rounded-full transition-all duration-1000"
                              style={{ width: `${correctPercentage}%` }}
                            />
                          </div>
                        </div>

                        {/* Wrong Answers */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <XCircle className="w-4 h-4 text-rose-600" />
                              <span className="text-sm font-medium text-gray-700">Incorrect Answers</span>
                            </div>
                            <span className="text-base font-semibold text-gray-600">
                              {wrongAnswers}/{totalQuestions}
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-rose-600 rounded-full transition-all duration-1000 delay-300"
                              style={{ width: `${wrongPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Your Ranking Card */}
                  <div className="w-full sm:w-[40%] flex flex-col">
                    <div className="bg-gradient-to-r from-[#5b59bb]/5 to-[#7b79db]/5 rounded-xl p-6 border-2 border-[#5b59bb]/20 h-full flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#5b59bb]/10 rounded-lg">
                          <Users className="w-5 h-5 text-[#5b59bb]" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-[#5b59bb]">Your Ranking</h3>
                          <p className="text-gray-600 text-sm">Compared to other participants</p>
                        </div>
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className="text-5xl font-bold text-[#5b59bb] mb-2">
                          {employeeRank !== null && employeeRank !== undefined 
                            ? `#${employeeRank}` 
                            : 'N/A'}
                        </div>
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1 mt-2">
                            <Users className="w-4 h-4 text-[#5b59bb]" />
                            <span>
                              {totalParticipants !== null && totalParticipants !== undefined 
                                ? `${totalParticipants} participants` 
                                : 'N/A participants'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className={`grid ${questionsData.incorrectQuestions.length > 0 ? 'grid-cols-2 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-1'} md:space-x-12 md:w-[50%] md:mx-auto w-[90%] space-x-2.5 mx-auto`}>
                  {questionsData.incorrectQuestions.length > 0 && (
                    <button
                      onClick={() => {
                        setShowResultsModal(false);
                        setShowIncorrectQuestions(true);
                      }}
                      className="w-full py-2 px-1 bg-rose-50 border-2 border-rose-200 text-rose-700 text-sm font-semibold rounded-lg hover:bg-rose-100 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      Review Mistakes
                    </button>
                  )}
                  <button
                    onClick={handleCloseResults}
                    className={`w-full py-2 px-1 bg-[#5b59bb] text-white text-sm font-semibold rounded-lg hover:bg-[#4a48a8] transition-colors duration-200 flex items-center justify-center gap-2 ${questionsData.incorrectQuestions.length === 0 ? 'md:w-[50%] md:mx-auto' : ''}`}
                  >
                    <Undo2 className="w-4 h-4" />
                    Return to Quizzes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Incorrect Questions Modal */}
      {showIncorrectQuestions && questionsData.incorrectQuestions.length > 0 && (
        <QuestionsModal
          isOpen={showIncorrectQuestions}
          onClose={() => {
            setShowIncorrectQuestions(false);
            setShowResultsModal(true);
          }}
          questions={questionsData.incorrectQuestions}
          title="Review Incorrect Answers"
          type="incorrect"
        />
      )}
    </div>
  );
};

export default QuizQuestionPage;