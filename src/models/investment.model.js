import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      index: true,
    },

    investmentAmount: {
      type: Number,
      required: [true, "Investment amount is required"],
      min: [1, "Investment amount must be greater than zero"],
    },

    planDetails: {
      type: String,
      required: [true, "Plan details are required"],
      trim: true,
      maxlength: 100,
    },

    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },

    dailyROIPercentage: {
      type: Number,
      required: [true, "Daily ROI percentage is required"],
      min: [0, "ROI percentage cannot be negative"],
    },

    investmentStatus: {
      type: String,
      enum: ["ACTIVE", "COMPLETED", "CANCELLED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Investment", investmentSchema);