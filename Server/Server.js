const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoURI = 'mongodb+srv://elisaago:123@cluster1.mfewopi.mongodb.net/test';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = mongoose.model('User', {
  email: String,
  password: String
});

const Room = mongoose.model('Room', {
  room_number: String,
  elderly_id: String 
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(401).json({ error: 'User not found' }); 
    }

    if (user.password === password) {
      return res.status(200).json({ message: 'Login successful' });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().exec();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
});

app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find().exec();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).send('Error fetching rooms');
  }
});

const Elderly = mongoose.model('Elderly', {
  name: String,
  present: String 
});

app.get('/api/present-elderlies', async (req, res) => {
  try {
    const presentElderlies = await Elderly.find({ present: 'Yes' }).exec();
    res.status(200).json(presentElderlies);
  } catch (err) {
    res.status(500).send('Error fetching present elderlies');
  }
});

app.get('/api/elderlies', async (req, res) => {
  try {
    const elderlies = await Elderly.find().exec();
    res.status(200).json(elderlies);
  } catch (err) {
    res.status(500).send('Error fetching present elderlies');
  }
});



app.get('/api/bodytemperature', async (req, res) => {
  try {
    const bodytemperature = await Elderly.find({}, 'name Bodytemperature').exec();
    res.status(200).json(bodytemperature);
  } catch (err) {
    res.status(500).send('Error fetching body temperature');
  }
});

app.get('/api/chart', async (req, res) => {
  try {
    const chart = await Elderly.find({}, 'present age').exec();
    res.status(200).json(chart);
  } catch (err) {
    res.status(500).send('Error fetching data for the chart ');
  }
});
app.get('/api/bar', async (req, res) => {
  try {
    const bar = await Elderly.find({}, 'name Bodytemperature').exec();
    res.status(200).json(bar);
  } catch (err) {
    res.status(500).send('Error fetching edata for the bar');
  }
});
app.get('/api/HighElderlies', async (req, res) => {
  try {
    const HighElderlies = await Elderly.find({ Bodytemperature: { $gt: 27.9 } }).exec();

    res.status(200).json(HighElderlies);
  } catch (err) {
    res.status(500).send('Error fetching data for high temperature elderlies');
  }

}); 

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});