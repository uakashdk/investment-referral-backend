import mongoose from "mongoose";

const referralIncomeSchema = new mongoose.Schema(
  {
    receiverUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Receiver user is required"],
      index: true,
    },

    sourceUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Source user is required"],
      index: true,
    },

    referralLevel: {
      type: Number,
      required: [true, "Referral level is required"],
      min: 1,
    },

    incomeAmount: {
      type: Number,
      required: [true, "Income amount is required"],
      min: [0, "Income amount cannot be negative"],
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("ReferralIncome", referralIncomeSchema);