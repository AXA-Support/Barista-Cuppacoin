// import { useState, useEffect } from "react";
// import { BarChart3, Calendar, XCircle, BadgePercent, CircleDollarSign, Clock, Info } from "lucide-react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSackDollar, faBullseye } from '@fortawesome/free-solid-svg-icons'
// import HalfDonutProgress from "./HalfDonut";
// import { all } from "axios";

// // Tooltip Component
// const Tooltip = ({ children, text }) => {
//   const [show, setShow] = useState(false);
  
//   // Function to process text and make specific words bold and black
//   const processText = (text) => {
//     const pattern = /(Prorata:|Fixed:)/g;
//     const segments = text.split(pattern);
    
//     return segments.map((segment, index) => {
//       if (segment === 'Prorata:' || segment === 'Fixed:') {
//         return <span key={index} className="font-semibold text-black">{segment}</span>;
//       }
//       return segment;
//     });
//   };
  
//   return (
//     <div className="relative inline-block">
//       <div 
//         className="inline-flex items-center"
//         onMouseEnter={() => setShow(true)}
//         onMouseLeave={() => setShow(false)}
//       >
//         {children}
//         <Info className="size-3.5 ml-2 text-gray-400 hover:text-gray-600 cursor-help" />
//       </div>
//       {show && (
//         <div className="absolute z-10 bottom-5 left-[93.5%] transform -translate-x-1/2 mb-2 w-48 px-3 py-2 text-[13px] font-medium text-gray-500 bg-white border-2 border-gray-300/50 rounded-lg shadow-xl">
//           {processText(text)}
//           <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
//             <div className="w-2 h-2 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Countdown Component
// const CountdownTimer = ({ endDate }) => {
//   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });
  
//   useEffect(() => {
//     const calculateTimeLeft = () => {
//       const end = new Date(endDate);
//       const now = new Date();
//       const difference = end - now;
      
//       if (difference > 0) {
//         const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
//         return { days, hours };
//       }
      
//       return { days: 0, hours: 0 };
//     };
    
//     setTimeLeft(calculateTimeLeft());
    
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000 * 60 * 60);
    
//     return () => clearInterval(timer);
//   }, [endDate]);
  
//   const hasEnded = timeLeft.days === 0 && timeLeft.hours === 0;
  
//   return (
//     <div className={`flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-medium ${
//       hasEnded 
//         ? 'bg-red-100 border text-red-600 border-red-300' 
//         : 'bg-green-100 text-green-700 border border-green-500'
//     }`}>
//       <Clock className="size-3 font-bold mr-0.5" />
//       <span>
//         {hasEnded ? (
//           <span className="font-medium">Ended</span>
//         ) : (
//           <>
//             <span className="font-bold">{timeLeft.days}d</span>
//             <span className="mx-0.5">:</span>
//             <span className="font-bold">{timeLeft.hours}h</span>
//             <span className="ml-1">left</span>
//           </>
//         )}
//       </span>
//     </div>
//   );
// };

// // Format date function
// const formatDate = (dateString) => {
//   const date = new Date(dateString);

//   const day = date.getDate();
//   const month = date.toLocaleString('en-US', { month: 'short' });

//   return `${day} ${month}`;
// };


// // Get status color
// const getStatusColor = (status) => {
//   switch (status) {
//     case 'active':
//     case 'Active':
//       return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' };
//     case 'expired':
//     case 'Expired':
//       return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500' };
//     case 'deleted':
//     case 'Deleted':
//       return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500' };
//     default:
//       return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-500' };
//   }
// };

// // Format currency helper
// const formatCurrency = (amount) => {
//   if (typeof amount === 'string') {
//     const num = parseFloat(amount);
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(num);
//   }
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0
//   }).format(amount);
// };

// // Individual Band Card Component - MAIN EXPORT
// export default function BandCard({ data, showDropdown, onDropdownToggle }) {
//   const [selectedBand, setSelectedBand] = useState(null);
//   const [currentBandIndex, setCurrentBandIndex] = useState(-1);
//   const [allocatedBonus, setAllocatedBonus] = useState(0);
//   const [earnedBonus, setEarnedBonus] = useState(0);
//   const [showNoProgressMessage, setShowNoProgressMessage] = useState(false);
//   const [distanceToFirstBand, setDistanceToFirstBand] = useState(0);
//   const [distanceToNextBand, setDistanceToNextBand] = useState(0);
//   const [distanceToTarget, setDistanceToTarget] = useState(0);
  
