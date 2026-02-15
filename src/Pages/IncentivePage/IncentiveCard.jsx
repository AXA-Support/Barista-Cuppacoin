import { useState, useEffect } from "react";
import { Target, BarChart3, DollarSign, Award, Calendar, Trash2, Tag, XCircle, BadgePercent, CircleDollarSign, Clock, Trophy, Info, Star } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar, faBullseye } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import CarouselGraph from "./carousel";

const Tooltip = ({ children, text }) => {
  const [show, setShow] = useState(false);
  
  const processText = (text) => {
    const pattern = /(Prorata:|Fixed:)/g;
    const segments = text.split(pattern);
    
    return segments.map((segment, index) => {
      if (segment === 'Prorata:' || segment === 'Fixed:') {
        return <span key={index} className="font-semibold text-black">{segment}</span>;
      }
      return segment;
    });
  };
  
  return (
    <div className="relative inline-block">
      <div 
        className="inline-flex items-center"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
        <Info className="size-3.5 ml-2 text-gray-400 hover:text-gray-600 cursor-help" />
      </div>
      {show && (
        <div className="absolute z-10 bottom-5 left-[91%] transform -translate-x-1/2 mb-2 w-48 px-3 py-2 text-[13px] font-medium text-gray-500 bg-white border-2 border-gray-300/50 rounded-lg shadow-xl">
          {processText(text)}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-2 h-2 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const HalfDonutProgress = ({ percentage, isTargetMet }) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);
  
  const radius = 70;
  const halfCircumference = Math.PI * radius;
  const progressOffset = halfCircumference - (Math.min(percentage, 100) / 100) * halfCircumference;
  
  return (
    <div className="relative w-full mb-4">
      <div className="relative flex justify-center items-end">
        <svg width="200" height="100" viewBox="0 0 200 100">
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="#e0dedeff"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke={isTargetMet ? "#10b981" : "#5958bb"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={halfCircumference}
            strokeDashoffset={animate ? progressOffset : halfCircumference}
            className="transition-all duration-1000 ease-out"
            style={{
              strokeDasharray: halfCircumference,
              strokeDashoffset: animate ? progressOffset : halfCircumference
            }}
          />
        </svg>
        <div className="absolute top-[61%] left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
          <span
            className={`text-2xl font-bold ${
              isTargetMet ? 'text-green-600' : 'text-[#5958bb]'
            }`}
          >
            {Math.min(percentage, 100)}%
          </span>
          <p className="text-xs text-gray-500 mt-1">Progress</p>
        </div>
      </div>
    </div>
  );
};

const CountdownTimer = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endDate);
      const now = new Date();
      const difference = end - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        return { days, hours };
      }
      
      return { days: 0, hours: 0 };
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000 * 60 * 60); // Update every hour
    
    return () => clearInterval(timer);
  }, [endDate]);
  
  const hasEnded = timeLeft.days === 0 && timeLeft.hours === 0;
  
  return (
    <div className={`flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-medium ${
      hasEnded 
        ? 'bg-red-100  border text-red-600 border-red-300' 
        : 'bg-green-100 text-green-700 border border-green-500'
    }`}>
      <Clock className="size-3 font-bold mr-0.5" />
      <span>
        {hasEnded ? (
          <span className="font-medium">Ended</span>
        ) : (
          <>
            <span className="font-bold">{timeLeft.days}d</span>
            <span className="mx-0.5">:</span>
            <span className="font-bold">{timeLeft.hours}h</span>
            <span className="ml-1">left</span>
          </>
        )}
      </span>
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });

  return `${day} ${month}`;
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' };
    case 'inactive':
      return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' };
    case 'deleted':
      return { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500' };
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-gray-500' };
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case 'Sales':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
    case 'Reviews':
      return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' };
    case 'Upsell':
      return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
  }
};

