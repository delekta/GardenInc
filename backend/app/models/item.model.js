module.exports = mongoose => {
    const Item = mongoose.model(
      "item",
      mongoose.Schema(
        {
          name: String,
          price: Number,
          tax: Number,
          on_stock: Number,
          categories: Array
        },
        { timestamps: true }
      )
    );
    return Item;
  };
