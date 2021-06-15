const db = require("../models");
const Employee = db.employees;

// Create and Save a newItem
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstname) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create an employee
    const employee = new Employee({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      supervised_categories: req.body.categories,
      "auth.login": req.body.login,
      "auth.password": req.body.password,
      position : req.body.position
    });
  
    // Save Item in the database
    employee
      .save(employee)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Item."
        });
      });
  };
  

// Retrieve all Items from the database.
exports.findAll = (req, res) => {

  console.log("sooomething");
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Employee.find({})
      .then(data => {
        console.log(data);
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving items."
        });
      });
  };

// Find a single Item with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Employee.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Item with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Item with id=" + id });
      });
  };



// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Employee.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
          });
        } else {
          res.send({
            message: "Item was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Item with id=" + id
        });
      });
  };

// Delete all Items from the database.
exports.deleteAll = (req, res) => {
    Employee.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Items were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all items."
        });
      });
  };

// Find all published Items
exports.findAllPublished = (req, res) => {
    Employee.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving items."
        });
      });
  };