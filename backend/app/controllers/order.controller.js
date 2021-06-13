const db = require("../models");
const Order = db.orders;
const Items = db.items;

// Create and Save a newOrder
exports.create = (req, res) => {
    // Validate request
    if (!req.body.ordered) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const order = new Order({
      ordered : req.body.ordered,
      order_date : new Date()
    });

    // Save Order in the database
    order
      .save(order)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Order."
        });
      });
  };
  

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {

    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Order.find({})
      .then(data => {
        console.log(data);
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Orders."
        });
      });
  };

// Find a single Order with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Order.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Order with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Order with id=" + id });
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
//             message: `Cannot update Order with id=${id}. Maybe Order was not found!`
//           });
//         } else res.send({ message: "Order was updated successfully." });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Order with id=" + id
//         });
//       });
//   };

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Order.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
          });
        } else {
          res.send({
            message: "Order was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Order with id=" + id
        });
      });
  };

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
    Order.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Orders were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Orders."
        });
      });
  };

// Find all published Orders
exports.findAllPublished = (req, res) => {
    Order.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Orders."
        });
      });
  };


exports.getReport = (req, res) => {
  let from = new Date(req.body.from);
  let to = new Date(req.body.to);
  Order.find({order_date: {$gte: from, $lt: to}})
  .then(data => {
    report = {}
    for(order of data){
      for(item of order.ordered){
        var currItem = getItem(item.item_id)
        currItem.then((itemResolved => {
          var name = itemResolved.name
          console.log(name)
          if(name in report){
            report[name] += item.amount;
          }
          else{
            report[name] = item.amount;
          }
          console.log(report)
        }))
      }
    }
    res.send(JSON.stringify(report))
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Orders between dates."
    });
  });
}

async function getItem(id){
  return await Items.findOne({"_id": id})
}