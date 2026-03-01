// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   FileText,
//   Video,
//   Image as ImageIcon,
//   Headphones,
//   Grid3x3,
//   Eye,
//   Download,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
//   Trash2,
//   ToggleLeft,
//   ToggleRight,
//   AlertCircle,
//   Upload
// } from 'lucide-react';
// import FileViewerModal from './Components/FileViewerModal';
// import {
//   fetchTrainings,
//   deleteTraining,
//   toggleTrainingActive,
//   openFileViewer,
//   closeFileViewer,
//   createTraining
// } from '../../store/slices/trainingSlice';
// import { trainingAPI } from '../../store/api/trainingApi';
// import { toast } from 'sonner';
// import DeleteConfirmationModal from './Components/DeleteConfirmationModal';
// import { Calendar, File } from 'lucide-react';
// import { getEmployeeId } from '../../utils/cookies';

// const LibraryPage = () => {
//   const dispatch = useDispatch();
//   const { trainings, loading, error, fileViewer } = useSelector((state) => state.training || {});

//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const [activeFilter, setActiveFilter] = useState('video');
//   const [expandedItems, setExpandedItems] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(6);
//   const [deletingId, setDeletingId] = useState(null);
//   const [togglingId, setTogglingId] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [trainingToDelete, setTrainingToDelete] = useState(null);
//   const [selectedStore, setSelectedStore] = useState(null);
  
//   // Store ALL trainings separately (unfiltered)
//   const [allTrainings, setAllTrainings] = useState([]);

//   // Ref for tracking polling interval
//   const pollingIntervalRef = useRef(null);

//   const filters = [
//     { name: 'Videos', value: 'video', icon: Video },
//     { name: 'Documents', value: 'document', icon: FileText },
//     { name: 'Images', value: 'image', icon: ImageIcon },
//   ];

//   // Function to fetch data
//   const fetchData = async (params = {}, employeeId = null) => {
//     try {
//       if (employeeId && employeeId !== 'null') {
//         await dispatch(fetchTrainings({ employeeId, params }));
//       } else {
//         await dispatch(fetchTrainings({ params }));
//       }
//     } catch (error) {
//       console.error('Failed to fetch trainings:', error);
//     }
//   };

//   // Initial fetch and setup polling
//   useEffect(() => {
//     const fetchAllData = async () => {
//       const employeeId = getEmployeeId();
//       await fetchData({}, employeeId);
//     };

//     fetchAllData();

//     // Set up polling interval - fetch data every 30 seconds
//     pollingIntervalRef.current = setInterval(() => {
//       const employeeId = getEmployeeId();
//       const params = {};
      
//       // If a store is selected, only fetch that store's data
//       if (selectedStore) {
//         params.store_id = selectedStore;
//       }
      
//       fetchData(params, employeeId);
//     }, 20000); 

//     // Clean up interval on component unmount
//     return () => {
//       if (pollingIntervalRef.current) {
//         clearInterval(pollingIntervalRef.current);
//       }
//     };
//   }, [dispatch]);

//   // Restart polling when selectedStore changes
//   useEffect(() => {
//     // Clear existing interval
//     if (pollingIntervalRef.current) {
//       clearInterval(pollingIntervalRef.current);
//     }

//     // Set up new interval with updated store filter
//     pollingIntervalRef.current = setInterval(() => {
//       const employeeId = getEmployeeId();
//       const params = {};
      
//       if (selectedStore) {
//         params.store_id = selectedStore;
//       }
      
//       fetchData(params, employeeId);
//     }, 20000);

//     // Clean up on unmount or when dependency changes
//     return () => {
//       if (pollingIntervalRef.current) {
//         clearInterval(pollingIntervalRef.current);
//       }
//     };
//   }, [selectedStore, dispatch]);

//   // Update allTrainings whenever trainings change
//   useEffect(() => {
//     if (Array.isArray(trainings) && trainings.length > 0) {
//       setAllTrainings(trainings);
//     }
//   }, [trainings]);

//   // Fetch filtered data when activeFilter changes
//   useEffect(() => {
//     const fetchFilteredData = async () => {
//       try {
//         const params = {};
//         if (activeFilter !== 'all') {
//           params.file_type = activeFilter;
//         }

//         // Add store_id to params if a specific store is selected
//         if (selectedStore) {
//           params.store_id = selectedStore;
//         }

//         const employeeId = getEmployeeId();
//         await fetchData(params, employeeId);
//       } catch (error) {
//         console.error('Failed to fetch filtered trainings:', error);
//       }
//     };

//     fetchFilteredData();
//   }, [activeFilter, selectedStore]);

//   // Handle responsive items per page
//   useEffect(() => {
//     const updateItemsPerPage = () => {
//       if (window.innerWidth < 768) {
//         setItemsPerPage(1);
//       } else if (window.innerWidth < 1024) {
//         setItemsPerPage(2);
//       } else {
//         setItemsPerPage(3);
//       }
//     };

//     updateItemsPerPage();
//     window.addEventListener('resize', updateItemsPerPage);

//     return () => window.removeEventListener('resize', updateItemsPerPage);
//   }, []);

