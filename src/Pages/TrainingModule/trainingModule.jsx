
// import React, { useState, useEffect, useRef } from "react";
// import { 
//   FileText, 
//   Video, 
//   Image, 
//   Music,
//   Play,
//   Eye,
//   Download,
//   Clock,
//   User,
//   Grid,
//   Search,
//   Headphones,
//   Film,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp
// } from "lucide-react";

// const mockMedia = [
//   { 
//     id: 1, 
//     title: "Product Launch Presentation", 
//     type: "document", 
//     format: "pdf", 
//     date: "2024-01-15", 
//     author: "John Doe",
//     description: "Presentation for the upcoming product launch event. This document contains market analysis, product features, and launch strategy for Q1 2024.",
//     color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
//     size: "12.4 MB",
//     duration: "45 min read",
//     viewUrl: "https://www.slideshare.net/slideshow/product-launchpdf-256256328/256256328"
//   },
//   { 
//     id: 2, 
//     title: "Sales Training Video", 
//     type: "video", 
//     format: "mp4", 
//     date: "2024-01-14", 
//     author: "Jane Smith",
//     description: "Complete sales training video covering modern sales techniques, CRM usage, and customer engagement strategies.",
//     thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop",
//     color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
//     size: "245 MB",
//     duration: "32:45",
//     viewUrl: "https://www.youtube.com/watch?v=BaDGqm4rEzY"
//   },
//   { 
//     id: 3, 
//     title: "Sales Performance Dashboard", 
//     type: "image", 
//     format: "jpg", 
//     date: "2024-01-13", 
//     author: "Bob Wilson",
//     description: "Q1 2024 sales performance dashboard showing revenue trends, conversion rates, and regional performance metrics.",
//     url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop",
//     color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
//     size: "8.2 MB",
//     dimensions: "1920x1080",
//     viewUrl: "https://www.google.com/search?q=sales+dashboard+performance+charts&tbm=isch"
//   },
//   { 
//     id: 4, 
//     title: "Sales Strategy Podcast", 
//     type: "audio", 
//     format: "mp3", 
//     date: "2024-01-12", 
//     author: "Tech Insights",
//     description: "Podcast discussing modern sales strategies, AI in sales, and future trends in B2B sales technology.",
//     cover: "https://images.unsplash.com/photo-1478737270239-2f02b77fc478?w=400&h=400&fit=crop",
//     color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
//     size: "48 MB",
//     duration: "42:18",
//     viewUrl: "https://www.youtube.com/watch?v=5O-sLe6iOns"
//   },
//   { 
//     id: 5, 
//     title: "Q4 Sales Report", 
//     type: "document", 
//     format: "docx", 
//     date: "2024-01-11", 
//     author: "Finance Team",
//     description: "Detailed quarterly sales report including revenue analysis, customer acquisition costs, and sales team performance metrics.",
//     color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
//     size: "5.7 MB",
//     duration: "30 min read",
//     viewUrl: "https://www.coxautoinc.com/wp-content/uploads/2025/01/Q4-2024-Kelley-Blue-Book-EV-Sales-Report.pdf"
//   },
//   { 
//     id: 6, 
//     title: "Client Testimonial Compilation", 
//     type: "video", 
//     format: "mov", 
//     date: "2024-01-10", 
//     author: "Marketing Dept",
//     description: "Video compilation of client testimonials and success stories from our top enterprise customers.",
//     thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop",
//     color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
//     size: "512 MB",
//     duration: "18:22",
//     viewUrl: "https://www.youtube.com/watch?v=Uf4JAss1vEo"
//   },
//   { 
//     id: 7, 
//     title: "Product Showcase Gallery", 
//     type: "image", 
//     format: "png", 
//     date: "2024-01-09", 
//     author: "Design Team",
//     description: "High-quality product images and marketing materials for our flagship sales automation software.",
//     url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
//     color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
//     size: "15.3 MB",
//     dimensions: "2560x1440",
//     viewUrl: "https://www.google.com/search?q=sales+software+product+showcase&tbm=isch"
//   },
//   { 
//     id: 8, 
//     title: "Sales Motivational Audio", 
//     type: "audio", 
//     format: "wav", 
//     date: "2024-01-08", 
//     author: "Creative Studio",
//     description: "Audio recording of motivational speeches and sales success stories for team training sessions.",
//     cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
//     color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
//     size: "89 MB",
//     duration: "58:12",
//     viewUrl: "https://www.youtube.com/watch?v=bDk8yAPxAQ0"
//   }
// ];

