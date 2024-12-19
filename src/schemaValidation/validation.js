const validator=require("validator")
const validateData=(req)=>{
const {name,email,password,skill,gender}=req.body
if(!name){
  throw new Error("name shoud not empty")
}else if(!validator.isEmail(email)){
  throw new Error("email shoud not empty or invild")

}else if(!validator.isStrongPassword(password)){
  throw new Error("password shoud not empty or invild")

} 
}
module.exports={
  validateData
}