export default function IncentiveCard({ data, reviewDetailsReviews }) {
  const [showReviews, setShowReviews] = useState(false);
  const [isLoadingActual, setIsLoadingActual] = useState(true);

  // Check if actual value is available
  useEffect(() => {
    // For Reviews type, check if actual value exists and is not undefined/null
    // For Sales type, also check if it's not undefined/null
    if (data.incentiveType === 'Reviews') {
      // if (data.actual !== undefined && data.actual !== null && data.Average !== undefined && data.Average !== null) {
      if (data.actual !== undefined && data.actual !== null) {
        setIsLoadingActual(false);
      } else {
        setIsLoadingActual(true);
      }
    } else if (data.incentiveType === 'Sales') {
      if (data.actual !== undefined && data.actual !== null) {
        setIsLoadingActual(false);
      } else {
        setIsLoadingActual(true);
      }
    }
  }, [data]);

  // useEffect(()=>{
  //   console.log("Data Comming: ",data)
  // },[data])

  // useEffect(()=>{
  //   console.log("Revs: ",data?.Reviews)
  // },[data])

  const percentage = data.actual && data.target ? Math.round((data.actual / data.target) * 100) : 0;
  const proRata = data.actual && data.target ? ((data.actual / data.target) * data.bonusPot).toFixed(2) : '0.00';
  const isTargetMet = data.actual && data.target ? data.actual >= data.target : false;
  const isBonusAchieved = data.bonusAchieved || isTargetMet;
  const earnedBonus = isBonusAchieved 
    ? data.bonusPot 
    : 0;
  
  const statusColors = getStatusColor(data.status);
  const typeColors = getTypeColor(data.incentiveType);

  return (
    <> 
      <div className={`bg-white rounded-xl p-4 shadow-xl transition-shadow duration-300 border-2 border-gray-300/70 ${
        data.deleted ? 'opacity-60 border-red-200' : ''
      }`}>
        <div className="flex justify-between items-start mb-3 ">
          <div className="flex-1 ">
            <div className="w-full flex flex-row justify-between"> 
              <div className="flex items-center gap-2 mb-1 ">
                <div className="flex items-center gap-2 text-sm text-gray-500 p-1">
                  <div className="flex items-center gap-1 ">
                    <Calendar className="w-3 h-3" />
                    <span className="font-medium">{formatDate(data.startDate)}</span>
                  </div>
                  <span className="font-medium">-</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span className="font-medium">{formatDate(data.endDate)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 ">
                {/* Countdown Timer */}
                {data.deleted ? (
                  <div className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600 border border-red-300">
                    Deleted
                  </div>
                ) : (
                  <> 
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${statusColors.bg} ${statusColors.text} border ${statusColors.border}`}
                    >
                      <div className="flex items-center gap-1">
                        <span
                          className={`w-1.5 h-1.5 rounded-full 
                          ${statusColors.dot} 
                          ${data.status === 'active' ? 'animate-pulse' : ''}`}
                        ></span>
                        {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-2.5 w-full mt-2  justify-between"> 
              {data.status !== "expired" && <CountdownTimer endDate={data.endDate} />}
            </div>
          </div>
        </div>

        {/* Half Donut Progress with Target Range at Edges */}
        <div className="relative mb-8">


          {/* <HalfDonutProgress percentage={percentage} isTargetMet={isTargetMet} /> */}
          {/* <CarouselGraph reviews={data.Reviews}/> */}


{data.incentiveType === 'Reviews' ? (
  <CarouselGraph reviews={reviewDetailsReviews ?? data?.Reviews ?? []} />
) : (
<> 

  <HalfDonutProgress percentage={percentage} isTargetMet={isTargetMet} />

            <div
            className={`absolute right-0 top-full mt-1  flex justify-between px-2 mx-auto ${
              data.incentiveType === 'Reviews' ? 'md:w-[44%] md:left-0 w-[52%] left-0 ' : 'w-[64%] md:w-[49%]  md:left-2 left-6'
            }`}
          >
            <div className="text-left">
              <span className="text-sm font-medium text-gray-700 block">
                {data.incentiveType === 'Reviews' ? '0.0' : '$0'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-700 block">
                {data.incentiveType === 'Reviews' ? `${data.target ? data.target.toLocaleString() : '0'}` : `$${data.target ? data.target : '0'}`}.0
              </span>
            </div>
          </div>

          </>
)}



        </div>



        {/* Stats Grid - Compact 2x3 layout */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className={`p-3 rounded-lg border ${isTargetMet ? 'border-green-300' : 'border-green-300'} ${
              isTargetMet ? 'bg-green-50' : 'bg-green-50'
            }`}>
              <div className="flex items-center gap-1.5 mb-1 justify-center">
                <Tooltip
                  text={
                    data?.incentiveType === "Sales"
                      ? "The sales goal your store needs to reach to unlock the bonus."
                      : "The review goal your store needs to reach to unlock the bonus."
                  }
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faBullseye} size="xl" className={`size-4 mr-0.5 ${isTargetMet ? 'text-green-700' : 'text-green-700'}`} />
                    <span className={`text-xs font-medium ml-1.5 ${isTargetMet ? 'text-green-700' : 'text-green-700'}`}>Target</span>
                  </div>
            
                </Tooltip>
              </div>
             
              <p className={`text-base font-bold text-center ${isTargetMet ? 'text-green-700' : 'text-green-700'}`}>
                {data.incentiveType === 'Reviews' ? `${data.target ? data.target.toLocaleString() : '0'}` : `$${data.target ? data.target.toLocaleString() : '0'}`}
              </p>
            </div>
            
            <div className={`p-3 rounded-lg border ${
              isTargetMet 
                ? 'border-green-200 bg-green-50' 
                : 'border-red-200 bg-red-50'
            }`}>
              <div className="flex items-center gap-1.5 mb-1 justify-center">
                <Tooltip
                  text={
                    data?.incentiveType === "Sales"
                      ? "Your store's current sales so far."
                      : "Your store's current review performance so far."
                  }
                >
                  <div className="flex items-center">
                    <BarChart3 className={`size-4 ${isTargetMet ? 'text-green-600' : 'text-red-500'}`} />
                    <span className={`text-xs ml-1.5 font-medium ${isTargetMet ? 'text-green-700' : 'text-red-700'}`}>Actual</span>
                  </div>
                </Tooltip>
              </div>
              <div className="flex items-center justify-center gap-2 h-8">
                {/* Show loading animation or actual value */}
                {isLoadingActual ? (
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      {/* Outer spinning ring */}
                      <div className="animate-spin rounded-full h-6 w-6 "></div>
                      {/* Inner colored ring */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className={`text-base font-bold ${isTargetMet ? 'text-green-800' : 'text-red-800'}`}>
                      {data.incentiveType === 'Reviews' 
                        ? `${parseFloat(data.actual).toFixed(1) || '0.0'}` 
                        : `$${data.actual ? data.actual.toLocaleString() : '0'}`
                      }
                    </p>
          
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className={`p-3 rounded-lg border ${
              isBonusAchieved 
                ? 'border-yellow-300 border bg-yellow-50' 
                : 'border-yellow-300 border bg-yellow-50'
            }`}>
              <div className="flex items-center gap-1.5 mb-1 justify-center">
                <Tooltip
                  text={
                    data?.incentiveType === "Sales"
                      ? "The bonus amount you will earn if the target is reached."
                      : "The bonus amount you will earn if the target is reached."
                  }
                >
                  <div className="flex items-center">
                    {isBonusAchieved > 0 ? (
                      <FontAwesomeIcon icon={faSackDollar} className="w-3.5 h-3.5 text-yellow-700" />
                    ) : (
                      <FontAwesomeIcon icon={faSackDollar} className="text-yellow-700" />
                    )}
                    <span className={`text-xs font-medium ml-1.5 ${
                      isBonusAchieved ? 'text-yellow-800' : 'text-yellow-800'
                    }`}>
                      Allocated
                    </span>
                  </div>
                </Tooltip>
              </div>
              <p className={`text-base font-bold text-center ${
                isBonusAchieved ? 'text-yellow-700' : 'text-yellow-700'
              }`}>
                ${data.bonusPot ? data.bonusPot : '0'}
              </p>
            </div>
            
            {/* Earned Bonus - Now in the second column */}
            <div className={`p-3 rounded-lg border ${
              isBonusAchieved 
                ? 'bg-green-50 border-green-300'
                : 'bg-gray-100 border-gray-300'
            }`}>
              <div className="flex items-center gap-1.5 mb-1 justify-center">
                <Tooltip text={data.proRataBonus === 'YES' ? 'Prorata: Your bonus is calculated based on your working hours as a proportion of the team\'s total working hours.' : 'Fixed: The bonus amount is the same for all employees.'}>
                  <div className="flex items-center">
                    {isBonusAchieved ? (
                      <CircleDollarSign className="w-4 h-4 text-green-600" />
                    ) : (
                      <CircleDollarSign className="w-4 h-4 text-gray-500" />
                    )}
                    <span className={`text-xs font-medium ml-1.5 ${isBonusAchieved ? 'text-green-600' : 'text-gray-600'}`}>
                      Bonus 
                    </span>
                  </div>
                </Tooltip>
              </div>
              <p className={`text-base font-bold text-center ${isBonusAchieved ? 'text-green-800' : 'text-gray-600'}`}>
                {isBonusAchieved ? `$${earnedBonus}` : '$0'}
              </p>
            </div>
          </div>
        </div>

        {/* Target Status Banner */}
        {!isBonusAchieved && (
          <div className="flex items-start justify-center gap-2 mt-2">
            <span className="text-sm font-medium text-gray-600 text-center leading-relaxed">
              {isTargetMet ? (
                "Bonus not yet achieved. Meeting target does not guarantee bonus payout."
              ) : (
                `You require  ${data.incentiveType === 'Reviews' 
                  ? `${data.target ? parseFloat(data.target).toFixed(0) : '0'} star reviews` 
                  : `$${data.actual && data.target ? parseFloat(data.target - data.actual).toFixed(0) : '0'} more`
                } to earn your bonus.`
              )}
            </span>
          </div>
        )}
        
        {isBonusAchieved && (
          <div className="flex items-center justify-center gap-2 mt-2">
            <Trophy className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 text-center">
              Bonus achieved! ${data.bonusPot ? data.bonusPot : '0'} earned
            </span>
          </div>
        )}
      </div>


    </>
  );
};