/* Requering NPM modules we need */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');
const passport = require('passport');
const app = express();

/* Requering our routes files*/

const baseRoutes = require('./Controller/Routes/base.routes');
const userRoutes = require('./Controller/Routes/user.routes');
const localRoutes = require('./Controller/Routes/local.routes');
const articleRoutes = require('./Controller/Routes/articles.routes');
const fbRoutes = require('./Controller/Routes/fb.routes');

/** Additional config and other settings */
const key = require('./key');
const db = key.db.remote || 'mongodb://localhost/' + key.db.local,
port = process.env.PORT || 3000;

/**Connecting to mongoose */
mongoose.connect(db);

/**Setting up our app with req.body and req.session/passport and our view engine = ejs and
 * Setting our public (css, js and imgs to go to the 'public' folder)
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true,
 }));
app.use(session({ secret: key.session.secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.set('view engine', 'ejs');

/**Setting up our routes */
app.use('/', baseRoutes);
app.use('/auth/local', localRoutes);
app.use('/auth/facebook', fbRoutes);
app.use('/post', articleRoutes);
app.use('/user', userRoutes);

app.listen(port, (err) => {
  if(!err){
    console.log('listening on port:', port);
  } else {
    console.log('some error occured:', err);
  }
})

