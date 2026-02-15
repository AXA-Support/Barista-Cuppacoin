
// import React, { useState, useEffect, useMemo } from 'react';
// import { X, CheckCircle, MessageSquare, AlertCircle, Bell, Trophy, Target, Clock, Calendar } from 'lucide-react';
// import { useSelector } from 'react-redux';

// // Format time ago from date string
// const formatTimeAgo = (dateString) => {
//   if (!dateString) return 'Recently';
  
//   try {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInMs = now - date;
//     const diffInSeconds = Math.floor(diffInMs / 1000);
//     const diffInMinutes = Math.floor(diffInSeconds / 60);
//     const diffInHours = Math.floor(diffInMinutes / 60);
//     const diffInDays = Math.floor(diffInHours / 24);

//     if (diffInDays > 0) {
//       return `${diffInDays}d ago`;
//     } else if (diffInHours > 0) {
//       return `${diffInHours}h ago`;
//     } else if (diffInMinutes > 0) {
//       return `${diffInMinutes}m ago`;
//     } else {
//       return 'Just now';
//     }
//   } catch (error) {
//     return 'Recently';
//   }
// };

// const formatDateDMY = (dateStr) => {
//   if (!dateStr) return "";
//   const date = new Date(dateStr);
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   return `${day}-${month}-${year}`;
// };

// // Transform API quiz response to notification format
// const transformQuizToNotification = (quiz) => {
//   const isRead = quiz.seen_at !== null;
//   const timeAgo = quiz.assigned_at ? formatTimeAgo(quiz.assigned_at) : 'Recently';
  
//   // Create message based on quiz status
//   let message = quiz.quiz_description || `Quiz '${quiz.quiz_title}' has been assigned to you.`;
//   let title = "Quiz Due Soon";
  
//   if (quiz.is_overdue) {
//     title = "Quiz Overdue";
//     message = `Quiz '${quiz.quiz_title}' is overdue. Please complete it.`;
//   } else if (quiz.is_due_soon && quiz.due_date_formatted) {
//     title = "Quiz Due Soon";
//     message = `Quiz '${quiz.quiz_title}' is due soon (${quiz.due_date_formatted}).`;
//   } else if (quiz.due_date_formatted) {
//     title = "Quiz Assigned";
//     message = `Quiz '${quiz.quiz_title}' is due on ${quiz.due_date_formatted}.`;
//   } else {
//     title = "Quiz Assigned";
//     message = `Quiz '${quiz.quiz_title}' has been assigned to you.`;
//   }

//   return {
//     id: `quiz-${quiz.assignment_id}`,
//     title: title,
//     message: message,
//     type: "quiz",
//     time: timeAgo,
//     read: isRead,
//     icon: quiz.is_overdue ? <AlertCircle className="size-4" /> : <MessageSquare className="size-4" />,
//     data: quiz,
//     dueDate: quiz.due_date_formatted,
//     isOverdue: quiz.is_overdue,
//     isDueSoon: quiz.is_due_soon
//   };
// };

// const transformIncentiveToNotification = (incentive) => {
//   const timeAgo = incentive.created_at
//     ? formatTimeAgo(incentive.created_at)
//     : "Recently";

//   const incentiveType = incentive.type || "Incentive";
//   const isEndingSoon =
//     incentive.days_remaining !== undefined && incentive.days_remaining < 1;

//   const startDate = formatDateDMY(incentive.start_date);
//   const endDate = formatDateDMY(incentive.end_date);

//   let title = "New Incentive";
//   let message = incentive.title;

//   if (isEndingSoon) {
//     title = `${incentiveType} Incentive Ending Soon`;
//     message = `${incentiveType} incentive will be ending soon on (${endDate})`;
//   } else if (incentive.is_currently_running) {
//     title = `New ${incentiveType} Incentive Added`;
//     // message = `New ${incentiveType} incentive "${incentive.title}" added - Target: $${parseFloat(
//     //   incentive.target_amount || 0
//     // ).toFixed(0)}`;
//      message = `${incentiveType} incentive has started from (${startDate} - ${endDate})`;
//   }

