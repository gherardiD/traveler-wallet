const Expense = require("../../models/expenseModel");

exports.getExpenseStats = async (req, res) => {
  try {
    const stats = await Expense.aggregate([
      {
        $group: {
          _id: "$type",
          numExpenses: {
            $sum: 1,
          },
          totalAmount: {
            $sum: "$amount",
          },
          avgAmount: {
            $avg: "$amount",
          },
        },
      },
      {
        $sort: {
          totalAmount: -1,
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getMonthlyExpenseStats = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const stats = await Expense.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: {
            $month: "$date",
          },
          numExpenses: {
            $sum: 1,
          },
          totalAmount: {
            $sum: "$amount",
          },
        },
      }
    ]);
    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
