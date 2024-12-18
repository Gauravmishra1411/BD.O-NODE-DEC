const adminAuth=(req,res,next)=>{
  const token="asdfghjkl"
  const construction=token==="asdfghjkl1"
  if(construction){
    res.status(200).send("yes this people is authenthintcat")
  }
  else{
    next()
    res.status(401).send("not this people is authenthintcat")
  }
}
const userAuth=(req,res,next)=>{
  const token="asdfghjkl"
  const construction=token==="asdfghjkl1"
  if(construction){
    res.status(200).send("yes this people is authenthintcat")
  }
  else{
    next()
    res.status(401).send("not this people is authenthintcat")
  }
  next()
}
module.exports={adminAuth,userAuth}