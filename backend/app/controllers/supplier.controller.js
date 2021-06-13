const db = require("../models");
const Supplier = db.suppliers;

// Create and Save a newsupplier
exports.create = (req, res) => {
    // Validate request
    if (!req.body.company_name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // Create an supplier
    const supplier = new Supplier({
      company_name : req.body.company_name,
      suply_category : [],
      contact :{
        mail: [],
        phone_no: [],
        address:{}
      }
    });

    console.log(supplier.contact.mail);

    if(req.body.suply_category){
      cats = []
      for (category of req.body.suply_category){
        cats.push(category);
      }
      supplier.suply_category = cats;
    }

    if(req.body.contact){
      if(req.body.contact.mail){
        mails=[]
        for (mail of req.body.contact.mail){
          mails.push(mail);
        }
        supplier.contact.mail = mails;
      }
      if(req.body.contact.phone_no){
        phones = []
        for (phone of req.body.contact.phone_no){
          phones.push(phone);
        }
        supplier.contact.phone_no = phones;
      }
      if(req.body.contact.address){
        supplier.contact.address = req.body.contact.address;
      }
    }
    console.log(supplier);

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

    Supplier.find({})
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
  
    Supplier.findById(id)
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

// Delete a supplier with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Supplier.findByIdAndRemove(id)
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
    Supplier.deleteMany({})
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

  exports.update = (req, res) => {
        if (!req.body) {
          return res.status(400).send({
            message: "Data to update can not be empty!"
          });
        }
      
        const id = req.params.id;
      
        Supplier.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update supplier with id=${id}. Maybe Item was not found!`
              });
            } else res.send({ message: "Supplier was updated successfully." });
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating supplier with id=" + id
            });
          });
      };

  exports.getSuppliersSuppliyingCategory = (req,res)=>{
    const o = {};

    o.map = function(){
      for (var idx = 0; idx < this.supply_category.length; idx++) {
          emit(this.supply_category[idx],this._id);
      }
    };
    o.reduce = function(key, suppliers){
      return suppliers;
   };
    Supplier.mapReduce(o, function (err, results) {
      if(err){
        res.status(500).send({
          message: "Error collecting suppliers for category" + err
        });
      }
      console.log(results);
      if(req.body.category){
        for(result of results.results){
          if(result._id==req.body.category){
            res.send({category:result._id,suppliers:result.value});
            return;
          }
        }
      }
      let supp_res={results:[]};
      for(result of results.results){
        supp_res.results.push({category:result._id,suppliers:result.value});
      }
      res.send(supp_res);
      return;
    })
  };

