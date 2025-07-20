const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const collectionRoutes = require('./routes/collections');
const documentRoutes = require('./routes/documents');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/collections', collectionRoutes);
app.use('/collections', documentRoutes);



app.get('/', (req, res) => {
  res.send('DDMP Server is Running');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');

    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });

  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });
