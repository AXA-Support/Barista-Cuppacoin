// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import { Toaster } from 'sonner'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { checkAuthStatus } from './store/slices/authSlice';
// import { isAuthenticated } from './utils/cookies';
// import SignIn from './LoginForms/SignInForm/signInForm';
// import SignUp from './LoginForms/SignUpForm/signUpForm';
// import ForgetPassword from './LoginForms/ForgetPassword/forgetPassword';
// import Home from './Home/home';
// import IncentiveInsights from './Pages/IncentivePage/incentiveInsights';
// import BandsCard from './Pages/IncentivePage/BandCard/BandCard'

// // Component to handle auth check and navigation
// function AuthGuard() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { isAuthenticated: authStatus } = useSelector((state) => state.auth);

//   // Initialize auth status on mount
//   useEffect(() => {
//     const hasToken = isAuthenticated();
//     if (hasToken && !authStatus) {
//       // Only dispatch if we have a token but Redux state is not authenticated
//       dispatch(checkAuthStatus());
//     }
//   }, [dispatch, authStatus]);

//   // Handle navigation based on auth status
//   useEffect(() => {
//     const hasToken = isAuthenticated();
    
//     if (hasToken || authStatus) {
//    ///   User is authenticated
//       if (location.pathname === '/' || location.pathname === '/signup') {
//         navigate('/home', { replace: true });
//       }
//     } else {
//       // User is not authenticated
//       if (location.pathname !== '/' && 
//           location.pathname !== '/signup' && 
//           location.pathname !== '/forgotpassword') {
//         navigate('/', { replace: true });
//       }
//     }
//   }, [authStatus, navigate, location.pathname]);

//   return null;
// }

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         {/* <AuthGuard /> */}
//         <Routes>
//           <Route path="/home" element={<Home />} />
//           <Route path="/" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/forgotpassword" element={<ForgetPassword />} />
//           <Route path="/bands" element={<BandsCard />} />
//           <Route path="/incentiveinsights" element={<IncentiveInsights />} />
//         </Routes>
        
//         <Toaster 
//           position="bottom-right" 
//           expand={false} 
//           richColors 
//           // closeButton
//           toastOptions={{
//             duration: 3000,
//             style: {
//               background: '#fff',
//               color: '#333',
//               border: '1px solid #e5e7eb',
//             },
//           }}
//         />
//       </div>
//     </Router>
//   );
// }

// export default App;


///////////////////////////////////////////////////////////////////////////


import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner'; 
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from './store/slices/authSlice';
import { isAuthenticated } from './utils/cookies';
import SignIn from './LoginForms/SignInForm/signInForm';
import SignUp from './LoginForms/SignUpForm/signUpForm';
import ForgetPassword from './LoginForms/ForgetPassword/forgetPassword';
import Home from './Home/home';
import IncentiveInsights from './Pages/IncentivePage/incentiveInsights';
import BandsCard from './Pages/IncentivePage/BandCard/BandCard'
import Carousel from './Carousel';


// Component to handle auth check and navigation
function AuthGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated: authStatus } = useSelector((state) => state.auth);

  // Initialize auth status on mount
  useEffect(() => {
    const hasToken = isAuthenticated();
    if (hasToken && !authStatus) {
      // Only dispatch if we have a token but Redux state is not authenticated
      dispatch(checkAuthStatus());
    }
  }, [dispatch, authStatus]);

  // Handle navigation based on auth status
  useEffect(() => {
    const hasToken = isAuthenticated();
    
    if (hasToken || authStatus) {
   ///   User is authenticated
      if (location.pathname === '/' || location.pathname === '/signup') {
        navigate('/home', { replace: true });
      }
    } else {
      // User is not authenticated
      if (location.pathname !== '/' && 
          location.pathname !== '/signup' && 
          location.pathname !== '/forgotpassword') {
        navigate('/', { replace: true });
      }
    }
  }, [authStatus, navigate, location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="App">
        {/* <AuthGuard /> */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgetPassword />} />
          <Route path="/bands" element={<BandsCard />} />
          <Route path="/incentiveinsights" element={<IncentiveInsights />} />

     <Route path="/carosel" element={<Carousel/>} />


        </Routes>
        
        <Toaster 
          position="bottom-right" 
          expand={false} 
          richColors 
          // closeButton
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              border: '1px solid #e5e7eb',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;