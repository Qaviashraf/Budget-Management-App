// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

// assets
import wave from "../assets/wave.svg";

// components
import Nav from "../component/Nav";
import { Footer } from "../component/Footer";

//  helper functions
import { fetchData } from "../helpers"

// loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName }
}

const Main = () => {

  // const { userName } = useLoaderData()
  // const [userName, setUserName] = useState(localStorage.getItem("userName"));

  // useEffect(() => {
  //   const storedUserName = localStorage.getItem("userName");
  //   if (storedUserName) {
  //     setUserName(storedUserName);
  //   }
  // }, []);
  
  return (
    <div className="layout">
      <Nav />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
      <Footer />
    </div>
  )
}
export default Main