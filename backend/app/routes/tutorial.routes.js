module.exports = app => {
    const items = require("../controllers/item.controller.js");
    const employees = require("../controllers/employee.controller.js");
    const deliveries = require("../controllers/delivery.controller.js");

    var router = require("express").Router();

    const controllers = {
      'categories':require("../controllers/category.controller.js"),
      'customers':require("../controllers/customer.controller.js"),
      'deliveries':require("../controllers/delivery.controller.js"),
      'employees':require("../controllers/employee.controller.js"),
      'items':require("../controllers/item.controller.js"),
      'orders':require("../controllers/order.controller.js"),
      'returned':require("../controllers/returned.controller.js"),
      'suppliers':require("../controllers/supplier.controller.js"),
    };

    // Authentication
    router.post("/auth",controllers['customers'].auth);

    // Retrieve all Items
    //router.get("/", items.findAll);
    router.get("/:coll", function(req,res) {
      console.log(req.params.coll);
      return controllers[req.params.coll].findAll(req,res);
    });

    // Create a new Item
    // router.post("/", items.create);
    router.post("/:coll", function(req,res) {
      console.log(controllers[req.params.coll]);
      return controllers[req.params.coll].create(req,res);
    });

    // Retrieve a single Item with id
    //router.get("/:id", items.findOne);
    router.get("/:coll/:id", function(req,res) {
      return controllers[req.params.coll].findOne(req,res);
    });

    // Update a Item with id
    // router.put("/:id", items.update);
    router.get("/:coll/:id", function(req,res) {
      return controllers[req.params.coll].update(req,res);
    });

    // Delete a Item with id
    // router.delete("/:id", items.delete);
    router.delete("/:coll/:id", function(req,res) {
      return controllers[req.params.coll].delete(req,res);
    });

    // Delete all items
    // router.delete("/", items.deleteAll);
    router.delete("/:coll", function(req,res) {
      return controllers[req.params.coll].deleteAll(req,res);
    });

    

    app.use('/api', router);
  };