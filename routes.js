const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('./models/SSS_User');
const SSSUser = mongoose.model('sss_user');


router.get('/insert',function(req,res){
	res.render('insert',{
		errors:{},
		success:{}
	})
})

router.get('/search',function(req,res){
	res.render('search',{
		errors:{}
	})
})
router.post('/search_c',function(req,res){
	var errors=[];
	if(!req.body.carid)
	{
		errors.push("Plz Ener Car ID");
	}
	if(errors.length>0)
	{
		res.render('search',{
			errors:errors
			
		})
	}
	else
	{
	}
})

router.get('/update',function(req,res){
	res.render('update',{
		errors:{},
		success:{}
	})
})
router.post('/update_C',function(req,res){
	var errors=[];
	if(!req.body.carid)
	{
		errors.push("Plz Ener Car ID");
	}
	if(!req.body.ncarowner)
	{
		errors.push("Plz Ener new car owner");
	}
	if(errors.length>0)
	{
		res.render('update',{
			errors:errors,
			success:{}
			
		})
	}
	else
	{
	
	}	
})






module.exports=router