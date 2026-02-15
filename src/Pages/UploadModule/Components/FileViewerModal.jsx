// import React, { useState, useEffect } from 'react';
// import { X, Download, FileText, Video, Image as ImageIcon, Headphones, AlertCircle } from 'lucide-react';
// import { toast } from 'sonner';

// const FileViewerModal = ({ isOpen, onClose, fileUrl, fileType, fileName }) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [pdfUrl, setPdfUrl] = useState(null);
//     const [docxUrl, setDocxUrl] = useState(null);

//     useEffect(()=>{
//         console.log("This is my File URL: ",fileUrl)
//     },[fileUrl])

//     // Function to construct full URL from file path
//     const getFullFileUrl = (filePath) => {
//         if (!filePath) return '';
        
//         // If it's already a full URL, return as is
//         if (filePath.startsWith('http')) {
//             return filePath;
//         }
        
//         // Remove any leading slashes or storage prefix
//         let cleanPath = filePath;
//         if (cleanPath.startsWith('/storage/')) {
//             cleanPath = cleanPath.substring(9); // Remove '/storage/'
//         } else if (cleanPath.startsWith('storage/')) {
//             cleanPath = cleanPath.substring(8); // Remove 'storage/'
//         } else if (cleanPath.startsWith('/')) {
//             cleanPath = cleanPath.substring(1); // Remove leading slash
//         }
        
//         // Construct the full URL
//         const baseUrl = 'https://backend.cuppacoin.com/public/storage';
//         return `${baseUrl}/${cleanPath}`;
//     };

//     useEffect(() => {
//         console.log("File URL: ", fileUrl);
//         console.log("Full URL: ", getFullFileUrl(fileUrl));
        
//         if (isOpen && fileUrl) {
//             setLoading(true);
//             setError(null);

//             // Handle different file types
//             if (fileType === 'document') {
//                 if (fileName.toLowerCase().endsWith('.pdf')) {
//                     // PDF files can be displayed directly
//                     setPdfUrl(getFullFileUrl(fileUrl));
//                     setLoading(false);
//                 } else if (fileName.toLowerCase().endsWith('.docx') || fileName.toLowerCase().endsWith('.doc')) {
//                     // DOCX files need special handling - we'll show download option
//                     setDocxUrl(getFullFileUrl(fileUrl));
//                     setLoading(false);
//                 } else {
//                     // For other document types, show download option
//                     setLoading(false);
//                 }
//             } else {
//                 setLoading(false);
//             }
//         }
//     }, [isOpen, fileUrl, fileType, fileName]);

//     const handleDownload = async () => {
//         try {
//             const fullUrl = getFullFileUrl(fileUrl);
//             console.log("Download URL: ", fullUrl);
            
//             const response = await fetch(fullUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Accept': '*/*',
//                 },
//                 mode: 'cors'
//             });
            
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
            
//             const blob = await response.blob();
//             const downloadUrl = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = downloadUrl;
//             a.download = fileName || 'download';
//             document.body.appendChild(a);
//             a.click();
//             document.body.removeChild(a);
//             window.URL.revokeObjectURL(downloadUrl);
//             toast.success('Downloaded!');
//         } catch (err) {
//             console.error('Download error:', err);
//             toast.error('Failed to download file');
            
//             // Fallback: try direct link
//             try {
//                 const fullUrl = getFullFileUrl(fileUrl);
//                 const a = document.createElement('a');
//                 a.href = fullUrl;
//                 a.download = fileName || 'download';
//                 a.target = '_blank';
//                 a.rel = 'noopener noreferrer';
//                 document.body.appendChild(a);
//                 a.click();
//                 document.body.removeChild(a);
//             } catch (fallbackError) {
//                 console.error('Fallback download error:', fallbackError);
//             }
//         }
//     };

//     const getFileIcon = () => {
//         switch (fileType) {
//             case 'document':
//                 return <FileText className="w-5 h-5 text-[#5958bb]" />;
//             case 'video':
//                 return <Video className="w-5 h-5 text-[#5958bb]" />;
//             case 'image':
//                 return <ImageIcon className="w-5 h-5 text-[#5958bb]" />;
//             default:
//                 return <FileText className="w-5 h-5 text-[#5958bb]" />;
//         }
//     };

//     const renderFileContent = () => {
//         if (loading) {
//             return (
//                 <div className="flex items-center justify-center h-full">
//                     <div className="text-center">
//                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5958bb] mx-auto mb-4"></div>
//                         <p className="text-gray-600">Loading file...</p>
//                     </div>
//                 </div>
//             );
//         }

