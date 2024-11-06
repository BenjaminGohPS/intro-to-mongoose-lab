const mongoose = require("mongoose");

const CustomersSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    age: { type: Number, require: true },
  },
  { collection: "customers" }
);

module.exports = mongoose.model("Customers", CustomersSchema);
