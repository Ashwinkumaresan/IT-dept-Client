import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import Home from "./pages/Home";
import { Login } from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { StudentProfileDashboard } from './pages/StudentProfilePages/StudentProfileDashboard';
import { StudentProfileSubmitActivity } from './pages/StudentProfilePages/StudentProfileSubmitActivity';
import { StudentProfileSetting } from './pages/StudentProfilePages/StudentProfileSetting';
import { useEffect, useState } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";


function App() {
  const [profileDashboard, setProfileDashboard] = useState("/student-login")
  const [profileActivity, setProfileActivity] = useState("/student-login")
  const [profileSettings, setProfileSettings] = useState("/student-login")
  const [profileViewParticipated, setprofileViewParticipated] = useState("/student-login")
  const [profileInfo, setprofileInfo] = useState("/student-login")
  const [profileEdit, setprofileEdit] = useState("/student-login")

  const [staffProfile, setStaffProfile] = useState("/staff-login")
  const [staffProfileSettings, setStaffProfileSettings] = useState("/staff-login")
  const [studenProfile, setStudentProfile] = useState("/staff-login")

  // Function to set a token with 1-day validity
  const setToken = (key, token) => {
    const expiry = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const tokenData = {
      value: token,
      expiry: expiry,
    };
    localStorage.setItem(key, JSON.stringify(tokenData));
  };

  // Function to get a token and check if it's still valid
  const getValidToken = (key) => {
    const tokenStr = localStorage.getItem(key);
    if (!tokenStr) return null;

    try {
      const tokenData = JSON.parse(tokenStr);
      const now = new Date().getTime();

      if (now > tokenData.expiry) {
        // Token has expired, remove it
        localStorage.removeItem(key);
        return null;
      }

      return tokenData.value;
    } catch (error) {
      // Malformed token data, remove it
      localStorage.removeItem(key);
      return null;
    }
  };

  // Check tokens when the app loads and remove them if expired
  useEffect(() => {
    const userToken = getValidToken('access_token');
    const staffToken = getValidToken('access_token_staff');

    // Optionally: You can show a message here for session expiry or handle logic as needed.
    if (!userToken && !staffToken) {
      console.log('Session expired or no valid token found. Please log in again.');
      // You can show a "session expired" message or prompt the user to log in again.
    }

    // The user will stay on the current page without navigation
  }, []); // Empty dependency array ensures this runs only once on mount


  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setProfileDashboard("/student-profile")
      setProfileActivity("/student-profile/activity/form")
      setProfileSettings("/student-profile/setting")
      setprofileViewParticipated("/student-profile/view/participated")
      setprofileInfo("/student-profile/info")
      setprofileEdit("/student-profile/info/edit")
    }
    else {
      setProfileDashboard("/student-login")
      setProfileActivity("/student-login")
      setProfileSettings("/student-login")
      setprofileViewParticipated("/student-login")
      setprofileInfo("/student-login")
      setprofileEdit("/student-login")
    }
    if (localStorage.getItem("access_token_staff")) {
      setStaffProfile("/staff-profile")
      setStaffProfileSettings("/staff-profile/setting")
      setStudentProfile("/student/:User")
    }
    else {
      setStaffProfile("/staff-login")
      setStaffProfileSettings("/staff-login")
      setStudentProfile("/staff-login")
    }
  })

  const notify = () => {
    console.log("hi")
    toast.success('Login Successfully...!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <HashRouter>
        <Routes>
          <Route path="/" element={[<Navbar />, <Home />]} />
          <Route path="/about" element={[<Navbar />, <About />]} />
          <Route path="/association" element={[<Navbar />, <Association />]} />
          <Route path="/student-login" element={<Login notify={notify} />} />
          <Route path="/student-signup" element={<Signup />} />

          <Route path="/student-profile" element={
            <ProtectedRoute tokenKey="access_token">
              <StudentProfileDashboard />
            </ProtectedRoute>
          } />
          <Route path="/student-profile/activity/form" element={
            <ProtectedRoute tokenKey="access_token">
              <StudentProfileSubmitActivity />
            </ProtectedRoute>
          } />
          <Route path="/student-profile/setting" element={
            <ProtectedRoute tokenKey="access_token">
              <StudentProfileSetting />
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
              <StudentEditProfile />
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
