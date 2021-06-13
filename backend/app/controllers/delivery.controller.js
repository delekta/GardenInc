const db = require("../models");
const Delivery = db.deliveries;
const Supplier = db.suppliers;
const Item = db.items;

// Create and Save a newItem
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.supplier_id || !req.body.delivered) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // set new categories delivered by supplier and modify amount of items on stock

    try{
        let supplier = await Supplier.findOne({_id:req.body.supplier_id});
        for (item of req.body.delivered){
          let detailed_item = await Item.findOne({_id:item.item_id});
          detailed_item.on_stock += item.amount;
          let update = Item.findByIdAndUpdate(item.item_id, detailed_item, { useFindAndModify: false });
          for (item_cat of detailed_item.categories){
            found = false;
            for (sup_cat of supplier.supply_category){
              if (sup_cat==item_cat){
                found=true;
                break;
              }
            }
            if(!found){
              console.log("Adding new category");
              supplier.supply_category.push(item_cat);
              console.log(supplier);
            }
          }
          await update;
        }
        let update = await Supplier.findByIdAndUpdate(req.body.supplier_id, supplier, { useFindAndModify: false });
    }catch{
        res.status(500).send({
          message:
            "Particular item or supplier doesnt exist."+ err.message
        });
        return;
      }
    // Create an delivery
    const delivery = new Delivery({
      supplier_id : req.body.supplier_id,
      delivered : req.body.delivered
    });
  
    // Save delivery in the database
    delivery
      .save(delivery)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding new delivery."
        });
      });

  };
  

// Retrieve all Items from the database.
exports.findAll = (req, res) => {

  console.log("sooomething");
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Delivery.find({})
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
  
    Delivery.findById(id)
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
//             message: `Cannot update Item with id=${id}. Maybe Item was not found!`
//           });
//         } else res.send({ message: "Item was updated successfully." });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Item with id=" + id
//         });
//       });
//   };

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Delivery.findByIdAndRemove(id)
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
    Delivery.deleteMany({})
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
    Delivery.find({ published: true })
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