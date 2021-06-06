module.exports = mongoose => {
    const Category = mongoose.model(
      "category",
      mongoose.Schema(
        {
            name: String,
            sub_categories: [String],
            parent_id: String
        },
        { timestamps: true }
      )
    );
    return Category;
  };