const mongoose = require('mongoose');
var validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid uder id")
            }
        }
        
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        mixlength:15,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("invalid uder")
            }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    age:{
        type:Number,
        minlength: 16,
        mixlength:45,
    },
    gender:{
      type:String,
      //costume validation
      valitate(value){
        if(!["male","female","other"].includes(value)){
            throw new Error("pleace valid gender")
        }
      }
    },
    photoUrl:{
        type:String,
        default:"https://img.washingtonpost.com/rw/2010-2019/WashingtonPost/2015/07/12/National-Politics/Images/GOP_2016-Trump-02fae-4547.jpg"
    },
    skill:{
        type:[String],
        valitate(value){
            if(value<3){
                throw new Error("atlist 3 skill add")

            }
        }
    }
},{timeseries:true});

const User = mongoose.model('UserDetail', userSchema);

module.exports = {User};
