import mongoose,{Schema} from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"
//bcrypt is used for hash the password and jsonwebtoeknnis used for generate token encrypt user data
const userSchema = new Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true//it gives searching in optimized way
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //cloudnary url
        require:true,
    },
    coverImage:{
        type:string
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:String
    },
},{timestamps:true})
userSchema.pre("Save",async function (next){
if(!this.isModified("password")) return next()
this.password = bcrypt.hash(this.password,10);
next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
    _id:this._id,
    email:this.email,
    username:this.username,
    fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
        )
}
//pre hook is used to before the save the password.it encrypt it
export const user =  mongoose.model("User",userSchema);