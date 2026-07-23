import ROIHistory from "../models/roiHistory.model.js";

class ROIHistoryRepository {
  async createROIHistory(roiData, session = null) {
    return await ROIHistory.create([roiData], { session }).then(
      (result) => result[0]
    );
  }

  async bulkCreateROIHistory(roiList, session = null) {
    return await ROIHistory.insertMany(roiList, {
      session,
      ordered: true,
    });
  }

async findByInvestmentAndDate(investmentId, date) {
  return await ROIHistory.findOne({
    investment: investmentId,
    date: {
      $gte: new Date(
        new Date(date).setHours(0, 0, 0, 0)
      ),
      $lt: new Date(
        new Date(date).setHours(23, 59, 59, 999)
      ),
    },
  });
}


  async findById(roiId) {
    return await ROIHistory.findById(roiId)
      .populate("user")
      .populate("investment");
  }

  async findByUserId(userId) {
    return await ROIHistory.find({
      user: userId,
    })
      .populate("investment")
      .sort({ date: -1 });
  }

  async findByInvestmentId(investmentId) {
    return await ROIHistory.find({
      investment: investmentId,
    }).sort({ date: -1 });
  }

  async findByDate(date) {
    return await ROIHistory.find({
      date,
    })
      .populate("user")
      .populate("investment");
  }

  async getTotalROIByUser(userId) {
    const result = await ROIHistory.aggregate([
      {
        $match: {
          user: userId,
          status: "PAID",
        },
      },
      {
        $group: {
          _id: null,
          totalROI: {
            $sum: "$roiAmount",
          },
        },
      },
    ]);

    return result.length ? result[0].totalROI : 0;
  }

  async getPendingROI() {
    return await ROIHistory.find({
      status: "PENDING",
    })
      .populate("user")
      .populate("investment");
  }

  async updateStatus(roiId, status, session = null) {
    return await ROIHistory.findByIdAndUpdate(
      roiId,
      {
        status,
      },
      {
        new: true,
        session,
      }
    );
  }

  async getAllROIHistory() {
    return await ROIHistory.find()
      .populate("user")
      .populate("investment")
      .sort({ date: -1 });
  }
}

export default new ROIHistoryRepository();