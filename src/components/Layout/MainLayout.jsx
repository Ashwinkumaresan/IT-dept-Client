import { Outlet } from "react-router-dom";
import ModernNavbar from "../Navbar/Navbar";

export const  MainLayout = () => {
  return (
    <>
      <ModernNavbar/>
      <Outlet />
    </>
  );
}
