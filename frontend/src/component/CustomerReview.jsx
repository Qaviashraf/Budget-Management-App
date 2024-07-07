import React, { useState, useEffect } from "react";

const reviews = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, voluptas nostrum quisquam!",
    name: "Anna Morian",
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
  },
  {
    text: "Neque cupiditate assumenda in maiores repudiandae mollitia adipisci maiores repudiandae mollitia consectetur adipisicing architecto elit sed adipiscing elit.",
    name: "Teresa May",
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp"
  },
  {
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse is jdh cillum dolore eu fugiat nulla pariatur est laborum neque cupiditate assumenda in maiores.",
    name: "Kate Allise",
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
  }
];

const CustomerReview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="flex flex-col items-center py-10">
      <h3 className="text-gray-800 italic text-3xl">~ Testimonials ~</h3>
      <div className="relative w-full max-w-lg mt-4 border border-gray-300 rounded-xl shadow-lg p-6">
        <p className="text-xl text-center italic mx-4 md:mx-10">{reviews[currentIndex].text}</p>
        <div className="mt-5 mb-4 flex justify-center">
          <img
            src={reviews[currentIndex].image}
            className="rounded-full w-24 h-24 shadow-lg border-4 border-gray-300"
            alt="avatar"
          />
        </div>
        <p className="text-gray-600 text-center">- {reviews[currentIndex].name}</p>
        
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <button
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none"
            onClick={prevReview}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.293 16.293a1 1 0 01-1.414 0L5 10.414a1 1 0 010-1.414L10.879 3.707a1 1 0 111.414 1.414L7.414 10l5.293 5.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          <button
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none"
            onClick={nextReview}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.707 16.293a1 1 0 010-1.414L12.586 10 7.707 5.707a1 1 0 011.414-1.414l5.879 5.879a1 1 0 010 1.414L9.121 16.293a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
