import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!userData.username || !userData.email || !userData.password) {
      setMessage('All fields are required.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Signup successful! Redirecting...');
        alert('accont created sucessfully')
        localStorage.setItem('token', result.token);
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage(result.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="log in flex items-start justify-center min-h-screen bg-slate-300">
      <form onSubmit={handleOnSubmit} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg mt-9">
        <div className="flex flex-col gap-4">
          <label className="block">User Name:</label>
          <input
            type="text"
            name="username"
            className="border border-black rounded-md p-2"
            placeholder="Enter username"
            value={userData.username}
            onChange={handleOnChange}
          />

          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            className="border border-black rounded-md p-2"
            placeholder="Enter E-mail"
            value={userData.email}
            onChange={handleOnChange}
          />

          <label className="block">Password:</label>
          <input
            type="password"
            name="password"
            className="border border-black rounded-md p-2"
            placeholder="Enter Password"
            value={userData.password}
            onChange={handleOnChange}
          />
        </div>

        <button
          type="submit"
          className="border border-black mt-6 w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>

        {message && <p className="text-red-500 mt-3">{message}</p>}

        <p className="mt-5">
          Have an account? Please{' '}
          <Link to="/login" className="text-blue-500">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
