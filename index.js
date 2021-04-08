const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const urlsRoutes = require('./routes/urlsRoutes');
require('dotenv').config();

const PORT = process.env.PORT;


const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(helmet());
app.use(cors());
app.use(express.static('./public'));
app.use(urlsRoutes);



app.listen(PORT, ()=>{
  console.log(`Listening on port: ${PORT}`);
})