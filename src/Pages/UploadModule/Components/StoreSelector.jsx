import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { fetchStoresByOwner } from '../../../../../../store/slices/storeSlice';
import { useSelector } from 'react-redux';

export default function StoreSelector({ selectedStore, setSelectedStore }) {
  const { currentOwner } = useSelector((state) => state.owner);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const dispatch = useAppDispatch();
  const { stores, loading } = useAppSelector((state) => state.store);

  useEffect(() => {
    dispatch(fetchStoresByOwner(currentOwner.id));
  }, [dispatch]);

  const maxIndex = Math.max(0, stores.length - itemsPerPage);
  const needsSlider = stores.length > itemsPerPage;

  const handleSiteClick = (id, name) => {
    if (selectedStore === id) {
      setSelectedStore(null);
    } else {
      setSelectedStore(id);
    }
  };

  const handleAllClick = () => {
    setSelectedStore(null);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleSites = needsSlider
    ? stores.slice(currentIndex, currentIndex + itemsPerPage)
    : stores;

  if (loading) {
    return (
      <div className="flex justify-center lg:justify-start mb-6">
        <div className="flex gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="size-12 rounded-full bg-gray-200 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const getImageUrl = (store) => {
    if (store) {
      if (store.startsWith('http')) {
        // Insert /public/ before /storage/ in the URL
        return store.replace('/storage/', '/public/storage/');
      }
      return `${import.meta.env.VITE_API_BASE_URL}/public/storage/${store.logo}`;
    }
    return "https://static.vecteezy.com/system/resources/thumbnails/041/643/200/small_2x/ai-generated-a-cup-of-coffee-and-a-piece-of-coffee-bean-perfect-for-food-and-beverage-related-designs-or-promoting-cozy-moments-png.png";
  };

  return (
    <>
      <div className="flex justify-center lg:justify-start mb-6 space-x-1">
        {/* All Stores Circular Div */}
        <div
          className={`relative mr-1 size-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${selectedStore === null
            ? "bg-gradient-to-br from-[#5f5cb8] via-[#6d6ac9] to-[#7b78da] shadow-2xl ring-2 ring-white ring-opacity-50 animate-glow"
            : "bg-white border-[3px] border-gray-300 shadow-lg hover:shadow-xl hover:border-[3px] hover:border-[#5B5ABC] hover:bg-gradient-to-br hover:from-[#f8f7ff] hover:to-[#e8e7ff]"
            } p-1.5 group`}
          onClick={handleAllClick}
          title="All Stores"
        >
          {/* Animated background glow effect when selected */}
          {selectedStore === null && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#5f5cb8] animate-ping opacity-20"></div>
          )}
          {/* Inner container */}
          <div className="relative w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm">
            <span className={`text-sm font-medium transition-all duration-300 ${selectedStore === null
              ? "text-white drop-shadow-md"
              : "text-gray-500 group-hover:text-[#4a47a3]"
              }`}>
              All
            </span>
          </div>
        </div>

        {/* Previous Button - Only show when slider is needed */}
        {needsSlider && (
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-1 rounded-full transition-all duration-200 ${currentIndex === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-[#5B5ABC] hover:bg-gray-100'
              }`}
            aria-label="Previous stores"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Store Logos Container */}
        <div className="flex items-center justify-center gap-3">
          {visibleSites.map((store, index) => (
            <div
              key={store.id}
              className={`size-12 rounded-full bg-white flex items-center justify-center cursor-pointer transition-all duration-300 ${selectedStore === store.id
                ? "ring-2 ring-[#5b59bc] shadow-xl scale-110 -translate-y-1"
                : "ring-2 ring-gray-200 shadow-md hover:shadow-xl hover:scale-105 hover:ring-[#5b59bc] hover:ring-3"
                } p-0.5`}
              onClick={() => handleSiteClick(store.id, store.name)}
              title={store.name}
              style={
                needsSlider
                  ? {
                    animation: `fadeSlideIn 0.5s ease-out ${index * 0.08}s both`
                  }
                  : undefined
              }
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <img
                  src={getImageUrl(store.logo)}
                  alt={store.name}
                  className={`w-full h-full object-cover transition-all duration-500 ${selectedStore === store.id
                    ? "grayscale-0 scale-110"
                    : "grayscale hover:grayscale-0 hover:scale-110"
                    }`}
                />
                {selectedStore === store.id && (
                  <div className="absolute inset-0 bg-[#5b59bc] opacity-10 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Next Button - Only show when slider is needed */}
        {needsSlider && (
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`p-1 rounded-full transition-all duration-200 ${currentIndex >= maxIndex
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-[#5B5ABC] hover:bg-gray-100'
              }`}
            aria-label="Next stores"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(-15px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(95, 92, 184, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(95, 92, 184, 0.6), 0 0 40px rgba(95, 92, 184, 0.3);
          }
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </>
  );
}