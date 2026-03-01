

//////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// import { Wallet, Trophy, DollarSign } from "lucide-react";
// import { fetchEmployeeOverview } from "../../store/slices/overviewSlice";
// import { getEmployeeId } from "../../utils/cookies";

// const OverviewPage = () => {
//   const dispatch = useDispatch();
//   const { overviewData, loading, error } = useSelector((state) => state.overview);
  
//   const primaryColor = "#5b59bb";

//   // useEffect(()=>{
//   //   console.log("Overview Data: ",overviewData)
//   //   const employeeId = getEmployeeId();
//   //   const data =  dispatch(fetchEmployeeOverview(employeeId));
//   //   console.log("Employee Fetched Overview: ",fetchEmployeeOverview(employeeId))
//   //   console.log("Data:",data)
//   // },[overviewData])
  
//   const [selectedTimeframe, setSelectedTimeframe] = useState("Week");
//   const [animationKey, setAnimationKey] = useState(0);
//   const [loadingProgress, setLoadingProgress] = useState(0);

//   // Fetch overview data on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       const employeeId = getEmployeeId();
//       if (employeeId && employeeId !== 'null') {
//         try {
//           setLoadingProgress(0);
          
//           // Start progress simulation
//           let progress = 0;
//           let apiResolved = false;
//           let showFinalProgression = false;
          
//           const progressInterval = setInterval(() => {
//             if (progress < 80 && !apiResolved) {
//               // Faster progress until 80% if API hasn't resolved yet
//               progress += 0.396;
//               setLoadingProgress(Math.floor(progress));
//             } else if (progress < 98 && !apiResolved) {
//               // Slower progress from 80% to 98% if still waiting for API
//               progress += 0.198;
//               setLoadingProgress(Math.floor(progress));
//             } else if (!apiResolved && !showFinalProgression) {
//               // Hold at 98% while waiting for API
//               setLoadingProgress(98);
//             } else if (showFinalProgression) {
//               // Show 99% immediately when API resolves
//               setLoadingProgress(99);
              
//               // Wait 4 seconds before showing 100%
//               setTimeout(() => {
//                 setLoadingProgress(100);
//                 // Show data immediately after reaching 100%
//                 setTimeout(() => {
//                   if (progressInterval) clearInterval(progressInterval);
//                 }, 50);
//               }, 1000);
              
//               clearInterval(progressInterval);
//             }
//           }, 50);

//           // Dispatch the API call
//           await dispatch(fetchEmployeeOverview(employeeId));
          
//           // API resolved - mark it and start final progression
//           apiResolved = true;
//           showFinalProgression = true;
          
//           // Safety timeout - if API takes too long, stop progress simulation
//           setTimeout(() => {
//             if (!apiResolved) {
//               apiResolved = true;
//               showFinalProgression = true;
//             }
//           }, 45000); // 45 second timeout
          
//         } catch (err) {
//           console.error("Error fetching overview data:", err);
//         }
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//    useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     setAnimationKey(prev => prev + 1);
//   }, [selectedTimeframe]);

//   // Format currency value
//   const formatCurrency = (value) => {
//     if (value === null || value === undefined) return "$0";
//     return `$${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 })}`;
//   };

//   const getData = () => {
//     // Get data from API or use defaults
//     const summary = overviewData?.summary || {};
//     const totals = overviewData?.totals || {};
//     const breakdown = summary.breakdown || {};
//     const perPeriod = totals.per_period || {};
    
//     let wages, incentives, total;
    