//   return {
//     id: `incentive-${incentive.incentive_id}`,
//     title,
//     message,
//     type: "incentive",
//     time: timeAgo,
//     read: false,
//     icon: isEndingSoon ? (
//       <Clock className="size-4" />
//     ) : (
//       <Trophy className="size-4" />
//     ),
//     data: incentive,
//     targetAmount: incentive.target_amount,
//     potentialBonus:
//       incentive.potential_bonus || incentive.effective_amount,
//     daysRemaining: incentive.days_remaining,
//   };
// };

// const Notifications = ({ isOpen, onClose }) => {
//   const notificationsState = useSelector((state) => state.notifications);
  
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [filter, setFilter] = useState('all');
//   const [notifications, setNotifications] = useState([]);

//   // Process notifications from Redux state
//   useEffect(() => {
//     if (!notificationsState) {
//       setNotifications([]);
//       return;
//     }

//     let quizzes = [];
//     let incentives = [];

//     // Extract quizzes from state
//     if (notificationsState.employeeData && notificationsState.employeeData.quizzes) {
//       quizzes = notificationsState.employeeData.quizzes;
//     } else if (Array.isArray(notificationsState.notifications)) {
//       quizzes = notificationsState.notifications;
//     }

//     // Extract incentives from state
//     if (notificationsState.employeeData && notificationsState.employeeData.incentives) {
//       incentives = notificationsState.employeeData.incentives;
//     }

//     // Transform to notifications
//     const quizNotifications = Array.isArray(quizzes) 
//       ? quizzes.map(transformQuizToNotification)
//       : [];
    
//     const incentiveNotifications = Array.isArray(incentives)
//       ? incentives.map(transformIncentiveToNotification)
//       : [];

//     // Combine and sort (newest first)
//     const allNotifications = [...quizNotifications, ...incentiveNotifications]
//       .sort((a, b) => new Date(b.data.assigned_at || b.data.created_at) - new Date(a.data.assigned_at || a.data.created_at));
    
//     setNotifications(allNotifications);
//   }, [notificationsState]);

//   // Filter notifications
//   const filteredNotifications = useMemo(() => {
//     if (filter === 'all') return notifications;
//     return notifications.filter(n => n.type === filter);
//   }, [notifications, filter]);

//   // Calculate counts
//   useEffect(() => {
//     const quizCount = notifications.filter(n => n.type === 'quiz').length;
//     const incentiveCount = notifications.filter(n => n.type === 'incentive').length;
//     const unread = notifications.filter(n => !n.read).length;
    
//     setUnreadCount(unread);
//   }, [notifications]);

//   const getFilterCount = (type) => {
//     if (type === 'all') return notifications.length;
//     return notifications.filter(n => n.type === type).length;
//   };

//   const getFilterButtonClass = (filterType) => {
//     const baseClass = "md:px-3 px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex-1";
//     if (filter === filterType) {
//       return `${baseClass} bg-white text-[#5b59be] shadow-sm`;
//     }
//     return `${baseClass} text-white/90 hover:bg-white/10`;
//   };


//   const timeAgo = (dateTime) => {
//   if (!dateTime) return "Just now";

//   // Convert "YYYY-MM-DD HH:mm:ss" → ISO format
//   const past = new Date(dateTime.replace(" ", "T"));
//   const now = new Date();

//   const diffInSeconds = Math.floor((now - past) / 1000);

//   if (diffInSeconds < 60) {
//     return `${diffInSeconds} sec ago`;
//   }

//   const diffInMinutes = Math.floor(diffInSeconds / 60);
//   if (diffInMinutes < 60) {
//     return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
//   }

//   const diffInHours = Math.floor(diffInMinutes / 60);
//   if (diffInHours < 24) {
//     return `${diffInHours} hr${diffInHours > 1 ? "s" : ""} ago`;
//   }

//   const diffInDays = Math.floor(diffInHours / 24);
//   if (diffInDays < 7) {
//     return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
//   }

//   const diffInWeeks = Math.floor(diffInDays / 7);
//   if (diffInWeeks < 4) {
//     return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
//   }

//   const diffInMonths = Math.floor(diffInDays / 30);
//   if (diffInMonths < 12) {
//     return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
//   }

