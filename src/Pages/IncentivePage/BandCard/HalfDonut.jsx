
// import { useState, useEffect, useRef } from "react";
// import { Lock, CheckCircle, Circle } from "lucide-react";

// // Half Donut Progress Component with Band Arrows
// const HalfDonutProgress = ({ percentage, isTargetMet, bands,actual, target, showDropdown, onDropdownToggle }) => {
//   const [animate, setAnimate] = useState(false);
//   const [showBandsDropdown, setShowBandsDropdown] = useState(false);
//   const dropdownRef = useRef(null);
 
//   // useEffect(()=>{
//   //   console.log("All Bands: ",bands)
//   // },[bands])
  
//   // Sync local state with prop
//   useEffect(() => {
//     setShowBandsDropdown(showDropdown);
//   }, [showDropdown]);
  
//   useEffect(() => {
//     setTimeout(() => setAnimate(true), 100);
//   }, []);
  
//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Check if click is outside both dropdown and button
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         // Check if the click is on the View Bands button
//         const viewBandsButton = event.target.closest('button');
//         if (!viewBandsButton || !viewBandsButton.textContent.includes('View Bands')) {
//           setShowBandsDropdown(false);
//           onDropdownToggle();
//         }
//       }
//     };
//     if (showBandsDropdown) {
//       // Add slight delay to prevent immediate closing
//       setTimeout(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//       }, 100);
//     }
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showBandsDropdown, onDropdownToggle]);
  
//   // Calculate which band the actual value falls into based on original ranges
//   const getCurrentBand = () => {
//     if (!bands || !Array.isArray(bands) || bands.length === 0) return null;
    
//     // Check if actual is 0 and any band starts from 0
//     if (actual === 0) {
//       const bandStartingFromZero = bands.find(band => band.startRange === 0);
//       return bandStartingFromZero || null;
//     }
    
//     // Find band where actual falls within range using ORIGINAL ranges
//     for (let i = 0; i < bands.length; i++) {
//       const band = bands[i];
//       if (actual >= band.startRange && actual <= band.endRange) {
//         return band;
//       }
//     }
    
//     // If actual exceeds all bands, return the highest band
//     const sortedBands = [...bands].sort((a, b) => b.endRange - a.endRange);
//     if (actual > sortedBands[0].endRange) {
//       return sortedBands[0];
//     }
    
//     return null;
//   };
  
//   const currentBand = getCurrentBand();
  
//   // Calculate dynamic start and end values based on current band
//   const startValue = currentBand ? currentBand.startRange : 0;
//   const endValue = currentBand ? currentBand.endRange : target;
  
//   // Calculate percentage based on current band's range
//   const calculateBandPercentage = () => {
//     if (!currentBand) return 0;
    
//     const bandRange = currentBand.endRange - currentBand.startRange;
//     const actualInBand = actual - currentBand.startRange;
//     const bandPercentage = (actualInBand / bandRange) * 100;
    
//     return Math.min(Math.max(bandPercentage, 0), 100);
//   };
  
//   const bandPercentage = calculateBandPercentage();
  
//   const radius = 90;
//   const halfCircumference = Math.PI * radius;
//   const progressOffset = halfCircumference - (Math.min(bandPercentage, 100) / 100) * halfCircumference;
  
//   // Calculate equal visual segments for the progress bar
//   const calculateEqualSegments = () => {
//     if (!bands || !Array.isArray(bands) || bands.length === 0) return [];
    
//     const bandCount = bands.length;
//     const equalSegmentWidth = 100 / bandCount; // Each band gets equal visual width
    
//     return bands.map((band, index) => {
//       const visualStartPercentage = (index / bandCount) * 100;
//       const visualEndPercentage = ((index + 1) / bandCount) * 100;
//       const visualCenterPercentage = visualStartPercentage + (equalSegmentWidth / 2);
      
//       return {
//         ...band,
//         visualStartPercentage,
//         visualEndPercentage,
//         visualCenterPercentage,
//         visualWidth: equalSegmentWidth
//       };
//     });
//   };
  
//   const visualBands = calculateEqualSegments();
  
//   // Check if band is achieved based on ORIGINAL ranges
//   const isBandAchieved = (band) => {
//     return actual >= band.endRange;
//   };
  