//     switch(selectedTimeframe) {
//       case "Week":
//         wages = perPeriod.week?.wage ||  0;
//         incentives = perPeriod.week?.incentive || 0;
//         total = perPeriod.week?.total || summary.total_weekly_earnings || totals.weekly || 0;
//         break;
//       case "Month":
//         wages = perPeriod.month?.wage || 0;
//         incentives = perPeriod.month?.incentive || breakdown.monthly?.incentives || 0;
//         total = perPeriod.month?.total || summary.total_monthly_earnings || totals.monthly || 0;
//         break;
//       case "Year":
//         wages = perPeriod.year?.wage || 0;
//         incentives = perPeriod.year?.incentive || breakdown.yearly?.incentives || 0;
//         total = perPeriod.year?.total || summary.total_yearly_earnings || totals.yearly || 0;
//         break;
//       default:
//         wages = 0;
//         incentives = 0;
//         total = 0;
//     }
    
//     return {
//       summary: [
//         { 
//           title: "Wages", 
//           value: formatCurrency(wages), 
//           color: primaryColor, 
//           icon: Wallet,
//           iconStyle: {
//             bg: "bg-green-100",
//             border: "border-[#10b982]/60 border-2",
//             text: "text-[#10b982]"
//           }
//         },
//         { 
//           title: "Incentives", 
//           value: formatCurrency(incentives), 
//           color: "#10b981", 
//           icon: Trophy,
//           iconStyle: {
//             bg: "bg-yellow-100",
//             border: "border-yellow-500 border-2",
//             text: "text-yellow-700"
//           },
//         },
//         { 
//           title: "Total", 
//           value: formatCurrency(total), 
//           color: "#6366f1", 
//           icon: DollarSign,
//           iconStyle: {
//             bg: "bg-blue-50",
//             border: "border-2 border-blue-400",
//             text: "text-blue-500"
//           }
//         },
//       ],
//       pie: [
//         { name: "Wages", value: parseFloat(wages) || 0, color: "#10b981" },
//         { name: "Incentives", value: parseFloat(incentives) || 0, color: primaryColor },
//       ],
//     };
//   };

//   const currentData = getData();
//   const timeframes = ["Week", "Month", "Year"];

//   // Calculate total for display
//   const totalValue = currentData.pie.reduce((sum, item) => sum + item.value, 0);

//   // Show loading state with progress bar
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white w-full flex items-center justify-center -mt-32">
//         <div className="text-center w-full">
//           <h2 className="text-mm font-medium text-[#5959b9] mb-6 tracking-wide">
//             LOADING...
//           </h2>
          
//           <div className="mb-4">
//             <span className="text-mm font-medium text-[#5959b9]">
//               {loadingProgress}%
//             </span>
//           </div>
          
//           {/* Thin progress bar */}
//           <div className="max-w-xs mx-auto">
//             <div className="w-full bg-gray-300 rounded-full h-1.5 overflow-hidden">
//               <div 
//                 className="bg-[#5959b9] h-full rounded-full transition-all duration-300 ease-out"
//                 style={{ width: `${loadingProgress}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Show error state
//   if (error) {
//     return (
//       <div className="bg-white">
//         <div className="mx-auto">
//           <div className="flex items-center justify-center py-12">
//             <div className="text-red-500 text-lg">{error.message || 'Failed to load overview data'}</div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white">
//       <div className="mx-auto">
//         {/* Header Section */}
//         <div className="mb-6">
//           <h1 className="text-xl md:text-3xl font-medium text-[#5958bb] mb-4">Overview Dashboard</h1>

//           <div className="flex items-center">
//             <div className="flex rounded-lg p-1">
//               {timeframes.map((timeframe) => (
//                 <button
//                   key={timeframe}
//                   onClick={() => setSelectedTimeframe(timeframe)}
//                   className={`relative px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ${
//                     selectedTimeframe === timeframe
//                       ? "text-[#5b59bb]"
//                       : "text-gray-700 hover:text-[#5b59bb]"
//                   }`}
//                 >
//                   {timeframe}
                  
