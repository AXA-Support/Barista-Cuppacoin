// import React, { useState, useEffect } from 'react';
// import { LogOut, Calendar, Menu, X, Bell } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../../store/slices/authSlice';
// import Notifications from './Notifications';

// const Navbar = ({ 
//   toggleSidebar, 
//   showNotifications, 
//   setShowNotifications,
//   onNotificationClick 
// }) => {
//   // Get employee from Redux - also watch the update version to detect changes
//   const employee = useSelector((state) => state.auth.employee);
//   const employeeUpdateVersion = useSelector((state) => state.auth.employeeUpdateVersion || 0);
//   const [imageRefreshKey, setImageRefreshKey] = useState(0);

  
//   // Get notification count from Redux
//   const notificationCount = useSelector((state) => 
//     state.notifications.summary.total_unattempted_assignments + state.notifications.summary.total_active_incentives || 0
//   );
//   const notificationsState = useSelector((state) => state.notifications);
  
//   const [notificationsViewed, setNotificationsViewed] = useState(false);
  
//   // Reset viewed state when notification count changes (new data fetched)
//   useEffect(() => {
//     if (notificationCount > 0) {
//       setNotificationsViewed(false);

//     }
//   }, [notificationCount, notificationsState]);
  
//   useEffect(() => {
//     if (employee && employee.id) {
//       // Force image refresh by updating the key whenever employee is updated
//       setImageRefreshKey(Date.now());
//     }
//   }, [employee?.id, employee?.image, employeeUpdateVersion]);

//   // Create profile image URL with cache-busting
//   const profileImage = employee && employee.image 
//     ? `${import.meta.env.VITE_API_BASE_URL}/public${employee.image}?t=${imageRefreshKey}` 
//     : '/profile.png';
  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const today = new Date();
//   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const dayName = days[today.getDay()];
//   const date = today.getDate();
//   const month = months[today.getMonth()];
//   const year = today.getFullYear();

//   const getDateSuffix = (d) => {
//     if (d > 3 && d < 21) return 'th';
//     switch (d % 10) {
//       case 1: return 'st';
//       case 2: return 'nd';
//       case 3: return 'rd';
//       default: return 'th';
//     }
//   };

//   const handleLogout = async () => {
//     // Dispatch logout action which clears cookies and Redux state
//     await dispatch(logoutUser());
//     navigate('/');
//   };

//   const popAnimation = `
//     @keyframes pop {
//       0%, 100% {
//         transform: scale(1);
//       }
//       50% {
//         transform: scale(1.2);
//       }
//     }
    
//     @keyframes gentlePulse {
//       0%, 100% {
//         transform: scale(1);
//         opacity: 1;
//       }
//       50% {
//         transform: scale(1.05);
//         opacity: 0.9;
//       }
//     }
    
//     @keyframes borderGlow {
//       0%, 100% {
//         box-shadow: 0 0 0 0 rgba(91, 90, 188, 0.4);
//       }
//       50% {
//         box-shadow: 0 0 0 3px rgba(91, 90, 188, 0.2);
//       }
//     }
    
//     @keyframes slideDown {
//       from {
//         opacity: 0;
//         transform: translateY(-10px);
//       }
//       to {
//         opacity: 1;
//         transform: translateY(0);
//       }
//     }
    
//     @keyframes bellRing {
//       0%, 100% {
//         transform: rotate(0deg);
//       }
//       10%, 30%, 50%, 70%, 90% {
//         transform: rotate(10deg);
//       }
//       20%, 40%, 60%, 80% {
//         transform: rotate(-10deg);
//       }
//     }
    
//     .animate-pop {
//       animation: pop 0.3s ease-in-out;
//     }
    
//     .animate-gentle-pulse {
//       animation: gentlePulse 2s ease-in-out infinite;
//     }
    
//     .animate-border-glow {
//       animation: borderGlow 2s ease-in-out infinite;
//     }
    
//     .animate-slide-down {
//       animation: slideDown 0.3s ease-out;
//     }
    