//   // Check if band is touched based on ORIGINAL ranges
//   const isBandTouched = (band) => {
//     return actual >= band.startRange;
//   };
  
//   // Check if any band is touched
//   const isAnyBandTouched = currentBand !== null;
  
//   // Handle View Bands button click
//   const handleViewBandsClick = (e) => {
//     e.stopPropagation(); // Prevent event from bubbling
//     if (showBandsDropdown) {
//       // If dropdown is open, close it
//       setShowBandsDropdown(false);
//       onDropdownToggle();
//     } else {
//       // If dropdown is closed, open it
//       setShowBandsDropdown(true);
//       onDropdownToggle();
//     }
//   };
  
//   // Handle close dropdown
//   const handleCloseDropdown = (e) => {
//     e.stopPropagation(); // Prevent event from bubbling
//     setShowBandsDropdown(false);
//     onDropdownToggle();
//   };
  
//   // Calculate actual progress percentage for visual positioning in the current band
//   const actualPercentage = bandPercentage;
  
//   return (
//     <div className="relative w-full mb-4">
//       <div className="relative flex justify-center items-end mb-2">
//         <svg width="220" height="120" viewBox="0 4 200 115">
//           {/* Background arc */}
//           <path
//             d="M 30 100 A 70 70 0 0 1 170 100"
//             fill="none"
//             stroke="#e0dedeff"
//             strokeWidth="8"
//             strokeLinecap="round"
//           />
          
//           {/* Progress arc */}
//           <path
//             d="M 30 100 A 70 70 0 0 1 170 100"
//             fill="none"
//             stroke={isTargetMet ? "#10b981" : "#5958bb"}
//             strokeWidth="8"
//             strokeLinecap="round"
//             strokeDasharray={halfCircumference}
//             strokeDashoffset={animate ? progressOffset : halfCircumference}
//             className="transition-all duration-1000 ease-out"
//             style={{
//               strokeDasharray: halfCircumference,
//               strokeDashoffset: animate ? progressOffset : halfCircumference
//             }}
//           />
          
//           {/* Start value (current band start) positioned at the start of the arc */}
//           <text
//             x="30"  // Position at the start of the arc
//             y="118" // Position below the arc
//             className="text-sm font-medium"
//             textAnchor="middle"
//           >
//             {new Intl.NumberFormat('en-US', {
//               style: 'currency',
//               currency: 'USD',
//               minimumFractionDigits: 0,
//               maximumFractionDigits: 0
//             }).format(startValue)}
//           </text>
          
//           {/* End value (current band end) positioned at the end of the arc */}
//           <text
//             x="170" // Position at the end of the arc
//             y="118" // Position below the arc
//             className="text-sm font-medium"
//             textAnchor="middle"
//           >
//             {new Intl.NumberFormat('en-US', {
//               style: 'currency',
//               currency: 'USD',
//               minimumFractionDigits: 0,
//               maximumFractionDigits: 0
//             }).format(endValue)}
//           </text>
//         </svg>
        
//         {/* Center percentage display */}
//         <div className="absolute top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-full text-center">
//           <span
//             className={`text-2xl font-bold ${
//               !isAnyBandTouched
//                 ? 'text-gray-400'
//                 : isTargetMet
//                 ? 'text-green-600'
//                 : 'text-[#5958bb]'
//             }`}
//           >
//             {Math.min(Math.round(bandPercentage), 100)}%
//           </span>
//           <p className="text-sm text-gray-500 mt-1">Progress</p>
//         </div>
//       </div>
      
//       {/* Band scale with title and percentage */}
//       <div className="mt-8 px-2">
        
//         {/* Banded progress bar - VISUALLY EQUAL SEGMENTS */}
//         <div className="relative h-2 z-0">
//           {/* Background gray bar */}
//           <div className="absolute top-0 left-0 right-0 h-2 bg-gray-300 rounded-full"></div>
          
//           {/* MAIN PURPLE PROGRESS BAR - EXTENDS TO ACTUAL VALUE */}
//           {actual > 0 && (
//             <div 
//               className="absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 z-5"
//               style={{
//                 width: `${actualPercentage}%`,
//                 background: 'linear-gradient(to right, #5958bb, #5958bb, #5958bb, #5958bb)',
//               }}
//             />
//           )}
          
