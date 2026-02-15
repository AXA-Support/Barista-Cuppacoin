// import React, { useState, useEffect } from 'react';
// import { LayoutDashboard, Edit, BookOpen, ClipboardCheck, BarChart3, Eye, LogOut } from 'lucide-react';
// import { toast } from 'sonner';
// import ProfileUpdate from '../../BaristaProfileUpdate/ProfileUpdate';
// import ProfileOverview from '../../BaristaProfileUpdate/profileOverview';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { checkAuthStatus, logoutUser, setEmployeeProfile } from '../../store/slices/authSlice';
// import { employeeApi } from '../../store/api/employeeApi';

// const Sidebar = ({ activeTab, onTabChange, isOpen, toggleSidebar }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Get auth state from Redux
//   const { isAuthenticated, employeeId, employee: authEmployee } = useSelector((state) => state.auth);

//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showOverviewModal, setShowOverviewModal] = useState(false);
//   const [currentProfile, setCurrentProfile] = useState({
//     name: "",
//     email: "",
//     image: "",
//     phone: "",
//     cafeShop: "",
//     wages: "",
//     workingHours: "",
//     anniversaryBonus: "",
//     rawData: null
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [imageRefreshKey, setImageRefreshKey] = useState(0);

//   // Helper function to map employee data to profile format
//   const mapEmployeeToProfile = (employeeData) => {
//     const mappedProfile = {
//       id: employeeData.id,
//       name: `${employeeData.first_name || ''} ${employeeData.last_name || ''}`.trim(),
//       email: employeeData.email || '',
//       image: employeeData.image || '/profile.png',
//       phone: employeeData.phone || '',
//       cafeShop: employeeData.store?.name || '',
//       wages: employeeData.wage_per_hour ? `$${parseFloat(employeeData.wage_per_hour).toFixed(2)}/hour` : '$0.00/hour',
//       workingHours: employeeData.hoursPerWeek ? `${employeeData.hoursPerWeek} hrs/week` : '0 hrs/week',
//       anniversaryBonus: employeeData.store?.oneYearReward || '',
//       rawData: employeeData
//     };

//     setCurrentProfile(mappedProfile);

//     // Save to localStorage for offline viewing
//     localStorage.setItem('userProfile', JSON.stringify(mappedProfile));
//   };

//   // Refetch image when authEmployee changes in Redux (e.g., after profile update)
//   useEffect(() => {
//     if (authEmployee && authEmployee.id) {
//       // Update profile from Redux store
//       mapEmployeeToProfile(authEmployee);
//       // Force image refresh by updating the key
//       setImageRefreshKey(prev => prev + 1);
//     }
//   }, [authEmployee?.id, authEmployee?.image]);

//   // Load profile from API on component mount
//   useEffect(() => {
//     const loadEmployeeProfile = async () => {
//       try {
//         setIsLoading(true);

//         // First check if we're authenticated
//         if (!isAuthenticated) {
//           await dispatch(checkAuthStatus()).unwrap();
//         }

//         // Try to get employee data from Redux store first
//         if (authEmployee) {
//           mapEmployeeToProfile(authEmployee);
//           return;
//         }

//         // If not in Redux, try to fetch from API using employeeId
//         if (employeeId) {
//           const employeeData = await employeeApi.getEmployeeById(employeeId);
//           mapEmployeeToProfile(employeeData);
//           // Also update Redux store
//           dispatch(setEmployeeProfile(employeeData));
//         } else {
//           // Fallback to localStorage
//           const savedProfile = localStorage.getItem('userProfile');
//           if (savedProfile) {
//             setCurrentProfile(JSON.parse(savedProfile));
//           }
//         }

//       } catch (error) {
//         console.error('Failed to load employee profile:', error);
//         // toast.error('Failed to load profile data', {
//         //   position: 'bottom-right',
//         //   duration: 3000,
//         // });

//         // Fallback to localStorage
//         const savedProfile = localStorage.getItem('userProfile');
//         if (savedProfile) {
//           setCurrentProfile(JSON.parse(savedProfile));
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadEmployeeProfile();
//   }, [isAuthenticated, employeeId, authEmployee, dispatch]);

//   const handleEditProfile = () => {
//     setShowProfileModal(true);
//   };

//   const handleViewProfile = () => {
//     setShowOverviewModal(true);
//   };

