const mongoose = require("mongoose");

// schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.OB2wZLXJ5ojel5ML_riJqgHaHa?w=192&h=192&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
  },
  { timestamps: true },
);

// Export
module.exports = mongoose.model("Category", categorySchema);