// const filterOptions = [
//   { id: "all", label: "All Media", icon: Grid, count: 8 },
//   { id: "document", label: "Documents", icon: FileText, count: 2 },
//   { id: "video", label: "Videos", icon: Film, count: 2 },
//   { id: "image", label: "Images", icon: Image, count: 2 },
//   { id: "audio", label: "Audios", icon: Headphones, count: 2 }
// ];

// export default function UserViewer() {
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(6);
//   const [expandedCards, setExpandedCards] = useState({});

//   useEffect(() => {
//     setIsLoaded(true);
//     const updateItemsPerPage = () => {
//       if (window.innerWidth < 768) {
//         setItemsPerPage(2); 
//       } else if (window.innerWidth < 1024) {
//         setItemsPerPage(4); 
//       } else {
//         setItemsPerPage(6); 
//       }
//     };
    
//     updateItemsPerPage();
//     window.addEventListener('resize', updateItemsPerPage);
    
//     return () => window.removeEventListener('resize', updateItemsPerPage);
//   }, []);

//   const filteredMedia = mockMedia.filter(item => {
//     if (activeFilter === "all") return true;
//     return item.type === activeFilter;
//   }).filter(item => 
//     item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentMedia = filteredMedia.slice(startIndex, endIndex);

//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     if (totalPages <= maxVisiblePages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 5; i++) {
//           pages.push(i);
//         }
//         pages.push('...');
//         pages.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1);
//         pages.push('...');
//         for (let i = totalPages - 4; i <= totalPages; i++) {
//           pages.push(i);
//         }
//       } else {
//         pages.push(1);
//         pages.push('...');
//         for (let i = currentPage - 1; i <= currentPage + 1; i++) {
//           pages.push(i);
//         }
//         pages.push('...');
//         pages.push(totalPages);
//       }
//     }
    
//     return pages;
//   };

//   const getTypeIcon = (type) => {
//     switch(type) {
//       case 'document': return FileText;
//       case 'video': return Film;
//       case 'image': return Image;
//       case 'audio': return Headphones;
//       default: return FileText;
//     }
//   };

//   const handleViewClick = (e, mediaItem) => {
//     e.stopPropagation(); 
//     if (mediaItem.viewUrl) {
//       window.open(mediaItem.viewUrl, '_blank', 'noopener,noreferrer');
//     }
//   };

//   const handleDownloadClick = (e, mediaItem) => {
//     e.stopPropagation(); 
//     alert(`Downloading: ${mediaItem.title}`);
//   };

//   const toggleDescription = (id) => {
//     setExpandedCards(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const MediaCard = ({ item, index }) => {
//     const TypeIcon = getTypeIcon(item.type);
//     const isExpanded = expandedCards[item.id];
//     const descriptionRef = useRef(null);
//     const [isOverflowing, setIsOverflowing] = useState(false);

//     useEffect(() => {
//       const checkOverflow = () => {
//         if (descriptionRef.current) {
//           const element = descriptionRef.current;
          
//           // Check if text is truncated (has ellipsis)
//           // We'll use a simpler approach: check if scrollHeight is greater than clientHeight
//           // when in collapsed state
//           if (!isExpanded) {
//             const lineHeight = 1.4; // Approximate line height for text-sm
//             const fontSize = 14; // text-sm is ~14px
//             const maxHeight = 2 * lineHeight * fontSize; // 2 lines * line-height * font-size
            
//             // Check if content exceeds 2 lines
//             const isOverflowing = element.scrollHeight > maxHeight;
//             setIsOverflowing(isOverflowing);
//           } else {
//             // When expanded, we always show the button to collapse
//             setIsOverflowing(true);
//           }
//         }
//       };

//       // Check after a short delay to ensure DOM is rendered
//       const timeoutId = setTimeout(checkOverflow, 100);
      
//       // Also check when window resizes
//       window.addEventListener('resize', checkOverflow);
      
//       return () => {
//         clearTimeout(timeoutId);
//         window.removeEventListener('resize', checkOverflow);
//       };
//     }, [item.id, isExpanded]);

//     // Simple check: show Read More for descriptions longer than 80 characters
//     const shouldShowReadMore = isOverflowing || isExpanded;

//     return (
//       <div 
//         className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
//         style={{
//           animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
//         }}
//       >
//         <div className="relative h-1.5 overflow-hidden">
//           <div 
//             className={`absolute inset-0 bg-gradient-to-r from-[#5b59bb]/90 to-[#5b59bb]/70`}
//           />
//         </div>
        
//         <div className="p-4">
//           <div className="relative mb-2 overflow-hidden rounded-xl">
//             {item.type === 'image' && (
//               <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
//                 <img 
//                   src={item.url} 
//                   alt={item.title}
//                   className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#5b59bb]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//               </div>
//             )}
            
