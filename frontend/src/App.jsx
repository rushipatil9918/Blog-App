import React from 'react'
import Navigation from './Componunts/Navigation'
import Home from './Componunts/Home/Home';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import AddBlog from './Componunts/AddBlog/AddBlog';
import LoginSignup from './Componunts/Loginsignup/Signup';
import Signup from './Componunts/Loginsignup/Signup';
import LogIn from './Componunts/Loginsignup/LogIn';
import UserBlogs from './Componunts/UserBlogs/UserBlogs';


export const backend_url = 'http://localhost:4000';
const App = () => {
  return (
    <div>
      
    <BrowserRouter>
    <Navigation />
    <Routes >
      <Route path='/' element={<Home />} />
      <Route path='/addblog' element= {<AddBlog />} />
      < Route path='/signup' element={<Signup />} />
      <Route path='/login' element ={<LogIn />} />
      <Route path='/userBlogs' element= {<UserBlogs />} />
    </Routes>
    </BrowserRouter>
     
    
    </div>
  )
}

export default App