const User = require("../model/user");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_TOKEN_KEY = "duhfig45656gdfsghfdhfdhd54534ddgd@rg+fd";

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email || !password) {
      throw createHttpError(400, "Missing required parameters");
    }

    const user = await User.findOne({ email: email }).exec();

    if (!user) {
      throw createHttpError(400, "User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw createHttpError(400, "Invalid credentials");
    }

    const userT = await User.findOne({ email: email }).exec();

    const token = jwt.sign(
      {
        user_id: userT._id,
        email: userT.email,
      },
      JWT_TOKEN_KEY,
      {
        expiresIn: "4h",
      }
    );

    userT.token = token;

    const result = await userT.save();

    const response = {
      id: result._id,
      name: result.name,
      email: result.email,
      token: result.token,
    };

    console.log(response);

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  // console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const address = req.body.address;
  const age = req.body.age;
  const nic = req.body.nic;

  try {
    if (!name || !email || !password || !phone || !address || !age) {
      throw createError(400, "All fields are required!");
    }
    const isUserAlreadyExists = await User.exists({ email });
    if (isUserAlreadyExists) {
      throw createError(400, "User already exists!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      age,
      nic,
    });
    const savedUser = await user.save();
    // const user = new User(req.body);
    // await user.save();
    res.status(201).send(savedUser);
  } catch (err) {
    next(err);
  }
};
