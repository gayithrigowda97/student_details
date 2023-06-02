const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    updated: { type: Date, default: Date.now },
    created: { type: Date }
  },
  { strict: false },
  { collection: "studentDetails" }
);

let studentInfoDetails = mongoose.model(
  "studentDetails",
  studentSchema
);

studentSchema.pre("save", function(next) {
  this.created = new Date();
  next();
});

module.exports = studentInfoDetails;
