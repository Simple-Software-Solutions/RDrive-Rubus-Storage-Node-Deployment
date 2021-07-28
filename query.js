var express =require('express');
var app=express();
var path=require('path');
var layout =require('express-layout');
var engine=require('ejs-mate');
var bodyparser=require('body-parser');
const requestIp = require('request-ip');
const uniqueString = require('unique-string');
var speakeasy=require('speakeasy');
var QRCode = require('qrcode');
var nodemailer = require('nodemailer');
const FileType = require('file-type');
app.use(requestIp.mw());
const multer = require('multer');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended:true
}))
const formidable=require('formidable')
const mongoose=require('mongoose');
var disk = require('diskusage')
const os = require('os');
// get disk usage. Takes mount point as first parameter
let pathh = os.platform() === 'win32' ? 'c:' : '/';

// Callbacks
disk.check(pathh, function(err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log('available:'+ info.available/1024/1024/1024+'GB');
    console.log('free:'+info.free/1024/1024/1024+'GB');
    console.log('Total:'+info.total/1024/1024/1024+'GB');
  }
});


const fs = require("fs")
const hidefile = require('hidefile');

hidefile.hideSync('./public/.Files');
  
  var Filename="";
  var org_Name="";
  
var storage =   multer.diskStorage({
	destination: function (req, file, callback) {
		console.log(req.body);
		var dir=path.join('./public/.Files/'+ req.body.user_id);
		if (fs.existsSync(dir)){
		callback(null, dir);
		}
		else
		{
			fs.mkdirSync(dir);
			callback(null, dir);
		}
	},
	filename: function (req, file, callback) {
		
		Filename=file.originalname.toLowerCase().split(' ').join('-')
	    org_Name=file.originalname.toLowerCase().split(' ').join('-');
		callback(null , Filename );
	}
});


var encryptor = require('file-encryptor');
/*
var key = 'SUPER-SECRET-KEY';
var options = { algorithm: 'aes256' };
encryptor.encryptFile('public/Files/5f0ca9e2990c1d3fbcc8bca2/drive.sssolutions.io25175bcbc13e1f68f4c42ea6bb33b501abhi-toh-party-shuru-hui-hai-@-indiamp3.com.mp3', 'public/Files/5f0ca9e2990c1d3fbcc8bca2/encrypted.dat', key, options, function(err) {
    // Decryption complete
});
..
encryptor.decryptFile('encrypted.dat', 'outputfile.mp4', key, options, function(err) {
    // Encryption complete
});
*/
var upload = multer({ storage : storage}).array('userfile');

var middleware=[
	layout(),
	express.static(path.join(__dirname,'public'))
]

app.get('/',function(req,res){
res.render('home')
})
app.get('/sdrive_check_point',function(req,res){
res.end('Done')
})
app.get('/sdrive_check_storage',function(req,res){
	disk.check(pathh, function(err, info) {
	  if (err) {
		console.log(err);
	  } else {
		  var aval =info.available/1024/1024/1024;

	res.end((aval.toFixed(2)))     
	}
	});

})
app.get('/remove_file/:id/:file_name',function(req,res){
try
{
if(fs.existsSync('public/.Files/'+req.params.id+"/"+req.params.file_name))
{	
fs.unlinkSync('public/.Files/'+req.params.id+"/"+req.params.file_name);
res.end('file remove successfully');
} 
}
catch(error)
{
	console.log(error)
}
})

app.get('/remove_user/:dir',function(req,res){
const del = require('del');
try
{
const dir = 'public/.Files/'+req.params.dir;
(async () => {
    try {
        await del(dir);

        console.log(`${dir} is deleted!`);
    } catch (err) {
        console.error(`Error while deleting ${dir}.`);
	}
})();	

res.end('redrictory remove remove successfully'); 
}
catch(error)
{
	console.log(error)
}
})


app.use(middleware);
app.engine('ejs',engine);
app.set('view engine','ejs');





const session = require('express-session');

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));


app.post('/getdata',function(req,res){
	try
	{
	new formidable.IncomingForm().parse(req,(err,fields,files)=>{

	});
	upload(req,res,function(err) {
		if(err) {
				return res.end("Error uploading file.");
		}
		else
		{


var key = req.body.user_id;
var options = { algorithm: 'aes256' };
 encryptor.encryptFile('public/.Files/'+req.body.user_id +'/'+ Filename, 'public/.Files/'+req.body.user_id +'/'+ Filename+".dat", key, options, function(err) {
    // Decryption complete
});
fs.unlinkSync(req.files[0].path)

			console.log(req);
			console.log('file successfully uploaded');
			res.end("ok");
		}
	
})
}
catch(error)
{
	console.log(error)
}
})





app.listen(80,function(){
	console.log("Server started on Port 80");
})
