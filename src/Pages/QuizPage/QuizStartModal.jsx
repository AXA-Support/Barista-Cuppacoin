import React, { useEffect, useState } from 'react';
import { ArrowRight,X } from 'lucide-react';

const QuizStartModal = ({ isOpen, onClose, quizTitle, daysLeft, onStartQuiz }) => {
  const [runAnimation, setRunAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setRunAnimation(true);
      }, 100);
    } else {
      setRunAnimation(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartQuiz = () => {
    console.log(`Starting quiz: ${quizTitle}`);
    onClose();
  };

  const handleGoClick = () => {
    console.log(`GO clicked for quiz: ${quizTitle}`);
    onStartQuiz(); 
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{
      background: 'rgba(91, 89, 187, 0.15)',
      backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div className="relative bg-gray-100 w-full max-w-sm" style={{
        borderRadius: '32px',
        boxShadow: '0 20px 60px rgba(91, 89, 187, 0.25), 0 0 0 1px rgba(91, 89, 187, 0.1)',
        animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#5b59bb]" style={{
          borderTopLeftRadius: '32px'
        }}></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#5b59bb]" style={{
          borderBottomRightRadius: '32px'
        }}></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 size-9 rounded-full p-2 bg-[#5b59bb] flex items-center justify-center text-[#5b59bb] transition-all duration-300"
        >
          <X  className="text-4xl text-white font-semibold"/>
        </button>

        {/* Modal content */}
        <div className="px-8 py-10 text-center">
          
          {/* Running Boy with circular background */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full  opacity-5" style={{
                  animation: 'expand 2s ease-in-out infinite'
                }}></div>
              </div>
              <img 
                src="/images/quiz/coffee_mug.png" 
                alt="Running Boy"
                className="h-32 w-auto relative z-10"
                // style={{
                //   animation: runAnimation ? 'runCycle 0.8s ease-in-out infinite' : 'none'
                // }}
              />
            </div>
          </div>

          {/* Quiz Title with decorative line */}
          <div className="mb-5">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-0.5 w-12 bg-[#5b59bb] opacity-50"></div>
              <div className="size-2 rounded-full bg-[#5b59bb]"></div>
              <div className="h-0.5 w-12 bg-[#5b59bb] opacity-50"></div>
            </div>
            <h2 className="text-xl text-gray-700 font-medium">{quizTitle}</h2>
          </div>
          
          {/* Days left indicator */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-xl mb-6 border-2 border-[#5b59bb] bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[#5b59bb] opacity-5"></div>
            <div className="relative flex items-center gap-2.5">
              <svg width="10" height="10" viewBox="0 0 12 12" className="relative z-10">
                <circle cx="6" cy="6" r="6" fill="#5b59bb">
                  <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="6" cy="6" r="6" fill="#5b59bb" opacity="0.3">
                  <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
              <span className="text-sm text-[#5b59bb] font-medium relative z-10">Posted {daysLeft} Days Ago</span>
            </div>
          </div>

          {/* Start Quiz heading */}
          <h3 className=" text-gray-600 font-medium mb-6 tracking-wide uppercase">Start Quiz</h3>

          {/* GO button with arrow - MODIFIED SECTION */}
          <div className="flex justify-center">
  <button 
    onClick={handleGoClick}
    className="group relative"
  >
    <div className="inline-flex items-center  gap-2.5 px-10 py-1 rounded-lg border-[2px] border-[#5b59bb] bg-[#5b59bb] transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#5b59bb]/20 relative overflow-hidden">
      <div className="relative flex items-center gap-2.5">
        <span className="text-mm text-white font-medium relative z-10">GO</span>
      </div>
    </div>
    
    {/* Arrow below */}
    {/* <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-70" style={{
      animation: 'bounceArrow 2s infinite'
    }}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="#5b59bb">
        <path d="M8 12L3 7h10l-5 5z"/>
      </svg>
    </div> */}
  </button>
</div>
        </div>

        {/* Animation styles */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes expand {
            0%, 100% { transform: scale(1); opacity: 0.05; }
            50% { transform: scale(1.1); opacity: 0.08; }
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes runCycle {
            0% { transform: translateY(0px); }
            25% { transform: translateY(-6px); }
            50% { transform: translateY(0px); }
            75% { transform: translateY(6px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes bounceArrow {
            0%, 100% {
              transform: translateX(-50%) translateY(0);
              animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
            50% {
              transform: translateX(-50%) translateY(-5px);
              animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default QuizStartModal;