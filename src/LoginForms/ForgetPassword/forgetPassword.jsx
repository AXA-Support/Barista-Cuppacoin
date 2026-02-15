import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSendOTP = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    if (emailError) {
      return;
    }
    
    // Handle send OTP logic here
    // console.log("Sending OTP to:", email);
  };

  const handleBack = () => {
    navigate('/signin');
  };

  // Check if email is valid for enabling the Send OTP button
  const isSendOTPDisabled = !email || emailError || !validateEmail(email);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">

      <div className="absolute -top-32 -right-32 w-80 h-80">
        <div 
          className="absolute top-0 right-0 w-64 h-64 rounded-full animate-pulse-slow" 
          style={{ backgroundColor: "#5B5ABC" }}
        ></div>
        <div
          className="absolute top-10 -right-4 w-64 h-64 rounded-full border-4 animate-float"
          style={{ borderColor: "#5B5ABC"  }}
        ></div>
      </div>
      
      <div className="absolute -bottom-32 -left-32 w-80 h-80">
        <div 
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full animate-pulse-medium" 
          style={{ backgroundColor: "#5B5ABC" }}
        ></div>
        <div
          className="absolute bottom-10 -left-4 w-64 h-64 rounded-full border-4 animate-float-delayed"
          style={{ borderColor: "#5B5ABC" }}
        ></div>
      </div>
      
      <div className="absolute bottom-1/4 right-12 text-gray-300 text-5xl font-extralight" style={{ opacity: 0.5 }}>+</div>
      <div className="bg-white w-full max-w-md z-10 px-8 py-10">

        <h1 className="text-3xl font-medium mb-1" style={{ color: '#5B5ABC' }}>Forgot Password</h1>
        <p className="text-gray-400 text-sm mb-8">Enter your email to reset your password</p>
        
        <div className="space-y-6 mb-6">
          {/* Email Field */}
          <div className="relative">
            <fieldset className={`border rounded-2xl px-4 py-3 ${emailError ? 'border-red-500' : 'border-gray-300'}`}>
              <legend className="text-sm text-[#5B5ABC] px-1">
                Email Address
              </legend>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-[#5B5ABC] mr-3" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
            </fieldset>
            {emailError && (
              <p className="mt-1 text-xs text-red-500">{emailError}</p>
            )}
          </div>
        </div>

        {/* Send OTP Button */}
        <button
          onClick={handleSendOTP}
          disabled={isSendOTPDisabled}
          className={`w-full text-white py-2.5 px-4 rounded-2xl font-medium transition-opacity duration-200 mb-4 ${
            isSendOTPDisabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:opacity-90 cursor-pointer'
          }`}
          style={{ backgroundColor: '#5B5ABC' }}
        >
          Send OTP
        </button>
        
        <div className="space-y-3">
          <button 
            onClick={handleBack}
            className="w-full py-2 px-4 border border-[#5B5ABC] rounded-2xl text-[#5B5ABC] font-medium hover:bg-[#5B5ABC] hover:text-white transition-all duration-200"
          >
            Back
          </button>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
        @keyframes pulse-medium {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.7; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 7s ease-in-out infinite 1s;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-medium {
          animation: pulse-medium 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}