//   // Client-side filtering function for display
//   const getFilteredTrainings = () => {
//     if (!Array.isArray(trainings)) return [];
    
//     let filtered = trainings;
    
//     // Filter by store if a specific store is selected
//     if (selectedStore) {
//       filtered = filtered.filter(t => t.store_id === selectedStore);
//     }
    
//     // Then filter by file type if not 'all'
//     if (activeFilter !== 'all') {
//       filtered = filtered.filter(t => {
//         const fileType = t.file_type?.toLowerCase();
//         const filterValue = activeFilter.toLowerCase();
//         return fileType === filterValue;
//       });
//     }
    
//     return filtered;
//   };

//   // Use filtered trainings for display
//   const filteredTrainings = getFilteredTrainings();
  

//   const getFilterCount = (filterValue) => {
//     if (!Array.isArray(allTrainings) || allTrainings.length === 0) return 0;
    
//     let filtered = allTrainings;
    
//     // Filter by store if a specific store is selected
//     if (selectedStore) {
//       filtered = filtered.filter(t => t.store_id === selectedStore);
//     }
    
//     if (filterValue === 'all') {
//       return filtered.length;
//     }
    
//     return filtered.filter(t => t.file_type === filterValue).length;
//   };


//   const totalItems = filteredTrainings.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   useEffect(() => {
//     if (totalPages > 0 && currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [totalPages, currentPage]);

//   // Get current page items from filtered trainings
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredTrainings.slice(indexOfFirstItem, indexOfLastItem);

//   const handleDeleteClick = (trainingId, trainingTitle) => {
//     setTrainingToDelete({
//       id: trainingId,
//       title: trainingTitle
//     });
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!trainingToDelete) return;

//     setDeletingId(trainingToDelete.id);
//     try {
//       await dispatch(deleteTraining(trainingToDelete.id));
      
//       // Refresh data after delete
//       const params = {};
//       if (selectedStore) {
//         params.store_id = selectedStore;
//       }
      
//       const employeeId = getEmployeeId();
//       await fetchData(params, employeeId);

//     } catch (error) {
//       toast.error('Failed to delete training');
//     } finally {
//       setDeletingId(null);
//       setShowDeleteModal(false);
//       setTrainingToDelete(null);
//     }
//   };

//   const cancelDelete = () => {
//     setShowDeleteModal(false);
//     setTrainingToDelete(null);
//   };

//   const handleToggleActive = async (trainingId, currentStatus) => {
//     setTogglingId(trainingId);
//     try {
//       await dispatch(toggleTrainingActive(trainingId));
//       toast.success(`Training ${currentStatus ? 'deactivated' : 'activated'}!`);
      
//       // Refresh data after toggle
//       const params = {};
//       if (selectedStore) {
//         params.store_id = selectedStore;
//       }
      
//       const employeeId = getEmployeeId();
//       await fetchData(params, employeeId);
//     } catch (error) {
//       toast.error('Failed to update training status');
//     } finally {
//       setTogglingId(null);
//     }
//   };

//   const handleViewFile = (training) => {
//     if (!training.file_path) {
//       toast.error('File path not available');
//       return;
//     }

//     dispatch(openFileViewer({
//       fileUrl: training.file_path,
//       fileType: training.file_type,
//       fileName: training.file_name || training.title
//     }));
//   };

//   const handleDownload = async (training) => {
//   try {
//     const a = document.createElement('a');
//     a.href = `https://backend.cuppacoin.com/trainings/${training.id}/download`;
//     a.download = training.file_name || training.title;
//     a.target = '_blank';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
    
//     toast.success('Download started!');
//   } catch (error) {
//     console.error('Download error:', error);
//     toast.error('Failed to download file');
//   }
// };

//   const toggleReadMore = (id) => {
//     setExpandedItems(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(prev => prev + 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(prev => prev - 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   // Function to construct full URL from file path
//   const getFullFileUrl = (filePath) => {
//     if (!filePath) return '';
    
//     if (filePath.startsWith('http')) {
//       return filePath;
//     }
    
//     let cleanPath = filePath;
//     if (cleanPath.startsWith('/')) {
//       cleanPath = cleanPath.substring(1);
//     }
    
//     const baseUrl = 'https://backend.cuppacoin.com';
//     return `${baseUrl}/public/storage/${cleanPath}`;
//   };

//   const renderThumbnail = (item) => {
//     const getFileTypeColor = (type) => {
//       switch (type) {
//         case 'document': return 'bg-[#5959b9]/30';
//         case 'video': return 'bg-gray-200';
//         case 'image': return 'bg-[#5959b9]/30';
//         default: return 'bg-gray-100';
//       }
//     };

//     const getFileTypeIcon = (type) => {
//       switch (type) {
//         case 'document': return <FileText className="w-12 h-12 text-[#5959b9]" />;
//         case 'video': return <Video className="w-12 h-12 text-[#5959b9]" />;
//         case 'image': return <ImageIcon className="w-12 h-12 text-[#5959b9]" />;
//         default: return <FileText className="w-12 h-12 text-[#5959b9]" />;
//       }
//     };

