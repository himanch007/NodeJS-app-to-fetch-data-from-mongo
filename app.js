// app.js

const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = process.env.PORT || 3000;
// const MONGO_URL = 'mongodb://localhost:27017';
const MONGO_URL = 'mongodb+srv://karthikborra143:Mongo%40123@cluster0.h0riy2q.mongodb.net/'


// Serve HTML page (you can replace this with your actual HTML page)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API to get data from WebSeries collection
app.get('/api', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('NodeJS');
    const collection = db.collection('WebSeries');

    // Find all documents in the collection
    const movies = await collection.find({}, {projection: {_id: 0}}).toArray();

    res.json(movies);
    client.close(); // Close the MongoDB connection
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