//   const [bandLastTarget,setBandLastTarget] = useState(0);

//   const [bandsLastProrata,setBandsLastProrata] = useState("");

//     //   useEffect(()=>{
//     //   console.log("Everytime: ",data)
//     // },[data])

//   // Calculate values
//   useEffect(() => {
//    const actual = parseFloat(data.actual);
//    //  const actual = 5600;
//     // const target = parseFloat(data.target);
//     const target = parseFloat(bandLastTarget);
    
//     // Find current band based on actual value
//     let currentBand = null;
//     let currentIndex = -1;


    
//     if (actual > 0 && data.bands && Array.isArray(data.bands)) {
//       // Find the band where actual falls within
//       for (let i = 0; i < data.bands.length; i++) {
//         const band = data.bands[i];
//         if (actual >= band.startRange && actual <= band.endRange) {
//           currentBand = band;
//           currentIndex = i;
//           break;
//         }
//       }
      
//       // If actual exceeds all bands, select the highest band
//       if (!currentBand && data.bands.length > 0) {
//         const sortedBands = [...data.bands].sort((a, b) => b.endRange - a.endRange);
//         if (actual > sortedBands[0].endRange) {
//           currentBand = sortedBands[0];
//           currentIndex = data.bands.findIndex(band => band.id === sortedBands[0].id);
//         }
//       }
//     }
    
//     // Check if any band starts from 0 when actual is 0
//     if (actual === 0 && data.bands) {
//       const bandStartingFromZero = data.bands.find(band => band.startRange === 0);
//       if (bandStartingFromZero) {
//         currentBand = bandStartingFromZero;
//         currentIndex = data.bands.findIndex(band => band.id === bandStartingFromZero.id);
//       }
//     }
    
//     setSelectedBand(currentBand);
//     setCurrentBandIndex(currentIndex);
    
//     // Calculate distances
//     const remaining = Math.max(target - actual, 0);

//     // console.log("W1: ",target)
//     // console.log("W2: ",actual)
//     setDistanceToTarget(parseFloat(remaining.toFixed(2)));
    
//     // Calculate distance to first band
//     if (data.bands && data.bands.length > 0) {
//       const firstBand = data.bands[0];
//       if (actual < firstBand.startRange) {
//         setDistanceToFirstBand(Math.max(firstBand.startRange - actual, 0));
//       } else {
//         setDistanceToFirstBand(0);
//       }
//     } else {
//       setDistanceToFirstBand(0);
//     }
    
//     // Calculate distance to next band
//     if (currentBand && currentIndex >= 0 && currentIndex < data.bands.length - 1) {
//       const nextBand = data.bands[currentIndex + 1];
//       // console.log("Next: ",nextBand)
//       const distance = Math.max(nextBand.startRange - actual, 0);
//        setDistanceToNextBand(parseFloat(distance.toFixed(2)));
//       // setDistanceToNextBand(Math.max(nextBand.startRange - actual, 0));
//     } else {
//       setDistanceToNextBand(0);
//     }
    
//     // NEW LOGIC: Check if no band is touched
//     const isBandTouched = currentBand !== null;
//     const isTargetMet = actual >= target;
    
//     if (isBandTouched) {
//       // Case 1: Band is touched
//       const bandBonus = parseFloat(currentBand.bonusAmount);
//       const bandsLastTarget = parseFloat(currentBand.endRange);
//    //   console.log("Editing Band: ",currentBand?.bonusAmount)
//       // console.log("Final Bonus",bandBonus)
//       setBandLastTarget(bandsLastTarget)
//       //setAllocatedBonus(bandBonus);
//      setAllocatedBonus(currentBand?.bonusAmount)
//       setBandsLastProrata(currentBand?.bonusType)
//       setEarnedBonus(bandBonus); // Earned bonus is same as allocated when band is touched
//       setShowNoProgressMessage(false);
//     } else {
//       // Case 2: No band is touched
//       if (actual === 0) {
//         // Show "No progress yet" message when actual is 0
//         setShowNoProgressMessage(true);
//       } else {
//         setShowNoProgressMessage(false);
//       }
      
