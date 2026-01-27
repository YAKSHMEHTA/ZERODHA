const User = require("../Model/UserModel");
const { createSecretToken } = require("../Util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    console.log("SIGNUP HIT", req.body);

    const { email, username, password, createdAt } = req.body;
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, username, password, createdAt });
    const token = createSecretToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (err) {
    console.log(err);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
}

module.exports.NewOrder = async(req,res) =>{
  try{
      console.log("hi")
      res.send("hu")
  }catch(err){
    console.log(err)
  }
}