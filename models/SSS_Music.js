const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const SSS_MusicSchema=new Schema({
  User_Id:{
    type:String,
    required:true
  },
  File_Icon:{
    type:String,
    required:true
  },
  Path:{
    type:String,
    required:true
  },
  File_Name:{
    type:String,
    required:true
  },
  File_Sharing:{
    type:String,
    required:true
  },
  File_Size:{
    type:String,
    required:true
  },
  
  
  
});
mongoose.model('sss_music',SSS_MusicSchema);