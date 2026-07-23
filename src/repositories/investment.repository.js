import Investment from "../models/investment.model.js";

class InvestmentRepository {
  async createInvestment(investmentData, session = null) {
    return await Investment.create([investmentData], { session }).then(
      (result) => result[0]
    );
  }

  async findById(investmentId) {
    return await Investment.findById(investmentId).populate("user");
  }

  async findByUserId(userId) {
    return await Investment.find({
      user: userId,
    }).sort({ createdAt: -1 });
  }

  async findActiveInvestments() {
    return await Investment.find({
      investmentStatus: "ACTIVE",
    }).populate("user");
  }

  async findCompletedInvestments() {
    return await Investment.find({
      status: "COMPLETED",
    });
  }

  async findByStatus(status) {
    return await Investment.find({
      status,
    });
  }

  async updateInvestment(investmentId, updateData, session = null) {
    return await Investment.findByIdAndUpdate(
      investmentId,
      updateData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );
  }

  async updateInvestmentStatus(investmentId, status, session = null) {
    return await Investment.findByIdAndUpdate(
      investmentId,
      {
        status,
      },
      {
        new: true,
        session,
      }
    );
  }

  async getUserTotalInvestment(userId) {
    const result = await Investment.aggregate([
      {
        $match: {
          user: userId,
          status: "ACTIVE",
        },
      },
      {
        $group: {
          _id: null,
          totalInvestment: {
            $sum: "$investmentAmount",
          },
        },
      },
    ]);

    return result.length ? result[0].totalInvestment : 0;
  }

  async findEndingToday(today) {
    return await Investment.find({
      endDate: {
        $lte: today,
      },
      status: "ACTIVE",
    });
  }

  async findExpiredInvestments(today) {
    return await Investment.find({
      endDate: {
        $lt: today,
      },
      status: "ACTIVE",
    });
  }

  async deleteInvestment(investmentId, session = null) {
    return await Investment.findByIdAndDelete(investmentId, {
      session,
    });
  }

  async getAllInvestments() {
    return await Investment.find()
      .populate("user")
      .sort({ createdAt: -1 });
  }
}

export default new InvestmentRepository();