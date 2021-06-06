module.exports = mongoose => {
    const Customer = mongoose.model(
      "customer",
      mongoose.Schema(
        {
          name: String,
          email: String,
          password: String,
          cart:{
              items:[{
                  item_id: String,
                  amount: Number
              }],
              modification_date: { type: Date, default: Date.now },
          },
          hist:[String]
        },
        { timestamps: true }
      )
    );
    return Customer;
  };