import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RetailerSchema = new Schema(
  {
    ownerName: {
      type: String,
    },
    image: {
      type: String,
    },
    number: {
      type: String,
      required: true,
      default: null,
    },
    email: {
      type: String,
    },
    shopName: {
      type: String,
    },
    address: {
      type: String,
    },
    pincode: {
      type: String,
    },
    location: {
      type: Object,
    },
    kycFiles: [
      {
        type: String,
      },
    ],
    kycVerificationStatus: {
      type: Boolean,
      default: false,
    },
    creditsFiles: [
      {
        type: String,
      },
    ],
    creditStatus: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "carts",
      default: null,
    },
    order: [
      {
        type: Schema.Types.ObjectId,
        ref: "orders",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

let retailers;
try {
  retailers = mongoose.model("retailers");
} catch (error) {
  retailers = mongoose.model("retailers", RetailerSchema);
}

module.exports = retailers;
