import { useState, useEffect } from "react"
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { loginUser, clearError } from "../../store/slices/authSlice"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showToast, setShowToast] = useState(false)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth)
  
  // Note: AuthGuard handles navigation, so we don't need to navigate here
  // This prevents double navigation conflicts
  
  // Clear any previous errors on mount
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  // Auto-close error toast after 2 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError())
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [error, dispatch])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
  }

  const handleForgetPassword = () => {
    navigate("/forgotpassword")
  }

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    if (emailError || !email || !password) {
      return
    }

    // Clear any previous errors
    dispatch(clearError())

    // Dispatch login action
    const resultAction = await dispatch(loginUser({ email, password }))

    if (loginUser.fulfilled.match(resultAction)) {
      // Success - show toast and navigate
      setShowToast(true)
      
      // Store login state (if rememberMe is checked)
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('userEmail', email)
      }
      
      // Hide toast and navigate after delay
      setTimeout(() => {
        setShowToast(false)
        navigate("/home")
      }, 2000)
    }

    
    // Error handling is done via Redux state and displayed in error toast
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSignUp = () => {
    navigate("/signup")
  }

  const isSignInDisabled = !email || !password || emailError || !validateEmail(email) || loading

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-lg shadow-green-100/50 max-w-sm overflow-hidden">
            {/* Progress bar animation */}
            <div className="h-1 w-full bg-green-100">
              <div className="h-full bg-green-500 animate-progress"></div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-sm">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-800">
                      Login successful!
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-gray-600 font-medium">
                    Welcome to your dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl shadow-lg shadow-red-100/50 max-w-sm overflow-hidden">
            <div className="h-1 w-full bg-red-100">
              <div className="h-full bg-red-500 animate-progress"></div>
            </div>
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-pink-500 shadow-sm">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-800">
                      Login Failed
                    </p>
                    <button
                      onClick={() =>  dispatch(clearError())}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-600 font-medium">
                    {error?.message || "Invalid credentials"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute -top-32 -right-32 w-80 h-80">
        {/* Filled circle at bottom layer */}
        <div 
          className="absolute top-0 right-0 w-64 h-64 rounded-full animate-pulse-slow" 
          style={{ backgroundColor: "#5B5ABC" }}
        ></div>
        {/* Outline circle on top layer */}
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

      {/* Main form container */}
      <div className="bg-white w-full max-w-md z-10 px-8 py-10">
        {/* <h1 className="text-3xl font-medium mb-6" style={{ color: "#5B5ABC" }}>
          Sign In
        </h1> */}
        <img src="/images/logo/cuppacoin_logo.png" className="w-40 h-8 mx-auto mb-12"/>

        {/* <p className="text-gray-400 text-sm mb-8">Let's make job fun!</p> */}

        <div className="space-y-6 mb-2.5">
          {/* Email field */}
          <div className="relative">
            <fieldset className={`border rounded-2xl px-4 py-3 ${emailError ? "border-red-500" : "border-gray-300"}`}>
              <legend className="text-sm text-[#5B5ABC] px-1">Email Address</legend>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-[#5B5ABC] mr-3" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
            </fieldset>
            {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
          </div>

          {/* Password field */}
          <div className="relative">
            <fieldset className="border border-gray-300 rounded-2xl px-4 py-3">
              <legend className="text-sm text-[#5B5ABC] px-1">Password</legend>
              <div className="flex items-center">
                <LockKeyhole className="w-5 h-5 text-[#5B5ABC] mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={loading}
                  className="text-gray-400 hover:text-[#5B5ABC] transition-colors duration-200 ml-2 disabled:opacity-50"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </fieldset>
          </div>
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between mb-6">
          {/* <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#5B5ABC] focus:ring-[#5B5ABC] disabled:opacity-50"
              disabled={loading}
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
              Remember me
            </label>
          </div> */}
          {/* <button
            onClick={handleForgetPassword}
            disabled={isLoading}
            className="text-sm font-medium hover:opacity-80 transition-opacity duration-200 disabled:opacity-50"
            style={{ color: "#5B5ABC" }}
          >
            Forgot Password?
          </button> */}
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSubmit}
          disabled={isSignInDisabled}
          className={`w-full text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200 mb-4 flex items-center justify-center ${
            isSignInDisabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 cursor-pointer"
          }`}
          style={{ backgroundColor: "#5B5ABC" }}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Sign Up Button */}
        {/* <div className="space-y-3">
          <button
            onClick={handleSignUp}
            disabled={isLoading}
            className="w-full py-2 px-4 border border-[#5B5ABC] rounded-2xl text-[#5B5ABC] font-medium hover:bg-[#5B5ABC] hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign Up
          </button>
        </div> */}
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
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes progress {
          0% { width: 100%; }
          100% { width: 0%; }
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
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        .animate-progress {
          animation: progress 2s linear forwards;
        }
      `}</style>
    </div>
  )
}