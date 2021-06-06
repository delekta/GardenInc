module.exports = mongoose => {
    const Supplier = mongoose.model(
      "supplier",
      mongoose.Schema(
        {
            company_name: String,
            supply_category:[String],
            contact:{
                mail:[String],
                phone_no:[String],
            },
            addres:{
                street: String,
                building_no: Number,
                flat_no: Number,
                city: String,
                postal_code:String,
                post: String
            }
        },
        { timestamps: true }
      )
    );
    return Supplier;
  };