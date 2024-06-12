// // rrd imports
// import { redirect } from "react-router-dom";

// // library
// import { toast } from "react-toastify";

// // helpers
// import { deleteItem } from "../helpers";

// import {UserContext} from "../App"

// import { useContext } from 'react';

// export async function logoutAction() {
//   const {state, dispatch} = useContext(UserContext);

//   // Clear local storage or Delete all the data of user
//   localStorage.clear();
//   dispatch({ type: "LOGOUT" });
//   toast.success("You’ve deleted your account!")
//   // return redirect
//   return redirect("/")
// }