import cron from "node-cron";
import mongoose from "mongoose";

import InvestmentRepository from "../repositories/investment.repository.js";
import ROIHistoryRepository from "../repositories/roiHistory.repository.js";
import UserRepository from "../repositories/user.repository.js";
import ReferralRepository from "../repositories/referralIncome.repository.js";

/**
 * ROI Cron
 * Runs every day at 12:00 AM
 */
const startROICron = () => {
    cron.schedule("0 0 * * *", async () => {
    // cron.schedule("* * * * *", async () => {
        console.log("=======================================");
        console.log("ROI Cron Started :", new Date());
        console.log("=======================================");

        const session = await mongoose.startSession();

        try {
            await session.startTransaction();

            /**
             * Today's Date (00:00:00)
             */
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            /**
             * Get Active Investments
             */
            const investments =
                await InvestmentRepository.findActiveInvestments();

            console.log(`Active Investments : ${investments.length}`);

            /**
             * Process Every Investment
             */
            for (const investment of investments) {

                /**
                 * Skip if ROI already credited today
                 */

                console.log("============================");
                console.log("Investment ID:", investment._id);
                console.log("User:", investment.user.fullName);
                console.log("User ID:", investment.user._id);
                console.log("Referred By:", investment.user.referredBy);
                console.log("============================");
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
                 * Calculate Daily ROI
                 */
                const roiAmount =
                    (investment.investmentAmount *
                        investment.dailyROIPercentage) /
                    100;

                /**
                 * Save ROI History
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
                 * Update User Wallet
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
                    `ROI Credited : ${investment.user.fullName} : ₹${roiAmount}`
                );

                /**
                 * ======================================
                 * Level 1 Referral Income (10%)
                 * ======================================
                 */
                if (investment.user.referredBy) {

                    const referralIncome = roiAmount * 0.10;

                    /**
                     * Create Referral History
                     */
                    await ReferralRepository.createReferralIncome(
                        {
                            receiverUser: investment.user.referredBy,
                            sourceUser: investment.user._id,
                            investment: investment._id,
                            referralLevel: 1,
                            incomeAmount: referralIncome,
                        },
                        session
                    );

                    /**
                     * Credit Referrer Wallet
                     */
                    await UserRepository.updateWalletBalance(
                        investment.user.referredBy,
                        referralIncome,
                        session
                    );

                    /**
                     * Update Referrer's Total Level Income
                     */
                    await UserRepository.incrementLevelIncome(
                        investment.user.referredBy,
                        referralIncome,
                        session
                    );

                    const referrer =
                        await UserRepository.findById(
                            investment.user.referredBy
                        );

                    console.log(
                        `Referral Credited : ${referrer.fullName} : ₹${referralIncome}`
                    );
                }
            }

            /**
             * Commit Transaction
             */
            await session.commitTransaction();

            console.log("=======================================");
            console.log("ROI Cron Completed Successfully");
            console.log("=======================================");

        } catch (error) {

            if (session.inTransaction()) {
                await session.abortTransaction();
            }

            console.error("ROI Cron Error :", error);

        } finally {

            await session.endSession();

        }
    });
};

export default startROICron;