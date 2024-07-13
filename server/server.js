const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Database'))
    .catch(err => console.error('Could not connect to Database', err));

const trainRoutes = require('./routes/trains');
app.use('/api/trains', trainRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});