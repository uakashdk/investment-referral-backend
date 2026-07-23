import ReferralService from "../service/referral.service.js";

class ReferralController {
  /**
   * Get Logged-in User Referral History
   */
  async getReferralHistory(req, res, next) {
    try {
      const referrals =
        await ReferralService.getReferralHistory(
          req.user._id
        );

      return res.status(200).json({
        success: true,
        data: referrals,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Referral By Id
   */
  async getReferralById(req, res, next) {
    try {
      const referral =
        await ReferralService.getReferralById(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: referral,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Total Referral Income
   */
  async getTotalReferralIncome(req, res, next) {
    try {
      const total =
        await ReferralService.getTotalReferralIncome(
          req.user._id
        );

      return res.status(200).json({
        success: true,
        data: {
          totalReferralIncome: total,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get All Referral Records
   */
  async getAllReferrals(req, res, next) {
    try {
      const referrals =
        await ReferralService.getAllReferrals();

      return res.status(200).json({
        success: true,
        data: referrals,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ReferralController();