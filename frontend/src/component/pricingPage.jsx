import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import wave from "../assets/wave.svg";
import { TypeAnimation } from "react-type-animation";
import trackBudget from "../assets/trackBudget.png";

const cardVariants = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: { duration: 1.3 },
  },
};

const PricingPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });
  const [billingCycle, setBillingCycle] = useState('monthly');

  const handleBillingChange = (cycle) => {
    setBillingCycle(cycle);
  };

  const prices = {
    monthly: { starter: 15, growth: 30, scale: 60 },
    annually: { starter: 15 * 12, growth: 30 * 12, scale: 60 * 12 },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      <img src={wave} alt="" className="w-full my-0" />
      <div className="min-h-screen bg-gradient-to-b from-[#1dbbc3] to-white mt-0 py-12">
        <div className="w-full px-4 md:px-12 lg:px-24">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            Simple pricing, no commitment
          </h2>
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-full border border-gray-300 bg-gray-100 p-1">
              <button className={`px-4 py-2 ${billingCycle === 'monthly' ? 'bg-transparent text-[#2596be]' : 'text-gray-600'}`} 
                onClick={() => handleBillingChange('monthly')}>
                Monthly
              </button>
              <button className={`px-4 py-2 ${billingCycle === 'annually' ? 'bg-transparent text-[#2596be]' : 'text-gray-600'}`} 
                onClick={() => handleBillingChange('annually')}>Annually</button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-2">
            {/* Starter Package Card */}
            <motion.div
              className="w-72"
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
            >
              <div className="bg-white p-2 py-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800">Starter</h3>
                  <p className="text-gray-600 mt-2">
                  ${prices[billingCycle].starter} <span className="text-sm">USD</span>
                  </p>
                  <p className="text-gray-600 mt-2">Billed {billingCycle}</p>
                  <button className="mt-6 bg-gray-700 text-white px-4 py-3 rounded-full hover:bg-[#1dbbc3] focus:outline-none">
                    Buy this plan
                  </button>
                  <ul className="list-none mt-6 px-8 text-gray-600 text-lg text-left space-y-2">
                    <li>✔ Basic invoicing</li>
                    <li>✔ Easy to use accounting</li>
                    <li>✔ Multi-accounts</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Growth Package Card */}
            <motion.div
              className="w-72"
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
            >
              <div className="bg-white p-2 py-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800">Growth</h3>
                  <p className="text-gray-600 mt-2">
                  ${prices[billingCycle].growth} <span className="text-sm">USD</span>
                  </p>
                  <p className="text-gray-600 mt-2">Billed {billingCycle}</p>
                  <button className="mt-6 bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-[#1dbbc3] focus:outline-none">
                    Buy this plan
                  </button>
                  <ul className="list-none mt-6 mx-8 text-gray-600 text-left text-lg space-y-2">
                    <li>✔ Basic invoicing</li>
                    <li>✔ Easy to use accounting</li>
                    <li>✔ Multi-accounts</li>
                    <li>✔ Tax planning toolkit</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Scale Package Card */}
            <motion.div
              className="w-72"
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
            >
              <div className="bg-white p-2 py-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800">Scale</h3>
                  <p className="text-gray-600 mt-2">
                  ${prices[billingCycle].scale} <span className="text-sm">USD</span>
                  </p>
                  <p className="text-gray-600 mt-2">Billed {billingCycle}</p>
                  <button className="mt-6 bg-[#1dbbc3] text-white px-6 py-3 rounded-full hover:bg-gray-600 focus:outline-none">
                    Buy this plan
                  </button>
                  <ul className="list-none mt-6 mx-8 text-gray-600 text-left text-lg space-y-2">
                    <li>✔ Advanced invoicing</li>
                    <li>✔ Easy to use accounting</li>
                    <li>✔ Multi-accounts</li>
                    <li>✔ Tax planning toolkit</li>
                    <li>✔ Free bank transfers</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="md:flex justify-between md:px-48 px-12 py-16">
          <div className="py-24">
            <div className="h-24 flex items-center">
              <TypeAnimation
                sequence={[
                  "Keep tabs on your spending",
                  1000,
                  "Keep tabs on your budget",
                  1000,
                  "Achieve your financial goals",
                  1000,
                  "Save more every month",
                  1000,
                  "Track your expenses easily",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ display: "inline-block" }}
                repeat={Infinity}
                className="text-3xl md:text-5xl "
              />
            </div>
            <p>
              Link your accounts from more than 17,000 financial institutions
              and view your connected transactions across them in one place.
            </p>
            <Link to="/signin" className="btn btn--dark p-2 mt-2 text-white">
              <span>Try It Now . . . </span>
            </Link>
          </div>
          <img src={trackBudget} alt="Track your money" width={375} />
        </div>
      </div>
    </>
  );
};

export default PricingPage;
