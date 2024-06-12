import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { motion, useScroll, useTransform } from "framer-motion";
import illustration from "../assets/illustration.jpg";
import Pricing from "./pricingPage";

const Intro = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const IntroY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.2) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full">
      <motion.div
        ref={ref}
        className="intro p-8 z-10"
        style={{
          y: IntroY,
          opacity: isScrolled ? 0.5 : 1, 
        }}
      >
        <div>
          <h1>
            Take Control of <span className="accent">Your Money</span>
          </h1>
          <p>
            Personal budgeting is the secret to financial freedom. Start your
            journey today.
          </p>
          <Link to="/signin" className="btn btn--dark p-2 text-white">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </Link>
        </div>
        <img src={illustration} alt="Person with money" width={600} />
      </motion.div>
      <motion.div className="relative">
        <Pricing />
      </motion.div>
    </div>
  );
};

export default Intro;
