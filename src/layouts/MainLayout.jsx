import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CopyRight from "../components/CopyRight";

const MainLayout = () => {
  return (
    <div className="font-accent">
      {/* Navbar */}
      <Navbar />
      {/* Dynamic section */}
      <div className="bg-custom-outlet bg-cover bg-no-repeat bg-center">
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
      <CopyRight />
    </div>
  );
};

export default MainLayout;