//             {item.type === 'video' && (
//               <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
//                 <img 
//                   src={item.thumbnail} 
//                   alt={item.title}
//                   className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="relative">
//                     <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform transition-all duration-500 shadow-2xl group-hover:scale-125 group-hover:bg-[#5b59bb]">
//                       <Play className="w-7 h-7 ml-1 transition-colors duration-300 text-gray-900 group-hover:text-white" />
//                     </div>
                   
//                     <div className="absolute inset-0 rounded-full bg-white/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {item.type === 'audio' && (
//               <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
//                 <img 
//                   src={item.cover} 
//                   alt={item.title}
//                   className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-all duration-500"
//                 />
//                 <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
//                   <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/20 transition-all duration-500 group-hover:scale-110">
//                     <Headphones className="w-10 h-10 text-white transition-all duration-500 group-hover:scale-110" />
//                     {/* Sound waves */}
//                     <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                       <div className="flex gap-1">
//                         <div className="w-1 bg-white/60 rounded-full" style={{ height: '12px', animation: 'soundWave 0.8s ease-in-out infinite' }} />
//                         <div className="w-1 bg-white/60 rounded-full" style={{ height: '20px', animation: 'soundWave 0.8s ease-in-out 0.1s infinite' }} />
//                         <div className="w-1 bg-white/60 rounded-full" style={{ height: '16px', animation: 'soundWave 0.8s ease-in-out 0.2s infinite' }} />
//                       </div>
//                     </div>
//                     <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                       <div className="flex gap-1">
//                         <div className="w-1 bg-white/60 rounded-full" style={{ height: '16px', animation: 'soundWave 0.8s ease-in-out infinite' }} />
//                         <div className="w-1 bg-white/60 rounded-full" style={{ height: '20px', animation: 'soundWave 0.8s ease-in-out 0.1s infinite' }} />
//                         <div className="w-1 bg-white/60 rounded-full" style={{ height: '12px', animation: 'soundWave 0.8s ease-in-out 0.2s infinite' }} />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
//                     <div 
//                       className="h-full bg-gradient-to-r from-[#5b59bb] to-purple-400 transition-all duration-1000 group-hover:w-2/3"
//                       style={{ width: '33%' }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {item.type === 'document' && (
//               <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
//                 <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
//                   <div className="relative">
//                     <div className="w-32 h-40 bg-white rounded-lg shadow-lg transform transition-all duration-500 group-hover:shadow-2xl">
//                       <div className="absolute inset-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded overflow-hidden">
//                         <div className="p-4">
//                           <div className="space-y-2">
//                             <div className="h-2 bg-gradient-to-r from-[#5b59bb] to-purple-400 rounded transition-all duration-500" style={{ width: '100%' }}></div>
//                             <div className="h-2 bg-gradient-to-r from-[#5b59bb] to-purple-400 rounded transition-all duration-500 delay-75" style={{ width: '75%' }}></div>
//                             <div className="h-2 bg-gradient-to-r from-[#5b59bb] to-purple-400 rounded transition-all duration-500 delay-150" style={{ width: '50%' }}></div>
//                             <div className="h-2 bg-gray-200 rounded transition-all duration-500 delay-200 group-hover:bg-gradient-to-r group-hover:from-[#5b59bb] group-hover:to-purple-400" style={{ width: '60%' }}></div>
//                             <div className="h-2 bg-gray-200 rounded transition-all duration-500 delay-300 group-hover:bg-gradient-to-r group-hover:from-[#5b59bb] group-hover:to-purple-400" style={{ width: '40%' }}></div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#5b59bb] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
//                       <FileText className="w-4 h-4 text-white" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Type badge with glow effect */}
//             <div className="absolute top-3 left-3 transform transition-all duration-300 group-hover:scale-105">
//               <div className="relative flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-lg transition-all duration-300">
//                 <TypeIcon className="w-4 h-4 text-[#5b59bb]" />
//                 <span className="capitalize text-gray-700">{item.type}</span>
//                 {/* Glow effect on hover */}
//                 <div className="absolute inset-0 rounded-full bg-[#5b59bb]/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
//               </div>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="space-y-3">
//             {/* Main heading */}
//             <h3 className="font-medium text-lg text-gray-700 line-clamp-1 transition-all duration-300 group-hover:text-[#5b59bb]">
//               {item.title}
//             </h3>

//             {/* Author and Date */}
//             <div className="flex items-center gap-4 text-sm text-gray-500">
//               <div className="flex items-center gap-1.5">
//                 <User className="w-4 h-4" />
//                 <span>{item.author}</span>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <Clock className="w-4 h-4" />
//                 <span>{item.date}</span>
//               </div>
//             </div>