//   const handleCloseEditModal = () => {
//     setShowProfileModal(false);
//     if (window.innerWidth < 1024 && isOpen) {
//       toggleSidebar();
//     }
//   };

//   const handleCloseOverviewModal = () => {
//     setShowOverviewModal(false);
//     if (window.innerWidth < 1024 && isOpen) {
//       toggleSidebar();
//     }
//   };

//   const handleProfileUpdate = async (updatedProfile) => {
//     try {
//       // Prepare data for API update
//       const apiData = {
//         name: updatedProfile.name,
//         email: updatedProfile.email,
//         phone: updatedProfile.phone || null,
//         image: updatedProfile.image,
//         // Only include password if it was changed
//         ...(updatedProfile.password && updatedProfile.password !== '*********'
//           ? { password: updatedProfile.password }
//           : {}
//         ),
//       };

//       // Call API to update (this will also fetch the updated employee data)
//       const updatedEmployee = await employeeApi.updateCurrentEmployeeProfile(apiData);

//       // Update local state with new data from the fetched employee
//       const newProfile = {
//         ...currentProfile,
//         name: `${updatedEmployee.first_name} ${updatedEmployee.last_name}`.trim(),
//         email: updatedEmployee.email,
//         image: updatedEmployee.image || currentProfile.image,
//         phone: updatedEmployee.phone || '',
//         cafeShop: updatedEmployee.store?.name || currentProfile.cafeShop,
//         wages: updatedEmployee.wage_per_hour ? `$${parseFloat(updatedEmployee.wage_per_hour).toFixed(2)}/hour` : currentProfile.wages,
//         workingHours: updatedEmployee.hoursPerWeek ? `${updatedEmployee.hoursPerWeek} hrs/week` : currentProfile.workingHours,
//         rawData: updatedEmployee
//       };

//       setCurrentProfile(newProfile);

//       // Update Redux store
//       dispatch(setEmployeeProfile(updatedEmployee));

//       // Update localStorage
//       localStorage.setItem('userProfile', JSON.stringify(newProfile));

//       // Force image refresh
//       setImageRefreshKey(prev => prev + 1);

//       toast.success('Profile updated successfully!', {
//         position: 'bottom-right',
//         duration: 3000,
//         className: 'bg-white text-green-600 border border-green-500',
//         style: {
//           background: '#ffffff',
//           color: '#059669',
//           border: '1px solid #10b981',
//           borderRadius: '8px',
//           padding: '12px 16px',
//           fontWeight: '500',
//           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//         },
//       });

//     } catch (error) {
//       console.error('Failed to update profile:', error);
//       toast.error(error.response?.data?.message || 'Failed to update profile', {
//         position: 'bottom-right',
//         duration: 3000,
//       });
//       throw error; // Re-throw to let ProfileUpdate handle it
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutUser()).unwrap();
//       localStorage.removeItem('userProfile');
//       navigate('/');
//       toast.success('Logged out successfully');
//     } catch (error) {
//       console.error('Logout failed:', error);
//       toast.error('Logout failed. Please try again.');
//     }
//   };

//   const menuItems = [
//     { id: 'overview', label: 'Overview', icon: LayoutDashboard },
//     { id: 'insights', label: 'Incentive', icon: BarChart3 },
//     { id: 'quiz', label: 'Quiz', icon: ClipboardCheck },
//     { id: 'training', label: 'Training ', icon: BookOpen },
//     { id: 'logout', label: 'Logout', icon: LogOut, action: handleLogout },
//   ];

//   if (isLoading) {
//     return (
//       <div className="fixed lg:static inset-y-0 left-0 z-30 lg:z-0 top-16 
//         w-[60%] lg:w-96 bg-white border-r border-gray-300 shadow-md  
//         transform transition-transform duration-300 ease-in-out
//         min-h-screen lg:pt-0 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B5ABC]"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Profile Update Modal (Edit) */}
//       {showProfileModal && (
//         <ProfileUpdate
//           onClose={handleCloseEditModal}
//           currentProfile={currentProfile}
//           onProfileUpdate={handleProfileUpdate}
//         />
//       )}

//       {/* Profile Overview Modal (View) */}
//       {showOverviewModal && (
//         <ProfileOverview
//           onClose={handleCloseOverviewModal}
//           profileData={currentProfile}
//         />
//       )}

