import React, { useState } from 'react';
import axios from 'axios';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend API
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });

      // On success, you may want to save the JWT token in localStorage
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        console.log( response.data.token)
        
        alert('Login Successful');
        // Optionally, navigate to another page (e.g., dashboard or homepage)
      }
    } catch (err) {
      if (err.response) {
        // If response exists, get the specific error message from backend
        setError(err.response.data.error || 'An error occurred');
      } else {
        setError('Server error. Please try again later.');
      }
      console.error(err);
    }
  };

  return (
    <div className="log-in flex items-start justify-center min-h-screen bg-slate-300">
      <form
        onSubmit={handleSubmit} // Handle form submission
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg mt-9"
      >
        <div className="flex flex-col gap-4">
          <label className="block">Email:</label>
          <input
            type="email"
            className="border border-black rounded-md p-2"
            placeholder="Enter E-mail"
            value={email} // Controlled input
            onChange={handleEmailChange}
          />
          <label htmlFor="" className="block">
            Password:
          </label>
          <input
            type="password"
            className="border border-black rounded-md p-2"
            placeholder="Enter Password"
            value={password} // Controlled input
            onChange={handlePasswordChange}
          />
        </div>

        {/* Display error message if any */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          type="submit"
          className="border border-black mt-6 w-16 rounded-lg hover:bg-blue-500 hover:border-blue-500"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
