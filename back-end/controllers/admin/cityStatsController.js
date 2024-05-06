const City = require('../../models/cityModel');

// const citySchema = new mongoose.Schema({
//   cityName: {
//     type: String,
//     required: true,
//   },
//   country: {
//     name: {
//       type: String,
//       required: true,
//     },
//     flag: {
//       type: String,
//       required: true,
//     },
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   notes: {
//     type: String,
//   },
//   position: {
//     lat: {
//       type: Number,
//       required: true,
//     },
//     lng: {
//       type: Number,
//       required: true,
//     },
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
// });

exports.getCityStats = async (req, res) => {
  try {
    const stats = await City.aggregate([
      {
        $group: {
          _id: "$country.name",
          numCities: { $sum: 1 },
        },
      },
      {
        $sort: { numCities: -1 },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getMonthlyCityStats = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const stats = await City.aggregate([
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
          _id: { $month: "$date" },
          numCities: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}