//         if (error) {
//             return (
//                 <div className="flex items-center justify-center h-full">
//                     <div className="text-center">
//                         <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//                         <p className="text-red-600 font-medium mb-2">Failed to load file</p>
//                         <p className="text-gray-600">Please try again or download the file</p>
//                     </div>
//                 </div>
//             );
//         }

//         const fullFileUrl = getFullFileUrl(fileUrl);
        
//         switch (fileType) {
//             case 'image':
//                 return (
//                     <div className="h-full flex items-center justify-center">
//                         {console.log("Image Preview: ",fullFileUrl)}
//                         <img
//                             src={fullFileUrl}
//                             alt={fileName}
//                             className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
//                             onLoad={() => setLoading(false)}
//                             onError={(e) => {
//                                 console.error('Image load error:', e);
//                                 setError(true);
//                                 setLoading(false);
//                             }}
//                             crossOrigin="anonymous"
//                         />
//                     </div>
//                 );

//             case 'video':
//                 return (
//                     <div className="h-full flex items-center justify-center">
//                         <video
//                             controls
//                             autoPlay
//                             muted
//                             playsInline
//                             className="max-h-full max-w-full rounded-lg shadow-lg"
//                             onLoadedData={() => {
//                                 console.log('Video loaded successfully:', fullFileUrl);
//                                 setLoading(false);
//                             }}
//                             onError={(e) => {
//                                 console.error('Video load error:', e);
//                                 setError(true);
//                                 setLoading(false);
//                             }}
//                         >
//                             <source src={fullFileUrl} type="video/mp4" />
//                             <source src={fullFileUrl} type="video/quicktime" />
//                             <source src={fullFileUrl} type="video/webm" />
//                             Your browser does not support the video tag.
//                         </video>
//                     </div>
//                 );

//             case 'document':
//                 if (fileName.toLowerCase().endsWith('.pdf')) {
//                     return (
//                         <div className="h-full w-full">
//                             <iframe
//                                 src={pdfUrl}
//                                 title={fileName}
//                                 className="w-full h-full rounded-lg"
//                                 onLoad={() => setLoading(false)}
//                                 onError={() => {
//                                     setError(true);
//                                     setLoading(false);
//                                 }}
//                             />
//                         </div>
//                     );
//                 } else {
//                     return (
//                         <div className="h-full flex items-center justify-center p-8">
//                             <div className="text-center max-w-md">
//                                 {getFileIcon()}
//                                 <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">{fileName}</h3>
//                                 <p className="text-gray-600 mb-6">
//                                     This document type cannot be previewed in the browser.
//                                     Please download the file to view it.
//                                 </p>
//                                 <button
//                                     onClick={handleDownload}
//                                     className="inline-flex items-center gap-2 px-6 py-3 bg-[#5958bb] text-white rounded-lg font-medium hover:bg-[#4a47a3] transition-colors shadow-md hover:shadow-lg"
//                                 >
//                                     <Download className="w-5 h-5" />
//                                     Download Document
//                                 </button>
//                             </div>
//                         </div>
//                     );
//                 }

//             default:
//                 return (
//                     <div className="h-full flex items-center justify-center p-8">
//                         <div className="text-center max-w-md">
//                             {getFileIcon()}
//                             <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">{fileName}</h3>
//                             <p className="text-gray-600 mb-6">
//                                 This file type cannot be previewed.
//                                 Please download the file to view it.
//                             </p>
//                             <button
//                                 onClick={handleDownload}
//                                 className="inline-flex items-center gap-2 px-6 py-3 bg-[#5958bb] text-white rounded-lg font-medium hover:bg-[#4a47a3] transition-colors shadow-md hover:shadow-lg"
//                             >
//                                 <Download className="w-5 h-5" />
//                                 Download File
//                             </button>
//                         </div>
//                     </div>
//                 );
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//             <div className="bg-gray-200 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col border border-gray-200">
//                 {/* Enhanced Header */}
//                 <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50/50">
//                     <div className="flex items-center gap-4">
//                         {/* File info container */}
//                         <div className="flex items-center gap-3 p-2.5 bg-white rounded-xl border-2 border-[#5959b9]/50 shadow-sm">
//                             {/* Icon with accent */}
//                             <div className="relative">
//                                 <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-white to-gray-50 rounded-lg border border-[#5958bb]">
//                                     {getFileIcon()}
//                                 </div>
//                                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#5958bb] rounded-full border-2 border-white"></div>
//                             </div>
                            
