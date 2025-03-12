const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({
      message: "User successfully registered! ✅",
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(400).json({
      message: "User registration failed! ❌",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid username or password! ❌",
      });
    }

    const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: "1h" });

    res.json({
      message: "Login successful! ✅",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Login failed due to a server error! ❌",
      error: err.message,
    });
  }
};

module.exports = { register, login };