//       <div className={`
//         fixed lg:static inset-y-0 left-0 z-30 lg:z-0 top-16 
//         w-[60%] lg:w-96 bg-white border-r border-gray-300 shadow-md  
//         transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         min-h-screen lg:pt-0
//       `}>
//         <div className="w-full bg-gradient-to-r from-[#EEEAF8] to-[#E3DDF3] p-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="relative">
//                 <img
//                   key={imageRefreshKey}
//                   src={currentProfile.image ? `${import.meta.env.VITE_API_BASE_URL}/public/${currentProfile.image}?t=${imageRefreshKey}` : '/profile.png'}
//                   className="lg:size-16 size-12 rounded-full p-0.5 border-2 border-[#5B5ABC] object-cover shadow-md"
//                   alt="Profile"
//                   onError={(e) => {
//                     e.target.src = '/profile.png';
//                   }}
//                 />
//               </div>
//               <div>
//                 <p className="text-[#5B5ABC] text-sm font-medium lg:text-base">
//                   {currentProfile.name || 'Loading...'}
//                 </p>
//                 <p className="text-xs font-medium text-gray-500">Barista</p>
//               </div>
//             </div>

//             {/* Eye Icon Button (View Profile) */}
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={handleViewProfile}
//                 className="p-1 bg-white text-[#5B5ABC] hover:text-[#5B5ABC] border-2 border-[#5B5ABC]/70 hover:bg-white rounded-full transition-colors duration-200"
//                 title="View Profile Overview"
//                 disabled={isLoading}
//               >
//                 <Eye size={22} />
//               </button>

//               {/* Edit Icon Button */}
//               <button
//                 onClick={handleEditProfile}
//                 className="p-1 bg-white text-[#5B5ABC] hover:text-[#5B5ABC] border-2 border-[#5B5ABC]/70 hover:bg-white rounded-full transition-colors duration-200"
//                 title="Edit Profile"
//                 disabled={isLoading}
//               >
//                 <Edit size={22} />
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="p-2">
//           <nav className="space-y-2.5 lg:mt-4 mt-3">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isLogout = item.id === 'logout';

//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     if (isLogout && item.action) {
//                       item.action();
//                       return;
//                     }

//                     if (!isLogout) {
//                       onTabChange(item.id);
//                     }

//                     if (window.innerWidth < 1024 && !isLogout) {
//                       setTimeout(() => {
//                         toggleSidebar();
//                       }, 150);
//                     }
//                   }}
//                   className={`w-full flex items-center space-x-3 px-3 py-2 rounded-r-full text-left transition-all duration-200
//             ${activeTab === item.id
//                       ? 'bg-[#EEEAF8] text-indigo-700 font-medium'
//                       : 'text-gray-400 font-normal hover:bg-[#5B5ABC] hover:text-white'
//                     }
//             ${isLogout ? 'lg:hidden' : ''}
//           `}
//                   disabled={isLoading}
//                 >
//                   <Icon size={18} />
//                   <span className="text-base lg:text-lg">{item.label}</span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;


///////////////////////////////


import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Edit, BookOpen, ClipboardCheck, BarChart3, Eye, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import ProfileUpdate from '../../BaristaProfileUpdate/ProfileUpdate';
import ProfileOverview from '../../BaristaProfileUpdate/profileOverview';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus, logoutUser, setEmployeeProfile } from '../../store/slices/authSlice';
import { employeeApi } from '../../store/api/employeeApi';

