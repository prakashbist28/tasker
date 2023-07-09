const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskroute = require('./routes/tasks');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:3000","https://tasker-fmr5.onrender.com"]
}));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
.then(()=> console.log("Database connected"))
.catch(err => console.log(err))

app.use('/', taskroute);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`) );
