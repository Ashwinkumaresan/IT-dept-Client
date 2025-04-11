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


  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setProfileDashboard("/student-profile")
      setProfileActivity("/student-profile/activity/form")
      setProfileSettings("/student-profile/setting")
      setprofileViewParticipated("/student-profile/view/participated")
      setprofileInfo("/student-profile/info")
      setprofileEdit("/student-profile/info/edit")
    }
    if (localStorage.getItem("access_token_staff")) {
      setStaffProfile("/staff-profile")
      setStaffProfileSettings("/staff-profile/setting")
      setStudentProfile("/student/:User")
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
          <Route path={profileDashboard} element={<StudentProfileDashboard />} />
          <Route path={profileActivity} element={<StudentProfileSubmitActivity />} />
          <Route path={profileSettings} element={<StudentProfileSetting />} />
          <Route path={profileViewParticipated} element={<StudentProfileViewParcipated />} />
          <Route path={profileInfo} element={<StudentProfileInfo />} />
          <Route path={profileEdit} element={<StudentEditProfile />} />


          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/staff-signup" element={<StaffSignup />} />

          <Route path={staffProfile} element={<StaffProfile />} />
          <Route path={staffProfileSettings} element={<StaffSetting />} />
          <Route path={studenProfile} element={<StudentProfile />} />

        </Routes>
      </HashRouter>
    </>
  )
}

export default App
