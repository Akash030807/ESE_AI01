import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const logoutHandler = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="nav-logo">
        Employee Analytics
      </div>

      <div className="nav-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/recommendations">
          AI Recommendations
        </Link>

        <button onClick={logoutHandler}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;