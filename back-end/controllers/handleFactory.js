const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");
const APIFeature = require("../utils/apiFeatures.js");

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET movements on specific user
    let filter = {};
    if (req.params.userId) filter = { user: req.params.userId };

    // req.query is an object
    const features = new APIFeature(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const document = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: document.length,
      data: { document },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    // findById -> Model.findOne({ _id: req.params.id })
    if (populateOptions) query = query.populate(populateOptions);
    const document = await query;

    if (!document) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { document },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: { document },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { document },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
