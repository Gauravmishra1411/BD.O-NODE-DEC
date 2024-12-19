const express = require("express")
const app = express()
const { userAuth } = require("./middlewere/middlewere")
const { connectDB } = require("./database/BDconnection")
const { User } = require("./model/userDetail")
const cors = require('cors');
const { validateData } = require("./schemaValidation/validation")
const bcrypt = require("bcrypt")
const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;


// middelware
app.use(cookieParser());

app.use(cors());
app.use(express.json());

//class ...........18.......multipule riute
// ...........authorization............
app.get("/admin", userAuth, (req, res, next) => {
  const token = "asdfghjkl"
  const construction = token === "asdfghjkl"
  if (construction) {
    res.status(200).send("yes this people is authenthintcat")
  }
  else {
    next()
    res.status(401).send("not this people is authenthintcat")
  }
})
// middlewere file login

require("dotenv").config()
const PORT = process.env.PORT || 3000
connectDB().then(() => {
  console.log("connection successfull now ");
}).catch((err) => {
  console.error(err)
  console.log("connection can't be successfull now ");

})
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, skill, gender } = req.body
    // validation model come from body
    validateData(req)
     const passwordHash = await bcrypt.hash(password, 10)
    console.log("hashpassword ->" + passwordHash)
    // data add into a db


    // console.log(req.body save kara raha hai db main)
    const userData = new User({
      name,
      email,
      skill,
      gender,
      password: passwordHash
    })
    console.log(userData);
    await userData.save()
    res.send("data save successfully")
  } catch (err) {
    console.log(err);//jo v current error jo hm data base main save karba raha hai
    console.log("-----")
    console.log(err.message);
    res.status(404).send("can't post successfully")
  }
})
// login password compaire,email vaild
app.post("/login",  async (req, res) => {
  try {
    const { email, password } = req.body;  //ok
    const useremail = await User.findOne({ email: email });//
    if (!useremail) {
      throw new Error("Email not found");
    } const isPasswordCompare = await bcrypt.compare(password, useremail.password);//ok
    if (isPasswordCompare) {
      const token = await jwt.sign({ _id: useremail._id }, secretKey,{expiresIn: "1h"},)
      res.cookie("token", token,{httpOnly:true,expires:new Date(Date.now()+8*3600)})//ok
      res.send("Login successful");//ok
    } else {
      throw new Error("invalide condidate")
    }
  } catch (err) {
    console.log(err);
    console.log("this error -> " + err);
    res.status(400).send(err.message);  
  }
});
app.get("/profile", userAuth, async (req, res) => {
  try {
const {user}  = req;
    console.log(req);
    
    res.send(user)
  } catch (er) {

  }
})

//.....particuler data.......find data from the emailId.....
app.get("/feeds",userAuth, async (req, res) => {
  try {
    const userEmail = req.body.email;
    console.log(userEmail);

    const user = await User.find({ email: userEmail })
    if (user.length !== 0) {
      res.send(user)
      console.log(userEmail)

    } else {
      res.send("user not fond")
    }
  } catch (err) {
    console.log(err.message);
    console.log(err);
    console.log("can't be find by the email")
    res.status(404).send("can't be find by this email in db")

  }
})
// ..........All data show in db
app.get("/all", async (req, res) => {
  try {
    const allData = await User.find({})
    res.send(allData)
  } catch (err) {
    console.log(err.message);
    console.log(err);
    res.send("user now server problem")

  }
})

// .........delete...._id
app.delete("/deletes", async (req, res) => {
  try {
    console.log(req);
    const idused = req.body._id
    console.log(idused);

    const deletes = await User.findByIdAndDelete({ _id: idused })
    console.log("-----------Dele--------");

    res.send("this id is deleted -> " + deletes)
  } catch (err) {
    console.log(err.message);
    console.log(err);
    res.send("user now server problem")
  }
})

// ..........patch.............
app.patch("/patch", async (req, res) => {
  try {
    const allowEdit = ["name", "age", "skill", "gender"]
    const allowUpdate = Object.keys(data).every((keys) => allowEdit.includes(keys))
    if (!allowUpdate) {
      throw new Error("Only that field will be update" + allowEdit)
    }
    const idused = req.body._id
    console.log(idused)
    const data = req.body
    if (data?.skill.length > 4) {
      throw new Error("skill shold be minimum 4")
    }
    const updates = await User.findByIdAndUpdate({ _id: idused }, data, { returnDocument: "after", runValidators: true })
    res.send("this is was update success full" + updates)
    console.log(updates)
  } catch (err) {
    console.log(err.message);
    res.send("user now server problem")
  }
})
// ..........
app.listen(PORT, () => {
  console.log(`Successfully run on server ${PORT}`)
})