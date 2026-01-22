require('dotenv').config();
const express = require('express');

const app = express();


// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes

const mainRouter = require('./routes/main');
app.use('/api/v1', mainRouter);

const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => { 
    console.log(`Server is listening on port ${PORT}...`);
  });