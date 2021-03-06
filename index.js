const express = require('express')
const app = express();
const dotenv = require('dotenv');
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
dotenv.config();

mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to DB.`))
  .catch((error) => console.log(error.message));

app.use(session({ 
  genid: function(req) {
    return uuidv4()
  }, 
  secret: 'Thisisasimplesecret', 
  resave: false, 
  saveUninitialized: false, 
  cookie: {expires: 1000}
}));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(indexRoutes);
app.use('/api', apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server running on port ${port}`)
})