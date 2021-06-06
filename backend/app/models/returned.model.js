module.exports = mongoose => {
    const Returned = mongoose.model(
      "returned",
      mongoose.Schema(
        {
            order_id:String,
            returned:[{
                item_id: String,
                amount: Number
            }],
            order_date: { type: Date, default: Date.now }
        },
        { timestamps: true }
      )
    );
    return Returned;
  };