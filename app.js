var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")
var productRouter = require('./routes/productRoute');
var usersRouter = require('./routes/usersRoute');
var categoryRouter = require("./routes/categoryRoute")
var groupRouter = require("./routes/groupRoute")
const MONGO_Options = require("./config/db")

//connect mongodb
const connect = mongoose.connect(MONGO_Options.MONGO_URI || "mongodb://localhost/shopping", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("connect MongoDb")
  })
  .catch(err => console.log(err)
  )
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/product', productRouter);
app.use('/users', usersRouter);
app.use("/category", categoryRouter)
app.use("/group", groupRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
