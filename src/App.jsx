import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import Home from "./pages/Home";
import { Login } from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
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
import { ToastContainer, toast } from 'react-toastify';
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import { useEffect, useState } from 'react';

function App() {
  // const [profileDashboard, setProfileDashboard] = useState("/student-login")
  // const [profileActivity, setProfileActivity] = useState("/student-login")
  // const [profileSettings, setProfileSettings] = useState("/student-login")
  // const [profileViewParticipated, setprofileViewParticipated] = useState("/student-login")
  // const [profileInfo, setprofileInfo] = useState("/student-login")
  // const [profileEdit, setprofileEdit] = useState("/student-login")

  // const [staffProfile, setStaffProfile] = useState("/staff-login")
  // const [staffProfileSettings, setStaffProfileSettings] = useState("/staff-login")
  // const [studenProfile, setStudentProfile] = useState("/staff-login")

  // useEffect(() => {
  //   if (localStorage.getItem("access_token")) {
  //     setProfileDashboard("/student-profile")
  //     setProfileActivity("/student-profile/activity/form")
  //     setProfileSettings("/student-profile/setting")
  //     setprofileViewParticipated("/student-profile/view/participated")
  //     setprofileInfo("/student-profile/info")
  //     setprofileEdit("/student-profile/info/edit")
  //   }
  //   else {
  //     setProfileDashboard("/student-login")
  //     setProfileActivity("/student-login")
  //     setProfileSettings("/student-login")
  //     setprofileViewParticipated("/student-login")
  //     setprofileInfo("/student-login")
  //     setprofileEdit("/student-login")
  //   }
  //   if (localStorage.getItem("access_token_staff")) {
  //     setStaffProfile("/staff-profile")
  //     setStaffProfileSettings("/staff-profile/setting")
  //     setStudentProfile("/student/:User")
  //   }
  //   else {
  //     setStaffProfile("/staff-login")
  //     setStaffProfileSettings("/staff-login")
  //     setStudentProfile("/staff-login")
  //   }
  // })

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
        theme="colored"
      />
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
        theme="colored"
      />
      {/* Log out */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
              <StudentProfileSubmitActivity activitySubmit={activitySubmit} />
            </ProtectedRoute>
          } />
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
