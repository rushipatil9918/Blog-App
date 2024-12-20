import { createContext, useEffect, useState } from "react";
import { backend_url } from "../App";
export const BlogContext = createContext(null);

export const BlogContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    fetch(`${backend_url}/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const contextValue = { blogs, setBlogs };

  return (
    <BlogContext.Provider value={contextValue}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