//     const getFileUrl = (item) => {
//       if (item.file_url) {
//         if (item.file_url.includes('/public/storage/')) {
//           return item.file_url;
//         }
//         if (item.file_url.includes('//storage/')) {
//           return item.file_url.replace('//storage/', '/public/storage/');
//         }
//         return item.file_url;
//       }
//       return getFullFileUrl(item.file_path);
//     };

//     const fileUrl = getFileUrl(item);
//     // console.log("Live URL: ", fileUrl);

//     const isPDF = item.file_type === 'document' && item.file_name?.toLowerCase().endsWith('.pdf');

//     return (
//       <div className={`w-full h-full ${getFileTypeColor(item.file_type)} flex items-center justify-center relative`}>
//         {item.file_type === 'image' && item.file_path ? (
//           <img
//             src={fileUrl}
//             alt={item.title}
//             className="w-full h-full object-cover"
//             onError={(e) => {
//               console.error('Image load error:', e);
//               e.target.style.display = 'none';
//               const parent = e.target.parentElement;
//               parent.innerHTML = `
//                 <div class="text-center p-4">
//                   ${getFileTypeIcon(item.file_type).props.children}
//                   <p class="mt-2 text-gray-600 font-medium text-sm">${item.title}</p>
//                 </div>
//               `;
//             }}
//             onLoad={() => {
//              // console.log('Image loaded successfully:', fileUrl);
//             }}
//           />
//         ) : item.file_type === 'video' && item.file_path ? (
        
//           <div className="relative ">
//               <img 
//                 src="/images/video-icon.png" 
//                 alt="Video" 
//                 className="size-48 object-contain"
//                 onError={(e) => {
//                   // Fallback to Lucide icon if image doesn't load
//                   e.target.style.display = 'none';
//                   const parent = e.target.parentElement;
//                   const icon = document.createElement('div');
//                   icon.innerHTML = `
//                     <svg class="w-12 h-12 text-[#5959b9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
//                     </svg>
//                   `;
//                   parent.appendChild(icon);
//                 }}
//               />
//             </div>
//         ) : isPDF && item.file_path ? (
//           <div className="w-full h-full bg-gray-200">
//             <iframe
//               src={`${fileUrl}#page=1&view=FitH`}
//               title="PDF Preview"
//               className="w-full h-full border-0"
//               onError={(e) => {
//                 console.error('PDF load error:', e);
//                 e.target.style.display = 'none';
//                 const parent = e.target.parentElement;
//                 parent.innerHTML = `
//                   <div class="text-center p-4 w-full h-full flex items-center justify-center">
//                     <div>
//                       ${getFileTypeIcon(item.file_type).props.children}
//                       <p class="mt-2 text-gray-600 font-medium text-sm">${item.title}</p>
//                     </div>
//                   </div>
//                 `;
//               }}
//               onLoad={() => {
//            //     console.log('PDF loaded successfully:', fileUrl);
//               }}
//             />
//           </div>
//         ) : (
//           <div className="text-center p-4 w-full h-full flex items-center justify-center">
//             <div>
//               <p className="mt-2 text-gray-600 font-medium text-sm">{item.title}</p>
//             </div>
//           </div>
//         )}
//         {!item.is_active && (
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
//               Inactive
//             </span>
//           </div>
//         )}
//       </div>
//     );
//   };

//   if (loading && (!allTrainings || allTrainings.length === 0)) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5958bb] mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading trainings...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error && (!allTrainings || allTrainings.length === 0)) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <p className="text-red-600 font-medium mb-2">Failed to load trainings</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => {
//               const params = {};
//               const employeeId = getEmployeeId();
//               fetchData(params, employeeId);
//             }}
//             className="px-4 py-2 bg-[#5958bb] text-white rounded-lg hover:bg-[#4a47a3]"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mb-12">
//       <div className="mx-auto">        
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h1 className="text-xl md:text-3xl font-medium text-[#5958bb] mb-1">Training Library</h1>
//             </div>
//           </div>

//           <div className="flex gap-3 mb-8 flex-wrap">
//             {filters.map((filter) => {
//               const Icon = filter.icon;
//               const filterCount = getFilterCount(filter.value);
//               const isActive = activeFilter === filter.value;

