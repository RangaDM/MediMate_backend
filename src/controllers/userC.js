const User = require("../model/user");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

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