//           {/* Equal band dividers overlay */}
//           {visualBands && visualBands.length > 0 && (
//             <div className="absolute top-0 left-0 right-0 flex h-2 rounded-full overflow-hidden pointer-events-none z-10">
//               {visualBands.map((band, index) => (
//                 <div
//                   key={band.id}
//                   className="relative flex-shrink-0"
//                   style={{
//                     width: `${band.visualWidth}%`,
//                   }}
//                 >
//                   {/* Divider between bands (except for the last one) */}
//                   {index < visualBands.length - 1 && (
//                     <div className="absolute right-0 top-0 w-[2px] h-2 bg-white"></div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
          
//           {/* Actual value indicator positioned on top */}
//           {actual > 0 && (
//             <div
//               className="absolute -top-1 transform -translate-x-1/2 z-20"
//               style={{ left: `${actualPercentage}%` }}
//             >
//               <div className="flex flex-col items-center">
//                 <div className="size-4 bg-white rounded-full border-2 border-[#5958bb] flex items-center justify-center shadow-lg">
//                   <div className="size-2 bg-[#5958bb] rounded-full"></div>
//                 </div>
//                 <div className="text-[10px] font-bold text-[#5958bb] -mt-10 whitespace-nowrap bg-white px-1 rounded shadow-lg border-2 border-[#5958bb]">
//                   {new Intl.NumberFormat('en-US', {
//                     style: 'currency',
//                     currency: 'USD',
//                     minimumFractionDigits: 0,
//                     maximumFractionDigits: 0
//                   }).format(actual)}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Band labels positioned below the bar - Show ORIGINAL ranges */}
//         {visualBands && visualBands.length > 0 && (
//           <div className="relative mt-3 h-12 z-0">
//             {visualBands.map((band, index) => {
//               const isActive = isBandTouched(band);
//               const visualCenter = band.visualCenterPercentage;
              
//               return (
//                 <div
//                   key={band.id}
//                   className="absolute flex flex-col items-center"
//                   style={{
//                     left: `${visualCenter}%`,
//                     transform: 'translateX(-50%) translateY(-50%)',
//                     top: '5%'
//                   }}
//                 >
//                   <div 
//                     className={`  whitespace-nowrap transition-colors duration-300 px-1 ${
//                       isActive ? 'text-[#5958bb] font-bold text-sm' : 'text-xs  text-gray-400 font-semibold'
//                     }`}
//                   >
//                     Band {index + 1}
//                   </div>
//                   {/* Show ORIGINAL range for each band */}
//                   {/* <div className="text-[9px] text-gray-500 mt-0.5 whitespace-nowrap text-center">
//                     {new Intl.NumberFormat('en-US', {
//                       style: 'currency',
//                       currency: 'USD',
//                       minimumFractionDigits: 0,
//                       maximumFractionDigits: 0
//                     }).format(band.startRange)} - 
//                     {new Intl.NumberFormat('en-US', {
//                       style: 'currency',
//                       currency: 'USD',
//                       minimumFractionDigits: 0,
//                       maximumFractionDigits: 0
//                     }).format(band.endRange)}
//                   </div> */}
//                 </div>
//               );
//             })}
//           </div>
//         )}
        
//         {/* Active Band Section - Conditionally show based on whether band is touched */}
//         <div className="relative p-4 -mt-6 bg-white rounded-xl border-2 shadow-sm h-[120px] flex flex-col justify-center border-[#5958bb]/50">
//           {/* Header row with title and View Bands button */}
//           <div className="flex justify-between items-center mb-3">
//             <p className={`text-sm font-bold ${isAnyBandTouched ? 'text-[#5958bb]' : 'text-gray-400'}`}>
//               {/* {console.log("Current 12: ",currentBand)}
//               {console.log("All Bands: ",bands)} */}
//               {/* {isAnyBandTouched 
//                 ? (actual > currentBand.endRange 
//                     ? 'Highest Band Achieved' 
//                     : `Active Band: ${currentBand.name}`)
//                 : 'No Bands Hit'} */}
//                   {isAnyBandTouched 
//                 ? (actual > currentBand.endRange 
//                     ? `Highest Band Achieved` 
//                     : `Active Band: Band ${bands.findIndex(band => band.id === currentBand.id) + 1}`)
//                 : 'No Bands Hit'}
//             </p>
            