//               return (
//                 <button
//                   key={filter.name}
//                   onClick={() => {
//                     setActiveFilter(filter.value);
//                     setCurrentPage(1);
//                   }}
//                   className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${isActive
//                       ? 'bg-[#5958bb] text-white shadow-md font-medium'
//                       : 'bg-white text-gray-500 border-2 font-normal border-[#5958bb]/40'
//                     }`}
//                 >
//                   <Icon className="size-4" strokeWidth={2.5}/>
//                   <span>{filter.name}</span>
//                   <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white text-[#5958bb] font-bold' : 'bg-gray-200 border-2 border-gray-300/70'
//                     }`}>
//                     {filterCount}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {filteredTrainings.length === 0 ? (
//             <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
//               <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl font-medium text-gray-700 mb-2">
//                 {selectedStore 
//                   ? `No ${activeFilter} files found for this store`
//                   : `No ${activeFilter} files found`}
//               </h3>
//               <p className="text-gray-500 mb-6">
//                 {selectedStore
//                   ? `Try uploading content for this store or check other stores`
//                   : `Upload your first training content to get started`}
//               </p>
//             </div>
//           ) : (
//             <>
//               {currentItems.length === 0 && totalPages > 0 && (
//                 <div className="text-center py-8">
//                   <p className="text-gray-500 mb-4">No items on this page. Going to previous page...</p>
//                   <button
//                     onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                     className="px-4 py-2 bg-[#5958bb] text-white rounded-lg hover:bg-[#4a47a3]"
//                   >
//                     Go to Page {Math.max(1, currentPage - 1)}
//                   </button>
//                 </div>
//               )}

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                 {currentItems.map((item) => {
//                   const isExpanded = expandedItems[item.id];
//                   const description = item.description || '';
//                   const shouldTruncate = description.length > 100 && !isExpanded;
//                   const displayText = shouldTruncate
//                     ? `${description.substring(0, 100)}...`
//                     : description;

//                   return (
//                     <div key={item.id} className="flex flex-col bg-white rounded-xl overflow-hidden shadow-md border border-gray-300 hover:shadow-2xl transition-shadow h-full">
//                       <div className="relative h-48 border-b-4 border-[#5958bb] flex-shrink-0">
//                         {renderThumbnail(item)}
//                       </div>

//                       <div className="flex flex-col flex-grow p-5">
//                         <h3 className="text-lg  font-medium text-[#5958bb] mb-2 line-clamp-1"> {item.title}</h3>

//                         {item.store_name && (
//                           <div className="text-sm text-gray-600 mb-2 flex items-center gap-1">
//                             <span className="font-medium">Store:</span>
//                             <span>{item.store_name}</span>
//                           </div>
//                         )}

//                         <div className="text-sm text-gray-500 mb-3 space-y-1">
//                           <div className="flex flex-wrap gap-3">
//                             <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 border-2 border-[#5958bb]">
//                               <Calendar className="w-3.5 h-3.5 text-[#5a58b6]" strokeWidth={2.5} />
//                               <span className="text-xs font-medium text-gray-700">
//                                 Added on:
//                               </span>
//                               <span className="text-xs text-gray-600 font-medium">
//                                 {item.created_at
//                                   ? new Date(item.created_at).toLocaleDateString('en-GB')
//                                   : 'N/A'}
//                               </span>
//                             </div>

//                             <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 border-2 border-[#5958bb]">
//                               <File className="w-3.5 h-3.5 text-[#5a58b6]" strokeWidth={2.5}/>
//                               <span className="text-xs font-medium text-gray-700">
//                                 Size:
//                               </span>
//                               <span className="text-xs text-gray-600 font-medium">
//                                 {item.file_size || 'N/A'}
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="mb-2 flex-grow">
//                           {description && (
//                             <div className="mt-2">
//                               <p className="text-[#5958bb] font-medium text-mm mb-2.5">
//                                 Description
//                               </p>
//                               <p className={`text-gray-600 text-sm ${!isExpanded ? 'line-clamp-2' : ''}`}>
//                                 {!isExpanded && description.length > 45 ? (
//                                   <>
//                                     {description.slice(0, 45)}
//                                     <br />
//                                     {description.slice(45, 100)}
//                                     {description.length > 100 && '...'}
//                                   </>
//                                 ) : (
//                                   description
//                                 )}
//                               </p>
                              
//                               {description.length > 100 && (
//                                 <button
//                                   onClick={() => toggleReadMore(item.id)}
//                                   className="text-[#5958bb] text-sm font-medium flex items-center gap-1 mt-1 hover:text-indigo-700 w-full justify-end"
//                                 >
//                                   {isExpanded ? (
//                                     <>
//                                       <ChevronUp className="w-3 h-3" />
//                                       Read Less
//                                     </>
//                                   ) : (
//                                     <>
//                                       <ChevronDown className="w-3 h-3" />
//                                       Read More
//                                     </>
//                                   )}
//                                 </button>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         <div className="flex gap-2 mt-1 pt-2 w-[70%] space-x-6 mx-auto">
//                           <button
//                             onClick={() => item.is_active && handleViewFile(item)}
//                             disabled={!item.is_active}
//                             className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
//                               item.is_active
//                                 ? 'bg-[#5958bb] text-white hover:bg-white hover:text-[#5958bb] hover:border-2 hover:border-[#5958bb]/60'
//                                 : ' border-2 border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'
//                             }`}
//                           >
//                             <Eye className="w-4 h-4" />
//                             View
//                           </button>
//                           <button
//                             onClick={() => item.is_active && handleDownload(item)}
//                             disabled={!item.is_active}
//                             className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
//                               item.is_active
//                                 ? 'bg-white text-[#5958bb] border-2 border-[#5958bb]/60 hover:bg-[#5958bb] hover:text-white'
//                                 : 'border-2 border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'
//                             }`}
//                           >
//                             <Download className="w-4 h-4" />
//                             Download
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {totalPages > 1 && currentItems.length > 0 && (
//                 <div className="flex justify-between items-center mt-8">
//                   <button
//                     onClick={handlePrevPage}
//                     disabled={currentPage === 1}
//                     className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${currentPage === 1
//                         ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                         : 'bg-white text-[#5958bb] hover:bg-[#5958bb] hover:text-white border-2 border-[#5958bb]'
//                       }`}
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                     Previous
//                   </button>

//                   <div className="flex items-center gap-1 mx-2">
//                     {(() => {
//                       const pageNumbers = [];
//                       let startPage = 1;
                      
//                       if (totalPages <= 3) {
//                         for (let i = 1; i <= totalPages; i++) {
//                           pageNumbers.push(i);
//                         }
//                       } else {
//                         if (currentPage <= 2) {
//                           startPage = 1;
//                         } else if (currentPage >= totalPages - 1) {
//                           startPage = totalPages - 2;
//                         } else {
//                           startPage = currentPage - 1;
//                         }
                        
//                         for (let i = startPage; i < startPage + 3 && i <= totalPages; i++) {
//                           pageNumbers.push(i);
//                         }
//                       }

//                       return pageNumbers.map((pageNum) => (
//                         <button
//                           key={pageNum}
//                           onClick={() => handlePageChange(pageNum)}
//                           className={`w-8 h-8 rounded-md font-medium text-sm ${currentPage === pageNum
//                               ? 'bg-[#5958bb] text-white'
//                               : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
//                             }`}
//                         >
//                           {pageNum}
//                         </button>
//                       ));
//                     })()}
//                   </div>

//                   <button
//                     onClick={handleNextPage}
//                     disabled={currentPage === totalPages}
//                     className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${currentPage === totalPages
//                         ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                         : 'bg-white text-[#5958bb] hover:bg-[#5958bb] hover:text-white border-2 border-[#5958bb]'
//                       }`}
//                   >
//                     Next
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//       </div>

//       <FileViewerModal
//         isOpen={fileViewer.isOpen}
//         onClose={() => dispatch(closeFileViewer())}
//         fileUrl={fileViewer.fileUrl}
//         fileType={fileViewer.fileType}
//         fileName={fileViewer.fileName}
//       />
//     </div>
//   );
// };

// export default LibraryPage;


// ____________________________________________________________________________


import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FileText,
  Video,
  Image as ImageIcon,
  Headphones,
  Grid3x3,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Trash2,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  Upload
} from 'lucide-react';
import FileViewerModal from './Components/FileViewerModal';
import {
  fetchTrainings,
  deleteTraining,
  toggleTrainingActive,
  openFileViewer,
  closeFileViewer,
  createTraining
} from '../../store/slices/trainingSlice';
import { trainingAPI } from '../../store/api/trainingApi';
import { toast } from 'sonner';
import DeleteConfirmationModal from './Components/DeleteConfirmationModal';
import { Calendar, File } from 'lucide-react';
import { getEmployeeId } from '../../utils/cookies';

const LibraryPage = () => {
  const dispatch = useDispatch();
  const { trainings, loading, error, fileViewer } = useSelector((state) => state.training || {});

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('video');
  const [expandedItems, setExpandedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [trainingToDelete, setTrainingToDelete] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  
  // Store ALL trainings separately (unfiltered)
  const [allTrainings, setAllTrainings] = useState([]);

  // Ref for tracking polling interval
  const pollingIntervalRef = useRef(null);

  const filters = [
    { name: 'Videos', value: 'video', icon: Video },
    { name: 'Documents', value: 'document', icon: FileText },
    { name: 'Images', value: 'image', icon: ImageIcon },
  ];

  // Function to fetch data
  const fetchData = async (params = {}, employeeId = null) => {
    try {
      if (employeeId && employeeId !== 'null') {
        await dispatch(fetchTrainings({ employeeId, params }));
      } else {
        await dispatch(fetchTrainings({ params }));
      }
    } catch (error) {
      console.error('Failed to fetch trainings:', error);
    }
  };

  // Initial fetch and setup polling
  useEffect(() => {
    const fetchAllData = async () => {
      const employeeId = getEmployeeId();
      await fetchData({}, employeeId);
    };

    fetchAllData();

    // Set up polling interval - fetch data every 30 seconds
    pollingIntervalRef.current = setInterval(() => {
      const employeeId = getEmployeeId();
      const params = {};
      
      // If a store is selected, only fetch that store's data
      if (selectedStore) {
        params.store_id = selectedStore;
      }
      
      fetchData(params, employeeId);
    }, 20000); 

    // Clean up interval on component unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [dispatch]);

  // Restart polling when selectedStore changes
  useEffect(() => {
    // Clear existing interval
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    // Set up new interval with updated store filter
    pollingIntervalRef.current = setInterval(() => {
      const employeeId = getEmployeeId();
      const params = {};
      
      if (selectedStore) {
        params.store_id = selectedStore;
      }
      
      fetchData(params, employeeId);
    }, 20000);

    // Clean up on unmount or when dependency changes
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [selectedStore, dispatch]);

  // useEffect(() => {
  //   if (Array.isArray(trainings) && trainings.length > 0) {
  //     setAllTrainings(trainings);
  //   }
  // }, [trainings]);

  // Fetch filtered data when activeFilter changes
  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const params = {};
        if (activeFilter !== 'all') {
          params.file_type = activeFilter;
        }

        // Add store_id to params if a specific store is selected
        if (selectedStore) {
          params.store_id = selectedStore;
        }

        const employeeId = getEmployeeId();
        await fetchData(params, employeeId);
      } catch (error) {
        console.error('Failed to fetch filtered trainings:', error);
      }
    };

    fetchFilteredData();
  }, [activeFilter, selectedStore]);

  // Handle responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Client-side filtering function for display
  const getFilteredTrainings = () => {
    if (!Array.isArray(trainings)) return [];
    
    let filtered = trainings;
    
    // Filter by store if a specific store is selected
    if (selectedStore) {
      filtered = filtered.filter(t => t.store_id === selectedStore);
    }
    
    // Then filter by file type if not 'all'
    if (activeFilter !== 'all') {
      filtered = filtered.filter(t => {
        const fileType = t.file_type?.toLowerCase();
        const filterValue = activeFilter.toLowerCase();
        return fileType === filterValue;
      });
    }
    
    return filtered;
  };

  // Use filtered trainings for display
  const filteredTrainings = getFilteredTrainings();
  

  // const getFilterCount = (filterValue) => {
  //   if (!Array.isArray(allTrainings) || allTrainings.length === 0) return 0;
    
  //   let filtered = allTrainings;
    
  //   if (selectedStore) {
  //     filtered = filtered.filter(t => t.store_id === selectedStore);
  //   }
    
  //   if (filterValue === 'all') {
  //     return filtered.length;
  //   }
    
  //   return filtered.filter(t => t.file_type === filterValue).length;
  // };

  
  const getFilterCount = (filterValue) => {
  if (!Array.isArray(trainings) || trainings.length === 0) return 0;
  
  let filtered = trainings;
  
  if (selectedStore) {
    filtered = filtered.filter(t => t.store_id === selectedStore);
  }
  
  if (filterValue === 'all') {
    return filtered.length;
  }
  
  return filtered.filter(t => {
    const fileType = t.file_type?.toLowerCase();
    return fileType === filterValue.toLowerCase();
  }).length;
};



  const totalItems = filteredTrainings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Get current page items from filtered trainings
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTrainings.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteClick = (trainingId, trainingTitle) => {
    setTrainingToDelete({
      id: trainingId,
      title: trainingTitle
    });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!trainingToDelete) return;

    setDeletingId(trainingToDelete.id);
    try {
      await dispatch(deleteTraining(trainingToDelete.id));
      
      // Refresh data after delete
      const params = {};
      if (selectedStore) {
        params.store_id = selectedStore;
      }
      
      const employeeId = getEmployeeId();
      await fetchData(params, employeeId);

    } catch (error) {
      toast.error('Failed to delete training');
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setTrainingToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTrainingToDelete(null);
  };

  const handleToggleActive = async (trainingId, currentStatus) => {
    setTogglingId(trainingId);
    try {
      await dispatch(toggleTrainingActive(trainingId));
      toast.success(`Training ${currentStatus ? 'deactivated' : 'activated'}!`);
      
      // Refresh data after toggle
      const params = {};
      if (selectedStore) {
        params.store_id = selectedStore;
      }
      
      const employeeId = getEmployeeId();
      await fetchData(params, employeeId);
    } catch (error) {
      toast.error('Failed to update training status');
    } finally {
      setTogglingId(null);
    }
  };

  const handleViewFile = (training) => {
    if (!training.file_path) {
      toast.error('File path not available');
      return;
    }

    dispatch(openFileViewer({
      fileUrl: training.file_path,
      fileType: training.file_type,
      fileName: training.file_name || training.title
    }));
  };

  const handleDownload = async (training) => {
  try {
    const a = document.createElement('a');
    a.href = `https://backend.cuppacoin.com/trainings/${training.id}/download`;
    a.download = training.file_name || training.title;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast.success('Download started!');
  } catch (error) {
    console.error('Download error:', error);
    toast.error('Failed to download file');
  }
};

  const toggleReadMore = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Function to construct full URL from file path
  const getFullFileUrl = (filePath) => {
    if (!filePath) return '';
    
    if (filePath.startsWith('http')) {
      return filePath;
    }
    
    let cleanPath = filePath;
    if (cleanPath.startsWith('/')) {
      cleanPath = cleanPath.substring(1);
    }
    
    const baseUrl = 'https://backend.cuppacoin.com';
    return `${baseUrl}/public/storage/${cleanPath}`;
  };

  const renderThumbnail = (item) => {
    const getFileTypeColor = (type) => {
      switch (type) {
        case 'document': return 'bg-[#5959b9]/30';
        case 'video': return 'bg-gray-200';
        case 'image': return 'bg-[#5959b9]/30';
        default: return 'bg-gray-100';
      }
    };

    const getFileTypeIcon = (type) => {
      switch (type) {
        case 'document': return <FileText className="w-12 h-12 text-[#5959b9]" />;
        case 'video': return <Video className="w-12 h-12 text-[#5959b9]" />;
        case 'image': return <ImageIcon className="w-12 h-12 text-[#5959b9]" />;
        default: return <FileText className="w-12 h-12 text-[#5959b9]" />;
      }
    };

    const getFileUrl = (item) => {
      if (item.file_url) {
        if (item.file_url.includes('/public/storage/')) {
          return item.file_url;
        }
        if (item.file_url.includes('//storage/')) {
          return item.file_url.replace('//storage/', '/public/storage/');
        }
        return item.file_url;
      }
      return getFullFileUrl(item.file_path);
    };

    const fileUrl = getFileUrl(item);
    // console.log("Live URL: ", fileUrl);

    const isPDF = item.file_type === 'document' && item.file_name?.toLowerCase().endsWith('.pdf');

    return (
      <div className={`w-full h-full ${getFileTypeColor(item.file_type)} flex items-center justify-center relative`}>
        {item.file_type === 'image' && item.file_path ? (
          <img
            src={fileUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Image load error:', e);
              e.target.style.display = 'none';
              const parent = e.target.parentElement;
              parent.innerHTML = `
                <div class="text-center p-4">
                  ${getFileTypeIcon(item.file_type).props.children}
                  <p class="mt-2 text-gray-600 font-medium text-sm">${item.title}</p>
                </div>
              `;
            }}
            onLoad={() => {
             // console.log('Image loaded successfully:', fileUrl);
            }}
          />
        ) : item.file_type === 'video' && item.file_path ? (
        
          <div className="relative ">
              <img 
                src="/images/video-icon.png" 
                alt="Video" 
                className="size-48 object-contain"
                onError={(e) => {
                  // Fallback to Lucide icon if image doesn't load
                  e.target.style.display = 'none';
                  const parent = e.target.parentElement;
                  const icon = document.createElement('div');
                  icon.innerHTML = `
                    <svg class="w-12 h-12 text-[#5959b9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  `;
                  parent.appendChild(icon);
                }}
              />
            </div>
        ) : isPDF && item.file_path ? (
          <div className="w-full h-full bg-gray-200">
            <iframe
              src={`${fileUrl}#page=1&view=FitH`}
              title="PDF Preview"
              className="w-full h-full border-0"
              onError={(e) => {
                console.error('PDF load error:', e);
                e.target.style.display = 'none';
                const parent = e.target.parentElement;
                parent.innerHTML = `
                  <div class="text-center p-4 w-full h-full flex items-center justify-center">
                    <div>
                      ${getFileTypeIcon(item.file_type).props.children}
                      <p class="mt-2 text-gray-600 font-medium text-sm">${item.title}</p>
                    </div>
                  </div>
                `;
              }}
              onLoad={() => {
           //     console.log('PDF loaded successfully:', fileUrl);
              }}
            />
          </div>
        ) : (
          <div className="text-center p-4 w-full h-full flex items-center justify-center">
            <div>
              <p className="mt-2 text-gray-600 font-medium text-sm">{item.title}</p>
            </div>
          </div>
        )}
        {!item.is_active && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Inactive
            </span>
          </div>
        )}
      </div>
    );
  };

  if (loading && (!trainings || trainings.length === 0)) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5958bb] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trainings...</p>
        </div>
      </div>
    );
  }

  if (error && (!trainings || trainings.length === 0)) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-medium mb-2">Failed to load trainings</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              const params = {};
              const employeeId = getEmployeeId();
              fetchData(params, employeeId);
            }}
            className="px-4 py-2 bg-[#5958bb] text-white rounded-lg hover:bg-[#4a47a3]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="mx-auto">        
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-xl md:text-3xl font-medium text-[#5958bb] mb-1">Training Library</h1>
            </div>
          </div>

          <div className="flex gap-3 mb-8 flex-wrap">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const filterCount = getFilterCount(filter.value);
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.name}
                  onClick={() => {
                    setActiveFilter(filter.value);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${isActive
                      ? 'bg-[#5958bb] text-white shadow-md font-medium'
                      : 'bg-white text-gray-500 border-2 font-normal border-[#5958bb]/40'
                    }`}
                >
                  <Icon className="size-4" strokeWidth={2.5}/>
                  <span>{filter.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white text-[#5958bb] font-bold' : 'bg-gray-200 border-2 border-gray-300/70'
                    }`}>
                    {filterCount}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredTrainings.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                {selectedStore 
                  ? `No ${activeFilter} files found for this store`
                  : `No ${activeFilter} files found`}
              </h3>
              <p className="text-gray-500 mb-6">
                {selectedStore
                  ? `Try uploading content for this store or check other stores`
                  : `Upload your first training content to get started`}
              </p>
            </div>
          ) : (
            <>
              {currentItems.length === 0 && totalPages > 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No items on this page. Going to previous page...</p>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="px-4 py-2 bg-[#5958bb] text-white rounded-lg hover:bg-[#4a47a3]"
                  >
                    Go to Page {Math.max(1, currentPage - 1)}
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentItems.map((item) => {
                  const isExpanded = expandedItems[item.id];
                  const description = item.description || '';
                  const shouldTruncate = description.length > 100 && !isExpanded;
                  const displayText = shouldTruncate
                    ? `${description.substring(0, 100)}...`
                    : description;

                  return (
                    <div key={item.id} className="flex flex-col bg-white rounded-xl overflow-hidden shadow-md border border-gray-300 hover:shadow-2xl transition-shadow h-full">
                      <div className="relative h-48 border-b-4 border-[#5958bb] flex-shrink-0">
                        {renderThumbnail(item)}
                      </div>

                      <div className="flex flex-col flex-grow p-5">
                        <h3 className="text-lg  font-medium text-[#5958bb] mb-2 line-clamp-1"> {item.title}</h3>

                        {item.store_name && (
                          <div className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                            <span className="font-medium">Store:</span>
                            <span>{item.store_name}</span>
                          </div>
                        )}

                        <div className="text-sm text-gray-500 mb-3 space-y-1">
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 border-2 border-[#5958bb]">
                              <Calendar className="w-3.5 h-3.5 text-[#5a58b6]" strokeWidth={2.5} />
                              <span className="text-xs font-medium text-gray-700">
                                Added on:
                              </span>
                              <span className="text-xs text-gray-600 font-medium">
                                {item.created_at
                                  ? new Date(item.created_at).toLocaleDateString('en-GB')
                                  : 'N/A'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 border-2 border-[#5958bb]">
                              <File className="w-3.5 h-3.5 text-[#5a58b6]" strokeWidth={2.5}/>
                              <span className="text-xs font-medium text-gray-700">
                                Size:
                              </span>
                              <span className="text-xs text-gray-600 font-medium">
                                {item.file_size || 'N/A'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-2 flex-grow">
                          {description && (
                            <div className="mt-2">
                              <p className="text-[#5958bb] font-medium text-mm mb-2.5">
                                Description
                              </p>
                              <p className={`text-gray-600 text-sm ${!isExpanded ? 'line-clamp-2' : ''}`}>
                                {!isExpanded && description.length > 45 ? (
                                  <>
                                    {description.slice(0, 45)}
                                    <br />
                                    {description.slice(45, 100)}
                                    {description.length > 100 && '...'}
                                  </>
                                ) : (
                                  description
                                )}
                              </p>
                              
                              {description.length > 100 && (
                                <button
                                  onClick={() => toggleReadMore(item.id)}
                                  className="text-[#5958bb] text-sm font-medium flex items-center gap-1 mt-1 hover:text-indigo-700 w-full justify-end"
                                >
                                  {isExpanded ? (
                                    <>
                                      <ChevronUp className="w-3 h-3" />
                                      Read Less
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="w-3 h-3" />
                                      Read More
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 mt-1 pt-2 w-[70%] space-x-6 mx-auto">
                          <button
                            onClick={() => item.is_active && handleViewFile(item)}
                            disabled={!item.is_active}
                            className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                              item.is_active
                                ? 'bg-[#5958bb] text-white hover:bg-white hover:text-[#5958bb] hover:border-2 hover:border-[#5958bb]/60'
                                : ' border-2 border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => item.is_active && handleDownload(item)}
                            disabled={!item.is_active}
                            className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                              item.is_active
                                ? 'bg-white text-[#5958bb] border-2 border-[#5958bb]/60 hover:bg-[#5958bb] hover:text-white'
                                : 'border-2 border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && currentItems.length > 0 && (
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-[#5958bb] hover:bg-[#5958bb] hover:text-white border-2 border-[#5958bb]'
                      }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-1 mx-2">
                    {(() => {
                      const pageNumbers = [];
                      let startPage = 1;
                      
                      if (totalPages <= 3) {
                        for (let i = 1; i <= totalPages; i++) {
                          pageNumbers.push(i);
                        }
                      } else {
                        if (currentPage <= 2) {
                          startPage = 1;
                        } else if (currentPage >= totalPages - 1) {
                          startPage = totalPages - 2;
                        } else {
                          startPage = currentPage - 1;
                        }
                        
                        for (let i = startPage; i < startPage + 3 && i <= totalPages; i++) {
                          pageNumbers.push(i);
                        }
                      }

                      return pageNumbers.map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-8 h-8 rounded-md font-medium text-sm ${currentPage === pageNum
                              ? 'bg-[#5958bb] text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                        >
                          {pageNum}
                        </button>
                      ));
                    })()}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-[#5958bb] hover:bg-[#5958bb] hover:text-white border-2 border-[#5958bb]'
                      }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
      </div>

      <FileViewerModal
        isOpen={fileViewer.isOpen}
        onClose={() => dispatch(closeFileViewer())}
        fileUrl={fileViewer.fileUrl}
        fileType={fileViewer.fileType}
        fileName={fileViewer.fileName}
      />
    </div>
  );
};

export default LibraryPage;