//                             {/* File details */}
//                             <div className="min-w-0">
//                                 <div className="flex items-center gap-2">
//                                     <h2 className="text-base font-medium text-[#5959b9] truncate max-w-[200px]">
//                                         {fileName}
//                                     </h2>
//                                     <span className="px-2 py-0.5 text-xs font-normal bg-[#5958bb] text-white rounded-md border border-[#5958bb]/20">
//                                         {fileType.toUpperCase()}
//                                     </span>
//                                 </div>
//                                 <div className="flex items-center gap-2 mt-1">
//                                     <span className="text-xs text-gray-600 font-medium">
//                                         {new Date().toLocaleDateString('en-US', { 
//                                             month: 'short', 
//                                             day: 'numeric',
//                                             year: 'numeric'
//                                         })}
//                                     </span>
//                                     <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                                     <span className="text-xs font-medium text-gray-600">Ready to view</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
                    
//                     <div className="flex items-center gap-3">
//                         {/* <button
//                             onClick={handleDownload}
//                             className="flex items-center gap-2 px-3 py-1.5 bg-[#5958bb] text-white rounded-lg font-medium hover:bg-[#4a47a3] transition-all duration-300 group shadow-lg"
//                         >
//                             <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
//                             <span>Download</span>
//                         </button> */}
//                         <button
//                             onClick={onClose}
//                             className="p-2 text-red-800 bg-red-100 border-2 border-red-400 rounded-full"
//                         >
//                             <X className="w-5 h-5" />
//                         </button>
//                     </div>
//                 </div>

//                 {/* File Content */}
//                 <div className="flex-1 overflow-auto p-6">
//                     {renderFileContent()}
//                 </div>

