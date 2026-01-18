const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


// config dotenv
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// import routes
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));


// routes
app.get('/', (req, res) => {
  return res.status(200).send("<h1>Welcome to your SNAAACKK stall</h1>");
});

const PORT = process.env.PORT || 8080;

//listen

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`.bgCyan);
});