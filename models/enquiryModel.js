const { Schema, models, model } = require("mongoose");

const enquirySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false, // ✅ optional
  },
});

const EnquiryModel =
  models.Enquiry || model("Enquiry", enquirySchema);

export default EnquiryModel;
