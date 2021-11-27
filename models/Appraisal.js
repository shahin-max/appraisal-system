const mongoose = require("mongoose");

const AppraisalSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  evalperiod: {
    type: String,
    default: "annual"
  },
  position: {
    type: String,
    required: true
  },
  team: {
    type: String,
    ref: "users",
    required: true
  },
  teamleader: {
    type: String,
    required: true
  },
  achieved: {
    type: String
  },
  goals: {
    type: String
  },
  wishlist: {
    type: String
  },
  swot1: {
    type: String
  },
  swot2: {
    type: String
  },
  swot3: {
    type: String
  },
  swot4: {
    type: String
  },
  feedback: {
    type: String
  },
  tlfeedback: {
    type: String
  },
  type: {
    type: String,
    default: "draft"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("appraisal", AppraisalSchema);
