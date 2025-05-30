const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);
    const result = await db.User.findOne({ where: { email } });
    if (result) {
      return res.status(401).json("Email Already Exists");
    }
    const newUser = await db.User.create({
      username,
      email,
      password: hasedPassword,
    });
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Registered Successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error Occurred");
  }
};

module.exports = register;
