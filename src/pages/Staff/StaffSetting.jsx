import React from 'react'
import { useNavigate } from "react-router-dom";
import { StaffSideBar } from '../../components/StudentProfileComponent/StaffSideBar';

export const StaffSetting = () => {
    const navigate = useNavigate();
    const logOut = () =>{
        localStorage.removeItem('access_token_staff')
        localStorage.removeItem('refresh_token_staff')
        navigate("/")
    }
  return (
    <>
    <div className="d-flex">
      <StaffSideBar/>
      <div className="flex-grow-1 p-4">
        <button onClick={logOut}>logout</button>
      </div>
    </div>
    </>
  )
}