//             <button
//               onClick={handleViewBandsClick}
//               className={`px-2 py-1 text-xs font-semibold border-2 border-[#5958bb]/60 rounded-md transition-colors z-20 ${
//                 showBandsDropdown 
//                   ? 'bg-[#5958bb] text-white border-[#5958bb]' 
//                   : 'text-[#5958bb] border-[#5958bb] hover:bg-[#5958bb] hover:text-white'
//               }`}
//             >
//               View Bands
//             </button>
//           </div>
          
//           {/* Bands Dropdown - Positioned higher and responsive */}
//           {showBandsDropdown && (
//             <div ref={dropdownRef} className="absolute top-14 right-2 mb-2 w-82 sm:w-80 bg-white border-2 border-[#5958bb] rounded-lg shadow-xl z-50 max-h-72 sm:max-h-80 overflow-y-auto">
//               <div className="p-3">
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="text-sm font-bold text-[#5958bb]">All Bands</h3>
//                   <button
//                     onClick={handleCloseDropdown}
//                     className="text-red-600 text-2xl leading-none size-6 -mt-1 flex items-center justify-center hover:bg-red-50 rounded"
//                   >
//                     ×
//                   </button>
//                 </div>

//                   {/* {console.log("Bands Info: ",bands)} */}
                
//                 {bands.map((band, index) => {
//                   const isAchieved = isBandAchieved(band);
//                   const isCurrent = currentBand && band.id === currentBand.id && !isAchieved;
//                   const isLocked = actual < band.startRange;


//                   return (
//                     <div
//                       key={band.id}
//                       className={`mb-2 p-2 rounded-lg border ${
//                         isAchieved
//                           ? 'bg-green-50 border-2 border-green-700/50'
//                           : isCurrent
//                           ? 'bg-purple-50 border-[#5958bb]'
//                           : 'bg-gray-50 border-gray-200'
//                       }`}
//                     >
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1 sm:gap-0">
//                         {/* <span className="text-xs font-bold text-gray-700">
//                           {band.name}
//                         </span> */}
//                         <span className="text-xs font-bold text-gray-700">
//   {band.name ? band.name : `Band ${index + 1}`}
// </span>

//                         <div className="flex gap-2">
//                           {isAchieved && (
//                             <span className="flex items-center gap-1 text-xs p-0.5 px-2 rounded-full bg-green-600 text-white font-semibold whitespace-nowrap">
//                               <CheckCircle className="size-3" />
//                               Achieved
//                             </span>
//                           )}
//                           {isCurrent && (
//                             <span className="flex items-center gap-1 text-xs text-[#5958bb] p-0.5 px-2 bg-purple-100 border-2 border-purple-400/50 rounded-full font-semibold whitespace-nowrap">
//                               <Circle className="size-2 fill-[#5958bb]" />
//                               Active
//                             </span>
//                           )}
//                           {isLocked && (
//                             <span className="flex items-center gap-1 text-xs text-gray-500 p-0.5 px-2 bg-gray-200 border-2 border-gray-300 rounded-full font-semibold whitespace-nowrap">
//                               <Lock className="size-3" />
//                               Locked
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                       <div className="flex flex-col mt-2 sm:flex-row sm:items-center justify-between text-xs text-gray-600 gap-1 sm:gap-0">
//                         <div className="whitespace-nowrap">
//                           <span className="font-bold">Range:</span>
//                           <span className="font-semibold ml-1">
//                             {new Intl.NumberFormat('en-US', {
//                               style: 'currency',
//                               currency: 'USD',
//                               minimumFractionDigits: 0,
//                               maximumFractionDigits: 0
//                             }).format(band.startRange)} - {new Intl.NumberFormat('en-US', {
//                               style: 'currency',
//                               currency: 'USD',
//                               minimumFractionDigits: 0,
//                               maximumFractionDigits: 0
//                             }).format(band.endRange)}
//                           </span>
//                         </div>
//                         <div className="whitespace-nowrap">
//                           <span className="font-bold">Bonus:</span>
//                           <span className="font-semibold ml-1">
//                             {/* {new Intl.NumberFormat('en-US', {
//                               style: 'currency',
//                               currency: 'USD',
//                               minimumFractionDigits: 0,
//                               maximumFractionDigits: 0
//                             }).format(band.bonusAmount)} */}
//                               ${
//     Number(
//       String(band.bonusAmount).replace(/[^0-9.-]+/g, '')
//     ).toLocaleString('en-US', { maximumFractionDigits: 0 })
//   }
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}


