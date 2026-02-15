import React, { useState, useEffect, useRef, useMemo } from "react";
import { X, ChevronDown, Clock, DollarSign, Store, Trophy, Calendar, Gift, Star, Target, Award, Sparkles, Truck } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function ProfileOverview({ onClose, profileData }) {
  // Watch Redux for employee updates (source of truth)
  const employee = useSelector((state) => state.auth.employee);
  const employeeUpdateVersion = useSelector((state) => state.auth.employeeUpdateVersion || 0);

  const [showAnniversaryList, setShowAnniversaryList] = useState(false);
  const [timeSinceJoining, setTimeSinceJoining] = useState({ months: 0, days: 0 });
  const [unlockedMilestones, setUnlockedMilestones] = useState([]);
  const [celebratingMilestone, setCelebratingMilestone] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [initialBonusesTriggered, setInitialBonusesTriggered] = useState(false);
  const [animateBonuses, setAnimateBonuses] = useState([]);
  const [showParticles, setShowParticles] = useState(false);
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);
  const [showWhiteDiv, setShowWhiteDiv] = useState(false);
  const [milestonesToCelebrate, setMilestonesToCelebrate] = useState([]);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const [animationQueue, setAnimationQueue] = useState([]);
  const [anniversaryBonusesState, setAnniversaryBonusesState] = useState([]);
  const [imageRefreshKey, setImageRefreshKey] = useState(Date.now());
  const hasCheckedMilestones = useRef(false);
  const celebratingMilestoneRef = useRef(null);
  const showConfettiRef = useRef(false);
  const initialBonusesTriggeredRef = useRef(false);
  const milestonesToCelebrateRef = useRef([]);
  const previousEmployeeImageRef = useRef(null);

  // Update refs when states change
  useEffect(() => {
    celebratingMilestoneRef.current = celebratingMilestone;
  }, [celebratingMilestone]);

  useEffect(() => {
    showConfettiRef.current = showConfetti;
  }, [showConfetti]);

  useEffect(() => {
    initialBonusesTriggeredRef.current = initialBonusesTriggered;
  }, [initialBonusesTriggered]);

  useEffect(() => {
    milestonesToCelebrateRef.current = milestonesToCelebrate;
  }, [milestonesToCelebrate]);

  // useEffect(() => {
  //   console.log("profile", profileData.rawData.store)
  // }, [])

  // Get API data from rawData (keep original structure for other fields)
  const apiData = profileData?.rawData || {};
  const storeData = apiData.store || {};
  
  // For image, prefer Redux employee (source of truth after updates)
  const imageSource = employee || apiData;

  // Calculate weekly wages from API data
  const weeklyWages = apiData.wage_per_hour && apiData.hoursPerWeek
    ? `$${(parseFloat(apiData.wage_per_hour) * parseFloat(apiData.hoursPerWeek)).toFixed(2)}`
    : '$0.00';

  // Get working hours from API data
  const workingHours = apiData.hoursPerWeek ? `${apiData.hoursPerWeek} hrs` : '0 hrs';

  // Get profile image - prefer Redux employee image, with cache-busting
  const getProfileImageUrl = () => {
    const imagePath = imageSource?.image;
    if (!imagePath) return '/profile.png';
    return `${import.meta.env.VITE_API_BASE_URL}/public/${imagePath}?t=${imageRefreshKey}`;
  };
  
  const profileImage = getProfileImageUrl();

  // Watch Redux employee for image updates
  useEffect(() => {
    if (employee?.image && employee.image !== previousEmployeeImageRef.current) {
      // Image changed in Redux, refresh it
      setImageRefreshKey(Date.now());
      previousEmployeeImageRef.current = employee.image;
    } else if (employee?.image) {
      // Even if same image, refresh key when modal opens/reopens (employeeUpdateVersion changes)
      setImageRefreshKey(Date.now());
      previousEmployeeImageRef.current = employee.image;
    }
  }, [employee?.image, employeeUpdateVersion]);

  // Get name from API data
  const fullName = apiData.first_name && apiData.last_name
    ? `${apiData.first_name} ${apiData.last_name}`
    : profileData?.name || "John Doe";

  // Get cafe shop name from API data
  const cafeShopName = storeData.name || profileData?.cafeShop || "Jiyao cafe shop";

  // Get joining date from API data (start_date)
  const joiningDate = apiData.start_date || profileData?.joiningDate;

  // Get earned bonuses from API data (if available) or use empty array - memoized to prevent new array references
  const earnedBonuses = useMemo(() => {
    return apiData.earnedBonuses || profileData?.earnedBonuses || [];
  }, [apiData.earnedBonuses, profileData?.earnedBonuses]);

  // Complete data structure with bonuses status - Using store reward values from API - memoized
  const initialAnniversaryBonuses = useMemo(() => [
    {
      id: 1,
      months: 6,
      amount: storeData.sixMonthReward || '0',
      description: "6 Months",
      unlocked: false,
      earned: false,
      progress: 0
    },
    {
      id: 2,
      months: 12,
      amount: storeData.oneYearReward || '0',
      description: "1 Year",
      unlocked: false,
      earned: false,
      progress: 0
    },
    {
      id: 3,
      months: 18,
      amount: storeData.eitheenMonthReward || '0',
      description: "1.5 Years",
      unlocked: false,
      earned: false,
      progress: 0
    },
    {
      id: 4,
      months: 24,
      amount: storeData.twoYearAward || '0',
      description: "2 Years",
      unlocked: false,
      earned: false,
      progress: 0
    },
  ], [storeData.sixMonthReward, storeData.oneYearReward, storeData.eitheenMonthReward, storeData.twoYearAward]);

  // Function to play animation for a specific milestone
  const playMilestoneAnimation = (milestone, index = 0) => {
    // Don't show white div during animation
    setShowWhiteDiv(false);

    // Blur background and start animation
    setIsBackgroundBlurred(true);
    setShowParticles(true);

    // Show bonus animation
    setTimeout(() => {
      setAnimateBonuses([milestone]);
    }, 500);

    // Show celebration modal after a delay
    setTimeout(() => {
      setCelebratingMilestone(milestone);
      setShowConfetti(true);
    }, 1000);

    // Auto-remove animations after 4 seconds
    setTimeout(() => {
      setShowParticles(false);
      setAnimateBonuses([]);
    }, 555000);

    // Auto-hide celebration after 5.5 seconds and move to next milestone
    setTimeout(() => {
      setShowConfetti(false);
      setTimeout(() => {
        setCelebratingMilestone(null);

        // If there are more milestones in the queue, play the next one
        if (index + 1 < animationQueue.length) {
          const nextIndex = index + 1;
          setCurrentAnimationIndex(nextIndex);
          setTimeout(() => {
            playMilestoneAnimation(animationQueue[nextIndex], nextIndex);
          }, 500);
        } else {
          // All animations done, show white div
          setIsBackgroundBlurred(false);
          setShowWhiteDiv(true);
        }
      }, 500);
    }, 5500);
  };

  // Calculate time since joining and update bonus status
  useEffect(() => {
    // Function to check which milestones have been hit - defined inside useEffect to use current bonuses
    const checkMilestonesHit = (totalMonths, earnedBonusesList, bonusesArray) => {
      const hitMilestones = bonusesArray.filter(bonus => {
        // Milestone is hit if time has passed AND it hasn't been earned yet (based on props)
        return totalMonths >= bonus.months && !earnedBonusesList.includes(bonus.id);
      });

      return hitMilestones;
    };

    const calculateTimeSinceJoining = () => {
      // Use joining date from API data (start_date) with fallback
      const joiningDateStr = joiningDate || new Date(Date.now() - 270 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const joiningDateObj = new Date(joiningDateStr);
      const currentDate = new Date();

      const years = currentDate.getFullYear() - joiningDateObj.getFullYear();
      const months = currentDate.getMonth() - joiningDateObj.getMonth();
      let totalMonths = years * 12 + months;

      // Adjust for day of month
      if (currentDate.getDate() < joiningDateObj.getDate()) {
        totalMonths--;
      }

      totalMonths = Math.max(0, totalMonths);

      setTimeSinceJoining({
        months: totalMonths,
        years: Math.floor(totalMonths / 12),
        monthsRemainder: totalMonths % 12,
        totalDays: Math.floor((currentDate - joiningDateObj) / (1000 * 60 * 60 * 24))
      });

      // Get earned bonuses from API data
      const earnedBonusesFromProps = earnedBonuses;

      // Update bonus status based on earned bonuses
      const updatedBonuses = initialAnniversaryBonuses.map(bonus => {
        const isUnlocked = totalMonths >= bonus.months;
        const isEarned = earnedBonusesFromProps.includes(bonus.id);

        // Calculate progress for current and next bonus
        let progress = 0;
        if (isEarned) {
          progress = 100;
        } else {
          // Find previous earned milestone
          const previousBonuses = initialAnniversaryBonuses.filter(b => b.months < bonus.months);
          const lastEarnedBonus = previousBonuses.reduce((prev, current) => {
            if (earnedBonusesFromProps.includes(current.id)) {
              return current.months > prev.months ? current : prev;
            }
            return prev;
          }, { months: 0 });

          const startMonths = lastEarnedBonus.months;
          const monthsIntoCurrentPeriod = Math.max(totalMonths - startMonths, 0);
          const totalMonthsForPeriod = bonus.months - startMonths;
          progress = Math.min(Math.round((monthsIntoCurrentPeriod / totalMonthsForPeriod) * 100), 100);
        }

        return {
          ...bonus,
          unlocked: isUnlocked,
          earned: isEarned,
          progress: progress
        };
      });

      setAnniversaryBonusesState(updatedBonuses);
      const unlocked = updatedBonuses.filter(b => b.unlocked);
      setUnlockedMilestones(unlocked);

      // Check for milestones that have been hit but not earned yet - use updatedBonuses instead of state
      const hitMilestones = checkMilestonesHit(totalMonths, earnedBonuses, updatedBonuses);

      // On initial load, check if we need to show animations
      if (!hasCheckedMilestones.current) {
        hasCheckedMilestones.current = true;

        if (hitMilestones.length > 0) {
          // We have milestones to celebrate! Don't show white div yet
          setShowWhiteDiv(false);

          // Queue up all milestones that need celebration
          setMilestonesToCelebrate(hitMilestones);
          milestonesToCelebrateRef.current = hitMilestones;
          setAnimationQueue(hitMilestones);

          // Start with the first milestone animation
          setCurrentAnimationIndex(0);

          // Small delay to ensure state is set
          setTimeout(() => {
            if (hitMilestones[0]) {
              playMilestoneAnimation(hitMilestones[0], 0);
            }
          }, 100);
        } else {
          // No milestones to celebrate, show white div immediately
          setShowWhiteDiv(true);
        }
        setInitialBonusesTriggered(true);
        initialBonusesTriggeredRef.current = true;
      }

      // Check for new milestone achievements after initial load
      if (initialBonusesTriggeredRef.current) {
        // Check if any NEW milestones have been achieved
        const newHitMilestones = hitMilestones.filter(milestone =>
          !milestonesToCelebrateRef.current.some(m => m.id === milestone.id)
        );

        if (newHitMilestones.length > 0 && !celebratingMilestoneRef.current && !showConfettiRef.current) {
          // New milestone achieved! Add to queue and start animation
          const updatedMilestones = [...milestonesToCelebrateRef.current, ...newHitMilestones];
          setMilestonesToCelebrate(updatedMilestones);
          milestonesToCelebrateRef.current = updatedMilestones;
          setAnimationQueue(newHitMilestones);
          setCurrentAnimationIndex(0);

          // Start animation
          setTimeout(() => {
            if (newHitMilestones[0]) {
              playMilestoneAnimation(newHitMilestones[0], 0);
            }
          }, 100);
        }
      }
    };

    calculateTimeSinceJoining();
    const interval = setInterval(calculateTimeSinceJoining, 60000);

    return () => clearInterval(interval);
  }, [joiningDate, earnedBonuses, initialAnniversaryBonuses]);

  // Calculate progress percentage for specific milestone
  const calculateProgress = (bonusId) => {
    const bonus = anniversaryBonusesState.find(b => b.id === bonusId);
    if (!bonus) return 0;

    if (earnedBonuses.includes(bonusId)) return 100;

    // Find previous earned milestone
    const previousBonuses = anniversaryBonusesState.filter(b => b.months < bonus.months);
    const lastEarnedBonus = previousBonuses.reduce((prev, current) => {
      if (earnedBonuses.includes(current.id)) {
        return current.months > prev.months ? current : prev;
      }
      return prev;
    }, { months: 0 });

    const startMonths = lastEarnedBonus.months;
    const monthsIntoCurrentPeriod = Math.max(timeSinceJoining.months - startMonths, 0);
    const totalMonthsForPeriod = bonus.months - startMonths;

    return Math.min(Math.round((monthsIntoCurrentPeriod / totalMonthsForPeriod) * 100), 100);
  };

  // Calculate months remaining for specific milestone
  const calculateMonthsRemaining = (bonusId) => {
    const bonus = anniversaryBonusesState.find(b => b.id === bonusId);
    if (!bonus) return 0;

    if (earnedBonuses.includes(bonusId)) return 0;

    return Math.max(bonus.months - timeSinceJoining.months, 0);
  };

  // Check if a milestone is earned
  const isMilestoneEarned = (bonusId) => {
    return earnedBonuses.includes(bonusId);
  };

  // Get completed months for a milestone (for display)
  const getCompletedMonthsForMilestone = (bonusId) => {
    const bonus = anniversaryBonusesState.find(b => b.id === bonusId);
    if (!bonus) return { completed: 0, total: 0 };

    if (earnedBonuses.includes(bonusId)) {
      // If milestone is earned, it's fully completed
      return { completed: bonus.months, total: bonus.months };
    }

    // Find previous earned milestone
    const previousBonuses = anniversaryBonusesState.filter(b => b.months < bonus.months);
    const lastEarnedBonus = previousBonuses.reduce((prev, current) => {
      if (earnedBonuses.includes(current.id)) {
        return current.months > prev.months ? current : prev;
      }
      return prev;
    }, { months: 0 });

    const startMonths = lastEarnedBonus.months;
    const completed = Math.max(timeSinceJoining.months - startMonths, 0);
    const total = bonus.months - startMonths;

    return {
      completed: Math.min(completed, total),
      total: total
    };
  };

  // Format time display
  const formatTimeDisplay = () => {
    if (timeSinceJoining.years > 0) {
      return `${timeSinceJoining.years}y ${timeSinceJoining.monthsRemainder}m`;
    }
    return `${timeSinceJoining.months}m`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get last achieved milestone (the highest earned milestone) - memoized
  const lastAchievedMilestone = useMemo(() => {
    // Use anniversaryBonusesState which has the earned property set correctly
    const earnedMilestones = anniversaryBonusesState.filter(bonus => bonus.unlocked);
  //  console.log("earned", earnedMilestones)
    if (earnedMilestones.length === 0) return null;
    // Return the milestone with the highest months value
    return earnedMilestones.reduce((prev, current) =>
      current.months > prev.months ? current : prev
    );
  }, [anniversaryBonusesState]);

  // Get next milestone (the next one that's not earned yet) - memoized
  const nextMilestone = useMemo(() => {
    return anniversaryBonusesState.find(bonus =>
      !earnedBonuses.includes(bonus.id) &&
      timeSinceJoining.months < bonus.months
    );
  }, [anniversaryBonusesState, earnedBonuses, timeSinceJoining.months]);

  // Calculate progress to next milestone - memoized
  const progressToNext = useMemo(() => {
    return nextMilestone ? calculateProgress(nextMilestone.id) : 100;
  }, [nextMilestone, anniversaryBonusesState, earnedBonuses, timeSinceJoining.months]);

  // Get total milestones count
  const totalMilestonesCount = anniversaryBonusesState.length;

  // Get current milestone index (for display in celebration modal)
  const getCurrentMilestoneIndex = (milestoneId) => {
    const index = anniversaryBonusesState.findIndex(b => b.id === milestoneId);
    return index + 1; // Convert to 1-based index
  };

  // Generate confetti particles
  const confettiParticles = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    size: Math.random() * 15 + 5,
    color: ['#5b59bb', '#7A79D4', '#FFD700', '#FF6B35', '#4CAF50', '#FF4081', '#00BCD4', '#9C27B0', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 10)]
  }));

  // Generate floating particles for bonus animation
  const floatingParticles = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 4 + 3,
    size: Math.random() * 12 + 4,
    color: ['#5b59bb', '#7A79D4', '#FFD700', '#F59E0B'][Math.floor(Math.random() * 4)]
  }));

  return (
    <div className={`fixed inset-0 flex items-center justify-center p-4 z-50 animate-in fade-in duration-300 overflow-y-auto ${isBackgroundBlurred ? 'backdrop-blur-lg bg-black/70' : 'backdrop-blur-sm bg-black/60'
      }`}>
      {/* CSS Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
          {confettiParticles.map(particle => (
            <div
              key={particle.id}
              className="absolute rounded-full animate-confetti-enhanced"
              style={{
                left: `${particle.left}%`,
                top: '-30px',
                backgroundColor: particle.color,
                animationDelay: `${particle.delay}s`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: 0.8,
                boxShadow: `0 0 15px ${particle.color}`
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Particles for Bonus Animation */}
      {showParticles && (
        <div className="fixed inset-0 pointer-events-none z-[59] overflow-hidden">
          {floatingParticles.map(particle => (
            <div
              key={particle.id}
              className="absolute rounded-full animate-float-particle"
              style={{
                left: `${particle.left}%`,
                top: '100%',
                backgroundColor: particle.color,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: 0.7
              }}
            />
          ))}
        </div>
      )}

      {/* Celebration Modal - LARGER SIZE */}
      {celebratingMilestone && (
        <div className="fixed inset-0 flex items-center justify-center z-[55] pointer-events-none">
          <div className="bg-gradient-to-br from-[#5b59bb]/95 to-[#7A79D4]/95 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-4 text-center animate-in zoom-in duration-300 shadow-2xl pointer-events-auto border-4 border-white/30">
            <div className="relative">
              <div className="absolute -top-20 left-[49%] transform -translate-x-1/2">

                <div className="relative">
                  <div className="absolute -inset-6 bg-white rounded-full opacity-30 blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-[#5b59bb]/80 to-[#5b59bb]/90 rounded-full p-3 shadow-2xl">
                    <Award size={48} className="text-white drop-shadow-2xl" />
                  </div>
                  <div className="absolute -inset-8 border-3 border-white/80 rounded-full animate-ping-slow"></div>
                  <div className="absolute -inset-12 border border-white/40 rounded-full animate-ping-slow" style={{ animationDelay: '0.5s' }}></div>
                </div>


              </div>

              <div className="pt-10">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-white mb-6 ">🎉 Milestone Unlocked! 🎉</div>
                  <div className="text-4xl font-extrabold text-white mb-3 animate-bounce-slow">
                    {lastAchievedMilestone ? lastAchievedMilestone.description : celebratingMilestone.description}
                  </div>
                  <div className="text-base font-semibold text-white/90">Congratulations on your achievement!</div>
                  <div className="text-sm text-white/60 font-semibold mt-2">
                    {getCurrentMilestoneIndex(lastAchievedMilestone ? lastAchievedMilestone.id : celebratingMilestone.id)} of {totalMilestonesCount} milestones
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#FFD700]/60 to-[#FF6B35]/60 border-3 border-white/40 rounded-2xl p-2.5 backdrop-blur-sm">
                  <div className="text-base font-bold text-white mb-3">Bonus Awarded</div>
                  <div className="text-5xl font-bold text-white flex items-center justify-center gap-4">
                    <span className="animate-glow-text">${lastAchievedMilestone ? lastAchievedMilestone.amount : celebratingMilestone.amount}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* White Profile Overview Div - Only shown when no animation or after animation */}
      {showWhiteDiv && (
        <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#5b59bb] to-[#7A79D4] p-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Profile Overview</h2>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 transform hover:rotate-90"
              >
                <X size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Profile Info - Compact */}
            <div className="flex items-center mb-3">
              <div className="relative mr-3">
                {/* {console.log("Image for Eye: ",profileImage)} */}
                <div className="size-16 rounded-full border-2 border-[#5b59bb]/90  shadow-lg overflow-hidden">
                  <img
                    key={`${imageSource?.image}-${imageRefreshKey}`}
                    src={profileImage}
                    className="w-full h-full object-cover"
                    alt="Profile"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIyNCIgZmlsbD0iIzViNTliYiIvPjxwYXRoIGQ9Ik0yNCAyNCMyNi4yMDkxIDI0IDI4IDIyLjIwOTEgMjggMjBDMjggMTcuNzkwOSAyNi4yMDkxIDE2IDI0IDE2QzIxLjc5MDkgMTYgMjAgMTcuNzkwOSAyMCAyMEMyMCAyMi4yMDkxIDIxLjc5MDkgMjQgMjQgMjRaTTI0IDI4QzE4LjQ4IDI4IDE0IDMyLjQ4IDE4IDM4SDMwQzMwIDMyLjQ4IDI1LjUyIDI4IDI0IDI4WiIgZmlsbD0id2hpdGUiLz48L3N2Zz4K';
                    }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-[#5b59bb]">{fullName}</h3>
                <div className="flex items-center text-gray-500 text-xs mt-0.5">
                  <Store size={11} className="mr-1" />
                  <span className="font-medium text-gray-600">{cafeShopName}</span>
                </div>
              </div>
            </div>

            {/* Wages and Hours - In One Line */}
            <div className="mb-2 bg-white p-3">
              <div className="grid grid-cols-2 gap-4">
                {/* Wages */}
                <div className="shadow-2xl p-2 rounded-lg border-2 border-gray-300/80">
                  <div className="flex items-center mb-2">
                    <div className="bg-gradient-to-br from-[#5b59bb] to-[#7A79D4] rounded-lg p-1 mr-2">
                      <DollarSign size={16} className="text-white" />
                    </div>
                    <p className="text-gray-600 text-xs font-medium">Weekly Wages</p>
                  </div>
                  <p className="text-lg font-bold text-[#5B5ABC] text-center">{weeklyWages}</p>
                </div>

                {/* Hours */}
                <div className="shadow-2xl p-2 rounded-lg border-2 border-gray-300/80">
                  <div className="flex items-center mb-2">
                    <div className="bg-gradient-to-br from-[#5b59bb] to-[#7A79D4] rounded-lg p-1 mr-2">
                      <Clock size={16} className="text-white" />
                    </div>
                    <p className="text-gray-600 text-xs font-medium">Weekly Hours</p>
                  </div>
                  <p className="text-lg font-bold text-[#5B5ABC] text-center">{workingHours}</p>
                </div>
              </div>
            </div>

            {/* Anniversary Bonus - Toggle Section */}
            <div className=" ">
              <button
                onClick={() => setShowAnniversaryList(!showAnniversaryList)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="flex items-center">
                  <Trophy size={16} className="text-[#5b59bb] mr-2" />
                  <span className="text-sm font-semibold text-gray-800">Anniversary Bonus</span>
                  <span className="ml-2 text-xs bg-gradient-to-r from-[#5b59bb] to-[#7A79D4] text-white px-2 py-0.5 rounded-full">
                    {lastAchievedMilestone 
                      ? `${getCurrentMilestoneIndex(lastAchievedMilestone.id)} / ${totalMilestonesCount}`
                      : celebratingMilestone 
                        ? `${getCurrentMilestoneIndex(celebratingMilestone.id)} / ${totalMilestonesCount}`
                        : `0 / ${totalMilestonesCount}`
                    }
                  </span>
                </div>
                <div className={`transform transition-transform duration-300 ${showAnniversaryList ? 'rotate-180' : ''}`}>
                  <ChevronDown size={16} className="text-gray-500 group-hover:text-[#5b59bb]" />
                </div>
              </button>

              {/* Milestones List */}
              <div
                className={`overflow-y-auto transition-all duration-500 ease-in-out scrollbar-thin pr-2 ${showAnniversaryList ? 'max-h-[500px] mt-3 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="space-y-2.5">
                  {anniversaryBonusesState.map((bonus, index) => {
                    const progress = calculateProgress(bonus.id);
                    const monthsRemaining = calculateMonthsRemaining(bonus.id);
                    const isUnlocked = timeSinceJoining.months >= bonus.months;
                    const isEarned = isMilestoneEarned(bonus.id);
                    const isNext = nextMilestone?.id === bonus.id;
                    const isAnimating = animateBonuses.some(b => b.id === bonus.id);
                    const monthsInfo = getCompletedMonthsForMilestone(bonus.id);

                    // Determine border class based on milestone status
                    let borderClass = '';
                    if (isEarned || isAnimating) {
                      borderClass = 'border-2 border-yellow-400';
                    } else {
                      borderClass = 'border-2 border-gray-300/50';
                    }

                    return (
                      <div
                        key={bonus.id}
                        className={`p-2 rounded-xl transition-all duration-500 transform relative overflow-hidden ${borderClass} ${isEarned || isAnimating
                          ? 'bg-yellow-100 shadow-lg'
                          : isUnlocked
                            ? 'bg-yellow-100 shadow-lg border-2 border-yellow-400'
                            : 'bg-gray-50/70'
                          } ${showAnniversaryList
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-4 opacity-0'
                          } hover:shadow-md ${isAnimating ? '' : ''}`}
                        style={{
                          transitionDelay: showAnniversaryList ? `${index * 50}ms` : '0ms'
                        }}
                      >
                        {/* Glow effect for animating bonuses */}
                        {isAnimating && (
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 animate-pulse-glow rounded-xl"></div>
                        )}

                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center">
                            <div>
                              <div className="flex items-center">
                                <span className={`font-semibold text-sm ${isEarned || isAnimating ? 'text-amber-700 font-bold' :
                                  isUnlocked ? 'text-amber-700' :
                                    'text-gray-600'
                                  } ${isAnimating ? '' : ''}`}>
                                  {bonus.description}
                                </span>

                                {isUnlocked ? (
                                  <div className="text-[12px] font-semibold text-white mt-1 ml-2 p-1 bg-green-600 rounded-lg text-center  flex items-center gap-1">
                                    <span className="text-white">✓</span>
                                    <span>Completed!</span>
                                  </div>
                                ) : monthsRemaining > 0 ? (
                                  <div className="text-[12px] font-medium tracking-wide text-gray-200 mt-1 ml-2 p-1 bg-[#5B5ABC] rounded-lg text-center">
                                    {monthsRemaining} months to go
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`  ${isEarned || isAnimating ? 'text-2xl text-yellow-600 font-bold' :
                              isUnlocked ? 'text-2xl text-yellow-600 font-bold' :
                                'text-lg text-gray-400 font-semibold'
                              } ${isAnimating ? '' : ''}`}>
                              ${bonus.amount}
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar for all milestones including completed */}
                        <div className="mt-3 relative z-10">
                          <div className="flex justify-between text-[12px] font-semibold text-gray-600 mb-1">
                            <span>Progress: {monthsInfo.completed}/{monthsInfo.total} months</span>
                            <span className={`font-bold ${isEarned ? 'text-amber-600' : 'text-[#5b59bb]'}`}>{progress}%</span>
                          </div>
                          <div className="h-1 bg-gray-200 rounded-full overflow-hidden shadow-inner relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#5b59bb]/20 to-[#7A79D4]/20 animate-shimmer rounded-full"></div>
                            <div
                              className={`h-full rounded-full transition-all duration-1000 relative z-10 ${isEarned ? 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400' : 'bg-gradient-to-r from-[#5b59bb] via-[#7A79D4] to-[#5b59bb]'
                                }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Summary - Always Visible */}
              {!showAnniversaryList && nextMilestone && (
                <div className="mt-3 p-2 bg-gradient-to-r from-[#5b59bb]/5 to-[#7A79D4]/5 rounded-xl border border-[#5b59bb]/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5b59bb]/10 to-[#7A79D4]/10 animate-shimmer"></div>
                  <div className="flex items-center justify-between mb-2 relative z-10">
                    <div className="flex items-center">
                      <div>
                        <div className="text-xs font-medium text-gray-700">Next milestone</div>
                        <div className="text-sm font-bold text-[#5b59bb]">{nextMilestone.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#5b59bb]">${nextMilestone.amount}</div>
                      <div className="text-[11px] text-gray-500 font-medium">Bonus</div>
                    </div>
                  </div>
                  <div className="h-1 bg-gray-400 rounded-full overflow-hidden mt-2 relative z-10">
                    <div
                      className="h-full bg-gradient-to-r from-[#5b59bb] to-[#7A79D4] rounded-full transition-all duration-1000 animate-shimmer"
                      style={{ width: `${progressToNext}%` }}
                    />
                  </div>
                  <div className="text-[12px] text-gray-600 text-center mt-1 font-semibold relative z-10">
                    {Math.round(progressToNext)}% complete • {calculateMonthsRemaining(nextMilestone.id)} months remaining
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Animation styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes confetti-enhanced {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg) scale(0);
            opacity: 0;
          }
        }
        @keyframes float-particle {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(255, 215, 0, 1));
          }
        }
        @keyframes glow-text {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
          }
          50% {
            text-shadow: 0 0 40px rgba(255, 255, 255, 1);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes glow-card {
          0%, 100% {
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(245, 158, 11, 0.7);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes bounce-text {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        @keyframes glow-bounce {
          0%, 100% {
            transform: translateY(0);
            text-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
          }
          50% {
            transform: translateY(-5px);
            text-shadow: 0 0 20px rgba(245, 158, 11, 0.8);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .animate-confetti-enhanced {
          animation: confetti-enhanced 3s ease-out forwards;
        }
        .animate-float-particle {
          animation: float-particle linear forwards;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-glow-text {
          animation: glow-text 2s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.5s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-glow-card {
          animation: glow-card 2s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-bounce-text {
          animation: bounce-text 0.5s ease-in-out infinite;
        }
        .animate-glow-bounce {
          animation: glow-bounce 1s ease-in-out infinite;
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
        }
        .animate-in {
          animation-duration: 300ms;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          animation-fill-mode: both;
        }
        .fade-in {
          animation-name: fade-in;
        }
        .zoom-in {
          animation-name: zoom-in;
        }
        
        /* Custom Scrollbar Styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #f3f4f6, #e5e7eb);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #5b59bb, #7A79D4);
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4a48a0, #6968c0);
        }
      `}</style>
    </div>
  );
}
