const dotenv = require('dotenv');
const result = dotenv.config()
 
if (result.error) {
  throw result.error
}

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Rotas
app.use('/api', require('./app/routes/routes'));

app.listen(process.env.PORT || 3001);