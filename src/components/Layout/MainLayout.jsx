import { Outlet } from "react-router-dom";
import ModernNavbar from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";

export const  MainLayout = () => {
  return (
    <>
      <ModernNavbar/>
      <Outlet />
      <Footer/>
    </>
  );
}