//       // Allocated bonus = data.bonusPot (from sample data)
//       const bonusPot = parseFloat(data.bonusPot) || 0;
//       setAllocatedBonus(bonusPot);
      
//       // Earned bonus = same as allocated bonus ONLY if target is met
//       if (isTargetMet) {
//         setEarnedBonus(bonusPot);
//       } else {
//         setEarnedBonus(0);
//       }
//     }
    
//   }, [data,bandLastTarget]);

//   // const target = parseFloat(data.target);
//   const target = parseFloat(bandLastTarget)
//   const actual = parseFloat(data.actual);
//   const progress = Math.min(Math.round((actual / target) * 100), 100);
//   const remaining = Math.max(target - actual, 0);
//   const isTargetMet = actual >= target;

//   // console.log("Target Of Band: ",target)
//   // console.log("Actual Of Band: ",actual)
  
//   // Calculate if bonus is achieved (earned bonus > 0)
//  // const isBonusAchieved = allocatedBonus > target;
//    const isBonusAchieved = allocatedBonus ;

//     // console.log("Carpo Bonus: ",earnedBonus)
  
  
//   // Check if band is touched
//   const isBandTouched = selectedBand !== null;

//   const statusColors = getStatusColor(data.status);

//   return (
//     <div className="bg-white rounded-xl p-4 shadow-xl transition-all duration-300 border-2 border-gray-200/70 w-full h-full relative">
//       {/* Blur overlay when dropdown is open */}
//       {showDropdown && (
//         <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl z-10"></div>
//       )}
      
//       {/* Card Header */}
//       <div className="flex justify-between items-start mb-3">
//         <div className="flex-1">
//           <div className="w-full flex flex-row justify-between"> 
//             <div className="flex items-center gap-2 mb-1">
//               {/* <h3 className="text-base md:text-base font-medium text-gray-700 leading-relaxed line-clamp-2">{data.name}</h3> */}
//                 <div className="flex items-center gap-2 text-sm text-gray-500 p-1">
//               <div className="flex items-center gap-1">
//                 <Calendar className="w-3 h-3" />
//                 <span className="font-medium">{formatDate(data.startDate)}</span>
//               </div>
//               <span className="font-medium">-</span>
//               <div className="flex items-center gap-1">
//                 <Calendar className="w-3 h-3" />
//                 <span className="font-medium">{formatDate(data.endDate)}</span>
//               </div>
//             </div>
//             </div>

//             <div className="flex flex-col items-end gap-2">
//               <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text} border ${statusColors.border}`}>
//                 <div className="flex items-center gap-1">
//                   <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot} ${data.status === 'active' ? 'animate-pulse' : ''}`}></span>
//                   {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-row gap-2.5 w-full mt-2 justify-between"> 
//             {/* <div className="flex items-center gap-2 text-xs text-gray-500 p-1">
//               <div className="flex items-center gap-1">
//                 <Calendar className="w-3 h-3" />
//                 <span className="font-medium">{formatDate(data.startDate)}</span>
//               </div>
//               <span className="font-medium">-</span>
//               <div className="flex items-center gap-1">
//                 <Calendar className="w-3 h-3" />
//                 <span className="font-medium">{formatDate(data.endDate)}</span>
//               </div>
//             </div> */}

//             {/* <CountdownTimer endDate={data.endDate} /> */}

//           {!["expired", "Expired"].includes(data.status) && <CountdownTimer endDate={data.endDate} />}

//           </div>
//         </div>
//       </div>

//       {/* Half Donut Progress */}
//       <div className="relative mb-4 ">
//         <HalfDonutProgress 
//           percentage={progress} 
//           isTargetMet={isTargetMet}
//           bands={data.bands}
//           actual={actual}
//           target={target}
//           showDropdown={showDropdown}
//           onDropdownToggle={onDropdownToggle}
//         />
//       </div>

//       {/* No Progress Message */}
//       {showNoProgressMessage && (
//         <div className="mb-4 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
//           <p className="text-sm font-medium text-yellow-700 text-center">
//             No progress yet. Start achieving your sales targets!
//           </p>
//         </div>
//       )}

