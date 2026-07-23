import User from "../models/user.model.js";

class UserRepository {
  async createUser(userData, session = null) {
    return await User.create([userData], { session }).then(res => res[0]);
  }

  async findById(userId) {
    return await User.findById(userId);
  }

 findByEmail(email) {
    return User.findOne({ email }).select("+password");
}

  async findByMobile(mobile) {
    return await User.findOne({ mobile });
  }

  async findByReferralCode(referralCode) {
    return await User.findOne({ referralCode });
  }

  async updateUser(userId, updateData, session = null) {
    return await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );
  }

  async updateWalletBalance(userId, amount, session = null) {
    return await User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          walletBalance: amount,
        },
      },
      {
        new: true,
        session,
      }
    );
  }

  async incrementROI(userId, amount, session = null) {
    return await User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          totalROIEarned: amount,
        },
      },
      {
        new: true,
        session,
      }
    );
  }

  async incrementLevelIncome(userId, amount, session = null) {
    return await User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          totalLevelIncomeEarned: amount,
        },
      },
      {
        new: true,
        session,
      }
    );
  }

  async updateStatus(userId, status, session = null) {
    return await User.findByIdAndUpdate(
      userId,
      {
        accountStatus: status,
      },
      {
        new: true,
        session,
      }
    );
  }

  async deleteUser(userId, session = null) {
    return await User.findByIdAndDelete(userId, { session });
  }

  async getAllUsers() {
    return await User.find()
      .sort({ createdAt: -1 });
  }
}

export default new UserRepository();