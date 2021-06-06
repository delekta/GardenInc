module.exports = mongoose => {
    const Employee = mongoose.model(
      "employee",
      mongoose.Schema(
        {
         firstname: String,
         lastname: String,
         position: Number,
         supervised_categories: [String],
         auth: {
             login: String,
             password: String
         } 

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

    return Employee;
  };