//       {/* Stats Grid */}
//       <div className="space-y-2 mt-4">
//         {/* Target & Actual */}
//         <div className="grid grid-cols-2 gap-2">
//           {/* {console.log("Finally Getting: ",data)} */}
//           <div className={`p-4 rounded-lg border ${isTargetMet ? 'border-green-200' : 'border-green-200'} ${
//             isTargetMet ? 'bg-green-50' : 'bg-green-50'
//           }`}>
//             <div className="flex items-center gap-1.5 mb-1 justify-center">
//               <Tooltip text="The sales goal your store needs to reach to unlock the bonus.">
//                 <div className="flex items-center">
//                   <FontAwesomeIcon icon={faBullseye} size="xl" className={`size-4 mr-0.5 ${isTargetMet ? 'text-green-600' : 'text-green-600'}`} />
//                   <span className={`text-xs font-medium ml-1.5 ${isTargetMet ? 'text-green-700' : 'text-green-700'}`}>Target</span>
//                 </div>
      
//               </Tooltip>
//             </div>
//             <p className={`text-base font-bold text-center ${isTargetMet ? 'text-green-800' : 'text-green-800'}`}>
//               {data.incentiveType === 'Reviews' ? `${data.target.toLocaleString()}` : `$${bandLastTarget}`}
//               {/* {console.log("Band Last target: ",bandLastTarget)} */}
//             </p>
//           </div>
          
//           <div className={`p-4 rounded-lg border ${
//             isTargetMet 
//               ? 'border-green-200 bg-green-50' 
//               : 'border-red-200 bg-red-50'
//           }`}>
//             <div className="flex items-center gap-1.5 mb-1 justify-center">
//               <Tooltip text="Your store’s current sales so far.">
//                 <div className="flex items-center">
//                   <BarChart3 className={`size-4 ${isTargetMet ? 'text-green-600' : 'text-red-500'}`} />
//                   <span className={`text-xs font-medium ml-1.5 ${isTargetMet ? 'text-green-700' : 'text-red-700'}`}>Actual</span>
//                 </div>
//               </Tooltip>
//             </div>
//             <p className={`text-base font-bold text-center ${isTargetMet ? 'text-green-800' : 'text-red-800'}`}>
//               {formatCurrency(data.actual)}
//             </p>
//           </div>
//         </div>

//         {/* Bonus Pot & Pro Rata */}
//         <div className="grid grid-cols-2 gap-2">
//           <div className={`p-4 rounded-lg border ${
//             allocatedBonus > 0
//               ? 'border-yellow-300 border bg-yellow-50' 
//               : 'border-yellow-300 border bg-yellow-50'
//           }`}>
//             <div className="flex items-center gap-1.5 mb-1 justify-center">
//               <Tooltip text="The bonus amount you will earn if the target is reached.">
//                 <div className="flex items-center">
//                   {allocatedBonus > 0 ? (
//                     <FontAwesomeIcon icon={faSackDollar} className="w-3.5 h-3.5 text-yellow-700" />
//                   ) : (
//                     <FontAwesomeIcon icon={faSackDollar} className="text-yellow-700" />
//                   )}
//                   <span className={`text-xs font-medium ml-1.5 ${
//                     allocatedBonus > 0 ? 'text-yellow-700' : 'text-yellow-700'
//                   }`}>
//                     Allocated
//                   </span>
//                 </div>
//               </Tooltip>
//             </div>
//             <p className={`text-base font-bold text-center ${
//               allocatedBonus > 0 ? 'text-yellow-700' : 'text-yellow-700'
//             }`}>
//              ${allocatedBonus > 0 ?  `${allocatedBonus}` :'0' }
//             </p>
//             {/* {console.log("Check 2:",allocatedBonus)} */}
//           </div>
          
//           {/* Earned Bonus - Now in the second column */}
//           <div className={`p-4 rounded-lg border ${
//             isBonusAchieved 
//               ? 'bg-green-50 border-green-300' 
//               : 'bg-gray-100 border-gray-300'
//           }`}>
//             <div className="flex items-center gap-1.5 mb-1 justify-center">
         
