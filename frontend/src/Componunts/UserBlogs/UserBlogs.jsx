import React, { useEffect, useState } from 'react';
import axios from 'axios';


const UserBlogs = () => {
  const [userblogs, setUserBlogs] = useState([]);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        alert('You must be logged in to view your blogs');
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/userBlogs', {
          headers: {
            'Authorization': token, 
          },
        });
        setUserBlogs(response.data.blogs);
        console.log(response.data.blogs)
        console.log(userblogs)
      } catch (error) {
        console.error('Error fetching blogs:', error);
        
        
      }
    };

    fetchUserBlogs();

  }, []);
  
  


  return (
     <div className="columns-1 md:columns-2 gap-4 p-4 mt-4">
      {userblogs.map((item, i) => (
        <div
          className="break-inside-avoid p-4 mb-4 border border-gray-700 rounded-lg shadow-lg bg-gray-800"
          key={item._id} // Use _id for key to ensure unique identification
        >
          <h2 className="text-2xl font-bold mb-2 text-blue-400">{item.title}</h2>
          <p className="text-sm text-gray-400 mb-2">By: <br />{item.author}</p>
          <p className="text-gray-300 mb-4"><br />{item.description}</p>
          <p className="text-xs text-gray-500">
            Created on: {new Date(item.createdAt).toLocaleDateString()}
          </p>

        
          
          
        </div>
      ))}
    </div>
  );
};

export default UserBlogs;
