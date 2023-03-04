const express = require('express');
const engine = require('ejs-mate');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const User = require('./models/users');
const catchAsync = require('./utils/catchAsync')
const LocalStrategy = require('passport-local');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const ExpressError = require('./utils/ExpressError');
const myTasksRoute = require('./routes/mytasks')
const userRoute = require('./routes/user')
const mongoose = require('mongoose');

const MongoStore = require('connect-mongo');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/TODO"
mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
  console.log('CONNECTED TO DB');
};

app.engine('ejs', engine);
app.set('views', path.join(__dirname) + '/views');
app.set('view engine', 'ejs');

const secret = process.env.SECRET || 'topsecret'
app.use(session({
  name : "ToDo_session",
  secret,
  store: MongoStore.create({ mongoUrl: dbUrl , touchAfter: 24 * 3600  }),
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure : true
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
}
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use((req, res, next) => { 
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});







app.get('/', catchAsync(async (req, res) => {
  res.render('Pages/index');
}));

app.use('/',myTasksRoute)
app.use('/',userRoute)



app.all('*', catchAsync(async (req, res, next) => {
  next(new ExpressError('Sorry, we can not find that page !', 404))
}));


app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).render('error', { err })
});

const port = process.env.PORT || 3000; 
app.listen(port, () => {
  console.log(`LISTENING TO PORT ${port} !`)
});

