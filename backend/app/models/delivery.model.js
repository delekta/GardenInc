module.exports = mongoose => {
    const Delivery = mongoose.model(
      "delivery",
      mongoose.Schema(
        {
            suppier_id : String,
            delivered : [{"item_id" : String, "amount" : String}],
            delivery_date: Date

        },
        { timestamps: true }
      )
    );

    return Delivery;
  };