var productRouter = require('./productRoute');
var usersRouter = require('./usersRoute');
var categoryRouter = require("./categoryRoute")
var groupRouter = require("./groupRoute")
var comboRouter = require("./comboRoute")
var serviceRouter = require("./serviceRoute")
function route(app) {
  app.use('/api/users', usersRouter);
  app.use('/api/group/users', groupRouter);
  app.use('/api/category', categoryRouter);
  app.use('/api/product', productRouter);
  app.use("/api/combo", comboRouter)
  app.use("/api/service", serviceRouter)
}

module.exports = route;