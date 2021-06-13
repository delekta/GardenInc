const Db = require("../models");
const Customer = Db.customers;
const Item = Db.items;
const oreders = require("../controllers/order.controller");

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
        res.send({
          auth:false
        });
      }else{
        res.send({
          auth:true,
          customer_id:data[0]._id
        });
      }
    })
    .catch(err=>{
      res.status(500).send({
        message:
          err.message || "Some error occurred during authentication"
      });
    });
};

exports.add_to_cart = async (req, res) => {
  try{
    let cust = await Customer.findOne({_id:req.body.customer_id});
    
    for (item of req.body.items){
      let changed = false;
      for(cart_item of cust.cart.items){
        if(item.item_id==cart_item.item_id){
          cart_item.amount = item.amount;
          changed = true;
          break;
        }
      }
      if(!changed){
        const temp = {"item_id":item.item_id,"amount":item.amount};
        cust.cart.items.push(temp);
      }
    }

    // console.log(Date());
    // cust.cart.modification_date = Date();

    const updated_cust = await Customer.findByIdAndUpdate(cust._id,cust,{useFindAndModify: false});
    res.send(updated_cust);
  }catch(err){
    res.status(500).send({
      message:
        err.message || "Some error occurred while adding to cart."
    });
  }
}

exports.remove_from_cart = async (req, res) => {
  try{
    const cust = await Customer.findOne({_id:req.body.customer_id});

    for (item of req.body.items){
      for(let i=0;i<cust.cart.items.length;i+=1){//(cart_item of cust.cart.items){
        let cart_item = cust.cart.items[i];
        if(item.item_id==cart_item.item_id){
          console.log(cust.cart.items);
          cust.cart.items.splice(i,1);
          break;
        }
          
      }
    }
    // cust.cart.modification_date = Date();

  const updated_cust = await Customer.findByIdAndUpdate(cust._id,cust,{useFindAndModify: false});
  res.send(updated_cust);
  }catch(err){
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing from cart."
    });
  }
}

const Order = Db.orders;

exports.buy = async (req, res) => {
  try{
    const cust = await Customer.findOne({_id:req.body.customer_id});
    console.log(cust.cart.items);
    
    let oredered = []

    for(item of cust.cart.items){
      oredered.push({
        item_id:item.item_id,
        amount:item.amount
      });
      let iteem = await Item.findOne({_id:item.item_id});
      let change = {on_stock: (iteem.on_stock - item.amount)};
      const updated_item = await Item.findByIdAndUpdate(item.item_id,change,{useFindAndModify: false});
    }
    
    const order = new Order({
      ordered: oredered
    });
    const ord = await order.save(order);

    cust.hist.push(ord._id);
    cust.cart.items = [];

    const updated_cust = await Customer.findByIdAndUpdate(cust._id,cust,{useFindAndModify: false});
    return;

  }catch(err){
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Order."
    });
  }
  

}