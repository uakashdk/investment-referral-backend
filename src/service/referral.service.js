import ReferralRepository from "../repositories/referralIncome.repository.js";
import UserRepository from "../repositories/user.repository.js";
import InvestmentRepository from "../repositories/investment.repository.js";
import ApiError from "../utills/ApiError.js";

class ReferralService {
  /**
   * Create Referral Income
   * (Internal Service - Used by ROI/Cron)
   */
  async createReferralIncome(data, session = null) {
    const {
      receiverUser,
      sourceUser,
      investment,
      referralLevel,
      incomeAmount,
    } = data;

    const receiver = await UserRepository.findById(receiverUser);

    if (!receiver) {
      throw new ApiError(404, "Receiver user not found.");
    }

    const source = await UserRepository.findById(sourceUser);

    if (!source) {
      throw new ApiError(404, "Source user not found.");
    }

    const investmentData =
      await InvestmentRepository.findById(investment);

    if (!investmentData) {
      throw new ApiError(404, "Investment not found.");
    }

    if (incomeAmount <= 0) {
      throw new ApiError(
        400,
        "Referral income must be greater than zero."
      );
    }

    return await ReferralRepository.createReferralIncome(
      {
        receiverUser,
        sourceUser,
        investment,
        referralLevel,
        incomeAmount,
      },
      session
    );
  }

  /**
   * Get Referral By Id
   */
  async getReferralById(id) {
    const referral =
      await ReferralRepository.findById(id);

    if (!referral) {
      throw new ApiError(
        404,
        "Referral record not found."
      );
    }

    return referral;
  }

  /**
   * Get Logged-in User Referral History
   */
  async getReferralHistory(userId) {
    return await ReferralRepository.getReferralHistory(
      userId
    );
  }

  /**
   * Get Total Referral Income
   */
  async getTotalReferralIncome(userId) {
    return await ReferralRepository.getTotalReferralIncome(
      userId
    );
  }

  /**
   * Get All Referrals
   */
  async getAllReferrals() {
    return await ReferralRepository.getAllReferrals();
  }
}

export default new ReferralService();