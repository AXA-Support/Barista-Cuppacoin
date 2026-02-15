// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import Navbar from '../ReusableComponents/Navbar/navbar';
// import Sidebar from '../ReusableComponents/Sidebar/sidebar';
// import QuizPage from '../Pages/QuizPage/quiz'; 
// import { Menu, X } from 'lucide-react';
// import IncentiveInsights from '../Pages/IncentivePage/incentiveInsights';
// import OverviewPage from '../Pages/OverviewPage/overview';
// import TrainingModule from '../Pages/TrainingModule/trainingModule';
// import LibraryPage from '../Pages/UploadModule/Upload';
// import { fetchUnattemptedNotifications } from '../store/slices/notificationsSlice';

// export default function Home() {
//   const dispatch = useDispatch();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');


//   useEffect(() => {
//   // Initial fetch
//   dispatch(fetchUnattemptedNotifications());
  
//   // Set up interval
//   const intervalId = setInterval(() => {
//     dispatch(fetchUnattemptedNotifications());
//   }, 25000); // 25 seconds
  
//   // Clean up interval on unmount
//   return () => clearInterval(intervalId);
// }, [dispatch]);
  
//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const handleTabChange = (tab) => setActiveTab(tab);

//   const renderContent = () => {
//     switch(activeTab) {
//       case 'overview': 
//         return <OverviewPage />;
//       case 'quiz':
//         return <QuizPage />;
//       case 'insights':
//         return <IncentiveInsights />;
//       case 'training':
//         return <LibraryPage />;
//       case 'profile':
//         return (
//           <div>
//           </div>
//         );
//       default:
//         return <OverviewPage />; 
//     }
//   };

//   return (
//     <div className="">
//       {/* Pass toggleSidebar function to Navbar */}
//       <Navbar toggleSidebar={toggleSidebar} />
      
//       <div className="flex pt-0"> 
//         <Sidebar 
//           activeTab={activeTab}
//           onTabChange={handleTabChange}
//           isOpen={sidebarOpen}
//           toggleSidebar={toggleSidebar}
//         />

//         {/* Main Content */}
//         <main className="w-full p-6 lg:p-8 lg:ml-0 "> 
//           <div className="">
//             {renderContent()}
//           </div>
//         </main>
//       </div>

//       {/* Reduced z-index from 30 to 20 */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </div>
//   );
// }


/////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../ReusableComponents/Navbar/navbar';
import Sidebar from '../ReusableComponents/Sidebar/sidebar';
import QuizPage from '../Pages/QuizPage/quiz'; 
import { Menu, X } from 'lucide-react';
import IncentiveInsights from '../Pages/IncentivePage/incentiveInsights';
import OverviewPage from '../Pages/OverviewPage/overview';
import TrainingModule from '../Pages/TrainingModule/trainingModule';
import LibraryPage from '../Pages/UploadModule/Upload';
import { fetchUnattemptedNotifications } from '../store/slices/notificationsSlice';

export default function Home() {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Initial fetch
    dispatch(fetchUnattemptedNotifications());
    
    // Set up interval
    const intervalId = setInterval(() => {
      dispatch(fetchUnattemptedNotifications());
    }, 25000); // 25 seconds
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleTabChange = (tab) => setActiveTab(tab);
  
  // Function to handle notification click
  const handleNotificationClick = (notification) => {
    // Close notifications panel
    setShowNotifications(false);
    
    // Switch to the appropriate tab based on notification type
    if (notification.type === 'quiz') {
      setActiveTab('quiz');
    } else if (notification.type === 'incentive') {
      setActiveTab('insights');
    }
    // You can add more conditions for other notification types if needed
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'overview': 
        return <OverviewPage />;
      case 'quiz':
        return <QuizPage />;
      case 'insights':
        return <IncentiveInsights />;
      case 'training':
        return <LibraryPage />;
      case 'profile':
        return (
          <div>
            {/* Profile content */}
          </div>
        );
      default:
        return <OverviewPage />; 
    }
  };

  return (
    <div className="">
      {/* Pass tab change handler and notifications control to Navbar */}
      <Navbar 
        toggleSidebar={toggleSidebar}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        onNotificationClick={handleNotificationClick}
      />
      
      <div className="flex pt-0"> 
        <Sidebar 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <main className="w-full p-6 lg:p-8 lg:ml-0"> 
          <div className="">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Reduced z-index from 30 to 20 */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}