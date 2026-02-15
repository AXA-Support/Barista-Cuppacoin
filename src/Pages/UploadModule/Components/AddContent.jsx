import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { 
  FileText, 
  Video, 
  Image as ImageIcon, 
  Upload, 
  X, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Briefcase,
  RotateCcw,
  FileUp
} from 'lucide-react';
import { toast } from 'sonner';

// Update the component to accept preSelectedStore prop
const UploadModal = ({ onClose, onSubmit, currentStore, currentOwner, preSelectedStore }) => {
  const { stores, loading: storesLoading } = useSelector((state) => state.store);
  const { currentOwner: ownerFromStore } = useSelector((state) => state.owner);

  // Initialize formData with preSelectedStore if available
  const [formData, setFormData] = useState({
    store_id: preSelectedStore || currentStore?.id || '',
    fileType: 'Videos',
    title: '',
    description: '',
    file: null
  });

  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [currentStoreIndex, setCurrentStoreIndex] = useState(0);
  const [visibleStores, setVisibleStores] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  const fileTypes = [
    { type: 'Docx', icon: <FileText className="w-4 h-4" /> },
    { type: 'Videos', icon: <Video className="w-4 h-4" /> },
    { type: 'Images', icon: <ImageIcon className="w-4 h-4" /> }
  ];

  // Get available stores
  const availableStores = stores || [];
  const selectedStore = availableStores.find(store => store.id == formData.store_id);

  // Find the index of the pre-selected store to show it in the visible stores
  useEffect(() => {
    if (preSelectedStore && availableStores.length > 0) {
      const storeIndex = availableStores.findIndex(store => store.id == preSelectedStore);
      if (storeIndex !== -1) {
        // Calculate which set of 3 stores should be shown to include the pre-selected store
        let startIndex = Math.floor(storeIndex / 3) * 3;
        startIndex = Math.max(0, Math.min(startIndex, availableStores.length - 3));
        setCurrentStoreIndex(startIndex);
      }
    }
  }, [preSelectedStore, availableStores]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update visible stores when available stores change
  useEffect(() => {
    if (availableStores.length > 0) {
      updateVisibleStores();
    }
  }, [availableStores, currentStoreIndex]);

  // Update visible stores (show 3 stores at a time)
  const updateVisibleStores = () => {
    const start = currentStoreIndex;
    const end = Math.min(start + 3, availableStores.length);
    setVisibleStores(availableStores.slice(start, end));
  };

  // Navigate to previous stores
  const prevStores = () => {
    if (currentStoreIndex > 0) {
      setCurrentStoreIndex(prev => prev - 1);
    }
  };

  // Navigate to next stores
  const nextStores = () => {
    if (currentStoreIndex + 3 < availableStores.length) {
      setCurrentStoreIndex(prev => prev + 1);
    }
  };

  // Handle store selection
  const handleStoreSelect = (storeId) => {
    if (isUploading) return;
    
    setFormData(prev => ({
      ...prev,
      store_id: storeId
    }));
  };

  // Get file icon based on type
  const getFileIcon = (fileName) => {
    if (!fileName) return <Video className="w-6 h-6 text-[#5959b9]" />;

    const extension = fileName.split('.').pop().toLowerCase();

    // Document types
    if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'].includes(extension)) {
      return <FileText className="w-6 h-6 text-[#5959b9]" />;
    }

    // Video types
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'].includes(extension)) {
      return <Video className="w-6 h-6 text-[#5959b9]" />;
    }

    // Image types
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(extension)) {
      return <ImageIcon className="w-6 h-6 text-[#5959b9]" />;
    }

    // Default video icon
    return <Video className="w-6 h-6 text-[#5959b9]" />;
  };

  // Get file type based on extension
  const getFileTypeFromExtension = (fileName) => {
    if (!fileName) return 'Videos';

    const extension = fileName.split('.').pop().toLowerCase();

    if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'].includes(extension)) {
      return 'Docx';
    }
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'].includes(extension)) {
      return 'Videos';
    }
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(extension)) {
      return 'Images';
    }
    return 'Videos';
  };

  // Get file type color
  const getFileTypeColor = (type) => {
    switch (type) {
      case 'Docx': return 'bg-[#5959b9]/10 text-[#5959b9]';
      case 'Videos': return 'bg-[#5959b9]/10 text-[#5959b9]';
      case 'Images': return 'bg-[#5959b9]/10 text-[#5959b9]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (100MB max)
      if (file.size > 100 * 1024 * 1024) {
        toast.error('File size should be less than 100MB');
        return;
      }

      const fileType = getFileTypeFromExtension(file.name);

      setFormData(prev => ({
        ...prev,
        file: file,
        fileType: fileType
      }));
      setFileName(file.name);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      file: null
    }));
    setFileName('');
    // Reset file input
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.store_id) {
      toast.error('Please select a store');
      return;
    }

    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    // if (!formData.description.trim()) {
    //   toast.error('Please enter a description');
    //   return;
    // }

    if (!formData.file) {
      toast.error('Please select a file to upload');
      return;
    }

    const ownerId = currentOwner?.id || ownerFromStore?.id;
    if (!ownerId) {
      toast.error('Owner information is missing');
      return;
    }

    setIsUploading(true);

    try {
      // Map frontend file types to backend file types
      const fileTypeMap = {
        'Docx': 'document',
        'Videos': 'video',
        'Images': 'image',
      };

      await onSubmit({
        ...formData,
        store_id: formData.store_id,
        owner_id: ownerId,
        fileType: fileTypeMap[formData.fileType] || 'video',
      });
    } catch (error) {
      toast.error('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file) {
      // Validate file size
      if (file.size > 100 * 1024 * 1024) {
        toast.error('File size should be less than 100MB');
        return;
      }

      const fileType = getFileTypeFromExtension(file.name);

      setFormData(prev => ({
        ...prev,
        file: file,
        fileType: fileType
      }));
      setFileName(file.name);
    }
  };

  // Get current file type object
  const currentFileType = fileTypes.find(ft => ft.type === formData.fileType) || fileTypes[1];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-4 bg-[#5a58b6] flex-shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-normal text-white">Upload Training Content</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 group"
            disabled={isUploading}
          >
            <X className="size-6 text-white" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto flex-grow">
          <form onSubmit={handleSubmit} className="p-5">
            <div className="space-y-4">
              {/* Store Selection */}
              <div className="space-y-1">                
                {storesLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#5a58b6]"></div>
                    <p className="text-gray-500 text-xs ml-2">Loading stores...</p>
                  </div>
                ) : availableStores.length === 0 ? (
                  <div className="text-center py-4 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500 text-sm">No stores available</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    {/* Left Arrow */}
                    <button
                      type="button"
                      onClick={prevStores}
                      disabled={currentStoreIndex === 0 || isUploading}
                      className={`p-1 rounded-full transition-all duration-200 ${currentStoreIndex === 0 || isUploading
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-[#5959b9] hover:bg-gray-100'
                        }`}
                    >
                      <ChevronLeft className="size-6" />
                    </button>

                    {/* Store Logos Only (No Names Below) */}
                    <div className="flex items-center justify-center space-x-8">
                      {visibleStores.map((store) => (
                        <div
                          key={store.id}
                          onClick={() => !isUploading && handleStoreSelect(store.id)}
                          className={`flex flex-col items-center space-y-1 cursor-pointer transition-all duration-200 ${formData.store_id == store.id
                              ? 'transform scale-105'
                              : 'hover:scale-[1.02]'
                            } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <div
                            className={`size-12 rounded-full flex items-center justify-center overflow-hidden ${formData.store_id == store.id
                                ? 'ring-2 ring-[#5a58b6] ring-offset-2 bg-[#5a58b6]/5'
                                : 'border-2 border-gray-300 hover:border-[#5a58b6]'
                              } p-0.5`}
                          >
                            {store.logo ? (
                              <img
                                src={store.logo?.replace('/storage/', '/public/storage/')}
                                alt={store.name}
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-full">
                                <Briefcase className="w-5 h-5 text-gray-400 font-medium" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                      type="button"
                      onClick={nextStores}
                      disabled={currentStoreIndex + 3 >= availableStores.length || isUploading}
                      className={`p-1 rounded-full transition-all duration-200 ${currentStoreIndex + 3 >= availableStores.length || isUploading
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-[#5959b9] hover:bg-gray-100'
                        }`}
                    >
                      <ChevronRight className="size-6" />
                    </button>
                  </div>
                )}
              </div>

              {/* File Type, Selected Store, and Title in Same Row */}
              <div className="flex flex-row gap-4 mb-4 w-full">
                {/* Selected Store Field - Icon Removed */}
                <div className="space-y-2 mt-1 w-[38%]">
                  <label className="flex items-center gap-2 text-sm font-normal text-gray-700">
                    <span className='font-medium'>Selected Store</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={selectedStore ? selectedStore.name : "No store selected"}
                      readOnly
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-md bg-gray-50 outline-none transition-all duration-200 text-sm text-gray-700 disabled:opacity-90 disabled:cursor-not-allowed"
                      disabled
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2 mt-1 w-[38%]">
                  <label className="flex items-center gap-2 text-sm font-normal text-gray-700">
                    <span className='font-medium'>Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter training title"
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-1 focus:ring-[#5a58b6] focus:border-[#5a58b6] outline-none transition-all duration-200 placeholder-gray-400 text-sm disabled:opacity-90 disabled:cursor-not-allowed"
                    required
                    disabled={!formData.store_id || isUploading}
                  />
                </div>

                {/* Custom File Type Dropdown */}
                <div className="space-y-2 mt-1 w-[24%]">
                  <label className="flex items-center gap-2 text-sm font-normal text-gray-700">
                    <span className='font-medium'>File Type</span>
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => !isUploading && setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-36 px-3 py-2 border-2 border-gray-300 rounded-md flex items-center justify-between transition-all duration-200 ${
                        formData.store_id && !isUploading
                          ? 'text-gray-700 cursor-pointer'
                          : 'border-2 border-gray-300 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!formData.store_id || isUploading}
                    >
                      <div className="flex items-center gap-2">
                        {currentFileType.icon}
                        <span className="text-sm font-medium text-gray-700">{currentFileType.type}</span>
                      </div>
                      <ChevronDown className={`size-5 transition-transform duration-200 text-gray-500 ${
                        isDropdownOpen ? 'transform rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Dropdown Options */}
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-36 mt-1 bg-white border-2 border-gray-300 rounded-md shadow-lg overflow-hidden">
                        {fileTypes.map((fileType) => (
                          <button
                            key={fileType.type}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, fileType: fileType.type }));
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-3 py-2 border-b-2 border-gray-300 flex items-center gap-2 transition-all duration-200 ${
                              formData.fileType === fileType.type
                                ? 'bg-[#5a58b6] text-white'
                                : 'text-[#5a58b6] hover:bg-[#5a58b6]/20'
                            }`}
                          >
                            {fileType.icon}
                            <span className="text-sm font-medium">{fileType.type}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description - Reduced Height */}
              <div className="space-y-2 mt-6">
  <label className="flex items-center gap-2 text-sm font-normal text-gray-700">
    <span className='font-medium'>Description</span>
    <span className="text-gray-400 font-normal">(optional)</span>
  </label>
  <textarea
    name="description"
    value={formData.description}
    onChange={handleInputChange}
    placeholder="Enter training description"
    rows="4"
    className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-1 focus:ring-[#5a58b6] focus:border-[#5a58b6] outline-none transition-all duration-200 placeholder-gray-400 resize-none text-sm disabled:opacity-90 disabled:cursor-not-allowed"
    disabled={!formData.store_id || isUploading}
  />
</div>

              {/* File Upload */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-normal text-gray-700">
                  <span className='font-medium'>Upload File (Max 100MB)</span>
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200 ${
                    !formData.store_id || isUploading
                      ? 'border-2 border-gray-300 bg-gray-100 cursor-not-allowed'
                      : 'border-[#5a58b6]/60 hover:border-[#5a58b6]/50 cursor-pointer bg-gray-50'
                  } relative`}
                  onClick={!formData.store_id || fileName || isUploading ? null : () => document.getElementById('fileInput').click()}
                  style={fileName ? { cursor: 'default' } : {}}
                >
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={!formData.store_id || isUploading}
                    accept=".pdf,.doc,.docx,.txt,.rtf,.odt,.mp4,.avi,.mov,.wmv,.flv,.mkv,.webm,.jpg,.jpeg,.png,.gif,.bmp,.svg,.webp"
                  />

                  {fileName ? (
                    <div className="flex flex-col items-center">
                      {/* Remove file button */}
                      {!isUploading && (
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow transition-all duration-200 border border-gray-200 hover:border-[#5a58b6]"
                          disabled={isUploading}
                        >
                          <X className="w-4 h-4 text-gray-600 hover:text-[#5a58b6]" />
                        </button>
                      )}

                      {/* File icon for ALL file types */}
                      <div className={`w-16 h-16 ${getFileTypeColor(formData.fileType).split(' ')[0]} rounded-full flex items-center justify-center mb-3`}>
                        {getFileIcon(fileName)}
                      </div>

                      <p className="text-gray-800 font-medium text-base mb-1 truncate max-w-xs">{fileName}</p>

                      {/* File size */}
                      {formData.file && (
                        <p className="text-gray-600 text-xs mb-3">
                          {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                        !formData.store_id ? 'bg-gray-200' : 'bg-gradient-to-br from-[#5a58b6]/10 to-[#5a58b6]/5'
                      }`}>
                        <Upload className={`w-8 h-8 ${!formData.store_id ? 'text-gray-400' : 'text-[#5a58b6]'}`} />
                      </div>
                      <p className={`font-medium text-base mb-1 ${
                        !formData.store_id ? 'text-gray-400' : 'text-gray-800'
                      }`}>
                        {!formData.store_id ? 'Select a store first' : 'Drag & drop files here'}
                      </p>
                      <p className="text-gray-500 text-xs mb-3">
                        {!formData.store_id ? 'Store selection is required' : 'or click to browse'}
                      </p>
                      {formData.store_id && (
                        <div className="px-3 py-1.5 border-2 border-[#5a58b6]/30 rounded-md text-[#5a58b6] text-xs font-medium bg-[#5a58b6]/5">
                          Supports: PDF, DOC, DOCX, MP4, JPG, PNG, etc.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="border-t border-gray-200 bg-white p-4 flex-shrink-0">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="group px-5 py-2 border border-[#5a58b6] text-[#5a58b6] rounded-md hover:bg-[#5a58b6]/5 transition-all duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isUploading}
            >
              <RotateCcw className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isUploading || !formData.file || !formData.store_id || !formData.title}
              className="px-5 py-2 bg-[#5a58b6] text-white rounded-md hover:bg-[#4a47a3] transition-all duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow hover:shadow-md disabled:hover:bg-[#5a58b6]"
            >
              {isUploading ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <FileUp className="w-4 h-4" />
                  Upload Training
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;