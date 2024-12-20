 // Load environment variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./Router/Router.js');

const app = express();

app.use(cors());
app.use(express.json());
const PORT = 4000;

const Mongo_url = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(Mongo_url)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    console.log('MongoDB URI:', Mongo_url);

  });

// Routes
app.use("/",router);