const Sidebar = ({ activeTab, onTabChange, isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { isAuthenticated, employeeId, employee: authEmployee } = useSelector((state) => state.auth);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({
    name: "",
    email: "",
    image: "",
    phone: "",
    cafeShop: "",
    wages: "",
    workingHours: "",
    anniversaryBonus: "",
    rawData: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [imageRefreshKey, setImageRefreshKey] = useState(0);

  // Helper function to map employee data to profile format
  const mapEmployeeToProfile = (employeeData) => {
    const mappedProfile = {
      id: employeeData.id,
      name: `${employeeData.first_name || ''} ${employeeData.last_name || ''}`.trim(),
      email: employeeData.email || '',
      image: employeeData.image || '/profile.png',
      phone: employeeData.phone || '',
      cafeShop: employeeData.store?.name || '',
      wages: employeeData.wage_per_hour ? `$${parseFloat(employeeData.wage_per_hour).toFixed(2)}/hour` : '$0.00/hour',
      workingHours: employeeData.hoursPerWeek ? `${employeeData.hoursPerWeek} hrs/week` : '0 hrs/week',
      anniversaryBonus: employeeData.store?.oneYearReward || '',
      rawData: employeeData
    };

    setCurrentProfile(mappedProfile);

    // Save to localStorage for offline viewing
    localStorage.setItem('userProfile', JSON.stringify(mappedProfile));
  };

  // Refetch image when authEmployee changes in Redux (e.g., after profile update)
  useEffect(() => {
    if (authEmployee && authEmployee.id) {
      // Update profile from Redux store
      mapEmployeeToProfile(authEmployee);
      // Force image refresh by updating the key
      setImageRefreshKey(prev => prev + 1);
    }
  }, [authEmployee?.id, authEmployee?.image]);

  // Load profile from API on component mount
  useEffect(() => {
    const loadEmployeeProfile = async () => {
      try {
        setIsLoading(true);

        // First check if we're authenticated
        if (!isAuthenticated) {
          await dispatch(checkAuthStatus()).unwrap();
        }

        // Try to get employee data from Redux store first
        if (authEmployee) {
          mapEmployeeToProfile(authEmployee);
          return;
        }

        // If not in Redux, try to fetch from API using employeeId
        if (employeeId) {
          const employeeData = await employeeApi.getEmployeeById(employeeId);
          mapEmployeeToProfile(employeeData);
          // Also update Redux store
          dispatch(setEmployeeProfile(employeeData));
        } else {
          // Fallback to localStorage
          const savedProfile = localStorage.getItem('userProfile');
          if (savedProfile) {
            setCurrentProfile(JSON.parse(savedProfile));
          }
        }

      } catch (error) {
        console.error('Failed to load employee profile:', error);
        // toast.error('Failed to load profile data', {
        //   position: 'bottom-right',
        //   duration: 3000,
        // });

        // Fallback to localStorage
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
          setCurrentProfile(JSON.parse(savedProfile));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadEmployeeProfile();
  }, [isAuthenticated, employeeId, authEmployee, dispatch]);

  const handleEditProfile = () => {
    setShowProfileModal(true);
  };

  const handleViewProfile = () => {
    setShowOverviewModal(true);
  };

  const handleCloseEditModal = () => {
    setShowProfileModal(false);
    if (window.innerWidth < 1024 && isOpen) {
      toggleSidebar();
    }
  };

  const handleCloseOverviewModal = () => {
    setShowOverviewModal(false);
    if (window.innerWidth < 1024 && isOpen) {
      toggleSidebar();
    }
  };

  const handleProfileUpdate = async (updatedProfile) => {
    try {
      // Prepare data for API update
      const apiData = {
        name: updatedProfile.name,
        email: updatedProfile.email,
        phone: updatedProfile.phone || null,
        image: updatedProfile.image,
        // Only include password if it was changed
        ...(updatedProfile.password && updatedProfile.password !== '*********'
          ? { password: updatedProfile.password }
          : {}
        ),
      };

      // Call API to update (this will also fetch the updated employee data)
      const updatedEmployee = await employeeApi.updateCurrentEmployeeProfile(apiData);

      // Update local state with new data from the fetched employee
      const newProfile = {
        ...currentProfile,
        name: `${updatedEmployee.first_name} ${updatedEmployee.last_name}`.trim(),
        email: updatedEmployee.email,
        image: updatedEmployee.image || currentProfile.image,
        phone: updatedEmployee.phone || '',
        cafeShop: updatedEmployee.store?.name || currentProfile.cafeShop,
        wages: updatedEmployee.wage_per_hour ? `$${parseFloat(updatedEmployee.wage_per_hour).toFixed(2)}/hour` : currentProfile.wages,
        workingHours: updatedEmployee.hoursPerWeek ? `${updatedEmployee.hoursPerWeek} hrs/week` : currentProfile.workingHours,
        rawData: updatedEmployee
      };

      setCurrentProfile(newProfile);

      // Update Redux store
      dispatch(setEmployeeProfile(updatedEmployee));

      // Update localStorage
      localStorage.setItem('userProfile', JSON.stringify(newProfile));

      // Force image refresh
      setImageRefreshKey(prev => prev + 1);

      toast.success('Profile updated successfully!', {
        position: 'bottom-right',
        duration: 3000,
        className: 'bg-white text-green-600 border border-green-500',
        style: {
          background: '#ffffff',
          color: '#059669',
          border: '1px solid #10b981',
          borderRadius: '8px',
          padding: '12px 16px',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      });

    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile', {
        position: 'bottom-right',
        duration: 3000,
      });
      throw error; // Re-throw to let ProfileUpdate handle it
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      localStorage.removeItem('userProfile');
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'insights', label: 'Incentive', icon: BarChart3 },
    { id: 'quiz', label: 'Quiz', icon: ClipboardCheck },
    { id: 'training', label: 'Training ', icon: BookOpen },
    { id: 'logout', label: 'Logout', icon: LogOut, action: handleLogout },
  ];

  if (isLoading) {
    return (
      <div className="fixed lg:static inset-y-0 left-0 z-30 lg:z-0 top-16 
        w-[60%] lg:w-96 bg-white border-r border-gray-300 shadow-md  
        transform transition-transform duration-300 ease-in-out
        min-h-screen lg:pt-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B5ABC]"></div>
      </div>
    );
  }

  return (
    <>
      {/* Profile Update Modal (Edit) */}
      {showProfileModal && (
        <ProfileUpdate
          onClose={handleCloseEditModal}
          currentProfile={currentProfile}
          onProfileUpdate={handleProfileUpdate}
        />
      )}

      {/* Profile Overview Modal (View) */}
      {showOverviewModal && (
        <ProfileOverview
          onClose={handleCloseOverviewModal}
          profileData={currentProfile}
        />
      )}

      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 lg:z-0 top-16 
        w-[60%] lg:w-96 bg-white border-r border-gray-300 shadow-md  
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        min-h-screen lg:pt-0
      `}>
        <div className="w-full bg-gradient-to-r from-[#EEEAF8] to-[#E3DDF3] p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  key={imageRefreshKey}
                  src={currentProfile.image ? `${import.meta.env.VITE_API_BASE_URL}/public/${currentProfile.image}?t=${imageRefreshKey}` : '/profile.png'}
                  className="lg:size-16 size-12 rounded-full p-0.5 border-2 border-[#5B5ABC] object-cover shadow-md"
                  alt="Profile"
                  onError={(e) => {
                    e.target.src = '/profile.png';
                  }}
                />
              </div>
              <div>
                <p className="text-[#5B5ABC] text-sm font-medium lg:text-base">
                  {currentProfile.name || 'Loading...'}
                </p>
                <p className="text-xs font-medium text-gray-500">Barista</p>
              </div>
            </div>

            {/* Eye Icon Button (View Profile) */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleViewProfile}
                className="p-1 bg-white text-[#5B5ABC] hover:text-[#5B5ABC] border-2 border-[#5B5ABC]/70 hover:bg-white rounded-full transition-colors duration-200"
                title="View Profile Overview"
                disabled={isLoading}
              >
                <Eye size={22} />
              </button>

              {/* Edit Icon Button */}
              <button
                onClick={handleEditProfile}
                className="p-1 bg-white text-[#5B5ABC] hover:text-[#5B5ABC] border-2 border-[#5B5ABC]/70 hover:bg-white rounded-full transition-colors duration-200"
                title="Edit Profile"
                disabled={isLoading}
              >
                <Edit size={22} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-2">
          <nav className="space-y-2.5 lg:mt-4 mt-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isLogout = item.id === 'logout';

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (isLogout && item.action) {
                      item.action();
                      return;
                    }

                    if (!isLogout) {
                      onTabChange(item.id);
                    }

                    if (window.innerWidth < 1024 && !isLogout) {
                      setTimeout(() => {
                        toggleSidebar();
                      }, 150);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-r-full text-left transition-all duration-200
            ${activeTab === item.id
                      ? 'bg-[#EEEAF8] text-indigo-700 font-medium'
                      : 'text-gray-400 font-normal hover:bg-[#5B5ABC] hover:text-white'
                    }
            ${isLogout ? 'lg:hidden' : ''}
          `}
                  disabled={isLoading}
                >
                  <Icon size={18} />
                  <span className="text-base lg:text-lg">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;