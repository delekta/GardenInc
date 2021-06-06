module.exports = mongoose => {
    const Delivery = mongoose.model(
      "delivery",
      mongoose.Schema(
        {
            supplier_id:String,
            delivered:[{
                item_id: String,
                amount: Number
            }],
            delivery_date: { type: Date, default: Date.now }
        },
        { timestamps: true }
      )
    );
    return Delivery;
  };