import { Link, NavLink, useNavigate } from "react-router-dom";
import coffeeCupIcon from "../assets/images/more/logo1.png";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("/");
        console.log("user signed out successfully!");
      })
      .catch((error) => {
        console.log("ERROR", error.message);
      });
  };
  const links = (
    <>
      {!user && (
        <>
          <li className="text-white font-title text-2xl">
            <NavLink to="/signIn">Login</NavLink>
          </li>
          <li className="text-white font-title text-2xl">
            <NavLink to="/signUp">Sign Up</NavLink>
          </li>
        </>
      )}
      {user && (
        <>
          <li className="text-white font-title text-2xl">
            <NavLink to="/users">Users</NavLink>
          </li>
          <li className="flex gap-3 items-center">
            <span className="text-white font-title text-2xl font-normal">
              {user?.email}
            </span>
            <button onClick={handleSignOut} className="btn font-title text-xl">
              Sign Out
            </button>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-custom-navbar bg-cover bg-no-repeat bg-center py-3">
      <div className="container mx-auto grid grid-cols-2 justify-between items-center">
        <div>
          <Link to="/" className="flex items-center gap-4">
            <img className="w-20" src={coffeeCupIcon} alt="" />
            <h2 className="text-5xl text-white font-title font-normal">
              Espresso Emporium
            </h2>
          </Link>
        </div>
        <ul className="flex gap-6 items-center justify-end">{links}</ul>
      </div>
    </div>
  );
};

export default Navbar;