//                   <span 
//                     className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#5b59bb] rounded-full transition-all duration-300 ${
//                       selectedTimeframe === timeframe
//                         ? "w-4/5 opacity-100"
//                         : "w-0 opacity-0 group-hover:w-4/5 group-hover:opacity-50"
//                     }`}
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Summary Cards - Mobile optimized layout */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-0">
//           {currentData.summary.map((item, index) => {
//             const Icon = item.icon;
//             return (
//               <div
//                 key={index}
//                 className="relative bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-200"
//                 style={{
//                   borderLeft: `3px solid ${primaryColor}`,
//                 }}
//               >
//                 <div className="relative z-10">
//                   {/* Mobile layout: Icon and value on same line */}
//                   <div className="flex flex-col md:block">
//                     {/* Mobile: Horizontal layout for icon, title, and value */}
//                     <div className="flex flex-row items-center justify-between md:justify-start  md:mb-2">
//                       {/* Icon and Title - left aligned on mobile and desktop */}
//                       <div className="flex flex-row items-center gap-3 md:gap-4">
//                         <div 
//                           className={`w-8 h-8 rounded-full flex items-center justify-center shadow ${item.iconStyle.bg} ${item.iconStyle.border}`}
//                         >
//                           <Icon className={`w-4 h-4 ${item.iconStyle.text}`} />
//                         </div>
//                         <h3 className="text-base font-medium text-gray-600">
//                           {item.title}
//                         </h3>
//                       </div>
                      
//                       {/* Value shown inline on mobile, hidden on desktop */}
//                       <div className="md:hidden">
//                         <p className="text-2xl font-medium text-[#5b59bb]">{item.value}</p>
//                       </div>

//                     </div>
                    
//                     {/* Value shown below on desktop, hidden on mobile */}
//                     <div className="hidden md:block text-center md:text-center">
//                       <p className="text-3xl font-medium text-[#5b59bb]">{item.value}</p>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Chart Section - Only Pie Chart */}
//         <div className="bg-white rounded-xl p-4 shadow-md md:mt-8 mt-4">
//           <div className="min-h-[350px] md:min-h-[400px] md:h-[450px] bg-gray-50 rounded-2xl p-3 md:p-4">
//             <div className="h-full flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
//               {/* Pie Chart Container */}
//               <div className="w-full h-[220px] md:h-full md:w-1/2  flex items-center justify-center">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart key={animationKey}>
                   
//                     <Pie
//   data={currentData.pie}
//   cx="50%"
//   cy="50%"
//   innerRadius={window.innerWidth < 768 ? 90 : 110}
//   outerRadius={window.innerWidth < 768 ? 110 : 130}
//   startAngle={90}
//   endAngle={450}
//   paddingAngle={1}
//   dataKey="value"
//   stroke="none"
//   animationDuration={600}
//   animationBegin={2}
//   animationEasing="ease-in-out"
// >
//     {currentData.pie.map((entry, index) => (
//                         <Cell 
//                           key={`cell-${index}`} 
//                           fill={entry.color}
//                           stroke="#ffffff"
//                           strokeWidth={2}
//                         />
//                       ))}
// </Pie>
//                     <Tooltip 
//                       formatter={(value, name) => {
//                         const prefix = selectedTimeframe === "Week" ? "$" : "$";
//                         return [`${prefix}${value}`, name];
//                       }}
//                       contentStyle={{ 
//                         borderRadius: "8px", 
//                         border: "none",
//                         boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                         fontSize: window.innerWidth < 768 ? "12px" : "13px",
//                         padding: "6px 10px"
//                       }}
//                     />
                    
//                     {/* Center Text */}
//                     <text
//                       x="50%"
//                       y="50%"
//                       textAnchor="middle"
//                       dominantBaseline="middle"
//                       className="text-3xl md:text-4xl font-semibold fill-current text-gray-600"
//                     >
//                       {selectedTimeframe === "Week" ? "$" : "$"}{totalValue.toLocaleString()}
//                     </text>

