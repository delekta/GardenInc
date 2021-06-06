const db = require("../models");
const Returned = db.returned;

// Create and Save a newreturned
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // Create an employee
    const returned = new returned({
      returned : req.body.returned,
      delivered : req.body.delivered,
      returned_date : req.body.returned_date
    });

    // Save returned in the database
    returned
      .save(returned)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the returned."
        });
      });
  };
  

// Retrieve all returneds from the database.
exports.findAll = (req, res) => {

    returned.find({})
      .then(data => {
        console.log(data);
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving returneds."
        });
      });
  };

// Find a single returned with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    returned.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found returned with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving returned with id=" + id });
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
//             message: `Cannot update returned with id=${id}. Maybe returned was not found!`
//           });
//         } else res.send({ message: "returned was updated successfully." });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating returned with id=" + id
//         });
//       });
//   };

// Delete a returned with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    returned.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete returned with id=${id}. Maybe returned was not found!`
          });
        } else {
          res.send({
            message: "returned was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete returned with id=" + id
        });
      });
  };

// Delete all returneds from the database.
exports.deleteAll = (req, res) => {
    returned.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} returneds were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all returneds."
        });
      });
  };

// Find all published returneds
exports.findAllPublished = (req, res) => {
    returned.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving returneds."
        });
      });
  };