import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Play, Eye, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faLightbulb, faRankingStar } from "@fortawesome/free-solid-svg-icons";
import QuizStartModal from './QuizStartModal';
import QuizQuestionPage from './QuizQuestionPage';
import QuizResultsModal from './QuizResultsModal';
import RankPage from './Rank'; 
import { fetchEmployeeQuizzes } from '../../store/slices/quizSlice';

const QuizPage = () => {
  const dispatch = useDispatch();
  const { currentQuizzes: apiCurrentQuizzes, pastQuizzes: apiPastQuizzes, loading, error } = useSelector((state) => state.quiz);

  const [fadeIn, setFadeIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [selectedResult, setSelectedResult] = useState(null);
  const [activeTab, setActiveTab] = useState('new');

  const isAttemptingQuizRef = useRef(false);

  useEffect(() => {
    isAttemptingQuizRef.current = quizStarted;
  }, [quizStarted]);

  // useEffect(() => {
  //   const refreshInterval = setInterval(() => {
  //     if (!isAttemptingQuizRef.current) {
  //       dispatch(fetchEmployeeQuizzes());
  //     }
  //   }, 20000);
  //   return () => clearInterval(refreshInterval);
  // }, [dispatch]);


  useEffect(() => {
  let rankRefreshInterval;
  
  if (activeTab === 'rank') {
    rankRefreshInterval = setInterval(() => {
      console.log('Auto-refreshing rank tab...');
      dispatch(fetchEmployeeQuizzes());
    }, 120000); 
  }
  
  return () => {
    if (rankRefreshInterval) {
      clearInterval(rankRefreshInterval);
    }
  };
}, [activeTab, dispatch]);

  useEffect(() => {
  const refreshInterval = setInterval(() => {
    if (!isAttemptingQuizRef.current && activeTab !== 'rank') {
      dispatch(fetchEmployeeQuizzes());
    }
  }, 20000);
  return () => clearInterval(refreshInterval);
}, [dispatch, activeTab]);

  useEffect(() => {
    dispatch(fetchEmployeeQuizzes());
    setFadeIn(true);
  }, [dispatch]);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const getItemsPerPage = () => {
    if (activeTab === 'new') {
      return 3;
    } else if (activeTab === 'past') {
      if (windowWidth < 768) return 2;     
      return 3;                           
    }
    return 3;
  };

  const itemsPerPage = getItemsPerPage();

  // Fetch quizzes on component mount
  useEffect(() => {
    dispatch(fetchEmployeeQuizzes());
    setFadeIn(true);
  }, [dispatch]);

  const allCurrentQuizzes = apiCurrentQuizzes.map((quiz) => ({
    id: quiz.quiz_id || quiz.assignment_id,
    quiz_id: quiz.quiz_id, 
    title: quiz.title,
    description: quiz.description,
    daysLeft: quiz.time_left || 'N/A',
    dueDate: quiz.due_date_formatted,
    duration: quiz.duration_minutes,
    passingScore: quiz.passing_score,
    canAttempt: quiz.can_attempt,
    ...quiz, 
  }));

  // Map past quizzes (already filtered by API)
  const allPastQuizzes = apiPastQuizzes.map((quiz) => ({
    id: quiz.quiz_id || quiz.assignment_id,
    title: quiz.title,
    date: quiz.due_date_formatted || 'N/A',
    score: quiz.latest_score || 0,
    results: {
      quizTitle: quiz.title,
      dateCompleted: quiz.due_date_formatted || 'N/A',
      totalQuestions: quiz.questions_count || 0,
      correctAnswers: Math.round((quiz.latest_score || 0) * (quiz.questions_count || 0) / 100),
      wrongAnswers: Math.round((100 - (quiz.latest_score || 0)) * (quiz.questions_count || 0) / 100),
      skippedAnswers: 0,
      score: quiz.latest_score || 0,
      teamPosition: null, 
      totalParticipants: null, 
      timeTaken: null, 
      performance: {
        excellent: null,
        good: null,
        average: null,
        poor: null
      }
    },
    ...quiz, // Include all other quiz properties
  }));

  // Handle start button click
  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  // Handle view results click
  const handleViewResults = (quiz) => {
    setSelectedResult({
      ...quiz.results,
      quizId: quiz.quiz_id || quiz.id
    });
    setIsResultsModalOpen(true);
  };

  // Close modals
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  const closeResultsModal = () => {
    setIsResultsModalOpen(false);
    setSelectedResult(null);
  };

  // Calculate pagination for current quizzes
  const currentStartIndex = (currentPage - 1) * itemsPerPage;
  const currentEndIndex = currentStartIndex + itemsPerPage;
  const currentQuizzes = allCurrentQuizzes.slice(currentStartIndex, currentEndIndex);
  const totalCurrentPages = Math.ceil(allCurrentQuizzes.length / itemsPerPage);

  // Calculate pagination for past quizzes
  const pastStartIndex = (pastPage - 1) * itemsPerPage;
  const pastEndIndex = pastStartIndex + itemsPerPage;
  const pastQuizzes = allPastQuizzes.slice(pastStartIndex, pastEndIndex);
  const totalPastPages = Math.ceil(allPastQuizzes.length / itemsPerPage);

  // Reset to page 1 when screen size changes or tab changes
  useEffect(() => {
    setCurrentPage(1);
    setPastPage(1);
  }, [itemsPerPage, activeTab]);

  // Enhanced pagination component with page numbers
  const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = windowWidth < 640 ? 3 : 5;

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= Math.min(maxVisible, totalPages); i++) {
            pages.push(i);
          }
        } else if (currentPage >= totalPages - 2) {
          for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          const start = currentPage - Math.floor(maxVisible / 2);
          for (let i = start; i < start + maxVisible; i++) {
            pages.push(i);
          }
        }
      }

      return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center size-8 rounded-lg transition-all duration-300 ${currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-[#5b59bb] hover:bg-[#5b59bb] hover:text-white shadow-md hover:shadow-lg border border-gray-200'
            }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex items-center justify-center size-9 rounded-lg font-medium transition-all duration-300 ${currentPage === page
                ? 'bg-[#5b59bb] text-white text-lg shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-[#5b59bb]/30'
              }`}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center size-8 rounded-lg transition-all duration-300 ${currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-[#5b59bb] hover:bg-[#5b59bb] hover:text-white shadow-md hover:shadow-lg border border-gray-200'
            }`}
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  // Tab content rendering
  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="mt-[15%] bg-white w-full mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5958bb] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Quizes...</p>
        </div>
      </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-red-500 text-lg">{error.message || 'Failed to load quizzes'}</div>
        </div>
      );
    }

    switch (activeTab) {
      case 'new':
        return (
          <>
            {currentQuizzes.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-gray-500 text-lg">No new quizzes available</div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 pt-4">
                  {currentQuizzes.map((quiz, index) => (
                    <div
                      key={quiz.id}
                      className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-300 p-4 sm:p-6 overflow-hidden"
                      style={{
                        animation: `cardSlideUp 0.5s ease-out ${index * 0.1}s both`
                      }}
                    >
                      {/* Decorative background elements */}
                      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#5b59bb]/70 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-[#5b59bb]/30 rounded-full -ml-8 sm:-ml-12 -mb-8 sm:-mb-12 group-hover:scale-150 transition-transform duration-500"></div>

                      {/* Content */}
                      <div className="relative z-10">
                        <div className='flex flex-row gap-2 sm:gap-3 items-center mb-3 sm:mb-4'>
                          <svg className="w-4 sm:w-5 h-4 sm:h-5 text-[#5958bb]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <h3 className="text-base sm:text-lg text-[#5958bb] font-medium group-hover:text-[#5b59bb] transition-colors duration-300 line-clamp-1">
                            {quiz.title}
                          </h3>
                        </div>

                        <button
                          onClick={() => handleStartQuiz(quiz)}
                          className="w-[40%] mx-auto mt-6 sm:mt-8 bg-gradient-to-r from-[#5b59bb] to-[#7b79db] text-white font-medium py-2 rounded-lg hover:shadow-lg hover:shadow-[#5b59bb]/30 transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3 active:scale-95 text-sm sm:text-base"
                        >
                          <Play className="w-3 sm:w-4 h-3 sm:h-4" />
                          <span>Start Quiz</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination - Only show if we have more than 3 quizzes */}
                {allCurrentQuizzes.length > 3 && (
                  <div className="mt-8 flex justify-center sm:justify-end">
                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={totalCurrentPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </>
        );

      case 'past':
        return (
          <>
            {pastQuizzes.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-gray-500 text-lg">No past quizzes available</div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-4">
                  {pastQuizzes.map((quiz, index) => (
                    <div
                      key={quiz.id}
                      className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-2 border-gray-300 p-4 sm:p-6 overflow-hidden"
                      style={{
                        animation: `cardSlideUp 0.5s ease-out ${(index + 3) * 0.1}s both`
                      }}
                    >
                      {/* Success gradient border effect */}
                      <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                      <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-3">
                          <div className="flex items-center gap-2 bg-green-100 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 border-2 border-green-700/50">
                            <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-green-700 font-medium" />
                            <span className="text-xs sm:text-sm font-medium text-green-700">Completed</span>
                          </div>

                        
                          <div className="flex flex-row items-center gap-2">
  <span className='font-medium text-[#5b59bb] text-sm sm:text-base'>Scored:</span>
  <div className="relative w-8 h-8 sm:size-12 rounded-full bg-white border-2 border-[#5b59bb]/70 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
    <span className="text-[#5b59bb] font-semibold text-[10px] sm:text-sm">
      {parseFloat(quiz.score).toFixed(0)}%
    </span>
  </div>
</div>
                        </div>

                        <h3 className="text-base sm:text-lg text-[#5b59bb] font-medium mb-2 group-hover:text-[#5b59bb] transition-colors duration-300 line-clamp-1">
                          {quiz.title}
                        </h3>

                        <p className="text-gray-600 text-xs sm:text-sm mb-2">Completed on {quiz.date}</p>

                        {/* {console.log("My Quizz: ",quiz)} */}

                        <button
                          onClick={() => handleViewResults(quiz)}
                          className="w-[40%] mx-auto mt-4 sm:mt-6 bg-[#5b59bb] text-white font-medium py-1.5 rounded-lg  transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3 group-hover:shadow-lg group-hover:shadow-[#5b59bb]/20 active:scale-95 text-sm sm:text-base"
                        >
                          <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
                          <span>View Results</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPastPages > 1 && (
                  <div className="mt-8 flex justify-center sm:justify-end">
                    <PaginationControls
                      currentPage={pastPage}
                      totalPages={totalPastPages}
                      onPageChange={setPastPage}
                    />
                  </div>
                )}
              </>
            )}
          </>
        );

      case 'rank':
        return <RankPage />;

      default:
        return null;
    }
  };

  // Get icon for each tab
  const getTabIcon = (tab) => {
    switch (tab) {
      case 'new':
        return faLightbulb;
      case 'past':
        return faFilePen;
      case 'rank':
        return faRankingStar;
      default:
        return faLightbulb;
    }
  };

  const TabButton = ({ tab, label, isActive }) => {
    const icon = getTabIcon(tab);

    return (
      <button
        onClick={() => setActiveTab(tab)}
        className={`flex items-center justify-center gap-2 px-4 py-1.5 rounded-xl font-semibold transition-all duration-300 transform shadow-md text-sm sm:text-base ${isActive
            ? 'bg-[#5958bb] text-white shadow-lg scale-105 border-2 border-[#5958bb]'
            : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-102 border-2 border-gray-300 hover:border-[#5958bb]'
          }`}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`${isActive ? 'text-white' : 'text-gray-600'} text-sm sm:text-base`}
        />
        {label}
      </button>
    );
  };

  return (
    <>
      {!quizStarted ? (
        <div className={`bg-white ${fadeIn ? 'opacity-100' : 'opacity-0'}`} style={{
          transition: 'opacity 0.5s ease-out'
        }}>
          <div className="mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-xl md:text-3xl font-medium text-[#5958bb] mb-1">Quiz Library</h1>

              {/* Tab Navigation */}
              <div className="mt-6 flex flex-wrap gap-3 sm:gap-8 justify-center">
                <TabButton
                  tab="new"
                  label="New"
                  isActive={activeTab === 'new'}
                />
                <TabButton
                  tab="past"
                  label="Past"
                  isActive={activeTab === 'past'}
                />
                <TabButton
                  tab="rank"
                  label="Rank"
                  isActive={activeTab === 'rank'}
                />
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              {renderTabContent()}
            </div>
          </div>

          {/* Animation styles */}
          <style>{`
            @keyframes cardSlideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .line-clamp-1 {
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          `}</style>
        </div>
      ) : (
        <QuizQuestionPage
          quizTitle={selectedQuiz?.title}
          quizId={selectedQuiz?.quiz_id || selectedQuiz?.id}
          assignmentId={selectedQuiz?.assignment_id}
          onClose={() => {
            setQuizStarted(false);
            setSelectedQuiz(null);
          }}
        />
      )}

      <QuizStartModal
        isOpen={isModalOpen}
        onClose={closeModal}
        quizTitle={selectedQuiz?.title}
        daysLeft={selectedQuiz?.daysLeft}
        onStartQuiz={() => {
          setIsModalOpen(false);
          setQuizStarted(true);
        }}
      />

      <QuizResultsModal
        isOpen={isResultsModalOpen}
        onClose={closeResultsModal}
        quizData={selectedResult}
        quizId={selectedResult?.quizId}
      />
    </>
  );
};

export default QuizPage;