//   const diffInYears = Math.floor(diffInDays / 365);
//   return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
// };



//   // Render notification item
//   const renderNotificationItem = (notification) => (
//     <div
//       key={notification.id}
//       className={`p-2.5 hover:bg-gray-100 bg-white border-b-2 border-gray-200 transition-colors cursor-pointer ${
//         !notification.read ? 'bg-blue-50' : ''
//       }`}
//     >
//       <div className="flex items-start space-x-3">
//         {/* Icon */}
//         <div className={`p-2 rounded-full ${
//           notification.type === 'quiz' 
//             ? 'bg-blue-100 text-blue-600 border-2 border-blue-400/50' 
//             : 'bg-yellow-100 text-yellow-600 border-2 border-yellow-600/50'
//         }`}>
//           {notification.icon}
//         </div>
        
//         {/* Content */}
//         <div className="flex-1 min-w-0">
//           {/* Title and Time */}
//           <div className="flex justify-between items-start mb-1">
//             <h4 className="font-semibold text-gray-900 text-sm">
//               {notification.title}
//             </h4>
            
//             <span className="text-[11px] px-2 text-gray-500 font-medium whitespace-nowrap ml-2 p-1 border-2 border-gray-400/70 rounded-full">
//   {timeAgo(notification.data?.created_at)}
// </span>
//           </div>
          
//           {/* Message */}
//           <p className="text-gray-600 text-sm">
//             {notification.message}
//           </p>
          
//           {/* Details */}
//           <div className="flex items-center space-x-3 text-xs text-gray-500 mt-2">
//             {notification.type === 'quiz' && notification.data?.quiz_details && (
//               <>
//               </>
//             )}
            
//             {notification.type === 'incentive' && (
//               <div className="flex items-center gap-3">
//                 {/* Time Remaining Button */}
//                 <div
//                   className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
//                     notification.daysRemaining < 1
//                       ? 'bg-red-100 text-red-600 border-2 border-red-400/50'
//                       : 'bg-green-100 text-green-600 border-2 border-green-500/60'
//                   }`}
//                 >
//                   <Clock className="size-3" />
              
//                   <span>
//                     {notification.daysRemaining < 1
//                       ? `${notification.data.time_remaining.hours}h ${notification.data.time_remaining.minutes} mins left`
//                       : `${Math.ceil(notification.daysRemaining)} days left`}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-600 border-2 border-green-400/50 text-xs font-medium">
//   <span>Target:</span>

//   <span className="font-semibold">
//     {notification.data.type === "Reviews" ? (
//       <>
//         {Number(notification.data.target_amount).toLocaleString()}.0
//       </>
//     ) : (
//       <>
//         ${Number(notification.data.target_amount).toLocaleString()}
//       </>
//     )}
//   </span>
// </div>

//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black/20 z-50"
//         onClick={onClose}
//       />
      
//       {/* Notifications Panel */}
//       <div className="fixed lg:right-40 lg:top-20 top-16 right-12 z-50 md:max-w-sm  w-[80%] animate-slide-down">
//         <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden flex flex-col h-[415px]">
//           {/* Header */}
//           <div className="bg-[#5b59be] p-4 flex-shrink-0">
//             <div className="flex justify-between items-center mb-3">
//               <div className="flex items-center space-x-2">
//                 <Bell className="size-5 text-white" />
//                 <h3 className="font-semibold text-lg text-white">Notifications</h3>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-1 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <X className="size-5 text-white" />
//               </button>
//             </div>
            
//             {/* Filter Buttons */}
//             <div className="flex items-center md:text-sm text-xs space-x-1 bg-white/10 rounded-lg p-1">
//               <button
//                 onClick={() => setFilter('all')}
//                 className={getFilterButtonClass('all')}
//               >
//                 All ({getFilterCount('all')})
//               </button>
//               <button
//                 onClick={() => setFilter('incentive')}
//                 className={getFilterButtonClass('incentive')}
//               >
//                 Incentive ({getFilterCount('incentive')})
//               </button>
//               <button
//                 onClick={() => setFilter('quiz')}
//                 className={getFilterButtonClass('quiz')}
//               >
//                 Quiz ({getFilterCount('quiz')})
//               </button>
//             </div>
//           </div>

