import cron from "node-cron";
import mongoose from "mongoose";

import InvestmentRepository from "../repositories/investment.repository.js";
import ROIHistoryRepository from "../repositories/roiHistory.repository.js";
import UserRepository from "../repositories/user.repository.js";

/**
 * ROI Cron
 * Runs every day at 12:00 AM
 */
const startROICron = () => {
  cron.schedule("0 0 * * *", async () => {
    // cron.schedule("* * * * *", async () => {
    console.log("=======================================");
    // console.log("ROI Cron Started");
    console.log("ROI Cron Started", new Date());
    console.log("=======================================");

    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      /**
       * Today's Date
       */
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      /**
       * Get Active Investments
       */
      const investments =
        await InvestmentRepository.findActiveInvestments();

      console.log(
        `Active Investments : ${investments.length}`
      );

      /**
       * Process Every Investment
       */
      for (const investment of investments) {
        /**
         * Idempotency Check
         *
         * Already processed today?
         */
        const alreadyProcessed =
          await ROIHistoryRepository.findByInvestmentAndDate(
            investment._id,
            today
          );

        if (alreadyProcessed) {
          console.log(
            `Skipping Investment : ${investment._id}`
          );
          continue;
        }

        /**
         * ROI Formula
         */
        const roiAmount =
          (investment.investmentAmount *
            investment.dailyROIPercentage) /
          100;

        /**
         * Create ROI History
         */
        await ROIHistoryRepository.createROIHistory(
          {
            user: investment.user._id,
            investment: investment._id,
            roiAmount,
            date: today,
            status: "PAID",
          },
          session
        );

        /**
         * Update Wallet
         */
        await UserRepository.updateWalletBalance(
          investment.user._id,
          roiAmount,
          session
        );

        /**
         * Update Total ROI
         */
        await UserRepository.incrementROI(
          investment.user._id,
          roiAmount,
          session
        );

        console.log(
          `ROI Credited : ${investment.user.fullName} : ${roiAmount}`
        );
      }

      await session.commitTransaction();

      console.log("ROI Cron Completed");
    } catch (error) {
      await session.abortTransaction();

      console.error(error);
    } finally {
      session.endSession();
    }
  });
};

export default startROICron;