//               </div>
//             </div>
//           )}
          
//           {/* Content based on whether band is touched or not */}
//           {isAnyBandTouched ? (
//             <div className="flex items-center justify-between gap-4">
//               <div className="flex-1">
//                 <p className="text-xs text-[#5958bb] font-bold mb-1">Range</p>
//                 <p className="text-sm font-semibold text-gray-800">
//                   {new Intl.NumberFormat('en-US', {
//                     style: 'currency',
//                     currency: 'USD',
//                     minimumFractionDigits: 0,
//                     maximumFractionDigits: 0
//                   }).format(currentBand.startRange)} - {new Intl.NumberFormat('en-US', {
//                     style: 'currency',
//                     currency: 'USD',
//                     minimumFractionDigits: 0,
//                     maximumFractionDigits: 0
//                   }).format(currentBand.endRange)}
//                 </p>
//               </div>
//               <div className="w-px h-10 bg-gray-300"></div>
//               <div className="flex-1">
//                 <p className="text-xs font-bold text-[#5958bb] mb-1">Bonus Amount</p>
//                 {/* {console.log("Bands Halfdounut: ",currentBand.bonusAmount)} */}
//                 <p className="text-sm font-semibold text-gray-800">
//                   {/* {new Intl.NumberFormat('en-US', {
//                     style: 'currency',
//                     currency: 'USD',
//                     minimumFractionDigits: 0,
//                     maximumFractionDigits: 0
//                   }).format(currentBand.bonusAmount)} */}

//   ${
//     Number(
//       String(currentBand.bonusAmount).replace(/[^0-9.-]+/g, '')
//     ).toLocaleString('en-US', { maximumFractionDigits: 0 })
//   }


//                 </p>
//               </div>
//             </div>
//           ) : (
//             <div className="flex-1 flex items-center justify-center">
//               <p className="text-sm font-medium text-gray-500 text-center">
//                 Start achieving to hit a band
//               </p>
//             </div>
//           )}
          
       
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HalfDonutProgress;

/////////////////////////


import { useState, useEffect, useRef } from "react";
import { Lock, CheckCircle, Circle, XCircle } from "lucide-react";

