import React from 'react'
import Navigation from './Componunts/Navigation'
import Home from './Componunts/Home/Home';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import AddBlog from './Componunts/AddBlog/AddBlog';

export const backend_url = 'http://localhost:4000';
const App = () => {
  return (
    <div>
      
    <BrowserRouter>
    <Navigation />
    <Routes >
      <Route path='/' element={  <Home />} />
      <Route path='/addblog' element= {<AddBlog />} />
    </Routes>
    </BrowserRouter>
     
    
    </div>
  )
}

export default App