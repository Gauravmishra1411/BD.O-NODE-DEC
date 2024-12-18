const express =require("express")
const app=express()
const {adminAuth,userAuth}=require("./middlewere")
const {connectDB}=require("./database/BDconnection")
const {User}=require("./model/userDetail")
const cors=require('cors');


// middelware
app.use(cors());
app.use(express.json());



//class ...........18.......multipule riute


// ...........authorization............
app.get("/admin",userAuth,(req,res,next)=>{
  const token="asdfghjkl"
  const construction=token==="asdfghjkl"
  if(construction){
    res.status(200).send("yes this people is authenthintcat")
  }
  else{
    next()
    res.status(401).send("not this people is authenthintcat")
  }
})
// middlewere file login
app.use("/Adminauth", adminAuth)
 
require("dotenv").config()
const PORT=process.env.PORT || 3000

connectDB().then(()=>{
console.log("connection successfull now ");

}).catch((err)=>{
  console.error(err)
  console.log("connection can't be successfull now ");

})

// app.post("/signup",async(req,res)=>{
//   // create a data on db 
//   try{
//     const personDetaile=new User({
//       name:"roshan ",
//       email:"roshan@gmail.com",
//       password:"Gaurav@1411@",
      
//     })
//     await personDetaile.save()
//    res.send("successfull")
//    console.log("data post successfull in database"+ personDetaile)
  
//   }catch(err){
//     res.send("can't successfull")
//     console.log("data can't be post successfull in database" + err.message)
   
//   }
//   })
// data add into a data base
app.post("/signup",async(req,res)=>{
  try{
const userBody=req.body
console.log(req.body)
const userData=new User(userBody)
await userData.save()
res.send("data save successfully")
  }catch(err){
console.log(err);//jo v current error jo hm data base main save karba raha hai
console.log("-----")
console.log(err.message);
res.status(404).send("can't post successfully")

  }
})
//.....particuler data.......find data from the emailId.....
app.get("/feeds",async(req,res)=>{
try{
const userEmail=req.body.email;
console.log(userEmail);

const user=await User.find({email:userEmail})
if(user.length!==0){
  res.send(user)
  console.log(userEmail)

}else{
  res.send("user not fond")
}
}catch(err){
console.log(err.message);
console.log(err);
console.log("can't be find the by email")
res.status(404).send("can't be find the this email in db")

}
})
// ..........All data show in db
app.get("/all",async(req,res)=>{
  try{
    const allData=await User.find({})
    res.send(allData)
  }catch(err){
console.log(err.message);
console.log(err);
res.send("user now server problem")

  }
})
// .........delete...._id
app.delete("/deletes",async(req,res)=>{
  try{
    console.log(req);
    const idused=req.body._id
    console.log(idused);
    
    const deletes=await User.findByIdAndDelete({_id:idused})
    console.log("-----------Dele--------");
    
    res.send("this id is deleted -> " + deletes)
  }catch(err){
console.log(err.message);
console.log(err);
res.send("user now server problem")
  }
})

// ..........patch.............
app.patch("/patch",async(req,res)=>{
  try{
    const allowEdit=["name","age","skill","gender"]
    const allowUpdate=Object.keys(data).every((keys)=>allowEdit.includes(keys)) 
    if(!allowUpdate){
      throw new Error("Only that field will be update" +allowEdit)
    }
    const idused=req.body._id
    console.log(idused)
    const data=req.body
    if(data?.skill.length>4){
      throw new Error("skill shold be minimum 4")
    }
    const updates=await User.findByIdAndUpdate({_id:idused},data,{returnDocument:"after",runValidators:true})
    res.send("this is was update success full" + updates)
    console.log(updates)
  }catch(err){
console.log(err.message);
res.send("user now server problem")
  }
})
// ..........
app.listen( PORT ,()=>{
  console.log(`Successfully run on server ${PORT}`)
})