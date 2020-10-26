const express = require('express')
const app = express();
const dotenv = require('dotenv');
const UrlShort = require('./database/models/UrlShort');
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
dotenv.config();

//mongodb+srv://Alacer:dc0f9bxd@urlshort.8qma7.mongodb.net/UrlShort?retryWrites=true&w=majority

mongoose.set('debug', true);
mongoose
  .connect('mongodb+srv://Alacer:dc0f9bxd@urlshort.8qma7.mongodb.net/UrlShort?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to DB on ${process.env.DATABASEURL}`))
  .catch((error) => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(indexRoutes);
app.use('/api', apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server running on port ${port}`)
})