//             {/* Description with collapse button */}
//             <div className="space-y-2 ">
//               <div 
//                 ref={descriptionRef}
//                 className={`text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700 ${
//                   isExpanded ? '' : 'line-clamp-2'
//                 }`}
//               >
//                 {item.description}
//               </div>
              
//  {shouldShowReadMore && (
//   <button
//     onClick={(e) => {
//       e.stopPropagation();
//       toggleDescription(item.id);
//     }}
//     className="flex items-center ml-auto  gap-1 text-sm text-[#5b59bb] hover:text-[#5b59bb]/80 transition-colors duration-300 font-medium"
//   >
//     {isExpanded ? (
//       <>
//         <ChevronUp className="w-4 h-4" />
//         Show Less
//       </>
//     ) : (
//       <>
//         <ChevronDown className="w-4 h-4" />
//         Read More
//       </>
//     )}
//   </button>
// )}
//             </div>


//             {/* Action buttons */}
//             <div className="flex items-center justify-center pt-4 border-t border-gray-100">
//               <div className="flex items-center gap-4">
//                 <button 
//                   onClick={(e) => handleViewClick(e, item)}
//                   className="relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all border-2 border-[#5b59bb]/80 duration-300 group/btn text-white bg-[#5b59bb] overflow-hidden"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-[#5b59bb]/0 via-[#5b59bb]/10 to-[#5b59bb]/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
//                   <Eye className="w-5 h-5 relative z-10 transition-colors duration-300 " />
//                   <span className="text-sm font-medium relative z-10 transition-colors duration-300 ">View</span>
//                 </button>
//                 <button 
//                   onClick={(e) => handleDownloadClick(e, item)}
//                   className="relative flex items-center gap-2 px-4 py-2 border-2 border-[#5b59bb]/80 rounded-lg transition-all duration-300  group/btn text-white bg-[#5b59bb] overflow-hidden"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-[#5b59bb]/0 via-[#5b59bb]/10 to-[#5b59bb]/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
//                   <Download className="w-5 h-5 relative z-10 transition-colors duration-300 " />
//                   <span className="text-sm font-medium relative z-10 transition-colors duration-300 ">Download</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const Pagination = () => {
//     const pageNumbers = getPageNumbers();
    
//     return (
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t-2 border-gray-200/70">
//         <div className="text-sm text-gray-600">
//           Showing {startIndex + 1} to {Math.min(endIndex, filteredMedia.length)} of {filteredMedia.length} results
//         </div>
        
//         <div className="flex items-center gap-2">
//           {/* Previous button */}
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//             disabled={currentPage === 1}
//             className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>
          
//           {/* Page numbers */}
//           {pageNumbers.map((page, index) => (
//             page === '...' ? (
//               <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
//             ) : (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-300 ${
//                   currentPage === page
//                     ? 'bg-[#5b59bb] text-white border-[#5b59bb] shadow-md'
//                     : 'border-gray-300 text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 {page}
//               </button>
//             )
//           ))}
          
//           {/* Next button */}
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//             disabled={currentPage === totalPages}
//             className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-white ">
//       <style>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
        
//         @keyframes wave {
//           0%, 100% {
//             transform: translateX(-100%);
//           }
//           50% {
//             transform: translateX(100%);
//           }
//         }
        
//         @keyframes soundWave {
//           0%, 100% {
//             transform: scaleY(0.5);
//           }
//           50% {
//             transform: scaleY(1);
//           }
//         }
        
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
      
//       <div className="w-full">
//         {/* Header */}
//         <header className="mb-10">
//           <div 
//             className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
//             style={{
//               animation: isLoaded ? 'fadeInUp 0.5s ease-out' : 'none'
//             }}
//           >
//             <div className="mb-2">
//               <h1 className="text-xl md:text-3xl font-medium text-[#5958bb] mb-1">Training Library</h1>
//               <p className="text-gray-500 font-medium text-sm">Track your quiz and Attempt</p>
//             </div>
            
//           </div>

//           {/* Filter tabs - Centered on small screens */}
//           <div 
//             className="flex flex-wrap gap-3 justify-center md:justify-start"
//             style={{
//               animation: isLoaded ? 'fadeInUp 0.5s ease-out 0.1s both' : 'none'
//             }}
//           >
//             {filterOptions.map((filter, index) => {
//               const Icon = filter.icon;
//               const isActive = activeFilter === filter.id;
              
