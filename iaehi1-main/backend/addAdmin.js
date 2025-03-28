// filepath: /c:/Users/uditv/OneDrive/Desktop/iaehi/backend/addAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');

  const admin = new Admin({
    username: 'admin', // Fixed admin username
    password: 'admin@2025', // Fixed admin password
  });

  try {
    await admin.save();
    console.log('Admin added successfully');
  } catch (err) {
    console.error('Error adding admin:', err);
  } finally {
    mongoose.connection.close();
  }
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});