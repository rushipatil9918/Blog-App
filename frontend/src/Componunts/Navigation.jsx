import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="flex flex-col bg-white pb-5 flex flex-row">
      {/* Navbar */}
      <nav className=" shadow-md items-center justify-center  ">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Gippy</div>
          <ul className="hidden md:flex space-x-6 text-gray-600">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/addblog">ADD BLOG</Link></li>
            <li>
              <a href="#" className="hover:text-gray-800 flex items-center">
                Dropdown
                <span className="ml-1">&#9662;</span>
              </a>
            </li>
          </ul>
          <div className="md:hidden">
            <button className="text-gray-600 focus:outline-none">
              &#9776;
            </button>
          </div>
        </div>
        <div className="flex-grow flex justify-center mt-8 bg-blue-500 ">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Gippy
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Explore number of blogs from various categories!
          </p>
        </div>
      </div>
      </nav>
    </div>
  );
};

export default Navigation;