// Half Donut Progress Component with Band Arrows
const HalfDonutProgress = ({ percentage, isTargetMet, bands,actual, target, showDropdown, onDropdownToggle }) => {
  const [animate, setAnimate] = useState(false);
  const [showBandsDropdown, setShowBandsDropdown] = useState(false);
  const dropdownRef = useRef(null);
 
  // useEffect(()=>{
  //   console.log("All Bands: ",bands)
  //   console.log("Actual: ",actual)
  // },[bands])
  
  // Sync local state with prop
  useEffect(() => {
    setShowBandsDropdown(showDropdown);
  }, [showDropdown]);
  
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both dropdown and button
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Check if the click is on the View Bands button
        const viewBandsButton = event.target.closest('button');
        if (!viewBandsButton || !viewBandsButton.textContent.includes('View Bands')) {
          setShowBandsDropdown(false);
          onDropdownToggle();
        }
      }
    };
    if (showBandsDropdown) {
      // Add slight delay to prevent immediate closing
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBandsDropdown, onDropdownToggle]);
  
  // Calculate which band the actual value falls into based on original ranges
  const getCurrentBand = () => {
    if (!bands || !Array.isArray(bands) || bands.length === 0) return null;
    
    // Check if actual is 0 and any band starts from 0
    if (actual === 0) {
      const bandStartingFromZero = bands.find(band => Number(band.startRange) === 0);
      return bandStartingFromZero || null;
    }
    
    // Find band where actual falls within range using ORIGINAL ranges
    for (let i = 0; i < bands.length; i++) {
      const band = bands[i];
      const startRange = Number(band.startRange);
      const endRange = Number(band.endRange);
      
      if (actual >= startRange && actual <= endRange) {
        return band;
      }
    }
    
    // If actual doesn't fall into any band, return null
    return null;
  };
  
  const currentBand = getCurrentBand();
  
  // Check if actual value falls into any band
  const isInAnyBand = currentBand !== null;
  
  // Calculate dynamic start and end values based on current band
  const startValue = currentBand ? Number(currentBand.startRange) : 0;
  const endValue = currentBand ? Number(currentBand.endRange) : target;
  
  // Calculate percentage based on current band's range
  const calculateBandPercentage = () => {
    if (!currentBand) return 0;
    
    const startRange = Number(currentBand.startRange);
    const endRange = Number(currentBand.endRange);
    const bandRange = endRange - startRange;
    const actualInBand = actual - startRange;
    const bandPercentage = (actualInBand / bandRange) * 100;
    
    return Math.min(Math.max(bandPercentage, 0), 100);
  };
  
  const bandPercentage = calculateBandPercentage();
  
  const radius = 90;
  const halfCircumference = Math.PI * radius;
  const progressOffset = halfCircumference - (Math.min(bandPercentage, 100) / 100) * halfCircumference;
  
  // Calculate equal visual segments for the progress bar
  const calculateEqualSegments = () => {
    if (!bands || !Array.isArray(bands) || bands.length === 0) return [];
    
    const bandCount = bands.length;
    const equalSegmentWidth = 100 / bandCount; // Each band gets equal visual width
    
    return bands.map((band, index) => {
      const visualStartPercentage = (index / bandCount) * 100;
      const visualEndPercentage = ((index + 1) / bandCount) * 100;
      const visualCenterPercentage = visualStartPercentage + (equalSegmentWidth / 2);
      
      return {
        ...band,
        startRange: Number(band.startRange),
        endRange: Number(band.endRange),
        bonusAmount: Number(band.bonusAmount),
        visualStartPercentage,
        visualEndPercentage,
        visualCenterPercentage,
        visualWidth: equalSegmentWidth
      };
    });
  };
  
  const visualBands = calculateEqualSegments();
  
  // Check if actual value falls within this specific band's range
  const isActualInBandRange = (band) => {
    const startRange = Number(band.startRange);
    const endRange = Number(band.endRange);
    return actual >= startRange && actual <= endRange;
  };
  
  // Check if band is achieved (actual is within the band's range)
  const isBandAchieved = (band) => {
    return isActualInBandRange(band);
  };
  
  // Check if band is touched based on ORIGINAL ranges
  const isBandTouched = (band) => {
    const startRange = Number(band.startRange);
    return actual >= startRange;
  };
  
  // Check if any band is touched
  const isAnyBandTouched = isInAnyBand;
  
  // Handle View Bands button click
  const handleViewBandsClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling
    if (showBandsDropdown) {
      // If dropdown is open, close it
      setShowBandsDropdown(false);
      onDropdownToggle();
    } else {
      // If dropdown is closed, open it
      setShowBandsDropdown(true);
      onDropdownToggle();
    }
  };
  
  // Handle close dropdown
  const handleCloseDropdown = (e) => {
    e.stopPropagation(); // Prevent event from bubbling
    setShowBandsDropdown(false);
    onDropdownToggle();
  };
  
  // Calculate actual progress percentage for visual positioning in the current band
  const actualPercentage = bandPercentage;
  
  // Format currency helper function
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format bonus amount helper function
  const formatBonusAmount = (bonusAmount) => {
    const numericValue = Number(String(bonusAmount).replace(/[^0-9.-]+/g, ''));
    return `$${numericValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };
  
  return (
    <div className="relative w-full mb-4">
      <div className="relative flex justify-center items-end mb-2">
        <svg width="220" height="120" viewBox="0 4 200 115">
          {/* Background arc */}
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="#e0dedeff"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Progress arc */}
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
          
          {/* Start value (current band start) positioned at the start of the arc */}
          <text
            x="30"  // Position at the start of the arc
            y="118" // Position below the arc
            className="text-sm font-medium"
            textAnchor="middle"
          >
            {formatCurrency(startValue)}
          </text>
          
          {/* End value (current band end) positioned at the end of the arc */}
          <text
            x="170" // Position at the end of the arc
            y="118" // Position below the arc
            className="text-sm font-medium"
            textAnchor="middle"
          >
            {formatCurrency(endValue)}
          </text>
        </svg>
        
        {/* Center percentage display */}
        <div className="absolute top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-full text-center">
          <span
            className={`text-2xl font-bold ${
              !isInAnyBand
                ? 'text-red-500' // Red color when no band achieved
                : isTargetMet
                ? 'text-green-600'
                : 'text-[#5958bb]'
            }`}
          >
            {isInAnyBand ? `${Math.min(Math.round(bandPercentage), 100)}%` : '0%'}
          </span>
          <p className="text-sm text-gray-500 mt-1">Progress</p>
        </div>
      </div>
      
      {/* Band scale with title and percentage */}
      <div className="mt-8 px-2">
        
        {/* Banded progress bar - VISUALLY EQUAL SEGMENTS */}
        <div className="relative h-2 z-0">
          {/* Background gray bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gray-300 rounded-full"></div>
          
          {/* MAIN PURPLE PROGRESS BAR - EXTENDS TO ACTUAL VALUE */}
          {actual > 0 && isInAnyBand && (
            <div 
              className="absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 z-5"
              style={{
                width: `${actualPercentage}%`,
                background: 'linear-gradient(to right, #5958bb, #5958bb, #5958bb, #5958bb)',
              }}
            />
          )}
          
          {/* Equal band dividers overlay */}
          {visualBands && visualBands.length > 0 && (
            <div className="absolute top-0 left-0 right-0 flex h-2 rounded-full overflow-hidden pointer-events-none z-10">
              {visualBands.map((band, index) => (
                <div
                  key={band.id}
                  className="relative flex-shrink-0"
                  style={{
                    width: `${band.visualWidth}%`,
                  }}
                >
                  {/* Divider between bands (except for the last one) */}
                  {index < visualBands.length - 1 && (
                    <div className="absolute right-0 top-0 w-[2px] h-2 bg-white"></div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Actual value indicator positioned on top */}
          {actual > 0 && isInAnyBand && (
            <div
              className="absolute -top-1 transform -translate-x-1/2 z-20"
              style={{ left: `${actualPercentage}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="size-4 bg-white rounded-full border-2 border-[#5958bb] flex items-center justify-center shadow-lg">
                  <div className="size-2 bg-[#5958bb] rounded-full"></div>
                </div>
                <div className="text-[10px] font-bold text-[#5958bb] -mt-10 whitespace-nowrap bg-white px-1 rounded shadow-lg border-2 border-[#5958bb]">
                  {formatCurrency(actual)}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Band labels positioned below the bar - Show ORIGINAL ranges */}
        {visualBands && visualBands.length > 0 && (
          <div className="relative mt-3 h-12 z-0">
            {visualBands.map((band, index) => {
              const isActive = isBandTouched(band);
              const visualCenter = band.visualCenterPercentage;
              
              return (
                <div
                  key={band.id}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: `${visualCenter}%`,
                    transform: 'translateX(-50%) translateY(-50%)',
                    top: '5%'
                  }}
                >
                  <div 
                    className={`whitespace-nowrap transition-colors duration-300 px-1 ${
                      isActive ? 'text-[#5958bb] font-bold text-sm' : 'text-xs text-gray-400 font-semibold'
                    }`}
                  >
                    Band {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Active Band Section - Conditionally show based on whether band is touched */}
        <div className="relative p-4 -mt-6 bg-white rounded-xl border-2 shadow-sm h-[120px] flex flex-col justify-center border-[#5958bb]/50">
          {/* Header row with title and View Bands button */}
          <div className="flex justify-between items-center mb-3">
            <p className={`text-sm font-bold ${isInAnyBand ? 'text-[#5958bb]' : 'text-red-500'}`}>
              {isInAnyBand 
                ? `Active Band: Band ${bands.findIndex(band => band.id === currentBand.id) + 1}`
                : 'No band achieved yet'}
            </p>
            
            <button
              onClick={handleViewBandsClick}
              className={`px-2 py-1 text-xs font-semibold border-2 border-[#5958bb]/60 rounded-md transition-colors z-20 ${
                showBandsDropdown 
                  ? 'bg-[#5958bb] text-white border-[#5958bb]' 
                  : 'text-[#5958bb] border-[#5958bb] hover:bg-[#5958bb] hover:text-white'
              }`}
            >
              View Bands
            </button>
          </div>
          
          {/* Bands Dropdown - Positioned higher and responsive */}
          {showBandsDropdown && (
            <div ref={dropdownRef} className="absolute top-14 right-2 mb-2 w-82 sm:w-80 bg-white border-2 border-[#5958bb] rounded-lg shadow-xl z-50 max-h-72 sm:max-h-80 overflow-y-auto">
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-[#5958bb]">All Bands</h3>
                  <button
                    onClick={handleCloseDropdown}
                    className="text-red-600 text-2xl leading-none size-6 -mt-1 flex items-center justify-center hover:bg-red-50 rounded"
                  >
                    ×
                  </button>
                </div>
                
                {bands.map((band, index) => {
                  const isAchieved = isBandAchieved(band);
                  const isCurrent = currentBand && band.id === currentBand.id;
                  const isLocked = actual < Number(band.startRange);
                  const isPartial = !isAchieved && actual >= Number(band.startRange) && actual < Number(band.endRange);

                  return (
                    <div
                      key={band.id}
                      className={`mb-2 p-2 rounded-lg border ${
                        isAchieved
                          ? 'bg-green-50 border-2 border-green-700/50'
                          : isCurrent
                          ? 'bg-purple-50 border-[#5958bb]'
                          : isPartial
                          ? 'bg-orange-50 border-2 border-orange-500' // Orange for partial progress
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1 sm:gap-0">
                        <span className="text-xs font-bold text-gray-700">
                          {band.name ? band.name : `Band ${index + 1}`}
                        </span>

                        <div className="flex gap-2">
                          {isAchieved && (
                            <span className="flex items-center gap-1 text-xs p-0.5 px-2 rounded-full bg-green-600 text-white font-semibold whitespace-nowrap">
                              <CheckCircle className="size-3" />
                              Achieved
                            </span>
                          )}
                          {isCurrent && !isAchieved && (
                            <span className="flex items-center gap-1 text-xs text-[#5958bb] p-0.5 px-2 bg-purple-100 border-2 border-purple-400/50 rounded-full font-semibold whitespace-nowrap">
                              <Circle className="size-2 fill-[#5958bb]" />
                              Active
                            </span>
                          )}
                          {isPartial && !isCurrent && (
                            <span className="flex items-center gap-1 text-xs p-0.5 px-2 rounded-full bg-orange-500 text-white font-semibold whitespace-nowrap">
                              <XCircle className="size-3" />
                              Not Achieved
                            </span>
                          )}
                          {isLocked && (
                            <span className="flex items-center gap-1 text-xs text-gray-500 p-0.5 px-2 bg-gray-200 border-2 border-gray-300 rounded-full font-semibold whitespace-nowrap">
                              <Lock className="size-3" />
                              Locked
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col mt-2 sm:flex-row sm:items-center justify-between text-xs text-gray-600 gap-1 sm:gap-0">
                        <div className="whitespace-nowrap">
                          <span className="font-bold">Range:</span>
                          <span className="font-semibold ml-1">
                            {formatCurrency(Number(band.startRange))} - {formatCurrency(Number(band.endRange))}
                          </span>
                        </div>
                        <div className="whitespace-nowrap">
                          <span className="font-bold">Bonus:</span>
                          <span className="font-semibold ml-1">
                            {formatBonusAmount(band.bonusAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Content based on whether band is touched or not */}
          {isInAnyBand ? (
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs text-[#5958bb] font-bold mb-1">Range</p>
                <p className="text-sm font-semibold text-gray-800">
                  {formatCurrency(Number(currentBand.startRange))} - {formatCurrency(Number(currentBand.endRange))}
                </p>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#5958bb] mb-1">Bonus Amount</p>
                <p className="text-sm font-semibold text-gray-800">
                  {formatBonusAmount(currentBand.bonusAmount)}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm font-medium text-red-500 text-center">
                No band achieved yet. Keep pushing to reach a band!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HalfDonutProgress;