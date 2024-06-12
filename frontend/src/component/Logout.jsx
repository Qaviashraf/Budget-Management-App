import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";

const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    toast.success("You’ve logged out successfully!");
    navigate("/");
  };

  return (
  <>
         <button onClick={handleLogout} className="btn btn--warning p-1">
            <span>Logout</span>
          </button>
  </>
  )
};

export default Logout;
