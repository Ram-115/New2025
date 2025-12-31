const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        name: String,
        image: String,
        price: Number,
        quantity: Number
      }
    ],

    shippingAddress: {
      name: String,
      email: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      phoneNumber: String
    },

    subtotal: Number,
    shipping: Number,
    totalAmount: Number,

    payment: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
      method: String,
      status: {
        type: String,
        default: "PAID"
      }
    },

    orderStatus: {
      type: String,
      default: "PLACED"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
