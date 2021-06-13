module.exports = app => {
    // zbędne?
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

    router.post("/auth",controllers['customers'].auth);

      // dodac pobieranie itemow z danej kategorii
      router.post("/itemsOfCategory", function(req, res){
        return controllers.items.getAllCategoryItems(req, res)
      })

    router.post("/customer/cart", function(req, res){
      if(req.body.add){
        controllers.customers.add_to_cart(req, res);
      }else{
        controllers.customers.remove_from_cart(req, res);
      }
    });
    router.post("/customer/cart/buy", controllers.customers.buy);

    router.get("/:coll", function(req,res) {
      console.log(req.params.coll);
      return controllers[req.params.coll].findAll(req,res);
    });

    router.post("/:coll", function(req,res) {
      return controllers[req.params.coll].create(req,res);
    });

    router.get("/:coll/:id", function(req,res) {
      return controllers[req.params.coll].findOne(req,res);
    });

    router.post("/:coll/:id", function(req,res) {
      return controllers[req.params.coll].update(req,res);
    });

    router.delete("/:coll/:id", function(req,res) {
      return controllers[req.params.coll].delete(req,res);
    });

    router.delete("/:coll", function(req,res) {
      return controllers[req.params.coll].deleteAll(req,res);
    });

    

    app.use('/api', router);
  };