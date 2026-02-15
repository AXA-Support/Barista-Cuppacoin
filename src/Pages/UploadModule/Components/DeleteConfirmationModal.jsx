import React, {useState, useEffect} from 'react';

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure you want to delete this training?",
  confirmText = "Delete",
  cancelText = "Cancel"
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleConfirm = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onConfirm();
      onClose(); 
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white/60 via-[#5d5bbc]/40 to-white/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div 
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 relative ${
          isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
          boxShadow: '0 25px 50px -12px rgba(91, 90, 188, 0.25)'
        }}
      >
        {/* Cross button in top-right */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 border-red-200 rounded-full border transition-all duration-300"
          aria-label="Close modal"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
        
        <div className="p-6 pt-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 border-2 border-red-500 rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
            Delete Confirmation
          </h3>
          
          <div className="text-gray-600 text-center mb-6">
            <p className="mb-1">{title}</p>
          </div>

          <div className="flex w-[80%] mx-auto space-x-6">
            <button
              onClick={handleClose}  
              className="flex-1 px-4 py-2 bg-gray-100 border-2 border-gray-500 text-gray-700 rounded-lg transition-all duration-300 font-medium"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}  
              className="flex-1 px-4 py-2 bg-red-100 text-red-700 border-2 border-red-500 rounded-lg transition-all duration-300 font-medium"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;