//                 {/* Footer */}
//                 <div className="p-4 border-t border-gray-200 text-center">
//                     {/* <p className="text-gray-500 text-sm">
//                         File opened in viewer • Use download button to save locally
//                     </p> */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FileViewerModal;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState, useEffect, useRef } from 'react';
import { X, Download, FileText, Video, Image as ImageIcon, Headphones, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const FileViewerModal = ({ isOpen, onClose, fileUrl, fileType, fileName }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [docxUrl, setDocxUrl] = useState(null);
    const [imageLoadAttempt, setImageLoadAttempt] = useState(0);
    const imageRef = useRef(null);
    
    // useEffect(() => {
    //     console.log("This is my File URL: ", fileUrl);
    // }, [fileUrl]);
    
    // Function to construct full URL from file path
    const getFullFileUrl = (filePath) => {
        if (!filePath) return '';
        
        // If it's already a full URL, return as is
        if (filePath.startsWith('http')) {
            return filePath;
        }
        
        // Remove any leading slashes or storage prefix
        let cleanPath = filePath;
        if (cleanPath.startsWith('/storage/')) {
            cleanPath = cleanPath.substring(9); // Remove '/storage/'
        } else if (cleanPath.startsWith('storage/')) {
            cleanPath = cleanPath.substring(8); // Remove 'storage/'
        } else if (cleanPath.startsWith('/')) {
            cleanPath = cleanPath.substring(1); // Remove leading slash
        }
        
        // Construct the full URL
        const baseUrl = 'https://backend.cuppacoin.com/public/storage';
        return `${baseUrl}/${cleanPath}`;
    };
    
    // Reset states when modal opens/closes or file changes
    useEffect(() => {
        if (isOpen && fileUrl) {
            // console.log("=== Modal Opened ===");
            // console.log("File URL: ", fileUrl);
            // console.log("Full URL: ", getFullFileUrl(fileUrl));
            // console.log("File Type: ", fileType);
            // console.log("File Name: ", fileName);
            
            setLoading(true);
            setError(null);
            setImageLoadAttempt(0);
            
            // Handle different file types
            if (fileType === 'document') {
                if (fileName.toLowerCase().endsWith('.pdf')) {
                    setPdfUrl(getFullFileUrl(fileUrl));
                    setLoading(false);
                } else if (fileName.toLowerCase().endsWith('.docx') || fileName.toLowerCase().endsWith('.doc')) {
                    setDocxUrl(getFullFileUrl(fileUrl));
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } else if (fileType === 'image') {
                // For images, keep loading true until image loads
              //  console.log("Image type detected, waiting for image to load...");
                setLoading(true);
                setError(null);
            } else {
                setLoading(false);
            }
        } else {
            // Reset when modal closes
            setLoading(true);
            setError(null);
            setPdfUrl(null);
            setDocxUrl(null);
            setImageLoadAttempt(0);
        }
    }, [isOpen, fileUrl, fileType, fileName]);
    
    // Pre-load image to check if it exists
    useEffect(() => {
        if (isOpen && fileType === 'image' && fileUrl && imageLoadAttempt < 2) {
            const fullUrl = getFullFileUrl(fileUrl);
          //  console.log(`Attempting to preload image (attempt ${imageLoadAttempt + 1}):`, fullUrl);
            
            const img = new Image();
            
            img.onload = () => {
             //   console.log("✓ Image preloaded successfully");
                setLoading(false);
                setError(null);
            };
            
            img.onerror = (e) => {
                console.error("✗ Image preload failed:", e);
                console.error("Failed URL:", fullUrl);
                
                // Try one more time after a short delay
                if (imageLoadAttempt === 0) {
                  //  console.log("Retrying image load in 1 second...");
                    setTimeout(() => {
                        setImageLoadAttempt(1);
                    }, 1000);
                } else {
                    console.error("Image load failed after retry");
                    setError(true);
                    setLoading(false);
                }
            };
            
            // Add timestamp to prevent caching issues
            img.src = `${fullUrl}?t=${Date.now()}`;
        }
    }, [isOpen, fileType, fileUrl, imageLoadAttempt]);
    
    const handleDownload = async () => {
        try {
            const fullUrl = getFullFileUrl(fileUrl);
        //    console.log("Download URL: ", fullUrl);
            
            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                },
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = fileName || 'download';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(downloadUrl);
            toast.success('Downloaded!');
        } catch (err) {
            console.error('Download error:', err);
            toast.error('Failed to download file');
            
            // Fallback: try direct link
            try {
                const fullUrl = getFullFileUrl(fileUrl);
                const a = document.createElement('a');
                a.href = fullUrl;
                a.download = fileName || 'download';
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } catch (fallbackError) {
                console.error('Fallback download error:', fallbackError);
            }
        }
    };
    
    const getFileIcon = () => {
        switch (fileType) {
            case 'document':
                return <FileText className="w-5 h-5 text-[#5958bb]" />;
            case 'video':
                return <Video className="w-5 h-5 text-[#5958bb]" />;
            case 'image':
                return <ImageIcon className="w-5 h-5 text-[#5958bb]" />;
            default:
                return <FileText className="w-5 h-5 text-[#5958bb]" />;
        }
    };
    
    // Get modal size based on file type
    const getModalSize = () => {
        switch (fileType) {
            case 'video':
                return 'w-full max-w-[80vw] h-[95vh] '; // Almost full screen for video
            case 'image':
                return 'w-[90%] md:max-w-[75vw]  h-[85vh]'; // Larger for images
            case 'document':
            default:
                return 'w-full max-w-6xl h-[90vh]'; // Standard size for documents
        }
    };
    
    const renderFileContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5958bb] mx-auto mb-4"></div>
                        <p className="text-gray-600 mb-2">Loading {fileType}...</p>
                        {/* <p className="text-gray-400 text-sm">Attempt {imageLoadAttempt + 1}</p> */}
                    </div>
                </div>
            );
        }
        
        if (error) {
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center max-w-md">
                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <p className="text-red-600 font-medium mb-2">Failed to load {fileType}</p>
                        <p className="text-gray-600 mb-2">The file could not be displayed in the browser.</p>
                        <p className="text-gray-500 text-sm mb-4">URL: {getFullFileUrl(fileUrl)}</p>
                        {/* <button
                            onClick={handleDownload}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5958bb] text-white rounded-lg font-medium hover:bg-[#4a47a3] transition-colors shadow-md hover:shadow-lg"
                        >
                            <Download className="w-5 h-5" />
                            Download File
                        </button> */}
                    </div>
                </div>
            );
        }
        
        const fullFileUrl = getFullFileUrl(fileUrl);
        
        switch (fileType) {
            case 'image':
            //    console.log("Rendering image component with URL:", fullFileUrl);
                return (
                    <div className="h-full flex items-center justify-center bg-gray-50 p-6">
                        <img
                            ref={imageRef}
                            src={`${fullFileUrl}?t=${Date.now()}`}
                            alt={fileName}
                            className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                            style={{ display: 'block', minWidth: '400px', minHeight: '400px' }}
                            onLoad={(e) => {
                             //   console.log('✓ Image rendered successfully in DOM');
                             //   console.log('Image dimensions:', e.target.naturalWidth, 'x', e.target.naturalHeight);
                                setLoading(false);
                                setError(null);
                            }}
                            onError={(e) => {
                                console.error('✗ Image render error in DOM');
                                console.error('Error event:', e);
                                console.error('Failed URL:', fullFileUrl);
                                setError(true);
                                setLoading(false);
                            }}
                        />
                    </div>
                );
                
            case 'video':
                return (
                    <div className="h-full w-full flex items-center justify-center bg-black">
                        <video
                            controls
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-full object-contain"
                            style={{ maxHeight: '100%', maxWidth: '100%' }}
                            onLoadedData={() => {
                                // console.log('Video loaded successfully:', fullFileUrl);
                                setLoading(false);
                            }}
                            onError={(e) => {
                                console.error('Video load error:', e);
                                setError(true);
                                setLoading(false);
                            }}
                        >
                            <source src={fullFileUrl} type="video/mp4" />
                            <source src={fullFileUrl} type="video/quicktime" />
                            <source src={fullFileUrl} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                );
                
            case 'document':
                if (fileName.toLowerCase().endsWith('.pdf')) {
                    return (
                        <div className="h-full w-full">
                            <iframe
                                src={pdfUrl}
                                title={fileName}
                                className="w-full h-full rounded-lg"
                                onLoad={() => setLoading(false)}
                                onError={() => {
                                    setError(true);
                                    setLoading(false);
                                }}
                            />
                        </div>
                    );
                } else {
                    return (
                        <div className="h-full flex items-center justify-center p-8">
                            <div className="text-center max-w-md">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {getFileIcon()}
                                </div>
                                <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">{fileName}</h3>
                                <p className="text-gray-600 mb-6">
                                    This document type cannot be previewed in the browser.
                                    Please download the file to view it.
                                </p>
                                {/* <button
                                    onClick={handleDownload}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#5958bb] text-white rounded-lg font-medium hover:bg-[#4a47a3] transition-colors shadow-md hover:shadow-lg"
                                >
                                    <Download className="w-5 h-5" />
                                    Download Document
                                </button> */}
                            </div>
                        </div>
                    );
                }
                
            default:
                return (
                    <div className="h-full flex items-center justify-center p-8">
                        <div className="text-center max-w-md">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                {getFileIcon()}
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">{fileName}</h3>
                            <p className="text-gray-600 mb-6">
                                This file type cannot be previewed.
                                Please download the file to view it.
                            </p>
                            {/* <button
                                onClick={handleDownload}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5958bb] text-white rounded-lg font-medium hover:bg-[#4a47a3] transition-colors shadow-md hover:shadow-lg"
                            >
                                <Download className="w-5 h-5" />
                                Download File
                            </button> */}
                        </div>
                    </div>
                );
        }
    };
    
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className={`bg-gray-200 rounded-2xl shadow-2xl ${getModalSize()} flex flex-col border border-gray-200 transition-all duration-300`}>
                {/* Enhanced Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50/50 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        {/* File info container */}
               <div className="hidden md:flex flex-row items-center gap-3 p-2.5 bg-white rounded-xl border-2 border-[#5959b9]/50 shadow-sm">
    {/* Icon with accent */}
    <div className="relative flex-shrink-0">
        <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-white to-gray-50 rounded-lg border border-[#5958bb]">
            {getFileIcon()}
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#5958bb] rounded-full border-2 border-white"></div>
    </div>
    
    {/* File details */}
    <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
            <h2 className="text-base font-medium text-[#5959b9] truncate max-w-[200px]">
                {fileName}
            </h2>
            <span className="px-2 py-0.5 text-xs font-normal bg-[#5958bb] text-white rounded-md border border-[#5958bb]/20 whitespace-nowrap">
                {fileType.toUpperCase()}
            </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-600 font-medium">
                {new Date().toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                })}
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-xs font-medium text-gray-600">
                {loading ? 'Loading...' : error ? 'Error' : 'Ready to view'}
            </span>
        </div>
    </div>
</div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {/* <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-3 py-1.5 bg-[#5958bb] text-white rounded-lg font-medium hover:bg-[#4a47a3] transition-all duration-300 group shadow-lg"
                        >
                            <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                            <span>Download</span>
                        </button> */}
                        <button
                            onClick={onClose}
                            className="p-2 text-red-800 bg-red-100 border-2 border-red-400 rounded-full hover:bg-red-200 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                
                {/* File Content - adjusted padding based on file type */}
                <div className={`flex-1 overflow-auto ${fileType === 'video' ? 'p-0' : fileType === 'image' ? 'p-8' : 'p-6'}`}>
                    {renderFileContent()}
                </div>
                

            </div>
        </div>
    );
};

export default FileViewerModal;