const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../Middlewares/Authontication.js');
const { blog } = require('../Models/Model.js');

require('dotenv').config();
const user= require('../Models/usermodel.js')
// Test Route
router.get('/', (req, res) => {
  res.send('Hello');
});

// Create Blog Route
router.post('/createBlog', authenticate, async (req, res) => {
  const { title, description, author } = req.body;

  if (!title || !description || !author) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  console.log('Authenticated User:', req.user);  // Check if req.user is populated

  if (!req.user || !req.user._id) {
    return res.status(400).json({ error: 'User authentication failed' });
  }

  try {
    const newBlog = new blog({
      title,
      description,
      author,
      userId: req.user._id,  // Use the authenticated user's ID
    });

    const savedBlog = await newBlog.save();

    // Associate blog with user
    req.user.userBlogs.push(savedBlog._id);
    await req.user.save();

    res.status(201).json({ message: 'Blog created successfully', blog: savedBlog });
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({ error: 'Failed to create blog' });
  }
});


router.get('/blogs', async (req, res) => {
  try {
    const blogs = await blog.find(); // Fetch all blogs from the database
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});


//userblogs




// Get Blog by ID
router.get('/blog/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await blog.findById(id);
    if (!response) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load blog' });
  }
});

// Update Blog
router.put('/blog/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await blog.findOneAndUpdate({ _id: id }, data, { returnOriginal: false });
    if (!response) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

// Delete Blog
router.delete('/blog/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid blog ID' });
    }

    const result = await blog.findOneAndDelete({ _id: id });
    if (!result) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
      token,
    });
  } catch (err) {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ error: 'Server misconfiguration' });
    }
    
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const oldUser = await user.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, oldUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: oldUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: oldUser._id,
        username: oldUser.username,
        email: oldUser.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/userBlogs', async (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    // Get the user ID from the decoded token
    const userId = decoded.id;
    console.log('The userID is', userId);

    if (!userId) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Find the user by ID and populate the userBlogs field
    const foundUser = await user.findById(userId).populate('userBlogs');

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If there are no blogs for the user
    if (foundUser.userBlogs.length === 0) {
      return res.status(404).json({ message: 'No blogs found for this user' });
    }

    // Returning all blogs
    res.json({ blogs: foundUser.userBlogs });
  } catch (error) {
    console.error('Error fetching user blogs:', error);
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
});


module.exports = router;