//           {/* Notifications List - Fixed Height with Custom Scrollbar */}
//           <div className="flex-1 overflow-y-auto custom-scrollbar">
//             {notificationsState?.loading ? (
//               <div className="p-8 text-center">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5b59be] mx-auto mb-3"></div>
//                 <p className="text-gray-500">Loading...</p>
//               </div>
//             ) : notificationsState?.error ? (
//               <div className="p-8 text-center">
//                 <AlertCircle className="size-12 mx-auto mb-3 text-red-300" />
//                 <p className="text-red-600">Failed to load</p>
//               </div>
//             ) : filteredNotifications.length === 0 ? (
//               <div className="p-8 text-center">
//                 <Bell className="size-12 mx-auto mb-3 text-gray-300" />
//                 <p className="text-gray-500">
//                   {filter === 'all' ? 'No notifications' : `No ${filter} notifications`}
//                 </p>
//               </div>
//             ) : (
//               <div>
//                 {filteredNotifications.map(renderNotificationItem)}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Animation and Scrollbar styles */}
//       <style jsx>{`
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px) translateX(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) translateX(0);
//           }
//         }
        
//         .animate-slide-down {
//           animation: slideDown 0.2s ease-out;
//         }

//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 10px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #5b59be;
//           border-radius: 10px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #4a48a0;
//         }

//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: #5b59be #f1f1f1;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Notifications;




//////////////////////////////////////////////////////////////////////////



import React, { useState, useEffect, useMemo } from 'react';
import { X, CheckCircle, MessageSquare, AlertCircle, Bell, Trophy, Target, Clock, Calendar } from 'lucide-react';
import { useSelector } from 'react-redux';

// Format time ago from date string
const formatTimeAgo = (dateString) => {
  if (!dateString) return 'Recently';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays}d ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours}h ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes}m ago`;
    } else {
      return 'Just now';
    }
  } catch (error) {
    return 'Recently';
  }
};

const formatDateDMY = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Transform API quiz response to notification format
const transformQuizToNotification = (quiz) => {
  const isRead = quiz.seen_at !== null;
  const timeAgo = quiz.assigned_at ? formatTimeAgo(quiz.assigned_at) : 'Recently';
  
  // Create message based on quiz status
  let message = quiz.quiz_description || `Quiz '${quiz.quiz_title}' has been assigned to you.`;
  let title = "Quiz Due Soon";
  
  if (quiz.is_overdue) {
    title = "Quiz Overdue";
    message = `Quiz '${quiz.quiz_title}' is overdue. Please complete it.`;
  } else if (quiz.is_due_soon && quiz.due_date_formatted) {
    title = "Quiz Due Soon";
    message = `Quiz '${quiz.quiz_title}' is due soon (${quiz.due_date_formatted}).`;
  } else if (quiz.due_date_formatted) {
    title = "Quiz Assigned";
    message = `Quiz '${quiz.quiz_title}' is due on ${quiz.due_date_formatted}.`;
  } else {
    title = "Quiz Assigned";
    message = `Quiz '${quiz.quiz_title}' has been assigned to you.`;
  }

  return {
    id: `quiz-${quiz.assignment_id}`,
    title: title,
    message: message,
    type: "quiz",
    time: timeAgo,
    read: isRead,
    icon: quiz.is_overdue ? <AlertCircle className="size-4" /> : <MessageSquare className="size-4" />,
    data: quiz,
    dueDate: quiz.due_date_formatted,
    isOverdue: quiz.is_overdue,
    isDueSoon: quiz.is_due_soon
  };
};

const transformIncentiveToNotification = (incentive) => {
  const timeAgo = incentive.created_at
    ? formatTimeAgo(incentive.created_at)
    : "Recently";

  const incentiveType = incentive.type || "Incentive";
  const isEndingSoon =
    incentive.days_remaining !== undefined && incentive.days_remaining < 1;

  const startDate = formatDateDMY(incentive.start_date);
  const endDate = formatDateDMY(incentive.end_date);

  let title = "New Incentive";
  let message = incentive.title;

  if (isEndingSoon) {
    title = `${incentiveType} Incentive Ending Soon`;
    message = `${incentiveType} incentive will be ending soon on (${endDate})`;
  } else if (incentive.is_currently_running) {
    title = `New ${incentiveType} Incentive`;
    // message = `New ${incentiveType} incentive "${incentive.title}" added - Target: $${parseFloat(
    //   incentive.target_amount || 0
    // ).toFixed(0)}`;
     message = `${incentiveType} incentive has started from (${startDate} - ${endDate})`;
  }

  return {
    id: `incentive-${incentive.incentive_id}`,
    title,
    message,
    type: "incentive",
    time: timeAgo,
    read: false,
    icon: isEndingSoon ? (
      <Clock className="size-4" />
    ) : (
      <Trophy className="size-4" />
    ),
    data: incentive,
    targetAmount: incentive.target_amount,
    potentialBonus:
      incentive.potential_bonus || incentive.effective_amount,
    daysRemaining: incentive.days_remaining,
  };
};