//                     {/* Timeframe label */}
//                     <text
//                       x="50%"
//                       y={window.innerWidth < 768 ? "62%" : "58%"}
//                       textAnchor="middle"
//                       dominantBaseline="middle"
//                       className="text-sm md:text-base font-medium fill-current text-gray-500"
//                     >
//                       {selectedTimeframe}
//                     </text>
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Legend with Values */}
//               <div className="w-full md:w-[45%] flex flex-col space-y-2 md:space-y-4 px-0 md:px-4">
//                 {currentData.pie.map((item, index) => (
//                   <div key={index} className="flex items-center justify-between p-2 md:p-3 bg-white rounded-lg shadow-sm">
//                     <div className="flex items-center space-x-2">
//                       <div 
//                         className="size-2.5 md:size-3 rounded-full flex-shrink-0" 
//                         style={{ backgroundColor: item.color }}
//                       />
//                       <span className="text-base font-medium text-gray-600">
//                         {item.name}
//                       </span>
//                     </div>
//                     <div className="flex flex-col items-end ml-2">
//                       <span className="text-base md:text-3xl  text-[27px] font-bold" style={{ color: item.color }}>
//                         {selectedTimeframe === "Week" ? "$" : "$"}{item.value.toLocaleString()}
//                       </span>
//                       <span className="text-xs md:text-sm text-gray-500 font-medium mt-2">
//                         {((item.value / totalValue) * 100).toFixed(1)}%
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OverviewPage;

///////////////////////////////////////////////////////////////////////////////////////////////////////



import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Wallet, Trophy, DollarSign } from "lucide-react";
import { fetchEmployeeOverview } from "../../store/slices/overviewSlice";
import { getEmployeeId } from "../../utils/cookies";

