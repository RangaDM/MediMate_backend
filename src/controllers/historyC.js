const HistoryModel = require("../model/history");
const mongoose = require("mongoose");
const createError = require("http-errors");

exports.addHistory = async (req, res, next) => {
  const { topic, des, data, place, medicine, drName, price, staus, user } =
    req.body;
  try {
    const { image } = req.files;
    if (!image) {
      throw createHttpError(404, "Image not found");
    }
    if (!image.mimetype.startsWith("image")) {
      throw createHttpError(400, "Only images are allowed");
    }
    let filepath = __dirname + "../../../media/" + image.name;
    image.mv(filepath);

    let filepathtoUplaod = "/media/" + image.name;

    if (
      !topic ||
      !des ||
      !data ||
      !place ||
      !medicine ||
      !drName ||
      !price ||
      !staus
    ) {
      throw createError(400, "All field are required");
    }

    const userID = mongoose.Types.ObjectId(user);

    const newHistory = new HistoryModel({
      topic,
      des,
      data,
      place,
      medicine,
      drName,
      price,
      staus,
      image: filepathtoUplaod,
      user: userID,
    });

    const savedHistory = await newHistory.save();
    res.status(201).json({ savedHistory });
  } catch {
    next(error);
  }
};

exports.updateHistory = async (req, res, next) => {
  const historyID = req.body.id;
  const { topic, des, data, place, medicine, drName, price, staus } = req.body;

  try {
    if (!mongoose.isValidObjectId(historyID)) {
      throw createError(400, "Invalid History ID");
    }

    if (
      !topic ||
      !des ||
      !data ||
      !place ||
      !medicine ||
      !drName ||
      !price ||
      !staus
    ) {
      throw createError(400, "All fields are required");
    }

    const { image } = req.files;
    let filepath;
    let filepathtoUplaod;

    if (image) {
      if (!image.mimetype.startsWith("image")) {
        throw createError(400, "Only images are allowed");
      }
      filepath = __dirname + "../../../media/" + image.name;
      image.mv(filepath);
      filepathtoUplaod = "/media/" + image.name;
    }

    const history = await HistoryModel.findById(historyID).exec();

    if (!history) {
      throw createError(404, "History not found");
    }

    history.topic = topic;
    history.des = des;
    history.data = data;
    history.place = place;
    history.medicine = medicine;
    history.drName = drName;
    history.price = price;
    history.staus = staus;
    if (image) {
      history.image = filepathtoUplaod;
    }

    const result = await history.save();
    res.status(200).json({ result });
  } catch {
    next(error);
  }
};

exports.deleteHistory = async (req, res, next) => {
  const historyID = req.body.id;

  try {
    if (!mongoose.isValidObjectId(historyID)) {
      throw createError(400, "Invalid History ID");
    }

    const history = await HistoryModel.findById(historyID).exec();

    if (!history) {
      throw createError(404, "History not found");
    }

    const result = await history.remove();
    res.status(200).json({ result });
  } catch {
    next(error);
  }
};

exports.getHistoryByUser = async (req, res, next) => {
    const userID = req.params.userID;

    try{
        const history = await HistoryModel.find({ user: userID }).exec();
        res.send(history);
    } catch {
        next(error);
    }
}