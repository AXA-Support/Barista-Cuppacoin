import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trophy, Award, TrendingUp, Target, Sparkles, X, Star, TrendingDown, CheckCircle, AlertCircle, TrendingUp as TrendingUpIcon ,CirclePercent} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faBullseye, faPercent, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { fetchQuizStatistics } from '../../store/slices/quizSlice';
import { getEmployeeId } from '../../utils/cookies';

const RankPage = () => {
  const dispatch = useDispatch();
  const { quizStatistics, statisticsLoading, statisticsError } = useSelector((state) => state.quiz);
  
  const [fadeIn, setFadeIn] = useState(false);
  const [showRankAlert, setShowRankAlert] = useState(true);

  // Fetch quiz statistics on mount
  useEffect(() => {
    const employeeId = getEmployeeId();
    if (employeeId && employeeId !== 'null') {
      dispatch(fetchQuizStatistics(employeeId));
    }
  }, [dispatch]);

  // Get current user rank from API
  const currentUserRank = quizStatistics?.rank_details?.rank || quizStatistics?.statistics?.store_rank || null;

  // Get statistics from API (must be defined before getRankMessage)
  const statistics = quizStatistics?.statistics || {};
  const rankDetails = quizStatistics?.rank_details || {};

  useEffect(() => {
    setFadeIn(true);
    
    const timer = setTimeout(() => {
      setShowRankAlert(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Get rank message based on position
  const getRankMessage = () => {
    // Use API ranking message if available
    if (rankDetails.ranking_message) {
      const rank = currentUserRank || 1;
      let colorClass, iconColor;
      
      if (rank === 1) {
        colorClass = "bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-300";
        iconColor = "text-yellow-600";
      } else if (rank === 2) {
        colorClass = "bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-300";
        iconColor = "text-gray-600";
      } else if (rank === 3) {
        colorClass = "bg-gradient-to-r from-amber-100 to-amber-50 border-2 border-amber-300";
        iconColor = "text-amber-600";
      } else {
        colorClass = "bg-gradient-to-r from-blue-100 to-blue-50 border-2 border-blue-300";
        iconColor = "text-blue-600";
      }

      return {
        title: rankDetails.ordinal_rank ? `You're Ranked ${rankDetails.ordinal_rank}!` : `You're Ranked #${rank}!`,
        message: rankDetails.ranking_message,
        color: colorClass,
        textColor: "text-[#5958bb]",
        paraColor: "text-gray-700",
        iconColor: iconColor,
        icon: <FontAwesomeIcon icon={faRankingStar} className="size-8" />
      };
    }

    // Fallback to default messages
    if (currentUserRank === 1) {
      return {
        title: "You're Ranked #1!",
        message: "Outstanding performance! You're the top performer in your store.",
        color: "bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-300",
        textColor: "text-[#5958bb]",
        paraColor: "text-gray-700",
        iconColor: "text-yellow-600",
        icon: <FontAwesomeIcon icon={faRankingStar} className="size-8" />
      };
    } else if (currentUserRank === 2) {
      return {
        title: "You're Ranked 2nd!",
        message: "Excellent work! You're just a step away from the top position.",
        color: "bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-300",
        textColor: "text-[#5958bb]",
        paraColor: "text-gray-700",
        iconColor: "text-gray-600",
        icon: <FontAwesomeIcon icon={faRankingStar} className="size-8" />
      };
    } else if (currentUserRank === 3) {
      return {
        title: "You're Ranked 3rd!",
        message: "Great performance! You're in the top 3, keep pushing forward.",
        color: "bg-gradient-to-r from-amber-100 to-amber-50 border-2 border-amber-300",
        textColor: "text-[#5958bb]",
        paraColor: "text-gray-700",
        iconColor: "text-amber-600",
        icon: <FontAwesomeIcon icon={faRankingStar} className="size-8" />
      };
    } else if (currentUserRank && currentUserRank <= 5) {
      return {
        title: "You're in Top 5!",
        message: "Good performance! With a little more effort, you can reach top 3.",
        color: "bg-gradient-to-r from-blue-100 to-blue-50 border-2 border-blue-300",
        textColor: "text-[#5958bb]",
        paraColor: "text-gray-700",
        iconColor: "text-blue-600",
        icon: <FontAwesomeIcon icon={faRankingStar} className="size-8" />
      };
    } else if (currentUserRank) {
      return {
        title: "You're Ranked " + currentUserRank + "th",
        message: "Keep working hard! Focus on improving your quiz scores to climb higher.",
        color: "bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-orange-300",
        textColor: "text-[#5958bb]",
        paraColor: "text-gray-700",
        iconColor: "text-orange-600",
        icon: <FontAwesomeIcon icon={faRankingStar} className="size-8" />
      };
    } else {
      return {
        title: "No Rank Available",
        message: "Complete some quizzes to see your ranking!",
        color: "bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-300",
        textColor: "text-[#5958bb]",
        paraColor: "text-gray-700",
        iconColor: "text-gray-600",
        icon: <FontAwesomeIcon icon={faRankingStar} className="size-8" />
      };
    }
  };

  const rankMessage = getRankMessage();

  // Format rank with suffix
  const formatRank = (rank) => {
    if (rank === 1) return "1st";
    if (rank === 2) return "2nd";
    if (rank === 3) return "3rd";
    return rank + "th";
  };
  
  // Stats data for mapping - using API data
  const statsCards = [
    {
      id: 5,
      title: "Number of quizzes",
      value: statistics.number_of_quizzes?.toString() || "0",
      icon: <FontAwesomeIcon icon={faChartLine} className="size-5 text-blue-600" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-400",
      showPercentage: false
    },
    {
      id: 6,
      title: "Average Score",
      value: statistics.average_score?.toString() || "0",
      icon: <Target className="size-5 text-green-600" />,
      bgColor: "bg-green-50",
      borderColor: "border-green-400",
      showPercentage: true,
      badge: {
        text: "Very Good",
        color: "bg-blue-100 text-blue-800"
      }
    },
    {
      id: 7,
      title: "Store Average",
      value: statistics.store_average?.toString() || "0",
      icon: <FontAwesomeIcon icon={faPercent} className="size-4 text-purple-600" />,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-400",
      showPercentage: true
    },
    {
      id: 8,
      title: "Store Rank",
      value: currentUserRank ? formatRank(currentUserRank) : "N/A",
      icon: <Trophy className={`size-5 ${
        currentUserRank === 1 ? 'text-yellow-700' :
        currentUserRank === 2 ? 'text-yellow-700' :
        currentUserRank === 3 ? 'text-yellow-700' :
        'text-[#5958bb]'
      }`} />,
      bgColor: "bg-yellow-100 ",
      borderColor: "border-yellow-600",
      showPercentage: false,
      valueColor: currentUserRank === 1 ? 'text-[#5958bb]' :
                  currentUserRank === 2 ? 'text-[#5958bb]' :
                  currentUserRank === 3 ? 'text-[#5958bb]' :
                  'text-[#5958bb]'
    }
  ];

  // Function to render each card
  const StatCard = ({ card }) => (
    <div className="bg-white rounded-2xl p-2.5 shadow-xl border-2 border-gray-400/70 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-center mb-2 ">
        <div className="flex items-center gap-3 ">
          <div className={`flex items-center justify-center p-1.5 ${card.bgColor} rounded-xl border-2 ${card.borderColor}`}>
            {card.icon}
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">{card.title}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center text-center mt-2.5">
        <div className={`sm:text-3xl text-2xl font-semibold ${card.valueColor || 'text-gray-700'} `}>
          {card.value}
          {card.showPercentage && <span className="text-2xl ml-1">%</span>}
          
        </div>
    
      </div>
    </div>
  );

  // Get average score and store average for comparison
  const averageScore = statistics.average_score || 0;
  const storeAverage = statistics.store_average || 0;

  // Show loading state
  if (statisticsLoading) {
    return (
       <div className="mt-[15%] bg-white w-full mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5958bb] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Statistics data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (statisticsError) {
    return (
      <div className="bg-white p-4 sm:p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-red-500 text-lg">{statisticsError.message || 'Failed to load statistics'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-4 sm:p-6 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Rank Alert Animation */}
      {showRankAlert && currentUserRank && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"></div>
          
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className={`relative rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl transform transition-all duration-500 animate-scaleIn ${rankMessage.color}`}>
              <button
                onClick={() => setShowRankAlert(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`p-2 rounded-full bg-[#5958bb] text-white`}>
                    {rankMessage.icon}
                  </div>
                </div>
                
                <h2 className={`text-2xl font-bold mb-3 ${rankMessage.textColor}`}>
                  {rankMessage.title}
                </h2>
                
                <p className={`text-base font-medium mb-6 ${rankMessage.paraColor}`}>
                  {rankMessage.message}
                </p>
                
                {currentUserRank && (
                  <>
                    <div className="w-full bg-gray-300  rounded-full h-1.5 mb-2">
                      <div 
                        className={`h-1.5 rounded-full ${
                          currentUserRank === 1 ? 'bg-[#5958bb]' :
                          currentUserRank === 2 ? 'bg-[#5958bb]' :
                          currentUserRank === 3 ? 'bg-[#5958bb]' :
                          'bg-[#5958bb]'
                        }`}
                        style={{ 
                          width: currentUserRank === 1 
                            ? '100%' 
                            : `${Math.max(10, 100 - ((currentUserRank - 1) * (100 / (rankDetails.total_participants || 1))))}%` 
                        }}
                      ></div>
                    </div>
                    
                    <p className={`text-sm font-medium ${rankMessage.textColor}`}>
                      {currentUserRank === 1 
                        ? 'Perfect Score!' 
                        : rankDetails.total_participants 
                          ? `Rank ${currentUserRank} of ${rankDetails.total_participants} participants`
                          : `${100 - ((currentUserRank - 1) * 20)}% to next rank`}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Statistics Grid using map */}
      <div className="w-auto mx-auto">
        {/* First row: New statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {statsCards.slice(0, 4).map((card) => (
            <StatCard key={card.id} card={card} />
          ))}
        </div>

        {/* Second row: Original statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.slice(4, 8).map((card) => (
            <StatCard key={card.id} card={card} />
          ))}
        </div>
      </div>

      {/* Comparison Note */}
      {averageScore !== null && storeAverage !== null && (
        <div className="max-w-xl mx-auto mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <p className="text-center text-blue-800 font-medium">
              {averageScore > storeAverage ? (
                `You're performing ${(averageScore - storeAverage).toFixed(1)}% above the store average!`
              ) : averageScore < storeAverage ? (
                `You're ${(storeAverage - averageScore).toFixed(1)}% below the store average. Keep working!`
              ) : (
                "You're performing at the store average level."
              )}
            </p>
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </div>
  );
};

export default RankPage;