const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./factoryHandler");
const multer = require("multer");
const AppError = require("../utils/AppError");
const sharp = require("sharp");

const storage = multer.memoryStorage();

const filters = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("not an image.please upload an image!", 400), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filters,
});

exports.resizeImageCover = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${req.body.imageCover}`);

  next();
});

exports.uploadImageCover = upload.single("imageCover");
exports.getAllTours = factory.getAll(Tour);
exports.getOneTour = factory.getOne(Tour, "reviews");
exports.updateTour = factory.updateOne(Tour);
exports.createTour = factory.createOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $lte: 4.9 } },
    },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        numTours: { $sum: 1 },
        sumOfRatings: { $sum: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        maxPrice: { $max: "$price" },
        minPrice: { $min: "$price" },
      },
    },
    {
      $sort: { avgPrice: -1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    stats,
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year;
  const stats = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numTours: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    {
      $addFields: {
        month: "$_id",
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { NumTours: -1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    results: stats.length,
    stats,
  });
});
