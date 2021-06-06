module.exports = mongoose => {
    const Employee = mongoose.model(
      "employee",
      mongoose.Schema(
        {
            firstname: String,
            lastname:String,
            position:String,
            supervised_category:[String],
            auth:{
                login: String,
                password: String
            }
        },
        { timestamps: true }
      )
    );
    return Employee;
  };