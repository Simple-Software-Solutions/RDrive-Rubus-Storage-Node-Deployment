const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const SSS_UserSchema=new Schema({
  First_Name:{
    type:String,
    required:true
  },
  Last_Name:{
    type:String,
    required:true
  },
  Email:{
    type:String,
    required:true
  },
  Password:{
    type:String,
    required:true
  },
  Login_Status:{
    type:String,
    required:true
  },
  Country:{
    type:String,
    required:true
  },
  Picture:{
    type:String,
    required:true
  },
  Secret_Base32:{
    type:String,
    required:true
  },
  QR_Code:{
    type:String,
    required:true
  },
  
  user_two_way_varification:{
    type:String,
    required:true
  },
  Email_Code:{
    type:String,
    required:true
  },
  Space:{
    type:String,
    required:true
  },
  Package:{
    type:String,
    required:true
  },
  
  
  
});
mongoose.model('sss_user',SSS_UserSchema);