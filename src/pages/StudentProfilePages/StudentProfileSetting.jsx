import { StudentSideBar } from '../../components/StudentProfileComponent/StudentSideBar'
import { useNavigate } from "react-router-dom";

export const StudentProfileSetting = ( {logoutButton} ) => {
    const navigate = useNavigate();

    const logOut = () =>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        //localStorage.removeItem('CollegeMail');
        localStorage.removeItem('timestamp');
        logoutButton();
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