const OverviewPage = () => {
  const dispatch = useDispatch();
  const { overviewData, loading, error } = useSelector((state) => state.overview);
  
  const primaryColor = "#5b59bb";

  // useEffect(()=>{
  //   console.log("Overview Data: ",overviewData)
  //   const employeeId = getEmployeeId();
  //   const data =  dispatch(fetchEmployeeOverview(employeeId));
  //   console.log("Employee Fetched Overview: ",fetchEmployeeOverview(employeeId))
  //   console.log("Data:",data)
  // },[overviewData])
  
  const [selectedTimeframe, setSelectedTimeframe] = useState("Week");
  const [animationKey, setAnimationKey] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Fetch overview data on mount
  useEffect(() => {
    const fetchData = async () => {
      const employeeId = getEmployeeId();
      if (employeeId && employeeId !== 'null') {
        try {
          setLoadingProgress(0);
          
          // Start progress simulation
          let progress = 0;
          let apiResolved = false;
          let showFinalProgression = false;
          
          const progressInterval = setInterval(() => {
            if (progress < 80 && !apiResolved) {
              // Faster progress until 80% if API hasn't resolved yet
              progress += 0.396;
              setLoadingProgress(Math.floor(progress));
            } else if (progress < 98 && !apiResolved) {
              // Slower progress from 80% to 98% if still waiting for API
              progress += 0.198;
              setLoadingProgress(Math.floor(progress));
            } else if (!apiResolved && !showFinalProgression) {
              // Hold at 98% while waiting for API
              setLoadingProgress(98);
            } else if (showFinalProgression) {
              // Show 99% immediately when API resolves
              setLoadingProgress(99);
              
              // Wait 4 seconds before showing 100%
              setTimeout(() => {
                setLoadingProgress(100);
                // Show data immediately after reaching 100%
                setTimeout(() => {
                  if (progressInterval) clearInterval(progressInterval);
                }, 50);
              }, 1000);
              
              clearInterval(progressInterval);
            }
          }, 50);

          // Dispatch the API call
          await dispatch(fetchEmployeeOverview(employeeId));
          
          // API resolved - mark it and start final progression
          apiResolved = true;
          showFinalProgression = true;
          
          // Safety timeout - if API takes too long, stop progress simulation
          setTimeout(() => {
            if (!apiResolved) {
              apiResolved = true;
              showFinalProgression = true;
            }
          }, 45000); // 45 second timeout
          
        } catch (err) {
          console.error("Error fetching overview data:", err);
        }
      }
    };

    fetchData();
  }, [dispatch]);

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [selectedTimeframe]);

  // Format currency value
  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "$0";
    return `$${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 })}`;
  };

  const getData = () => {
    // Get data from API or use defaults
    const summary = overviewData?.summary || {};
    const totals = overviewData?.totals || {};
    const breakdown = summary.breakdown || {};
    const perPeriod = totals.per_period || {};
    
    let wages, incentives, total;
    
    switch(selectedTimeframe) {
      case "Week":
        wages = perPeriod.week?.wage ||  0;
        incentives = perPeriod.week?.incentive || 0;
        total = perPeriod.week?.total || summary.total_weekly_earnings || totals.weekly || 0;
        break;
      case "Month":
        wages = perPeriod.month?.wage || 0;
        incentives = perPeriod.month?.incentive || breakdown.monthly?.incentives || 0;
        total = perPeriod.month?.total || summary.total_monthly_earnings || totals.monthly || 0;
        break;
      case "Year":
        wages = perPeriod.year?.wage || 0;
        incentives = perPeriod.year?.incentive || breakdown.yearly?.incentives || 0;
        total = perPeriod.year?.total || summary.total_yearly_earnings || totals.yearly || 0;
        break;
      default:
        wages = 0;
        incentives = 0;
        total = 0;
    }
    
    return {
      summary: [
        { 
          title: "Wages", 
          value: formatCurrency(wages), 
          color: primaryColor, 
          icon: Wallet,
          iconStyle: {
            bg: "bg-green-100",
            border: "border-[#10b982]/60 border-2",
            text: "text-[#10b982]"
          }
        },
        { 
          title: "Incentives", 
          value: formatCurrency(incentives), 
          color: "#10b981", 
          icon: Trophy,
          iconStyle: {
            bg: "bg-yellow-100",
            border: "border-yellow-500 border-2",
            text: "text-yellow-700"
          },
        },
        { 
          title: "Total", 
          value: formatCurrency(total), 
          color: "#6366f1", 
          icon: DollarSign,
          iconStyle: {
            bg: "bg-blue-50",
            border: "border-2 border-blue-400",
            text: "text-blue-500"
          }
        },
      ],
      pie: [
        { name: "Wages", value: parseFloat(wages) || 0, color: "#10b981" },
        { name: "Incentives", value: parseFloat(incentives) || 0, color: primaryColor },
      ],
    };
  };

  const currentData = getData();
  const timeframes = ["Week", "Month", "Year"];

  // Calculate total for display
  const totalValue = currentData.pie.reduce((sum, item) => sum + item.value, 0);

  // Show loading state with progress bar
  if (loading) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center -mt-32">
        <div className="text-center w-full">
          <h2 className="text-mm font-medium text-[#5959b9] mb-6 tracking-wide">
            LOADING...
          </h2>
          
          <div className="mb-4">
            <span className="text-mm font-medium text-[#5959b9]">
              {loadingProgress}%
            </span>
          </div>
          
          {/* Thin progress bar */}
          <div className="max-w-xs mx-auto">
            <div className="w-full bg-gray-300 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-[#5959b9] h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-white">
        <div className="mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-red-500 text-lg">{error.message || 'Failed to load overview data'}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-xl md:text-3xl font-medium text-[#5958bb] mb-4">Overview Dashboard</h1>

          <div className="flex items-center">
            <div className="flex rounded-lg p-1">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ${
                    selectedTimeframe === timeframe
                      ? "text-[#5b59bb]"
                      : "text-gray-700 hover:text-[#5b59bb]"
                  }`}
                >
                  {timeframe}
                  
                  <span 
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#5b59bb] rounded-full transition-all duration-300 ${
                      selectedTimeframe === timeframe
                        ? "w-4/5 opacity-100"
                        : "w-0 opacity-0 group-hover:w-4/5 group-hover:opacity-50"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Cards - Mobile optimized layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-0">
          {currentData.summary.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-200"
                style={{
                  borderLeft: `3px solid ${primaryColor}`,
                }}
              >
                <div className="relative z-10">
                  {/* Mobile layout: Icon and value on same line */}
                  <div className="flex flex-col md:block">
                    {/* Mobile: Horizontal layout for icon, title, and value */}
                    <div className="flex flex-row items-center justify-between md:justify-start  md:mb-2">
                      {/* Icon and Title - left aligned on mobile and desktop */}
                      <div className="flex flex-row items-center gap-3 md:gap-4">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center shadow ${item.iconStyle.bg} ${item.iconStyle.border}`}
                        >
                          <Icon className={`w-4 h-4 ${item.iconStyle.text}`} />
                        </div>
                        <h3 className="text-base font-medium text-gray-600">
                          {item.title}
                        </h3>
                      </div>
                      
                      {/* Value shown inline on mobile, hidden on desktop */}
                      <div className="md:hidden">
                        <p className="text-2xl font-medium text-[#5b59bb]">{item.value}</p>
                      </div>

                    </div>
                    
                    {/* Value shown below on desktop, hidden on mobile */}
                    <div className="hidden md:block text-center md:text-center">
                      <p className="text-3xl font-medium text-[#5b59bb]">{item.value}</p>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Section - Only Pie Chart */}
        <div className="bg-white rounded-xl p-4 shadow-md md:mt-8 mt-4">
          <div className="min-h-[350px] md:min-h-[400px] md:h-[450px] bg-gray-50 rounded-2xl p-3 md:p-4">
            <div className="h-full flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
              {/* Pie Chart Container */}
              <div className="w-full h-[220px] md:h-full md:w-1/2  flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart key={animationKey}>
                   
                    <Pie
  data={currentData.pie}
  cx="50%"
  cy="50%"
  innerRadius={window.innerWidth < 768 ? 90 : 110}
  outerRadius={window.innerWidth < 768 ? 110 : 130}
  startAngle={90}
  endAngle={450}
  paddingAngle={1}
  dataKey="value"
  stroke="none"
  animationDuration={600}
  animationBegin={2}
  animationEasing="ease-in-out"
