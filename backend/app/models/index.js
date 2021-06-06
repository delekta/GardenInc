const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.categories = require("./category.model.js")(mongoose);
db.customers = require("./customer.model.js")(mongoose);
db.deliveries = require("./delivery.model.js")(mongoose);
db.employees = require("./employee.model.js")(mongoose);
db.items = require("./item.model.js")(mongoose);
db.orders = require("./order.model.js")(mongoose);
db.returned = require("./returned.model.js")(mongoose);
db.suppliers = require("./supplier.model.js")(mongoose);

module.exports = db;