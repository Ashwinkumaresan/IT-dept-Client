import React from 'react'
import { StudentSideBar } from '../../components/StudentProfileComponent/StudentSideBar'
import { useNavigate } from "react-router-dom";

export const StudentProfileSetting = () => {
    const navigate = useNavigate();
    const logOut = () =>{
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate("/")
    }
  return (
    <>
    <div className="d-flex">
      <StudentSideBar/>
      <div className="flex-grow-1 p-4">
        <button className='btn btn-outline-dark' 
        onClick={logOut}>Log out</button>
      </div>
    </div>
    </>
  )
}