//               <Tooltip text={bandsLastProrata === 'pro_rata' ? 'Prorata: Your bonus is calculated based on your working hours as a proportion of the team’s total working hours.' : 'Fixed: The bonus amount is the same for all employees.'}>
//                 <div className="flex items-center">
//                 {/* {console.log("Is Achieved Check : ",isBonusAchieved)} */}
//                   {isBonusAchieved ? (
//                     <CircleDollarSign className="w-3.5 h-3.5 text-green-600" />
//                   ) : (
//                     <CircleDollarSign className="w-3.5 h-3.5 text-gray-500" />
//                   )}
//                   <span className={`text-xs font-medium ml-1.5 ${isBonusAchieved ? 'text-green-700' : 'text-gray-700'}`}>
//                     Bonus
//                   </span>
//                 </div>
//               </Tooltip>
//             </div>
//             <p className="text-base flex flex-row items-center justify-center">
//               {/* <span className={`ml-2 text-lg font-bold ${isBonusAchieved ? 'text-gray-600' : 'text-gray-600'}`}>{allocatedBonus}</span> */}
//               <span
//   className={`ml-2 text-lg font-bold ${
//     isBonusAchieved ? 'text-green-800' : 'text-gray-600'
//   }`}
// >
//   {isBonusAchieved ? allocatedBonus : '$0'}
// </span>
//               <span className={`ml-2 mt-1 text-xs font-bold ${isBonusAchieved ? 'text-green-600' : 'text-gray-600'}`}>
//                 {console.log("Selected Band: ",selectedBand)}
//                 {console.log("Data of Bands: ",data)}
            
//                 {isBonusAchieved && (
//                   <p className={ `font-bold ${isBonusAchieved ? 'text-green-700' : 'text-gray-600'}`}>({selectedBand.name})</p>
//                 )}
//               </span> 
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Target Status Banner */}
//       {!isTargetMet && (
//         <div className="flex items-center justify-center gap-2 mt-2">
//           <span className="text-sm font-medium text-red-700 text-center leading-relaxed">
//             {/* {console.log("DTT:",distanceToTarget)} */}
//             {isBandTouched ? (
//               distanceToNextBand > 0 ? (
//                 currentBandIndex === 0 ? (
//                   `Need $${distanceToTarget} more to reach target and $${distanceToNextBand} more to reach next band `
//                 ) : (
//                   `Need $${distanceToNextBand} more to reach next band`
//                 )
//               ) : (
//                 `Need $${distanceToTarget} more to reach target`
//               )
//             ) : (
//               distanceToFirstBand > 0 ? (
//                 `Need $${distanceToFirstBand} more to reach first band and $${distanceToTarget} more to reach target`
//               ) : (
//                 `Need $${distanceToTarget} more to reach target`
//               )
//             )}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



import { useState, useEffect } from "react";
import { BarChart3, Calendar, XCircle, BadgePercent, CircleDollarSign, Clock, Info } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar, faBullseye } from '@fortawesome/free-solid-svg-icons'
import HalfDonutProgress from "./HalfDonut";
import { all } from "axios";

