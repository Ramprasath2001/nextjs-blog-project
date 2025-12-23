import { Schema, models, model } from "mongoose";

const newsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // avoid duplicate subscriptions
    },
  },
  { timestamps: true }
);

const Newsletter =
  models.Newsletter || model("Newsletter", newsletterSchema);

export default Newsletter;


