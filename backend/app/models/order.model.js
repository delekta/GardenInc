module.exports = mongoose => {
    const Order = mongoose.model(
      "order",
      mongoose.Schema(
        {
            ordered:[{
                item_id: String,
                amount: Number
            }],
            order_date: { type: Date, default: Date.now }
        },
        { timestamps: true }
      )
    );
    return Order;
  };