//               return (
//                 <button
//                   key={filter.id}
//                   onClick={() => {
//                     setActiveFilter(filter.id);
//                     setCurrentPage(1);
//                   }}
//                   className={`
//                     relative flex items-center gap-2 px-4 py-1.5 rounded-lg font-medium transition-all duration-300 shadow-xl overflow-hidden
//                     ${isActive 
//                       ? 'bg-[#5b59bb] text-white border border-[#5b59bb] shadow-xl' 
//                       : 'bg-white text-[#5b59bb] border-2 border-gray-300 hover:shadow-md hover:border-[#5b59bb]/80'
//                     }
//                   `}
//                 >
//                   {!isActive && (
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#5b59bb]/0 via-[#5b59bb]/5 to-[#5b59bb]/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
//                   )}
//                   <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-white' : 'text-[#5b59bb]'}`} />
//                   <span className="relative z-10">{filter.label}</span>
//                   <span className={`
//                     relative z-10 px-2.5 py-1 rounded-full font-semibold transition-all duration-300
//                     ${isActive 
//                       ? 'bg-white/20 text-white font-medium text-sm' 
//                       : 'bg-[#5b59bb]/10 text-[#5b59bb] text-xs border-[#5b59bb]/20 border-2'
//                     }
//                   `}>
//                     {filter.count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Stats */}
//           <div 
//             className="flex items-center justify-between mb-6"
//             style={{
//               animation: isLoaded ? 'fadeInUp 0.5s ease-out 0.2s both' : 'none'
//             }}
//           >
//           </div>
//         </header>

//         {/* Media Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-y-16 gap-y-8">
//           {currentMedia.map((item, index) => (
//             <MediaCard key={item.id} item={item} index={index} />
//           ))}
//         </div>

//         {/* Empty state */}
//         {filteredMedia.length === 0 && (
//           <div 
//             className="text-center py-20"
//             style={{
//               animation: 'fadeInUp 0.5s ease-out'
//             }}
//           >
//             <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
//               <Search className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-2xl font-medium text-gray-900 mb-3">
//               No media found
//             </h3>
//             <p className="text-gray-600 mb-8 max-w-md mx-auto">
//               Try adjusting your search or filter to find what you're looking for.
//             </p>
//             <button
//               onClick={() => {
//                 setActiveFilter("all");
//                 setSearchQuery("");
//                 setCurrentPage(1);
//               }}
//               className="relative px-6 py-3 bg-[#5b59bb] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 border border-[#5b59bb] overflow-hidden group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
//               <span className="relative z-10">Clear all filters</span>
//             </button>
//           </div>
//         )}

//         {/* Pagination - Only show if there are more than 1 page */}
//         {totalPages > 1 && <Pagination />}
//       </div>
//     </div>
//   );
// }



///////////////////////////////////////////

