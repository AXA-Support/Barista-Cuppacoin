import { 
  Trophy, 
  Store, 
  FileCheck,
  DollarSign,
  ChevronRight,
  Target,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const IncentivePage = () => {
  const primaryColor = "#5b59bb";
  const successColor = "#10b981";
  const accentColor = "#8b5cf6";
  
  return (
    <div className="bg-gray-50 p-4 md:p-6">
      
      {/* Modern Header Section with Bouncing Animation */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 mb-5 border border-[#5b59bb]/20 overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 z-10">
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 rounded-xl" style={{ backgroundColor: `${primaryColor}10` }}>
                  <Trophy size={22} style={{ color: primaryColor }} />
                </div>
                <h1 className="text-xl md:text-2xl font-medium text-gray-800">
                  Incentive Targets
                </h1>
              </div>
              <p className="text-gray-600 text-sm">
                Track your progress and unlock rewards as you achieve your goals
              </p>
            </div>
            <div className="md:w-40 w-32 animate-float">
              <img 
                src="/images/incentive/incentive_starting_img.png" 
                alt="Incentive Rewards"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

      {/* Cards Container - Fixed Height */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        
        {/* Store Target Card - CLEAR Left Border */}
        <div className="bg-white rounded-xl shadow-md p-4 relative border-l-[5px] flex flex-col"
             style={{ borderLeftColor: primaryColor }}>
          
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg shadow-sm" style={{ backgroundColor: `${primaryColor}15` }}>
                <Store size={20} style={{ color: primaryColor }} />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-800">Store Target</h3>
                <p className="text-sm text-gray-500">Sales Performance</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-1">
                <DollarSign size={14} className="text-gray-800" />
                <span className="text-xl font-normal text-gray-900">12,000</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-mm text-gray-900">Bands</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium">0</span>
                <Target size={12} className="text-primaryColor" />
                <span className="text-sm text-gray-500 font-medium">10</span>
              </div>
            </div>
            
            {/* Progress Bar with Indicators */}
            <div className="relative w-full">
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>0</span>
                <span>5</span>
                <span>10</span>
              </div>
              <div className="relative w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-1.5 rounded-full"
                  style={{ 
                    width: '85%',
                    background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`
                  }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-600">Current: 8.5/10</span>
                <div className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-green-500" />
                  <span className="text-sm text-green-600 font-medium">85% Complete</span>
                </div>
              </div>
            </div>
          </div>

          {/* Let's Begin Button for Store Target Card - Aligned to bottom */}
          <div className="mt-auto">
            <button 
              className="w-full px-4 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-3 hover:shadow-xl transition-all duration-300 group hover:scale-[1.02] shadow-md"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                boxShadow: `0 6px 20px -5px ${primaryColor}30`
              }}
            >
              <span className="text-base">Let's begin</span>
              <ChevronRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Sales/Review Incentive Card - CLEAR Left Border */}
        <div className="bg-white rounded-xl shadow-md p-4 relative border-l-[5px] flex flex-col"
             style={{ borderLeftColor: accentColor }}>
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg shadow-sm" style={{ backgroundColor: `${accentColor}15` }}>
                <FileCheck size={20} style={{ color: accentColor }} />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">Sales / Review Incentive</h3>
                <p className="text-sm text-gray-500 mt-0.5">Performance-based rewards</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <DollarSign size={14} className="text-gray-800" />
                <span className="text-xl font-normal text-gray-900">75</span>
              </div>
            </div>
          </div>
          
          {/* Bonus Pot & ProRata Section */}
          <div className="space-y-3 mb-6">
            {/* Bonus Pot */}
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-mm  text-gray-900">Bonus Pot</span>
              </div>
              <div className="flex items-baseline gap-1">
                <DollarSign size={16} className="text-gray-900" />
                <span className="text-lg font-normal text-gray-900">150</span>
              </div>
            </div>
            
            {/* ProRata Section */}
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-300">
              <div>
                <p className="text-mm text-gray-900 mb-1">ProRata Amount</p>
                <div className="flex items-baseline gap-1">
                  <DollarSign size={16} className="text-gray-800" />
                  <span className="text-xl font-normal text-gray-900">75</span>
                </div>
              </div>
              
              {/* Earned Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md"
                   style={{ 
                     backgroundColor: `${successColor}20`,
                     border: `1px solid ${successColor}30`
                   }}>
                <CheckCircle size={16} style={{ color: successColor }} />
                <span className="text-mm font-medium" style={{ color: successColor }}>Earned</span>
              </div>
            </div>
          </div>

          {/* Let's Begin Button for Sales/Review Card - Aligned to bottom */}
          <div className="mt-auto">
            <button 
              className="w-full px-4 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-3 hover:shadow-xl transition-all duration-300 group hover:scale-[1.02] shadow-md"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                boxShadow: `0 6px 20px -5px ${primaryColor}30`
              }}
            >
              <span className="text-base">Let's begin</span>
              <ChevronRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
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
        
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out backwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
    </div>
  );
};

export default IncentivePage;
