module.exports = app => {
    const items = require("../controllers/item.controller.js");
    const employees = require("../controllers/employee.controller.js");
    const deliveries = require("../controllers/delivery.controller.js");

    var router = require("express").Router();

    // Retrieve all Items
    router.get("/items/", items.findAll);

    // Create a new Item
    router.post("/items/", items.create);

    // Retrieve all published Items // niepotrzbne
    router.get("/items/published", items.findAllPublished);

    // Retrieve a single Item with id
    router.get("/items/:id", items.findOne);

    // Update a Item with id
    router.put("/items/:id", items.update);

    // Delete a Item with id
    router.delete("/items/:id", items.delete);

    // Create a new Item
    router.delete("/items/", items.deleteAll);

    //-----------------

    router.get("/employees/", employees.findAll);

    // Create a new Item
    router.post("/employees/", employees.create);

    // Retrieve all published employee // niepotrzbne
    router.get("/employees/published", employees.findAllPublished);

    // Retrieve a single Item with id
    router.get("/employees/:id", employees.findOne);

    // Update a Item with id
    // router.put("/employees/:id", employees.update);

    // Delete a Item with id
    router.delete("/employees/:id", employees.delete);

    // Create a new Item
    // router.delete("employees/", employee.deleteAll);

    //------------------------------

    router.get("/deliveries/", deliveries.findAll);

    // Create a new Item
    router.post("/deliveries/", deliveries.create);

    // Retrieve all published employee // niepotrzbne
    router.get("/deliveries/published", deliveries.findAllPublished);

    // Retrieve a single Item with id
    router.get("/deliveries/:id", deliveries.findOne);

    // Update a Item with id
    // router.put("/deliveries/:id", deliveries.update);

    // Delete a Item with id
    router.delete("/deliveries/:id", deliveries.delete);

    app.use('/api', router);
  };