import './StudentSideBar.css'
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { FaHome, FaUser, FaAward, FaCog, FaFileAlt, FaList, FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa"
import { IoIosArrowBack } from "react-icons/io";

export const StudentSideBar = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [coCurricularOpen, setCoCurricularOpen] = useState(true)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleCoCurricular = () => {
    setCoCurricularOpen(!coCurricularOpen)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div style={{
        position:"sticky",
        top:"0px",
      }}>

      <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
        <div  className={`mb-0 ${collapsed ? "d-none" : ""} d-flex`}>

        <a href="/" style={{textDecoration:"none", color:"black"}}>
          <IoIosArrowBack  style={{cursor:"pointer", fontSize:"20px"}}/>
        </a>
        <h5>Profile Dashboard</h5>
        </div>
        <button className="btn btn-sm btn-light" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      <div className="py-2">
        <Link to="/student-profile" className={`sidebar-link ${isActive("/student-profile") ? "active" : ""}`}>
          <FaHome className="sidebar-icon" />
          <span className="sidebar-text">Dashboard</span>
        </Link>

        <Link to="/student-profile/info" className={`sidebar-link ${isActive("/student-profile/info") ? "active" : ""}`}>
          <FaUser className="sidebar-icon" />
          <span className="sidebar-text">Personal Info</span>
        </Link>

        <div>
          <div className="sidebar-link" onClick={toggleCoCurricular} style={{ cursor: "pointer" }}>
            <FaAward className="sidebar-icon" />
            <span className="sidebar-text">Submissions</span>
            {!collapsed &&
              (coCurricularOpen ? <FaChevronUp className="ms-auto" /> : <FaChevronDown className="ms-auto" />)}
          </div>

          {coCurricularOpen && !collapsed && (
            <div className="ps-4">
              <Link
                to="/student-profile/activity/form"
                className={`sidebar-link ${isActive("/student-profile/activity/form") ? "active" : ""}`}
              >
                <FaFileAlt className="sidebar-icon" />
                <span className="sidebar-text">Submit Activity</span>
              </Link>

              <Link
                to="/student-profile/view/participated"
                className={`sidebar-link ${isActive("/student-profile/view/participated") ? "active" : ""}`}
              >
                <FaList className="sidebar-icon" />
                <span className="sidebar-text">View Activity</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto border-top">
        <Link to="/student-profile/setting" className="sidebar-link">
          <FaCog className="sidebar-icon" />
          <span className="sidebar-text">Settings</span>
        </Link>
      </div>
      </div>
    </div>
  )
}


