import mongoose from "mongoose";

const roiHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      index: true,
    },

    investment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investment",
      required: [true, "Investment reference is required"],
      index: true,
    },

    roiAmount: {
      type: Number,
      required: [true, "ROI amount is required"],
      min: [0, "ROI amount cannot be negative"],
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("ROIHistory", roiHistorySchema);