>
    {currentData.pie.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          stroke="#ffffff"
                          strokeWidth={2}
                        />
                      ))}
</Pie>
                    <Tooltip 
                      formatter={(value, name) => {
                        const prefix = selectedTimeframe === "Week" ? "$" : "$";
                        return [`${prefix}${value}`, name];
                      }}
                      contentStyle={{ 
                        borderRadius: "8px", 
                        border: "none",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        fontSize: window.innerWidth < 768 ? "12px" : "13px",
                        padding: "6px 10px"
                      }}
                    />
                    
                    {/* Center Text */}
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-3xl md:text-4xl font-semibold fill-current text-gray-600"
                    >
                      {selectedTimeframe === "Week" ? "$" : "$"}{totalValue.toLocaleString()}
                    </text>

                    {/* Timeframe label */}
                    <text
                      x="50%"
                      y={window.innerWidth < 768 ? "62%" : "58%"}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-sm md:text-base font-medium fill-current text-gray-500"
                    >
                      {selectedTimeframe}
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend with Values */}
              <div className="w-full md:w-[45%] flex flex-col space-y-2 md:space-y-4 px-0 md:px-4">
                {currentData.pie.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 md:p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="size-2.5 md:size-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-base font-medium text-gray-600">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex flex-col items-end ml-2">
                      <span className="text-base md:text-3xl  text-[27px] font-bold" style={{ color: item.color }}>
                        {selectedTimeframe === "Week" ? "$" : "$"}{item.value.toLocaleString()}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500 font-medium mt-2">
                        {((item.value / totalValue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;

