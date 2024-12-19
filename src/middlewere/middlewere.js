const jwt = require('jsonwebtoken');
const User  = require("../model/userDetail")

require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const userAuth = async (req, res, next) => {
  try {

    const { token } = req.cookies
    console.log("In Auth -> ",token)
    if (!token) {
      throw new Error("token is not valid")
    }
    const decodededObj = await jwt.verify(token, secretKey)
    const { _id } = decodededObj
    const user = await User.findById(_id) 
    if (!user) {
      throw new Error("User not found")
    }
    req.user = user;
    next()
  } catch (err) {
    console.log(err)
    console.log(err.message)
    res.status(404).send("not")
  }
}
module.exports = { userAuth }