const Notifications = ({ isOpen, onClose,onNotificationClick = null }) => {
  const notificationsState = useSelector((state) => state.notifications);
  
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([]);

  // Process notifications from Redux state
  useEffect(() => {
    if (!notificationsState) {
      setNotifications([]);
      return;
    }

    let quizzes = [];
    let incentives = [];

    // Extract quizzes from state
    if (notificationsState.employeeData && notificationsState.employeeData.quizzes) {
      quizzes = notificationsState.employeeData.quizzes;
    } else if (Array.isArray(notificationsState.notifications)) {
      quizzes = notificationsState.notifications;
    }

    // Extract incentives from state
    if (notificationsState.employeeData && notificationsState.employeeData.incentives) {
      incentives = notificationsState.employeeData.incentives;
    }

    // Transform to notifications
    const quizNotifications = Array.isArray(quizzes) 
      ? quizzes.map(transformQuizToNotification)
      : [];
    
    const incentiveNotifications = Array.isArray(incentives)
      ? incentives.map(transformIncentiveToNotification)
      : [];

    // Combine and sort (newest first)
    const allNotifications = [...quizNotifications, ...incentiveNotifications]
      .sort((a, b) => new Date(b.data.assigned_at || b.data.created_at) - new Date(a.data.assigned_at || a.data.created_at));
    
    setNotifications(allNotifications);
  }, [notificationsState]);

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    if (filter === 'all') return notifications;
    return notifications.filter(n => n.type === filter);
  }, [notifications, filter]);

  // Calculate counts
  useEffect(() => {
    const quizCount = notifications.filter(n => n.type === 'quiz').length;
    const incentiveCount = notifications.filter(n => n.type === 'incentive').length;
    const unread = notifications.filter(n => !n.read).length;
    
    setUnreadCount(unread);
  }, [notifications]);

  const getFilterCount = (type) => {
    if (type === 'all') return notifications.length;
    return notifications.filter(n => n.type === type).length;
  };

  const getFilterButtonClass = (filterType) => {
    const baseClass = "md:px-3 px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex-1";
    if (filter === filterType) {
      return `${baseClass} bg-white text-[#5b59be] shadow-sm`;
    }
    return `${baseClass} text-white/90 hover:bg-white/10`;
  };


  const timeAgo = (dateTime) => {
  if (!dateTime) return "Just now";

  // Convert "YYYY-MM-DD HH:mm:ss" → ISO format
  const past = new Date(dateTime.replace(" ", "T"));
  const now = new Date();

  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hr${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
};



  // Render notification item
  const renderNotificationItem = (notification) => (
    // <div
    //   key={notification.id}
    //   className={`p-2.5 hover:bg-gray-100 bg-white border-b-2 border-gray-200 transition-colors cursor-pointer ${
    //     !notification.read ? 'bg-blue-50' : ''
    //   }`}
    // >
     <div
    key={notification.id}
    onClick={() => {
      // First close the notifications panel
      onClose();
      
      // Then call the notification click handler if provided
      if (onNotificationClick) {
        onNotificationClick(notification);
      }
    }}
    className={`p-2.5 hover:bg-gray-100 bg-white border-b-2 border-gray-200 transition-colors cursor-pointer ${
      !notification.read ? 'bg-blue-50' : ''
    }`}
  >

      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className={`p-2 rounded-full ${
          notification.type === 'quiz' 
            ? 'bg-blue-100 text-blue-600 border-2 border-blue-400/50' 
            : 'bg-yellow-100 text-yellow-600 border-2 border-yellow-600/50'
        }`}>
          {notification.icon}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title and Time */}
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold text-gray-900 text-sm">
              {notification.title}
            </h4>
            
            <span className="text-[11px] px-2 text-gray-500 font-medium whitespace-nowrap ml-2  rounded-full">
  {timeAgo(notification.data?.created_at)}
</span>
          </div>
          
          {/* Message */}
          {/* <p className="text-gray-600 text-sm">
            {notification.message}
          </p> */}
          
          {/* Details */}
          <div className="flex items-center space-x-3 text-xs text-gray-500 mt-2">
            {notification.type === 'quiz' && notification.data?.quiz_details && (
              <>
              </>
            )}
            
            {notification.type === 'incentive' && (
              <div className="flex items-center gap-3">
                {/* Time Remaining Button */}

                                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-600 border-2 border-green-400 text-xs font-medium">
  <span>Target:</span>

  <span className="font-semibold">
    {notification.data.type === "Reviews" ? (
      <>
        {Number(notification.data.target_amount).toLocaleString()}.0
      </>
    ) : (
      <>
        ${Number(notification.data.target_amount).toLocaleString()}
      </>
    )}
  </span>
</div>


                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                    notification.daysRemaining < 1
                      ? 'bg-red-100 text-red-600 border-2 border-red-400/50'
                      : 'bg-green-100 text-green-600 border-2 border-green-500/60'
                  }`}
                >
                  <Clock className="size-3" />
              
                  {/* <span>
                    {notification.daysRemaining < 1
                      ? `${notification.data.time_remaining.hours}h ${notification.data.time_remaining.minutes} mins left`
                      : `${Math.ceil(notification.daysRemaining)} days left`}
                  </span> */}

                  
                          <span>
                    {notification.daysRemaining < 1
                      ? `${notification.data.time_remaining.hours}h ${notification.data.time_remaining.minutes} mins left`
                      : `${Math.ceil(notification.daysRemaining)} days left`}
                  </span>
                </div>

                


              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-50"
        onClick={onClose}
      />
      
      {/* Notifications Panel */}
      <div className="fixed lg:right-40 lg:top-20 top-16 right-12 z-50 md:max-w-sm  w-[80%] animate-slide-down">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden flex flex-col h-[415px]">
          {/* Header */}
          <div className="bg-[#5b59be] p-4 flex-shrink-0">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <Bell className="size-5 text-white" />
                <h3 className="font-semibold text-lg text-white">Notifications</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="size-5 text-white" />
              </button>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex items-center md:text-sm text-xs space-x-1 bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setFilter('all')}
                className={getFilterButtonClass('all')}
              >
                All ({getFilterCount('all')})
              </button>
              <button
                onClick={() => setFilter('incentive')}
                className={getFilterButtonClass('incentive')}
              >
                Incentive ({getFilterCount('incentive')})
              </button>
              <button
                onClick={() => setFilter('quiz')}
                className={getFilterButtonClass('quiz')}
              >
                Quiz ({getFilterCount('quiz')})
              </button>
            </div>
          </div>

          {/* Notifications List - Fixed Height with Custom Scrollbar */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {notificationsState?.loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5b59be] mx-auto mb-3"></div>
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : notificationsState?.error ? (
              <div className="p-8 text-center">
                <AlertCircle className="size-12 mx-auto mb-3 text-red-300" />
                <p className="text-red-600">Failed to load</p>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="size-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">
                  {filter === 'all' ? 'No notifications' : `No ${filter} notifications`}
                </p>
              </div>
            ) : (
              <div>
                {filteredNotifications.map(renderNotificationItem)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animation and Scrollbar styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px) translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }
        
        .animate-slide-down {
          animation: slideDown 0.2s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #5b59be;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4a48a0;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #5b59be #f1f1f1;
        }
      `}</style>
    </>
  );
};

export default Notifications;













