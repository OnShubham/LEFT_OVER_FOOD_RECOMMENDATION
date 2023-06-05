const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your React frontend URL
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const db = mongoose.connection;

// User schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  localStorageData: String, // Add localStorageData field to the schema
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (bcrypt.compareSync(password, user.password)) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Register route
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, localStorageData } = req.body; // Retrieve localStorageData from the request body

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      localStorageData, // Save localStorageData in the database
    });

    await newUser.save();
    return res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

const port = process.env.PORT || 8000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
