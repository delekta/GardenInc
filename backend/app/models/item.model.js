module.exports = mongoose => {
    const Item = mongoose.model(
      "item",
      mongoose.Schema(
        {
          name: String,
          price: Number,
          categories: Array
        },
        { timestamps: true }
      )
    );
  
      // overriding to have id instead _id
//   schema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

//   const Item = mongoose.model("item", schema);

    return Item;
  };
