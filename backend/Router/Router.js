const express = require('express');
const router = express.Router();
const { blog } = require('../Models/Model.js');
const mongoose = require('mongoose');


router.get('/', (req, res) => {
    res.send('Hello');
  });
  
  router.post('/createBlog', async (req, res) => {
    const data = req.body;
    try {
      const response = await blog.create(data);
      console.log(response);
      res.send('Success');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create blog', error });
    }
  });
  
  router.get('/all-blogs',async(req,res)=>{
      try{
          const blogs = await blog.find({})
          res.send(blogs)
      }
      catch(err){
          console.log(err)
          res.status(500).json({ message: 'Failed to load blog', error });
      }
  })
  
  router.get('/blog/:id',async(req,res)=>{
     try{
      const id = req.params.id;
      const responce = await blog.findById(id);
      res.send(responce);
     } catch(err){
      console.log(err)
      res.status(500).json({ message: 'Failed to load blog', error });
  }
  })
  
  router.put('/blog/:id',async(req,res)=>{
      try{
       const id = req.params.id;
       const data = req.body;
       const responce = await blog.findOneAndUpdate({_id :id},data, {returnOriginal: false });
       console.log(responce.body);
       res.send(responce);
      } catch(err){
       console.log(err)
       res.status(500).json({ message: 'Failed to load blog', error });
   }
   })
  
   router.delete('/blog/:id', async (req, res) => {
      try {
        const id = req.params.id;
    
        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid blog ID' });
        }
    
        // Delete blog
        const result = await blog.findOneAndDelete({ _id: id });
    
        // Handle blog not found
        if (!result) {
          return res.status(404).json({ message: 'Blog not found' });
        }
    
        res.send('Deleted Successfully');
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete blog', error: err });
      }
    });

module.exports=router;