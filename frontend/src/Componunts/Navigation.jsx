import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

const Navigation = () => {
  const [user, setUser] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    console.log("token:", token); // Debugging
    
    if (token) {
      const userName = localStorage.getItem('username');
      console.log("User Name:", userName); // Debugging
      console.log("userid",user)
      setUser(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear the token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUser(false);
    navigate('/');
  };

  return (
    <div className="flex flex-col bg-white flex flex-row">
      {/* Navbar */}
      <nav className="shadow-md items-center justify-center">
        <div className="container mx-auto flex justify-between items-center pt-5">
          <div className="text-2xl font-bold text-gray-800 ml-4">Gippy</div>
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-gray-600">
            <li className="hover:text-blue-700"><Link to="/">HOME</Link></li>
            <li className="hover:text-blue-700"><Link to="/addblog">ADD BLOG</Link></li>
            <li className="hover:text-blue-700"><Link to="/userBlogs">YOUR BLOGS</Link></li>
            {user ? (
              <>
                <li className="flex items-center space-x-2">
                  <span className="font-medium text-gray-800">{user} <FaUserCircle /></span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:underline"
                  >
                    LOG OUT
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/signup">SIGN UP</Link>
              </li>
            )}
          </ul>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-600 focus:outline-none mr-11 text-3xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              &#9776;
            </button>
          </div>
        </div>
        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <ul className="flex flex-col space-y-4 text-gray-600 bg-white py-4 px-4 md:hidden">
            <li className="hover:text-blue-700"><Link to="/">HOME</Link></li>
            <li className="hover:text-blue-700"><Link to="/addblog">ADD BLOG</Link></li>
            <li className="hover:text-blue-700"><Link to="/userBLogs">YOUR BLOGS</Link></li>
            {user ? (
              <>
                <li className="flex items-center space-x-2">
                  <span className="font-medium text-gray-800"> <FaUserCircle /></span>
                
                
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:underline"
                  >
                    LOG OUT
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/signup">SIGN UP</Link>
              </li>
            )}
          </ul>
        )}
        <div className="flex-grow flex justify-center mt-8 bg-blue-500">
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
