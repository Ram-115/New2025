const User = require("../Schemas/LoginSchema");
const bcrypt = require("bcryptjs");

exports.signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    console.log("Signup request received:", { name, email });

    // ❗ Validate fields
    if (!name || !email || !password) {
      return res.json({
        status: false,
        message: "All fields are required"
      });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.json({
        status: false,
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = { name, email, password: hashedPassword };

    await User.create(data);

    return res.json({
      status: true,
      message: "User created successfully"
    });

  } catch (e) {
    console.error("Signup error:", e.message);
    return res.json({
      status: false,
      message: "Server error"
    });
  }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.json({ status: false, message: "User not exist" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.json({ status: false, message: "Wrong password" });
      }
  
      return res.json({ status: true, message: "Login success" });
  
    } catch (e) {
      return res.json({ status: false, message: "Server error" });
    }
  };
  
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

