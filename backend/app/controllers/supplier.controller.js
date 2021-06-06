const db = require("../models");
const Supplier = db.suppliers;

// Create and Save a newsupplier
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // Create an employee
    const supplier = new Supplier({
      supplier : req.body.suppliered,
      delivered : req.body.delivered,
      supplier_date : req.body.supplier_date
    });

    // Save supplier in the database
    supplier
      .save(supplier)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the supplier."
        });
      });
  };
  

// Retrieve all suppliers from the database.
exports.findAll = (req, res) => {

    supplier.find({})
      .then(data => {
        console.log(data);
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving suppliers."
        });
      });
  };

// Find a single supplier with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    supplier.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found supplier with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving supplier with id=" + id });
      });
  };

// Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//     if (!req.body) {
//       return res.status(400).send({
//         message: "Data to update can not be empty!"
//       });
//     }
  
//     const id = req.params.id;
  
//     Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//       .then(data => {
//         if (!data) {
//           res.status(404).send({
//             message: `Cannot update supplier with id=${id}. Maybe supplier was not found!`
//           });
//         } else res.send({ message: "supplier was updated successfully." });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating supplier with id=" + id
//         });
//       });
//   };

// Delete a supplier with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    supplier.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete supplier with id=${id}. Maybe supplier was not found!`
          });
        } else {
          res.send({
            message: "supplier was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete supplier with id=" + id
        });
      });
  };

// Delete all suppliers from the database.
exports.deleteAll = (req, res) => {
    supplier.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} suppliers were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all suppliers."
        });
      });
  };

// Find all published suppliers
exports.findAllPublished = (req, res) => {
    supplier.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving suppliers."
        });
      });
  };