//     .animate-bell-ring {
//       animation: bellRing 0.5s ease-in-out;
//     }
    
//     .hover-scale {
//       transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
//     }
    
//     .hover-scale:hover {
//       transform: translateY(-2px);
//     }
    
//     .notification-badge {
//       position: absolute;
//       top: -5px;
//       right: -4px;
//       background: #db3131ff;
//       color: white;
//       border-radius: 9999px;
//       width: 24px;
//       height: 24px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 13px;
//       font-weight: bold;
//       border: 2px solid white;
//     }
//   `;

//   const handleBellClick = () => {
//     const willOpen = !showNotifications;
//     setShowNotifications(willOpen);
    
//     // Mark notifications as viewed when opening the dropdown
//     if (willOpen) {
//       setNotificationsViewed(true);
//     }
//   };
  

//   const displayCount = notificationsViewed ? 0 : notificationCount;

//   return (
//     <>
//       <style>{popAnimation}</style>
      
//       <nav className="bg-white border-b border-gray-300 shadow-sm 
//         px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-4 
//         flex justify-between items-center sticky top-0 z-40">

//         <div className="flex items-center flex-shrink-0">
//           <img
//             src="/images/logo/cuppacoin_logo.png"
//             alt="Cuppacoin Logo"
//             className="h-6 w-34 lg:w-46 xs:h-6 sm:h-8 md:h-8 lg:h-10 xl:h-11 2xl:h-9 hover-scale"
//             style={{ cursor: 'pointer' }}
//           />
//         </div>

//         <div className="flex items-center">
//           <div className="hidden sm:flex flex-row items-center space-x-4 md:space-x-6 lg:space-x-8">
//             {/* Profile and Date */}
//             <div className="flex items-center">
//               <div className="relative">
//                 <div className="animate-border-glow rounded-full">
//                   <img
//                     key={imageRefreshKey}
//                     src={profileImage}
//                     alt="User Profile"
//                     className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-[3px] border-[#5B5ABC] object-cover shadow-sm hover-scale"
//                     style={{ cursor: 'pointer' }}
//                     onError={(e) => {
//                       e.target.src = '/profile.png';
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center ml-3">
//                 <div className="flex items-center text-gray-700 font-medium text-sm whitespace-nowrap">
//                   <Calendar className="size-4 mr-2 text-[#5B5ABC]" />
//                   <span>
//                     {dayName}, {date}{getDateSuffix(date)} {month}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Notifications Bell */}
//             <div className="relative">
//               <button
//                 onClick={handleBellClick}
//                 className={`relative p-2 rounded-lg hover:bg-gray-100 transition-colors group ${
//                   showNotifications ? 'bg-gray-100' : ''
//                 }`}
//               >
//                 <Bell className={`size-6 text-[#5B5ABC] group-hover:animate-pop ${
//                   displayCount > 0 ? 'animate-bell-ring' : ''
//                 }`} />
//                 {displayCount > 0 && (
//                   <span className="notification-badge animate-pulse">
//                     {displayCount > 9 ? '9+' : displayCount}
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* Logout Button */}
//             <button 
//               onClick={handleLogout}
//               className='group flex items-center justify-center rounded-lg 
//                 shadow-lg transition-all duration-300 cursor-pointer
//                 bg-[#5b59bb] text-white border-0 px-4 py-2
//                 hover:bg-[#5b59bb] hover:text-white hover-scale '
//             >
//               <div className="group-hover:animate-pop">
//                 <LogOut className="size-4 mr-2" />
//               </div>
//               <span className="text-sm font-medium">Logout</span>
//             </button>
//           </div>

//           {/* Mobile View */}
//           <div className="flex sm:hidden items-center space-x-3">
//             {/* Mobile Notifications Bell */}
//             <div className="relative">
//               <button
//                 onClick={handleBellClick}
//                 className={`relative p-2 rounded-lg hover:bg-gray-100 transition-colors ${
//                   showNotifications ? 'bg-gray-100' : ''
//                 }`}
//               >
//                 <Bell className={`size-6 text-[#5B5ABC] ${
//                   displayCount > 0 ? 'animate-bell-ring' : ''
//                 }`} />
//                 {displayCount > 0 && (
//                   <span className="notification-badge animate-pulse">
//                     {displayCount > 9 ? '9+' : displayCount}
//                   </span>
//                 )}
//               </button>
//             </div>

