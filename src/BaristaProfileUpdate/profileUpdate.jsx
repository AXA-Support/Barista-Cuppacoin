import React, { useState, useRef, useEffect } from 'react';
import { Mail, User, Save, X, XCircle, Camera, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

export default function ProfileUpdate({ onClose, currentProfile, onProfileUpdate }) {
  // Also watch Redux for employee updates - this is the source of truth
  const employee = useSelector((state) => state.auth.employee);
  const employeeUpdateVersion = useSelector((state) => state.auth.employeeUpdateVersion || 0);

  // Initialize image from Redux first (source of truth), then fallback to prop
  const getInitialImage = () => {
    return employee?.image || currentProfile?.image || '/profile.png';
  };

  const [formData, setFormData] = useState({
    name: currentProfile?.name || '',
    email: currentProfile?.email || '',
    // Removed password field as requested
  });

  const [profileImage, setProfileImage] = useState(getInitialImage());
  const fileInputRef = useRef(null);
  const previousImageRef = useRef(getInitialImage());
  const previousEmployeeImageRef = useRef(employee?.image);
  const [activeIcon, setActiveIcon] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const [imageRefreshKey, setImageRefreshKey] = useState(Date.now());

  // Initialize form when currentProfile changes
  useEffect(() => {
    setFormData({
      name: currentProfile?.name || '',
      email: currentProfile?.email || '',
    });
  }, [currentProfile?.name, currentProfile?.email]);

  // Initialize image from Redux when modal opens (fresh mount)
  // This ensures we always get the latest image from Redux (source of truth)
  // Also watch employeeUpdateVersion to catch updates when modal reopens after an update
  useEffect(() => {
    // Redux employee is the source of truth after updates - always prefer it
    const imageToUse = employee?.image || currentProfile?.image;
    
    // Only update if the image is different or if we need to refresh
    if (imageToUse && imageToUse !== profileImage) {
      setProfileImage(imageToUse);
      previousImageRef.current = imageToUse;
      previousEmployeeImageRef.current = employee?.image;
      // Force refresh with timestamp to ensure latest image is loaded (cache busting)
      setImageRefreshKey(Date.now());
    } else if (imageToUse && imageToUse === profileImage) {
      // Even if same image, refresh the key for cache busting when modal reopens
      setImageRefreshKey(Date.now());
      previousImageRef.current = imageToUse;
      previousEmployeeImageRef.current = employee?.image;
    } else if (!imageToUse) {
      setProfileImage('/profile.png');
      previousImageRef.current = null;
      previousEmployeeImageRef.current = null;
    }
  }, [employeeUpdateVersion]); // Run on mount AND when employeeUpdateVersion changes (after updates)

  // Update image when currentProfile.image changes (from prop update)
  useEffect(() => {
    const imageChanged = currentProfile?.image !== previousImageRef.current;
    
    if (imageChanged && currentProfile?.image) {
      // Always update to backend URL (not data URL)
      if (!currentProfile.image.startsWith('data:image')) {
        setProfileImage(currentProfile.image);
        setImageRefreshKey(prev => prev + 1);
      }
      previousImageRef.current = currentProfile.image;
    } else if (!currentProfile?.image) {
      // Reset to default if no image
      setProfileImage('/profile.png');
      previousImageRef.current = null;
    }
  }, [currentProfile?.image]);

  // Also watch Redux employee for updates (like navbar does)
  // This handles updates while modal is open AND when modal reopens after update
  useEffect(() => {
    if (employee?.image) {
      const imageChanged = employee.image !== previousEmployeeImageRef.current;
      
      if (imageChanged) {
        // Only update if we don't have a data URL (newly uploaded image)
        const currentImageIsDataUrl = profileImage && typeof profileImage === 'string' && profileImage.startsWith('data:image');
        if (!currentImageIsDataUrl) {
          setProfileImage(employee.image);
          setImageRefreshKey(Date.now()); // Use timestamp for better cache busting
          previousEmployeeImageRef.current = employee.image;
          // Also update the previousImageRef to keep them in sync
          previousImageRef.current = employee.image;
        }
      }
    }
  }, [employee?.image, employeeUpdateVersion]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Validate type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result); // 🔥 THIS enables preview
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'email') {
      validateEmail(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length > 0 && !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleInputFocus = (fieldName) => {
    setActiveIcon(fieldName);
  };

  const handleInputBlur = () => {
    setActiveIcon(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    validateEmail(formData.email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Validate name
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare update data
      const updateData = {
        name: formData.name,
        email: formData.email,
        // Only include image if it was changed
        ...(profileImage !== currentProfile.image ? { image: profileImage } : {}),
      };

      // Call the update function with new data
      if (onProfileUpdate) {
        await onProfileUpdate(updateData);
      }

      onClose();
    } catch (error) {
      console.error('Update failed:', error);
      // Error is already handled in Sidebar component
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSaveDisabled = () => {
    const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    return isSubmitting || !formData.name.trim() || !hasValidEmail;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg mx-4 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#5b59bb] via-[#6d6bd4] to-[#8785e8] text-white p-2.5 md:p-4 lg:p-4 overflow-hidden">
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg lg:rounded-xl shadow-lg border border-white/30">
                <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-medium tracking-tight">Edit Profile</h1>
                <p className="text-sm text-white/80 mt-1">Update your personal information</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-95 rounded-lg"
              aria-label="Close"
              disabled={isSubmitting}
            >
              <XCircle className="size-5 lg:size-8 text-white" />
            </button>
          </div>
        </div>

        {/* Profile Picture Section */}
        <div className="relative -mt-8 md:-mt-10 lg:-mt-6 flex justify-center px-4">
          <div className="relative group">
            <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-r from-[#5b59bb] to-[#8785e8] opacity-40 blur-xl"></div>
            
            <div className="relative size-20 md:size-24 lg:size-32 mt-4 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-[#5b59bb]/30 cursor-pointer"
              onClick={handleImageClick}>
              
              <img
                key={`${profileImage}-${imageRefreshKey}`}
                src={
                  // Case 1: No image or error - fallback to default
                  !profileImage
                    ? '/profile.png'
                    // Case 2: Newly uploaded image (data URL from FileReader)
                    : profileImage.startsWith('data:image')
                    ? profileImage
                    // Case 3: Existing image from backend
                    : `${import.meta.env.VITE_API_BASE_URL}/public/${profileImage}?t=${imageRefreshKey}`
                }
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null; // Prevent infinite loop
                  e.currentTarget.src = '/profile.png';
                }}
              />
            </div>

            <div className="absolute -bottom-2 -right-2 z-10">
              <button
                type="button"
                onClick={handleImageClick}
                className="p-2 bg-gradient-to-br from-[#5b59bb] to-[#7a78e0] text-white rounded-full shadow-xl border-2 border-white hover:scale-110 transition-transform"
                aria-label="Change profile picture"
                disabled={isSubmitting}
              >
                <Camera className="w-3 h-3 lg:w-5 lg:h-5" />
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 lg:p-8">
          <div className="space-y-4 lg:space-y-6 mb-6 lg:mb-8">
            {/* Name Field - Editable */}
            <div>
              <label htmlFor="name" className="block text-sm lg:text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleInputFocus('name')}
                  onBlur={handleInputBlur}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5b59bb] focus:border-[#5b59bb] outline-none transition disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Email Field - Uneditable */}
            <div>
              <label htmlFor="email" className="block text-sm lg:text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleInputFocus('email')}
                  onBlur={handleInputBlur}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 outline-none transition disabled:bg-gray-50 disabled:cursor-not-allowed ${
                    emailError
                      ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
                      : 'border-gray-300 focus:ring-[#5b59bb] focus:border-[#5b59bb]'
                  }`}
                  placeholder="your.email@example.com"
                  required
                  disabled={true} // Made uneditable as requested
                  readOnly // Additional attribute to ensure it's not editable
                />
              </div>
              {/* {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )} */}
              {/* <p className="mt-1 text-xs text-gray-500">
                Email address cannot be changed
              </p> */}
            </div>
          </div>

          {/* Action Buttons - RIGHT ALIGNED */}
          <div className="flex justify-end gap-3 lg:gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 flex items-center justify-center gap-2 text-sm lg:text-base font-medium text-gray-700 bg-white border-2 border-gray-400 hover:bg-white hover:text-[#5b59bb] hover:border-[#5b59bb] rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              <X className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              disabled={isSaveDisabled()}
              className={`px-4 py-2.5 flex items-center justify-center gap-2 text-sm lg:text-base font-medium text-white bg-gradient-to-r from-[#5b59bb] to-[#8785e8] rounded-lg transition ${
                isSaveDisabled() ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}