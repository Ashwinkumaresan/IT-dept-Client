import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import { HashRouter,useParams, Routes, Route } from 'react-router-dom';
import {Helmet} from "react-helmet";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Home from "./pages/Home";
import Signup from './pages/Signup/Signup';
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import { Login } from './pages/Login/Login';
import { StudentProfileDashboard } from './pages/StudentProfilePages/StudentProfileDashboard';
import { StudentProfileSubmitActivity } from './pages/StudentProfilePages/StudentProfileSubmitActivity';
import { StudentProfileSetting } from './pages/StudentProfilePages/StudentProfileSetting';
import { StudentProfileViewParcipated } from './pages/StudentProfilePages/StudentProfileViewParcipated';
import { StudentProfileInfo } from './pages/StudentProfilePages/StudentProfileInfo';
import { StudentEditProfile } from './pages/StudentProfilePages/StudentEditProfile';
import { About } from './pages/About';
import { Association } from './pages/Association';
import { StaffLogin } from './pages/Login/StaffLogin';
import { StaffSignup } from './pages/Signup/StaffSignup';
import { StaffProfile } from './pages/Staff/StaffProfile';
import { StaffSetting } from './pages/Staff/StaffSetting';
import { StudentProfile } from './pages/Staff/StudentProfile';
import { PlacementPage } from './pages/PlacementPage';
import { GalleryPage } from './pages/GalleryPage';
import { ForgotPasswordEmail } from './pages/Forgot password/ForgotPasswordEmail';
import { ForgotPasswordOTP } from './pages/Forgot password/ForgotPasswordOTP';
import { ForgotPasswordReset } from './pages/Forgot password/ForgotPasswordReset';
import { Feed } from './pages/Feed';
import { AssociationEvents } from './pages/AssociationEvents';
import { MainLayout } from './components/Layout/MainLayout';
import { ScrollToTop } from './components/Layout/ScrollToTop.jsx';
import { RoadmapDomains } from './pages/Roadmap/RoadmapDomains.jsx';
import { RoadmapDetail } from './pages/Roadmap/RoadmapDetail.jsx';
import { AssociationGallery } from './pages/AssociationGallery.jsx';
import { Facility } from './pages/Facility.jsx';

function App() {
  
  // Prevent Clickjacking by breaking out of iframe
  useEffect(() => {
    if (window.top !== window.self) {
      window.top.location = window.location;
    }
  }, []);

  const notify = () => {
    toast.success('Login Successfully...!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const activitySubmit = () => {
    toast.success('Form submitted successfully...!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  const profileSubmit = () => {
    toast.success('Profile updated successfully...!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  const logoutButton = () => {
    toast.error('Logged out...', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  }

  const WordPage = () => {
    const { domain } = useParams(); // Extract word from route
    return <RoadmapDetail domain = {domain}/> ; // Passing as prop
};

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Log out */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <HashRouter>
      <ScrollToTop/>
          <Helmet>
            <title>Dr. Mahalingam College of Engineering and Technology | Information Technology</title>
            <meta name="description" content="Information Technology" />
            <meta name="keywords" content="app, react, education, student, staff" />
            <link rel="canonical" href="https://testing.drmcet.com" />
          </Helmet>
        <Routes>

          <Route element={<MainLayout/>}>
          <Route path="/" element={[ <Home />]} />
          <Route path="/about" element={[ <About />]} />
          <Route path="/association" element={[ <Association />]} />
          <Route path='/association-events' element={[ <AssociationEvents/>]} />
          <Route path='/association-gallery' element={<AssociationGallery/>} />
          <Route path='/placement' element={[ <PlacementPage/>] } />
          <Route path='/gallery' element={[ <GalleryPage/>] } />
          <Route path='/facilities' element={<Facility/>} />
          <Route path='/feed' element={[ <Feed/>]} />
          <Route path='/roadmap-domains' element={<RoadmapDomains/>} />
          <Route path='/roadmap/:domain' element={<WordPage/>} />
          </Route>
          

          <Route path="/student-login" element={<Login notify={notify} />} />
          <Route path="/student-signup" element={<Signup />} />

          <Route path='/forgotpassword-email' element={<ForgotPasswordEmail/>} />
          <Route path='/forgot-password/otp' element={<ForgotPasswordOTP/>} />
          <Route path='/forgot-password/reset' element={<ForgotPasswordReset/>} />

          <Route path='/student-profile/activity/form' element={<StudentProfileSubmitActivity/>}/>

          <Route path="/student-profile" element={
            <ProtectedRoute tokenKey="access_token">
              <StudentProfileDashboard />
            </ProtectedRoute>
          } />
          {/* <Route path="/student-profile/activity/form" element={
            <ProtectedRoute tokenKey="access_token">
              <StudentProfileSubmitActivity activitySubmit={activitySubmit} />
            </ProtectedRoute>
          } /> */}
          <Route path="/student-profile/setting" element={
            <ProtectedRoute tokenKey="access_token">
              <StudentProfileSetting logoutButton={logoutButton} />
            </ProtectedRoute>
          } />
          <Route path="/student-profile/view/participated" element={
            <ProtectedRoute tokenKey="access_token">
              <StudentProfileViewParcipated />
            </ProtectedRoute>
          } />

          <Route path="/student-profile/info" element={
            <ProtectedRoute tokenKey="access_token">
              <StudentProfileInfo />
            </ProtectedRoute>
          } />
          <Route path="/student-profile/info/edit" element={
            <ProtectedRoute tokenKey="access_token">
              <StudentEditProfile profileSubmit={profileSubmit} />
            </ProtectedRoute>
          } />

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />

          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/staff-signup" element={<StaffSignup />} />

          <Route path="/staff-profile" element={
            <ProtectedRoute tokenKey="access_token_staff">
              <StaffProfile />
            </ProtectedRoute>
          } />
          <Route path="/staff-profile/setting" element={
            <ProtectedRoute tokenKey="access_token_staff">
              <StaffSetting />
            </ProtectedRoute>
          } />
          <Route path="/student/:User" element={
            <ProtectedRoute tokenKey="access_token_staff">
              <StudentProfile />
            </ProtectedRoute>
          } />

        </Routes>
      </HashRouter>

    </>
  )
}

export default App
