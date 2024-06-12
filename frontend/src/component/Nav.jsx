import { Form, NavLink } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import { UserContext} from "../App"

// assets
import logomark from "../assets/logomark.svg"
import Logout from "./Logout";

const Nav = () => {
  const {state , dispatch} = useContext(UserContext);
  // const [userName, setUserName] = useState(localStorage.getItem("userName"));

  // useEffect(() => {
  //   const storedUserName = localStorage.getItem("userName");
  //   if (storedUserName) {
  //     setUserName(storedUserName);
  //   }
  // }, []);
  const AuthToggle = () => {
    if(state) {
      return(
        <>
        <Form
            method="post"
            action="logout"
            onSubmit={(event) => {
              if (!confirm("Delete user and all data?")) {
                event.preventDefault()
              }
            }}
          >
            <button type="submit" className="btn btn--warning">
              <span>Logout</span>
            </button> 

          </Form>
        </>
      )
    }else {
      return(
        <>
        <NavLink to="/signin">SignIn</NavLink>
        </>
      )
    }
  }

  return (
    <nav >
      <NavLink
        to="/"
        aria-label="Go to home"
      >
        <img src={logomark} alt="" height={30} />
        <span>HomeBudget</span>
      </NavLink>
      {state.isAuthenticated ? (
        <Logout />
      ) : (
        <NavLink to="/signin">Sign In</NavLink>
      )}
    </nav>
  )
}
export default Nav