//             <button
//               onClick={() => {
//                 toggleSidebar();
//                 setIsMobileMenuOpen(!isMobileMenuOpen);
//               }}
//               className="p-2 rounded-lg border border-[#5B5ABC]/20 hover:bg-gray-50 transition-colors"
//             >
//               {isMobileMenuOpen ? (
//                 // <X className="size-5 text-[#5B5ABC]" />
//                 <Menu className="size-5 text-[#5B5ABC]" />
//               ) : (
//                 <Menu className="size-5 text-[#5B5ABC]" />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Notifications Component - Pass onNotificationClick prop */}
//       <Notifications 
//         isOpen={showNotifications} 
//         onClose={() => setShowNotifications(false)}
//         onNotificationClick={onNotificationClick}
        
//       />
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { LogOut, Calendar, Menu, X, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import Notifications from './Notifications';

const Navbar = ({ 
  toggleSidebar, 
  showNotifications, 
  setShowNotifications,
  onNotificationClick 
}) => {
  // Get employee from Redux - also watch the update version to detect changes
  const employee = useSelector((state) => state.auth.employee);
  const employeeUpdateVersion = useSelector((state) => state.auth.employeeUpdateVersion || 0);
  const [imageRefreshKey, setImageRefreshKey] = useState(0);

  
  // Get notification count from Redux
  const notificationCount = useSelector((state) => 
    state.notifications.summary.total_unattempted_assignments + state.notifications.summary.total_active_incentives || 0
  );
  const notificationsState = useSelector((state) => state.notifications);
  
  const [notificationsViewed, setNotificationsViewed] = useState(false);
  
  // Reset viewed state when notification count changes (new data fetched)
  useEffect(() => {
    if (notificationCount > 0) {
      setNotificationsViewed(false);
    }
  }, [notificationCount, notificationsState]);
  
  useEffect(() => {
    if (employee && employee.id) {
      // Force image refresh by updating the key whenever employee is updated
      setImageRefreshKey(Date.now());
    }
  }, [employee?.id, employee?.image, employeeUpdateVersion]);

  // Create profile image URL with cache-busting
  const profileImage = employee && employee.image 
    ? `${import.meta.env.VITE_API_BASE_URL}/public${employee.image}?t=${imageRefreshKey}` 
    : '/profile.png';
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const today = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayName = days[today.getDay()];
  const date = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  const getDateSuffix = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const handleLogout = async () => {
    // Dispatch logout action which clears cookies and Redux state
    await dispatch(logoutUser());
    navigate('/');
  };

  const popAnimation = `
    @keyframes pop {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
    }
    
    @keyframes gentlePulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.9;
      }
    }
    
    @keyframes borderGlow {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(91, 90, 188, 0.4);
      }
      50% {
        box-shadow: 0 0 0 3px rgba(91, 90, 188, 0.2);
      }
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes bellRing {
      0%, 100% {
        transform: rotate(0deg);
      }
      10%, 30%, 50%, 70%, 90% {
        transform: rotate(10deg);
      }
      20%, 40%, 60%, 80% {
        transform: rotate(-10deg);
      }
    }
    
    .animate-pop {
      animation: pop 0.3s ease-in-out;
    }
    
    .animate-gentle-pulse {
      animation: gentlePulse 2s ease-in-out infinite;
    }
    
    .animate-border-glow {
      animation: borderGlow 2s ease-in-out infinite;
    }
    
    .animate-slide-down {
      animation: slideDown 0.3s ease-out;
    }
    
    .animate-bell-ring {
      animation: bellRing 0.5s ease-in-out;
    }
    
    .hover-scale {
      transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
    }
    
    .hover-scale:hover {
      transform: translateY(-2px);
    }
    
    .notification-badge {
      position: absolute;
      top: -5px;
      right: -4px;
      background: #db3131ff;
      color: white;
      border-radius: 9999px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: bold;
      border: 2px solid white;
    }
  `;

  const handleBellClick = () => {
    const willOpen = !showNotifications;
    setShowNotifications(willOpen);
    
    // Mark notifications as viewed when opening the dropdown
    if (willOpen) {
      setNotificationsViewed(true);
    }
  };
  

  const displayCount = notificationsViewed ? 0 : notificationCount;

  return (
    <>
      <style>{popAnimation}</style>
      
      <nav className="bg-white border-b border-gray-300 shadow-sm 
        px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-4 
        flex justify-between items-center sticky top-0 z-40">

        <div className="flex items-center flex-shrink-0">
          <img
            src="/images/logo/cuppacoin_logo.png"
            alt="Cuppacoin Logo"
            className="h-6 w-34 lg:w-46 xs:h-6 sm:h-8 md:h-8 lg:h-10 xl:h-11 2xl:h-9 hover-scale"
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className="flex items-center">
          {/* Desktop View - Hidden on mobile/tablet, visible on lg and up */}
          <div className="hidden lg:flex flex-row items-center space-x-4 md:space-x-6 lg:space-x-8">
            {/* Profile and Date */}
            <div className="flex items-center">
              <div className="relative">
                <div className="animate-border-glow rounded-full">
                  <img
                    key={imageRefreshKey}
                    src={profileImage}
                    alt="User Profile"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-[3px] border-[#5B5ABC] object-cover shadow-sm hover-scale"
                    style={{ cursor: 'pointer' }}
                    onError={(e) => {
                      e.target.src = '/profile.png';
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center ml-3">
                <div className="flex items-center text-gray-700 font-medium text-sm whitespace-nowrap">
                  <Calendar className="size-4 mr-2 text-[#5B5ABC]" />
                  <span>
                    {dayName}, {date}{getDateSuffix(date)} {month}
                  </span>
                </div>
              </div>
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={handleBellClick}
                className={`relative p-2 rounded-lg hover:bg-gray-100 transition-colors group ${
                  showNotifications ? 'bg-gray-100' : ''
                }`}
              >
                <Bell className={`size-6 text-[#5B5ABC] group-hover:animate-pop ${
                  displayCount > 0 ? 'animate-bell-ring' : ''
                }`} />
                {displayCount > 0 && (
                  <span className="notification-badge animate-pulse">
                    {displayCount > 9 ? '9+' : displayCount}
                  </span>
                )}
              </button>
            </div>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className='group flex items-center justify-center rounded-lg 
                shadow-lg transition-all duration-300 cursor-pointer
                bg-[#5b59bb] text-white border-0 px-4 py-2
                hover:bg-[#5b59bb] hover:text-white hover-scale '
            >
              <div className="group-hover:animate-pop">
                <LogOut className="size-4 mr-2" />
              </div>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>

          {/* Mobile/Tablet View - Visible on screens below lg breakpoint */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Mobile Notifications Bell */}
            <div className="relative">
              <button
                onClick={handleBellClick}
                className={`relative p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                  showNotifications ? 'bg-gray-100' : ''
                }`}
              >
                <Bell className={`size-6 text-[#5B5ABC] ${
                  displayCount > 0 ? 'animate-bell-ring' : ''
                }`} />
                {displayCount > 0 && (
                  <span className="notification-badge animate-pulse">
                    {displayCount > 9 ? '9+' : displayCount}
                  </span>
                )}
              </button>
            </div>

            {/* Burger button - Visible on all screens below lg (including medium screens) */}
            <button
              onClick={() => {
                toggleSidebar();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="p-2 rounded-lg border border-[#5B5ABC]/20 hover:bg-gray-50 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="size-5 text-[#5B5ABC]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Notifications Component - Pass onNotificationClick prop */}
      <Notifications 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)}
        onNotificationClick={onNotificationClick}
      />
    </>
  );
};

export default Navbar;

