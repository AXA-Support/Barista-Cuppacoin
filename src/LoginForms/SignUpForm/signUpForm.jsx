import React, { useState } from "react";
import { User, Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: "", message: "" };
    
    if (password.length < 8) {
      return { 
        strength: "weak", 
        message: "• Password strength: Weak - Your password must contain at least 8 characters." 
      };
    }
    
    // Check for medium strength (at least one number or special character)
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (hasNumber || hasSpecialChar) {
      // Check for strong strength (both number and special character, and uppercase)
      const hasUppercase = /[A-Z]/.test(password);
      if (hasNumber && hasSpecialChar && hasUppercase && password.length >= 10) {
        return { 
          strength: "strong", 
          message: "• Password strength: Strong" 
        };
      }
      return { 
        strength: "medium", 
        message: "• Password strength: Medium" 
      };
    }
    
    return { 
      strength: "weak", 
      message: "• Password strength: Weak - Add numbers or special characters" 
    };
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

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    if (emailError) {
      return;
    }

    navigate('/signin');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const passwordStrength = getPasswordStrength(password);
  
  // Check if all fields are filled and valid
  const isSignUpDisabled = !name || !email || !password || emailError || !validateEmail(email) || password.length < 8;

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

        <h1 className="text-3xl font-medium mb-1" style={{ color: '#5B5ABC' }}>Sign Up</h1>
        <p className="text-gray-400 text-sm mb-8">Let's make job fun!</p>
        
        <div className="space-y-6 mb-6">
          {/* Name Field */}
          <div className="relative">
            <fieldset className="border border-gray-300 rounded-2xl px-4 py-3">
              <legend className="text-sm text-[#5B5ABC] px-1">
                Name
              </legend>
              <div className="flex items-center">
                <User className="w-5 h-5 text-[#5B5ABC] mr-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
                  placeholder="Enter your name"
                />
              </div>
            </fieldset>
          </div>

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
          
          {/* Password Field */}
          <div className="relative">
            <fieldset className={`border rounded-2xl px-4 py-3 ${
              password ? (
                passwordStrength.strength === "weak" ? 'border-red-500' : 
                passwordStrength.strength === "medium" ? 'border-yellow-500' : 
                'border-green-500'
              ) : 'border-gray-300'
            }`}>
              <legend className="text-sm text-[#5B5ABC] px-1">
                Password
              </legend>
              <div className="flex items-center">
                <LockKeyhole className="w-5 h-5 text-[#5B5ABC] mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-[#5B5ABC] transition-colors duration-200 ml-2"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </fieldset>
            {password && (
              <p className={`mt-1 text-xs ${
                passwordStrength.strength === "weak" ? 'text-red-500' : 
                passwordStrength.strength === "medium" ? 'text-yellow-600' : 
                'text-green-600'
              }`}>
                {passwordStrength.message}
              </p>
            )}
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSubmit}
          disabled={isSignUpDisabled}
          className={`w-full text-white py-2.5 px-4 rounded-2xl font-medium transition-opacity duration-200 mb-4 ${
            isSignUpDisabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:opacity-90 cursor-pointer'
          }`}
          style={{ backgroundColor: '#5B5ABC' }}
        >
          Sign Up
        </button>
        
        <div className="space-y-3">
          <button 
            onClick={handleSignIn}
            className="w-full py-2 px-4 border border-[#5B5ABC] rounded-2xl text-[#5B5ABC] font-medium hover:bg-[#5B5ABC] hover:text-white transition-all duration-200"
          >
            Already User? Sign In
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