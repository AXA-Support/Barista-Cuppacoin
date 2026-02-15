import React, { useState, useEffect, useMemo } from "react";
import {
  Star, TrendingUp, BarChart3, Calendar, CheckCircle, Clock, Filter,
  ChevronLeft, ChevronRight, ChevronDown, ListFilter, SearchX, ListCheck
} from "lucide-react";
import { useSelector } from "react-redux";
import apiClient from "../../store/api/apiClient";
import { getEmployeeId } from "../../utils/cookies";
import IncentiveCard from "./IncentiveCard";
import ToggleButton from "./ToggleButton/toggle";
import BandCard from './BandCard/BandCard';

export default function IncentiveDashboard() {
  const [activeIncentive, setActiveIncentive] = useState("sales");
  const [animateCards, setAnimateCards] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showBands, setShowBands] = useState(false);
  const [incentiveData, setIncentiveData] = useState({
    sales: { regular: [], bands: [] },
    reviews: { regular: [], bands: [] },
    upsell: { regular: [], bands: [] },
    audits: { regular: [], bands: [] },
    review_details: []
  });
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);
  
  const employeeData = useSelector((state) => state.auth.employee);

  const itemsPerPage = {
    desktop: 3,
    mobile: 1
  };

  useEffect(() => {
    let intervalId;

    const fetchIncentiveData = async () => {
      try {
        if (!loading && incentiveData.sales.regular.length === 0) {
          setLoading(true);
          setLoadingProgress(0);
        }
        setError(null);
        const employeeId = getEmployeeId();

        if (!employeeId || employeeId === "null") {
          setError("Employee ID not found");
          setLoading(false);
          return;
        }

        // Start progress simulation
        let progress = 0;
        let apiResolved = false;
        let showFinalProgression = false;
        const progressInterval = setInterval(() => {
          if (progress < 80 && !apiResolved) {
            // Faster progress until 80% if API hasn't resolved yet
            progress += 0.396;
            setLoadingProgress(Math.floor(progress));
          } else if (progress < 98 && !apiResolved) {
            // Slower progress from 80% to 98% if still waiting for API
            progress += 0.198;
            setLoadingProgress(Math.floor(progress));
          } else if (!apiResolved && !showFinalProgression) {
            // Hold at 98% while waiting for API
            setLoadingProgress(98);
          } else if (showFinalProgression) {
            // Show 99% immediately when API resolves
            setLoadingProgress(99);
            
            // Wait 4 seconds before showing 100%
            setTimeout(() => {
              setLoadingProgress(100);
              // Show data immediately after reaching 100%
              setTimeout(() => {
                setLoading(false);
              }, 50);
            }, 1000);
            
            clearInterval(progressInterval);
          }
        }, 100);

        try {
          const response = await apiClient.get(`/employees/${employeeId}/incentive-cards`);
          
          // API resolved - mark it and start final progression
          apiResolved = true;
          showFinalProgression = true;
          
          setIncentiveData(response.data);
          
        } catch (apiErr) {
          apiResolved = true;
          clearInterval(progressInterval);
          throw apiErr;
        }

        // Safety timeout - if API takes too long, stop progress simulation
        setTimeout(() => {
          if (!apiResolved) {
            apiResolved = true;
            showFinalProgression = true;
            // Trigger final progression even if API didn't resolve
          }
        }, 45000); // 45 second timeout

      } catch (err) {
        console.error("Error fetching incentive data:", err);
        // Don't show error on refresh if we already have data
        if (incentiveData.sales.regular.length === 0) {
          setError(err.response?.data?.message || "Failed to fetch incentive data");
          setLoading(false);
        }
        // Clear interval on error too
        if (progressInterval) clearInterval(progressInterval);
      }
    };

    fetchIncentiveData();

    intervalId = setInterval(fetchIncentiveData, 60000);

    // Cleanup function to clear interval when component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 100);
    setCurrentPage(1); 
  }, [activeIncentive, filterStatus, showBands]);

  const incentiveTypes = [
    { id: "sales", label: "Sales", icon: BarChart3 },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "upsell", label: "Upsells", icon: TrendingUp },
    { id: "audits", label: "Audits", icon: ListCheck }
  ];

  const statusFilters = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" },
    { id: "deleted", label: "Deleted" }
  ];

  // Get merged data based on conditions
  const getActiveData = useMemo(() => {
    const currentData = incentiveData[activeIncentive] || { regular: [], bands: [] };
    const hasRegular = currentData.regular && currentData.regular.length > 0;
    const hasBands = currentData.bands && currentData.bands.length > 0;

    // If both regular and band cards exist, show incentives first then bands
    if (hasRegular && hasBands) {
      // Combine both arrays and sort by date
      const combinedData = [...currentData.regular, ...currentData.bands];
      return combinedData.sort((a, b) => {
        const dateA = a.createdDate ? new Date(a.createdDate) : new Date(a.startDate);
        const dateB = b.createdDate ? new Date(b.createdDate) : new Date(b.startDate);
        return dateB - dateA; // Most recent first
      });
    }
    // If only regular cards exist
    else if (hasRegular && !hasBands) {
      return currentData.regular;
    }
    // If only band cards exist
    else if (!hasRegular && hasBands) {
      return currentData.bands;
    }
    // If neither exist
    else {
      return [];
    }
  }, [incentiveData, activeIncentive]);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let data = [...getActiveData];

    // Apply status filter
    if (filterStatus === "deleted") {
      data = data.filter(item => item.status.toLowerCase() === "deleted");
    } else if (filterStatus === "all") {
      // No filter applied
    } else if (filterStatus === "active" || filterStatus === "inactive") {
      // For running/expired, show only non-deleted items with matching status
      data = data.filter(item => {
        // Normalize status (some data uses "Running", some use "running")
        const itemStatus = item.status ? item.status.toLowerCase() : '';
        const filterStatusLower = filterStatus.toLowerCase();
        return itemStatus === filterStatusLower && !item.deleted;
      });
    }

    // Add store name to all incentives
    const storeName = employeeData?.store?.name || null;
    data = data.map(item => ({
      ...item,
      storeName: storeName
    }));

    // Sort by date (most recent first)
    return data.sort((a, b) => {
      const dateA = a.createdDate ? new Date(a.createdDate) : new Date(a.startDate);
      const dateB = b.createdDate ? new Date(b.createdDate) : new Date(b.startDate);
      return dateB - dateA;
    });
  }, [getActiveData, filterStatus, employeeData]);

  // Check if item is a band card (has 'bands' property)
  const isBandCard = (item) => {
    return item.hasOwnProperty('bands') || item.incentiveType === "Sales" && item.bands;
  };

  // Check if we have both regular and band cards
  const hasBothTypes = useMemo(() => {
    const currentData = incentiveData[activeIncentive] || { regular: [], bands: [] };
    return currentData.regular.length > 0 && currentData.bands.length > 0;
  }, [incentiveData, activeIncentive]);

  const getCurrentItems = () => {
    const itemsPerPageToUse = window.innerWidth >= 1024 ? itemsPerPage.desktop : itemsPerPage.mobile;
    const startIndex = (currentPage - 1) * itemsPerPageToUse;
    const endIndex = startIndex + itemsPerPageToUse;
    return filteredAndSortedData.slice(startIndex, endIndex);
  };

  const totalPages = useMemo(() => {
    const totalItems = filteredAndSortedData.length;
    const itemsPerPageToUse = window.innerWidth >= 1024 ? itemsPerPage.desktop : itemsPerPage.mobile;
    return Math.ceil(totalItems / itemsPerPageToUse);
  }, [filteredAndSortedData]);

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get current filter label
  const getStatusFilterLabel = () => {
    const filter = statusFilters.find(f => f.id === filterStatus);
    return filter ? filter.label : "All";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilterDropdown && !event.target.closest('.filter-dropdown')) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilterDropdown]);

  // Handle toggle change
  const handleToggleChange = (value) => {
    setShowBands(value);
  };

  // Responsive grid class
  const gridClass = "grid grid-cols-1 lg:grid-cols-3 gap-6";

  // Check if we should show the toggle button
  const shouldShowToggle = activeIncentive === "sales" &&
    incentiveData[activeIncentive]?.regular?.length > 0 &&
    incentiveData[activeIncentive]?.bands?.length > 0;

  // Show loading state with progress bar
  if (loading) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center -mt-32">
        <div className="text-center w-full">
          <h2 className="text-mm font-medium text-[#5959b9] mb-6 tracking-wide">
            LOADING...
          </h2>
          
          <div className="mb-4">
            <span className="text-mm font-medium text-[#5959b9]">
              {loadingProgress}%
            </span>
          </div>
          
          {/* Thin progress bar */}
          <div className="max-w-xs mx-auto">
            <div className="w-full bg-gray-300 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-[#5959b9] h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white w-full mx-auto flex items-center justify-center">
        <div className="text-center bg-gray-50 rounded-xl p-8 w-full sm:w-[70%] mx-auto border-2 border-red-300">
          <SearchX className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-medium text-gray-800 mb-2">Error Loading Data</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl md:text-3xl font-medium text-[#5958bb] mb-1">Active Incentives</h1>
      </div>

      {/* Main Controls Section */}
      <div className="mb-8">
        {/* Incentive Type Selector - Centered */}
        <div className="flex justify-center md:mb-8 mb-5">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-6 justify-center max-w-3xl mx-auto">
            {incentiveTypes.map((type) => {
              const Icon = type.icon;
              const isActive = activeIncentive === type.id;

              let iconColorClass = '';
              switch (type.id) {
                case 'reviews':
                  iconColorClass = 'text-yellow-500';
                  break;
                case 'audits':
                  iconColorClass = 'text-green-500';
                  break;
                case 'upsell':
                  iconColorClass = 'text-purple-500';
                  break;
                case 'sales':
                  iconColorClass = 'text-blue-500';
                  break;
                default:
                  iconColorClass = 'text-gray-500';
              }

              const finalIconColor = isActive ? 'text-white' : iconColorClass;

              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setActiveIncentive(type.id);
                    // Reset toggle when switching tabs
                    setShowBands(false);
                  }}
                  className={`flex items-center justify-center gap-2 px-6 py-2 sm:px-6 sm:py-2 rounded-lg sm:rounded-xl font-medium sm:font-semibold transition-all duration-300 transform shadow-md sm:shadow-md text-sm sm:text-base ${isActive
                      ? 'bg-[#5958bb] text-white shadow-lg sm:shadow-lg scale-[1.02] sm:scale-105 border-2 border-[#5958bb]'
                      : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-[1.02] border-2 border-gray-300 hover:border-[#5958bb]'
                    }`}
                >
                  <Icon className={`size-3 sm:size-6 ${finalIconColor}`} />
                  <span className="whitespace-nowrap">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {activeIncentive !== "audits" ? (
          <>
            <div className="flex flex-row items-center justify-between gap-3 mb-4">
              <div className="flex-1"></div>

              {shouldShowToggle && (
                <div className="lg:hidden flex items-center">
                  <ToggleButton
                    value={showBands}
                    onChange={handleToggleChange}
                    label={showBands ? "Bands Only" : "All Cards"}
                  />
                </div>
              )}

              <div className="relative filter-dropdown">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center gap-2 px-4 md:py-2 py-1.5 -mt-1 text-sm bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-[#5958bb] transition-all shadow-md min-w-[140px] justify-between"
                >
                  <div className="flex items-center gap-2">
                    <ListFilter className="w-5 h-5 text-[#5959bb]" />
                    <span className="font-medium text-[#5959bb]">{getStatusFilterLabel()}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                </button>
                {/* Filter Dropdown Menu */}
                {showFilterDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="p-2">
                      {statusFilters.map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() => {
                            setFilterStatus(filter.id);
                            setShowFilterDropdown(false);
                          }}
                          className={`w-full px-2 py-2 rounded-lg transition-all flex items-center justify-center ${filterStatus === filter.id
                              ? 'bg-[#5958bb] text-white'
                              : 'bg-white border-b-2 border-gray-300 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          <span className="text-sm">{filter.label}</span>
                          {filterStatus === filter.id && (
                            <CheckCircle className="w-4 h-4 ml-3" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Large Screen Toggle - Centered between results and filter */}
            {/* {shouldShowToggle && (
              <div className="hidden lg:flex lg:justify-center lg:mb-4">
                <ToggleButton
                  value={showBands}
                  onChange={handleToggleChange}
                  label={showBands ? "Bands Only" : "All Cards"}
                />
              </div>
            )} */}
          </>
        ) : (
          <></>
        )}
      </div>

      {/* Content Display */}
      {activeIncentive !== "audits" && getCurrentItems().length > 0 && (
        <div className={`${gridClass} ${animateCards ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 mb-8`}>
          {getCurrentItems().map((item) => {
            // If toggle is active and we're on sales tab, show only band cards
            if (showBands && activeIncentive === "sales" && hasBothTypes) {
              // Only render band cards when toggle is ON
              return isBandCard(item) ? (
                <BandCard
                  key={`band-${item.id}-${item.createdDate || item.startDate}`}
                  data={item}
                  showDropdown={false}
                  onDropdownToggle={() => { }}
                />
              ) : null;
            } else {
              // Show appropriate card based on item type
              const reviewDetails = incentiveData.review_details || [];
              const reviewDetail = reviewDetails.find((rd) => rd.incentive_id === item.id);
              const reviewDetailsReviews = reviewDetail?.reviews ?? [];

              return isBandCard(item) ? (
                <BandCard
                  key={`band-${item.id}-${item.createdDate || item.startDate}`}
                  data={item}
                  showDropdown={false}
                  onDropdownToggle={() => { }}
                />
              ) : (
                <IncentiveCard
                  key={`regular-${item.id}-${item.createdDate || item.startDate}`}
                  data={item}
                  reviewDetailsReviews={reviewDetailsReviews}
                />
              );
            }
          })}
        </div>
      )}

      {/* Pagination */}
      {activeIncentive !== "audits" && totalPages > 1 && (
        <div className="flex flex-col items-center justify-center gap-4 mt-8">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all ${currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
            >
              <ChevronLeft className="size-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg transition-all font-medium ${currentPage === pageNum
                        ? 'bg-[#5958bb] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-all ${currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      )}

      {/* No Results Message */}
      {filteredAndSortedData.length === 0 && (
        <div className="text-center py-6 sm:py-12">
          <div className="bg-gray-50 rounded-xl p-6 sm:p-8 w-full sm:w-[70%] mx-auto border-2 border-gray-300">
            <SearchX className="w-10 h-10 sm:w-12 sm:h-12 text-[#5958bb] mx-auto mb-3 sm:mb-4" />
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 mb-1 sm:mb-2">
              {showBands && activeIncentive === "sales" && hasBothTypes ? "No band incentives found" : `No ${activeIncentive} incentives found`}
            </h3>
            <p className="text-gray-500 text-base sm:text-lg font-medium mt-6">
              {showBands && activeIncentive === "sales" && hasBothTypes
                ? "Try switching to all cards view or check back later for band incentives."
                : `Try adjusting your filters or check back later for ${activeIncentive} incentives.`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}