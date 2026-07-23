import Referral from "../models/referralIncome.model.js";

class ReferralRepository {
  async createReferralIncome(referralData, session = null) {
    return await Referral.create([referralData], { session }).then(
      (result) => result[0]
    );
  }

  async bulkCreateReferralIncome(referrals, session = null) {
    return await Referral.insertMany(referrals, {
      session,
      ordered: true,
    });
  }

  async findById(referralId) {
    return await Referral.findById(referralId)
      .populate("receiverUser")
      .populate("sourceUser")
      .populate("investment");
  }

  async findByReceiverId(userId) {
    return await Referral.find({
      receiverUser: userId,
    })
      .populate("sourceUser")
      .populate("investment")
      .sort({ createdAt: -1 });
  }

  async findBySourceUserId(userId) {
    return await Referral.find({
      sourceUser: userId,
    })
      .populate("receiverUser")
      .populate("investment")
      .sort({ createdAt: -1 });
  }

  async findByLevel(level) {
    return await Referral.find({
      referralLevel: level,
    }).sort({ createdAt: -1 });
  }

  async getTotalReferralIncome(userId) {
    const result = await Referral.aggregate([
      {
        $match: {
          receiverUser: userId,
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: "$incomeAmount",
          },
        },
      },
    ]);

    return result.length ? result[0].totalIncome : 0;
  }

  async getReferralHistory(userId) {
    return await Referral.find({
      receiverUser: userId,
    })
      .populate("sourceUser")
      .populate("investment")
      .sort({ createdAt: -1 });
  }

  async deleteReferral(referralId, session = null) {
    return await Referral.findByIdAndDelete(referralId, {
      session,
    });
  }

  async getAllReferrals() {
    return await Referral.find()
      .populate("receiverUser")
      .populate("sourceUser")
      .populate("investment")
      .sort({ createdAt: -1 });
  }
}

export default new ReferralRepository();