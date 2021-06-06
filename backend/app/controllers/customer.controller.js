const db = require("../models");
const Customer = db.customers;

// Create and Save a newCustomer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // Create a Customer
    const customer = new Customer({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // Save Customer in the database
    customer
      .save(customer)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      });
  };


// Retrieve all Customers from the database, 
exports.findAll = (req, res) => {

    Customer.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      });
  };

// Find a single Customer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Customer.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found customer with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving customer with id=" + id });
      });
  };

// Update a Customer by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    const id = req.params.id;

    Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`
          });
        } else res.send({ message: "Customer was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Customer with id=" + id
        });
      });
  };

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Customer.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
          });
        } else {
          res.send({
            message: "Customer was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Customer with id=" + id
        });
      });
  };

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Customer.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Customers were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Customers."
        });
      });
  };


exports.auth = (req,res)=>{
  Customer.find({email:req.body.email,password:req.body.password})
    .then(data=>{
      if(data.length==0){
        res.send({auth:false});
      }else{
        res.send({auth:true});
      }
    })
    .catch(err=>{
      res.status(500).send({
        message:
          err.message || "Some error occurred during authentication"
      });
    });

};