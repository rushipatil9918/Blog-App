import React, { useState } from 'react';
import axios from 'axios';

const AddBlog = () => {
  const [blogdata, setBlogdata] = useState({
    title: '',
    description: '',
    author: '',
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogdata({
      ...blogdata,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleOnClick = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      // Post the data to the specified backend URL
      const response = await axios.post('http://localhost:4000/createBlog', blogdata);
      console.log('Blog added successfully:', response.data);
      alert('Blog added successfully!');

      // Reset the form fields after successful submission
      setBlogdata({
        title: '',
        description: '',
        author: '',
      });
    } catch (error) {
      console.error('Error adding blog:', error);
      alert('Failed to add blog. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Form Container */}
      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleOnClick}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={blogdata.title}
            onChange={handleChange}
            placeholder="Enter Blog Title"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={blogdata.description}
            onChange={handleChange}
            rows="5"
            placeholder="Enter Blog Description"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Author */}
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-bold mb-2">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={blogdata.author}
            onChange={handleChange}
            placeholder="Enter Author Name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