import React, { useState, useEffect, useRef } from "react";
import { 
  FileText, 
  Video, 
  Image, 
  Music,
  Play,
  Eye,
  Download,
  Clock,
  User,
  Grid,
  Search,
  Headphones,
  Film,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const mockMedia = [
  { 
    id: 1, 
    title: "Product Launch Presentation", 
    type: "document", 
    format: "pdf", 
    date: "2024-01-15", 
    author: "John Doe",
    description: "Presentation for the upcoming product launch event. This document contains market analysis, product features, and launch strategy for Q1 2024.",
    color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
    size: "12.4 MB",
    duration: "45 min read",
    viewUrl: "https://www.slideshare.net/slideshow/product-launchpdf-256256328/256256328"
  },
  { 
    id: 2, 
    title: "Sales Training Video", 
    type: "video", 
    format: "mp4", 
    date: "2024-01-14", 
    author: "Jane Smith",
    description: "Complete sales training video covering modern sales techniques, CRM usage, and customer engagement strategies.",
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop",
    color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
    size: "245 MB",
    duration: "32:45",
    viewUrl: "https://www.youtube.com/watch?v=BaDGqm4rEzY"
  },
  { 
    id: 3, 
    title: "Sales Performance Dashboard", 
    type: "image", 
    format: "jpg", 
    date: "2024-01-13", 
    author: "Bob Wilson",
    description: "Q1 2024 sales performance dashboard showing revenue trends, conversion rates, and regional performance metrics.",
    url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop",
    color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
    size: "8.2 MB",
    dimensions: "1920x1080",
    viewUrl: "https://www.google.com/search?q=sales+dashboard+performance+charts&tbm=isch"
  },
  { 
    id: 4, 
    title: "Sales Strategy Podcast", 
    type: "video", 
    format: "mov", 
    date: "2024-01-12", 
    author: "Tech Insights",
    description: "Podcast discussing modern sales strategies, AI in sales, and future trends in B2B sales technology.",
    cover: "https://images.unsplash.com/photo-1478737270239-2f02b77fc478?w=400&h=400&fit=crop",
    color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
    size: "48 MB",
    duration: "42:18",
    viewUrl: "https://www.youtube.com/watch?v=5O-sLe6iOns"
  },
  { 
    id: 5, 
    title: "Q4 Sales Report", 
    type: "document", 
    format: "docx", 
    date: "2024-01-11", 
    author: "Finance Team",
    description: "Detailed quarterly sales report including revenue analysis, customer acquisition costs, and sales team performance metrics.",
    color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
    size: "5.7 MB",
    duration: "30 min read",
    viewUrl: "https://www.coxautoinc.com/wp-content/uploads/2025/01/Q4-2024-Kelley-Blue-Book-EV-Sales-Report.pdf"
  },
  { 
    id: 6, 
    title: "Client Testimonial Compilation", 
    type: "video", 
    format: "mov", 
    date: "2024-01-10", 
    author: "Marketing Dept",
    description: "Video compilation of client testimonials and success stories from our top enterprise customers.",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop",
    color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
    size: "512 MB",
    duration: "18:22",
    viewUrl: "https://www.youtube.com/watch?v=Uf4JAss1vEo"
  },
  { 
    id: 7, 
    title: "Product Showcase Gallery", 
    type: "image", 
    format: "png", 
    date: "2024-01-09", 
    author: "Design Team",
    description: "High-quality product images and marketing materials for our flagship sales automation software.",
    url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
    size: "15.3 MB",
    dimensions: "2560x1440",
    viewUrl: "https://www.google.com/search?q=sales+software+product+showcase&tbm=isch"
  },
  { 
    id: 8, 
    title: "Sales Motivational Audio", 
    type: "video", 
    format: "mov", 
    date: "2024-01-08", 
    author: "Creative Studio",
    description: "Audio recording of motivational speeches and sales success stories for team training sessions.",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    color: "from-[#5b59bb]/80 to-[#5b59bb]/70",
    size: "89 MB",
    duration: "58:12",
    viewUrl: "https://www.youtube.com/watch?v=bDk8yAPxAQ0"
  }
];

const filterOptions = [
  { id: "video", label: "Videos", icon: Film, count: 2 },
  { id: "document", label: "Documents", icon: FileText, count: 2 },
  { id: "image", label: "Images", icon: Image, count: 2 },
  // { id: "audio", label: "Audios", icon: Headphones, count: 2 }
];

export default function UserViewer() {
  const [activeFilter, setActiveFilter] = useState("video");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    setIsLoaded(true);
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(2); 
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(4); 
      } else {
        setItemsPerPage(6); 
      }
    };
    
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const filteredMedia = mockMedia.filter(item => {
    return item.type === activeFilter;
  }).filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMedia = filteredMedia.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'document': return FileText;
      case 'video': return Film;
      case 'image': return Image;
      case 'audio': return Headphones;
      default: return FileText;
    }
  };

  const handleViewClick = (e, mediaItem) => {
    e.stopPropagation(); 
    if (mediaItem.viewUrl) {
      window.open(mediaItem.viewUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDownloadClick = (e, mediaItem) => {
    e.stopPropagation(); 
    alert(`Downloading: ${mediaItem.title}`);
  };

  const toggleDescription = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const MediaCard = ({ item, index }) => {
    const TypeIcon = getTypeIcon(item.type);
    const isExpanded = expandedCards[item.id];
    const descriptionRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
      const checkOverflow = () => {
        if (descriptionRef.current) {
          const element = descriptionRef.current;
          
          // Check if text is truncated (has ellipsis)
          // We'll use a simpler approach: check if scrollHeight is greater than clientHeight
          // when in collapsed state
          if (!isExpanded) {
            const lineHeight = 1.4; // Approximate line height for text-sm
            const fontSize = 14; // text-sm is ~14px
            const maxHeight = 2 * lineHeight * fontSize; // 2 lines * line-height * font-size
            
            // Check if content exceeds 2 lines
            const isOverflowing = element.scrollHeight > maxHeight;
            setIsOverflowing(isOverflowing);
          } else {
            // When expanded, we always show the button to collapse
            setIsOverflowing(true);
          }
        }
      };

      // Check after a short delay to ensure DOM is rendered
      const timeoutId = setTimeout(checkOverflow, 100);
      
      // Also check when window resizes
      window.addEventListener('resize', checkOverflow);
      
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', checkOverflow);
      };
    }, [item.id, isExpanded]);

    // Simple check: show Read More for descriptions longer than 80 characters
    const shouldShowReadMore = isOverflowing || isExpanded;

    return (
      <div 
        className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
        style={{
          animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
        }}
      >
        <div className="relative h-1.5 overflow-hidden">
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-[#5b59bb]/90 to-[#5b59bb]/70`}
          />
        </div>
        
        <div className="p-4">
          <div className="relative mb-2 overflow-hidden rounded-xl">
            {item.type === 'image' && (
              <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img 
                  src={item.url} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5b59bb]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            )}
            
            {item.type === 'video' && (
              <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform transition-all duration-500 shadow-2xl group-hover:scale-125 group-hover:bg-[#5b59bb]">
                      <Play className="w-7 h-7 ml-1 transition-colors duration-300 text-gray-900 group-hover:text-white" />
                    </div>
                   
                    <div className="absolute inset-0 rounded-full bg-white/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                  </div>
                </div>
              </div>
            )}
            
            {item.type === 'audio' && (
              <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <img 
                  src={item.cover} 
                  alt={item.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-all duration-500"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/20 transition-all duration-500 group-hover:scale-110">
                    <Headphones className="w-10 h-10 text-white transition-all duration-500 group-hover:scale-110" />
                    {/* Sound waves */}
                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex gap-1">
                        <div className="w-1 bg-white/60 rounded-full" style={{ height: '12px', animation: 'soundWave 0.8s ease-in-out infinite' }} />
                        <div className="w-1 bg-white/60 rounded-full" style={{ height: '20px', animation: 'soundWave 0.8s ease-in-out 0.1s infinite' }} />
                        <div className="w-1 bg-white/60 rounded-full" style={{ height: '16px', animation: 'soundWave 0.8s ease-in-out 0.2s infinite' }} />
                      </div>
                    </div>
                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex gap-1">
                        <div className="w-1 bg-white/60 rounded-full" style={{ height: '16px', animation: 'soundWave 0.8s ease-in-out infinite' }} />
                        <div className="w-1 bg-white/60 rounded-full" style={{ height: '20px', animation: 'soundWave 0.8s ease-in-out 0.1s infinite' }} />
                        <div className="w-1 bg-white/60 rounded-full" style={{ height: '12px', animation: 'soundWave 0.8s ease-in-out 0.2s infinite' }} />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#5b59bb] to-purple-400 transition-all duration-1000 group-hover:w-2/3"
                      style={{ width: '33%' }}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {item.type === 'document' && (
              <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="relative">
                    <div className="w-32 h-40 bg-white rounded-lg shadow-lg transform transition-all duration-500 group-hover:shadow-2xl">
                      <div className="absolute inset-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded overflow-hidden">
                        <div className="p-4">
                          <div className="space-y-2">
                            <div className="h-2 bg-gradient-to-r from-[#5b59bb] to-purple-400 rounded transition-all duration-500" style={{ width: '100%' }}></div>
                            <div className="h-2 bg-gradient-to-r from-[#5b59bb] to-purple-400 rounded transition-all duration-500 delay-75" style={{ width: '75%' }}></div>
                            <div className="h-2 bg-gradient-to-r from-[#5b59bb] to-purple-400 rounded transition-all duration-500 delay-150" style={{ width: '50%' }}></div>
                            <div className="h-2 bg-gray-200 rounded transition-all duration-500 delay-200 group-hover:bg-gradient-to-r group-hover:from-[#5b59bb] group-hover:to-purple-400" style={{ width: '60%' }}></div>
                            <div className="h-2 bg-gray-200 rounded transition-all duration-500 delay-300 group-hover:bg-gradient-to-r group-hover:from-[#5b59bb] group-hover:to-purple-400" style={{ width: '40%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#5b59bb] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Type badge with glow effect */}
            <div className="absolute top-3 left-3 transform transition-all duration-300 group-hover:scale-105">
              <div className="relative flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-lg transition-all duration-300">
                <TypeIcon className="w-4 h-4 text-[#5b59bb]" />
                <span className="capitalize text-gray-700">{item.type}</span>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-[#5b59bb]/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            {/* Main heading */}
            <h3 className="font-medium text-lg text-gray-700 line-clamp-1 transition-all duration-300 group-hover:text-[#5b59bb]">
              {item.title}
            </h3>

            {/* Author and Date */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{item.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{item.date}</span>
              </div>
            </div>

            {/* Description with collapse button */}
            <div className="space-y-2 ">
              <div 
                ref={descriptionRef}
                className={`text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700 ${
                  isExpanded ? '' : 'line-clamp-2'
                }`}
              >
                {item.description}
              </div>
              
 {shouldShowReadMore && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      toggleDescription(item.id);
    }}
    className="flex items-center ml-auto  gap-1 text-sm text-[#5b59bb] hover:text-[#5b59bb]/80 transition-colors duration-300 font-medium"
  >
    {isExpanded ? (
      <>
        <ChevronUp className="w-4 h-4" />
        Show Less
      </>
    ) : (
      <>
        <ChevronDown className="w-4 h-4" />
        Read More
      </>
    )}
  </button>
)}
            </div>


            {/* Action buttons */}
            <div className="flex items-center justify-center pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <button 
                  onClick={(e) => handleViewClick(e, item)}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all border-2 border-[#5b59bb]/80 duration-300 group/btn text-white bg-[#5b59bb] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5b59bb]/0 via-[#5b59bb]/10 to-[#5b59bb]/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                  <Eye className="w-5 h-5 relative z-10 transition-colors duration-300 " />
                  <span className="text-sm font-medium relative z-10 transition-colors duration-300 ">View</span>
                </button>
                <button 
                  onClick={(e) => handleDownloadClick(e, item)}
                  className="relative flex items-center gap-2 px-4 py-2 border-2 border-[#5b59bb]/80 rounded-lg transition-all duration-300  group/btn text-white bg-[#5b59bb] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5b59bb]/0 via-[#5b59bb]/10 to-[#5b59bb]/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                  <Download className="w-5 h-5 relative z-10 transition-colors duration-300 " />
                  <span className="text-sm font-medium relative z-10 transition-colors duration-300 ">Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Pagination = () => {
    const pageNumbers = getPageNumbers();
    
    return (
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t-2 border-gray-200/70">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredMedia.length)} of {filteredMedia.length} results
        </div>
        
        <div className="flex items-center gap-2">
          {/* Previous button */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {/* Page numbers */}
          {pageNumbers.map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-[#5b59bb] text-white border-[#5b59bb] shadow-md'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            )
          ))}
          
          {/* Next button */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white ">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes wave {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
        
        @keyframes soundWave {
          0%, 100% {
            transform: scaleY(0.5);
          }
          50% {
            transform: scaleY(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
      
      <div className="w-full">
        {/* Header */}
        <header className="mb-10">
          <div 
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
            style={{
              animation: isLoaded ? 'fadeInUp 0.5s ease-out' : 'none'
            }}
          >
            <div className="mb-2">
              <h1 className="text-xl md:text-3xl font-medium text-[#5958bb] mb-1">Training Library</h1>
              {/* <p className="text-gray-500 font-medium text-sm">Track your quiz and Attempt</p> */}
            </div>
            
          </div>

          {/* Filter tabs - Centered on small screens */}
          <div 
            className="flex flex-wrap gap-3 justify-center md:justify-start "
            style={{
              animation: isLoaded ? 'fadeInUp 0.5s ease-out 0.1s both' : 'none'
            }}
          >
            {filterOptions.map((filter, index) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.id;
              
              return (
                <button
                  key={filter.id}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    setCurrentPage(1);
                  }}
                  className={`
                    relative flex items-center gap-2 px-4 py-1.5 rounded-lg font-medium transition-all duration-300 shadow-xl overflow-hidden
                    ${isActive 
                      ? 'bg-[#5b59bb] text-white border border-[#5b59bb] shadow-xl' 
                      : 'bg-white text-[#5b59bb] border-2 border-gray-300 hover:shadow-md hover:border-[#5b59bb]/80'
                    }
                  `}
                >
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5b59bb]/0 via-[#5b59bb]/5 to-[#5b59bb]/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
                  )}
                  <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-white' : 'text-[#5b59bb]'}`} />
                  <span className="relative z-10">{filter.label}</span>
                  <span className={`
                    relative z-10 px-2.5 py-1 rounded-full font-semibold transition-all duration-300
                    ${isActive 
                      ? 'bg-white/20 text-white font-medium text-sm' 
                      : 'bg-[#5b59bb]/10 text-[#5b59bb] text-xs border-[#5b59bb]/20 border-2'
                    }
                  `}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stats */}
          <div 
            className="flex items-center justify-between mb-6"
            style={{
              animation: isLoaded ? 'fadeInUp 0.5s ease-out 0.2s both' : 'none'
            }}
          >
          </div>
        </header>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-y-16 gap-y-8">
          {currentMedia.map((item, index) => (
            <MediaCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Empty state */}
        {filteredMedia.length === 0 && (
          <div 
            className="text-center py-20"
            style={{
              animation: 'fadeInUp 0.5s ease-out'
            }}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-3">
              No media found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setActiveFilter("document");
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="relative px-6 py-3 bg-[#5b59bb] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 border border-[#5b59bb] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10">Reset filters</span>
            </button>
          </div>
        )}

        {/* Pagination - Only show if there are more than 1 page */}
        {totalPages > 1 && <Pagination />}
      </div>
    </div>
  );
}