// Tooltip Component
const Tooltip = ({ children, text }) => {
  const [show, setShow] = useState(false);
  
  // Function to process text and make specific words bold and black
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
        <div className="absolute z-10 bottom-5 left-[93.5%] transform -translate-x-1/2 mb-2 w-48 px-3 py-2 text-[13px] font-medium text-gray-500 bg-white border-2 border-gray-300/50 rounded-lg shadow-xl">
          {processText(text)}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-2 h-2 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Countdown Component
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
    }, 1000 * 60 * 60);
    
    return () => clearInterval(timer);
  }, [endDate]);
  
  const hasEnded = timeLeft.days === 0 && timeLeft.hours === 0;
  
  return (
    <div className={`flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-medium ${
      hasEnded 
        ? 'bg-red-100 border text-red-600 border-red-300' 
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

// Format date function
const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });

  return `${day} ${month}`;
};

// Get status color
const getStatusColor = (status) => {
  switch (status) {
    case 'active':
    case 'Active':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' };
    case 'expired':
    case 'Expired':
      return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500' };
    case 'deleted':
    case 'Deleted':
      return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500' };
    default:
      return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-500' };
  }
};

// Format currency helper
const formatCurrency = (amount) => {
  if (typeof amount === 'string') {
    const num = parseFloat(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Individual Band Card Component - MAIN EXPORT
export default function BandCard({ data, showDropdown, onDropdownToggle }) {
  const [selectedBand, setSelectedBand] = useState(null);
  const [currentBandIndex, setCurrentBandIndex] = useState(-1);
  const [allocatedBonus, setAllocatedBonus] = useState(0);
  const [earnedBonus, setEarnedBonus] = useState(0);
  const [showNoProgressMessage, setShowNoProgressMessage] = useState(false);
  const [distanceToFirstBand, setDistanceToFirstBand] = useState(0);
  const [distanceToNextBand, setDistanceToNextBand] = useState(0);
  const [distanceToTarget, setDistanceToTarget] = useState(0);
  
  const [bandLastTarget, setBandLastTarget] = useState(0);
  const [bandsLastProrata, setBandsLastProrata] = useState("");
  
  // NEW: Track if actual is in any band
  const [isActualInAnyBand, setIsActualInAnyBand] = useState(false);

  // Calculate values
  useEffect(() => {
    const actual = parseFloat(data.actual);
    const target = parseFloat(bandLastTarget);
    
    // Find current band based on actual value
    let currentBand = null;
    let currentIndex = -1;
    let actualInAnyBand = false;
    
    if (actual > 0 && data.bands && Array.isArray(data.bands)) {
      // Find the band where actual falls within
      for (let i = 0; i < data.bands.length; i++) {
        const band = data.bands[i];
        const startRange = parseFloat(band.startRange);
        const endRange = parseFloat(band.endRange);
        
        if (actual >= startRange && actual <= endRange) {
          currentBand = band;
          currentIndex = i;
          actualInAnyBand = true;
          break;
        }
      }
      
      // Check if any band starts from 0 when actual is 0
      if (actual === 0) {
        const bandStartingFromZero = data.bands.find(band => parseFloat(band.startRange) === 0);
        if (bandStartingFromZero) {
          currentBand = bandStartingFromZero;
          currentIndex = data.bands.findIndex(band => band.id === bandStartingFromZero.id);
          actualInAnyBand = true;
        }
      }
    }
    
    setIsActualInAnyBand(actualInAnyBand);
    setSelectedBand(currentBand);
    setCurrentBandIndex(currentIndex);
    
    // Calculate distances
    const remaining = Math.max(target - actual, 0);
    setDistanceToTarget(parseFloat(remaining.toFixed(2)));
    
    // Calculate distance to first band
    if (data.bands && data.bands.length > 0) {
      const firstBand = data.bands[0];
      const firstBandStart = parseFloat(firstBand.startRange);
      if (actual < firstBandStart) {
        setDistanceToFirstBand(Math.max(firstBandStart - actual, 0));
      } else {
        setDistanceToFirstBand(0);
      }
    } else {
      setDistanceToFirstBand(0);
    }
    
    // Calculate distance to next band
    if (currentBand && currentIndex >= 0 && currentIndex < data.bands.length - 1) {
      const nextBand = data.bands[currentIndex + 1];
      const nextBandStart = parseFloat(nextBand.startRange);
      const distance = Math.max(nextBandStart - actual, 0);
      setDistanceToNextBand(parseFloat(distance.toFixed(2)));
    } else {
      setDistanceToNextBand(0);
    }
    
    // NEW LOGIC: Check if actual is in any band
    const isTargetMet = actual >= target;
    
    if (actualInAnyBand) {
      // Case 1: Actual is in a band range
      const bandBonus = parseFloat(currentBand.bonusAmount);
      const bandsLastTarget = parseFloat(currentBand.endRange);
      
      setBandLastTarget(bandsLastTarget);
      setAllocatedBonus(currentBand?.bonusAmount);
      setBandsLastProrata(currentBand?.bonusType);
      setEarnedBonus(bandBonus); // Earned bonus is same as allocated when actual is in band
      setShowNoProgressMessage(false);
    } else {
      // Case 2: Actual is NOT in any band range
      setBandLastTarget(parseFloat(data.target) || 0);
      
      if (actual === 0) {
        // Show "No progress yet" message when actual is 0
        setShowNoProgressMessage(true);
      } else {
        setShowNoProgressMessage(false);
      }
      
      // Allocated bonus = $0 when no band is hit
      setAllocatedBonus(0);
      
      // Earned bonus = $0 when no band is hit
      setEarnedBonus(0);
      
      // Set prorata type from data if available
      setBandsLastProrata(data.bonusType || "");
    }
    
  }, [data, bandLastTarget]);

  const target = parseFloat(bandLastTarget);
  const actual = parseFloat(data.actual);
  const progress = Math.min(Math.round((actual / target) * 100), 100);
  const remaining = Math.max(target - actual, 0);
  const isTargetMet = actual >= target;

  // Check if bonus is achieved (actual is in any band)
  const isBonusAchieved = isActualInAnyBand && allocatedBonus > 0;

  // Check if band is touched
  const isBandTouched = selectedBand !== null;

  const statusColors = getStatusColor(data.status);

  return (
    <div className="bg-white rounded-xl p-4 shadow-xl transition-all duration-300 border-2 border-gray-200/70 w-full h-full relative">
      {/* Blur overlay when dropdown is open */}
      {showDropdown && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl z-10"></div>
      )}
      
      {/* Card Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="w-full flex flex-row justify-between"> 
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center gap-2 text-sm text-gray-500 p-1">
                <div className="flex items-center gap-1">
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

            <div className="flex flex-col items-end gap-2">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text} border ${statusColors.border}`}>
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot} ${data.status === 'active' ? 'animate-pulse' : ''}`}></span>
                  {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2.5 w-full mt-2 justify-between"> 
            {!["expired", "Expired"].includes(data.status) && <CountdownTimer endDate={data.endDate} />}
          </div>
        </div>
      </div>

      {/* Half Donut Progress */}
      <div className="relative mb-4 ">
        <HalfDonutProgress 
          percentage={progress} 
          isTargetMet={isTargetMet}
          bands={data.bands}
          actual={actual}
          target={target}
          showDropdown={showDropdown}
          onDropdownToggle={onDropdownToggle}
        />
      </div>

      {/* No Progress Message */}
      {showNoProgressMessage && (
        <div className="mb-4 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <p className="text-sm font-medium text-yellow-700 text-center">
            No progress yet. Start achieving your sales targets!
          </p>
        </div>
      )}

      {/* No Band Hit Message */}
      {!isActualInAnyBand && actual > 0 && (
        <div className="mb-4 p-3 bg-red-50 border-2 border-red-300 rounded-lg">
          <p className="text-sm font-medium text-red-700 text-center">
            No band achieved yet.
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="space-y-2 mt-4">
        {/* Target & Actual */}
        <div className="grid grid-cols-2 gap-2">
          <div className={`p-4 rounded-lg border ${isTargetMet ? 'border-green-200' : 'border-green-200'} ${
            isTargetMet ? 'bg-green-50' : 'bg-green-50'
          }`}>
            <div className="flex items-center gap-1.5 mb-1 justify-center">
              <Tooltip text="The sales goal your store needs to reach to unlock the bonus.">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faBullseye} size="xl" className={`size-4 mr-0.5 ${isTargetMet ? 'text-green-600' : 'text-green-600'}`} />
                  <span className={`text-xs font-medium ml-1.5 ${isTargetMet ? 'text-green-700' : 'text-green-700'}`}>Target</span>
                </div>
              </Tooltip>
            </div>
            <p className={`text-base font-bold text-center ${isTargetMet ? 'text-green-800' : 'text-green-800'}`}>
              {data.incentiveType === 'Reviews' ? `${data.target.toLocaleString()}` : `$${bandLastTarget}`}
            </p>
          </div>
          
          <div className={`p-4 rounded-lg border-2 ${
            isActualInAnyBand
              ? 'border-green-200 bg-green-50' 
              : 'border-red-200 bg-red-100' 
          }`}>
            <div className="flex items-center gap-1.5 mb-1 justify-center">
              <Tooltip text="Your store’s current sales so far.">
                <div className="flex items-center">
                  <BarChart3 className={`size-4 ${isActualInAnyBand ? 'text-green-600' : 'text-red-500'}`} />
                  <span className={`text-xs font-medium ml-1.5 ${isActualInAnyBand ? 'text-green-700' : 'text-red-700'}`}>Actual</span>
                </div>
              </Tooltip>
            </div>
            <p className={`text-base font-bold text-center ${isActualInAnyBand ? 'text-green-800' : 'text-red-800'}`}>
              {formatCurrency(data.actual)}
            </p>
          </div>
        </div>

        {/* Bonus Pot & Pro Rata */}
        <div className="grid grid-cols-2 gap-2">
          <div className={`p-4 rounded-lg border ${
            isActualInAnyBand
              ? 'border-yellow-300 bg-yellow-50' 
              : 'border-gray-300 bg-gray-100'
          }`}>
            <div className="flex items-center gap-1.5 mb-1 justify-center">
              <Tooltip text="The bonus amount allocated for this band.">
                <div className="flex items-center">
                  <FontAwesomeIcon 
                    icon={faSackDollar} 
                    className={`w-3.5 h-3.5 ${isActualInAnyBand ? 'text-yellow-700' : 'text-gray-500'}`} 
                  />
                  <span className={`text-xs font-medium ml-1.5 ${
                    isActualInAnyBand ? 'text-yellow-700' : 'text-gray-500'
                  }`}>
                    Allocated
                  </span>
                </div>
              </Tooltip>
            </div>
            <p className={`text-base font-bold text-center ${
              isActualInAnyBand ? 'text-yellow-700' : 'text-gray-500'
            }`}>
              ${isActualInAnyBand && allocatedBonus > 0 ? allocatedBonus : '0'}
            </p>
          </div>
          
          {/* Earned Bonus */}
          <div className={`p-4 rounded-lg border ${
            isActualInAnyBand 
              ? 'bg-green-50 border-green-300' 
              : 'bg-gray-100 border-gray-300'
          }`}>
            <div className="flex items-center gap-1.5 mb-1 justify-center">
              <Tooltip text={bandsLastProrata === 'pro_rata' ? 'Prorata: Your bonus is calculated based on your working hours as a proportion of the team’s total working hours.' : 'Fixed: The bonus amount is the same for all employees.'}>
                <div className="flex items-center">
                  {isActualInAnyBand ? (
                    <CircleDollarSign className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <CircleDollarSign className="w-3.5 h-3.5 text-gray-500" />
                  )}
                  <span className={`text-xs font-medium ml-1.5 ${isActualInAnyBand ? 'text-green-700' : 'text-gray-500'}`}>
                    Bonus
                  </span>
                </div>
              </Tooltip>
            </div>
            <p className="text-base flex flex-row items-center justify-center">
              <span
                className={`ml-2 text-lg font-bold ${
                  isActualInAnyBand ? 'text-green-800' : 'text-gray-500'
                }`}
              >
                {isActualInAnyBand && allocatedBonus > 0 ? `$${allocatedBonus}` : '$0'}
              </span>

              <span className={`ml-2 mt-1 text-xs font-bold ${isActualInAnyBand ? 'text-green-600' : 'text-gray-400'}`}>
                {isActualInAnyBand && selectedBand && (
                  <p className={`font-bold ${isActualInAnyBand ? 'text-green-700' : 'text-gray-400'}`}>
                    ({selectedBand.name 
                      ? selectedBand.name 
                      : `Band ${data.bands.findIndex(band => band.id === selectedBand.id) + 1}`})
                  </p>
                )}
              </span> 
            </p>
          </div>
        </div>
      </div>

      {/* Target Status Banner */}
      {!isTargetMet && (
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-sm font-medium text-red-700 text-center leading-relaxed">
            {isActualInAnyBand ? (
              distanceToNextBand > 0 ? (
                currentBandIndex === 0 ? (
                  `Need $${distanceToTarget} more to reach target and $${distanceToNextBand} more to reach next band`
                ) : (
                  `Need $${distanceToNextBand} more to reach next band`
                )
              ) : (
                `Need $${distanceToTarget} more to reach target`
              )
            ) : (
              distanceToFirstBand > 0 ? (
                `Need $${distanceToFirstBand} more to reach first band and $${distanceToTarget} more to reach target`
              ) : (
                `Need $${distanceToTarget} more to reach target`
              )
            )}
          </span>
        </div>
      )}
    </div>
  );
}