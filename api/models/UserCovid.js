const mongoose = require("mongoose");

const idCardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  telephoneNumber: {
    type: String,
    required: true,
  },
  vaccine: {
    name: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    doseNumber: {
      type: Number,
      required: true,
    },
  },
});

const IDCard = mongoose.model("IDCard", idCardSchema);

module.exports = IDCard;
