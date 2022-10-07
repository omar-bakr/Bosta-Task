const userService=require('../services/UserService');
const {sendEmail}=require('../utils/notifications');
const {checkHash}=require('../utils/password');
const {generateToken}=require('../utils/auth');
const {validationResult } = require('express-validator');
require('dotenv').config('../.env');

const config=process.env;



exports.register = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.status(400).json({success: false,errors: errors.array()});
  }
  else{
    try {
      if(await userService.getUser({email:req.body.email})){
        res.status(409).json({ message:'This email already exsists'});
      }
      else{
        const user = await userService.createUser(req.body);
        sendEmail(
          {
            email:user.email,
            subject: "Please confirm your account",
            html:`<h1>Email Confirmation</h1>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=${config.BASE_URL}/api/user/confirm/${user.confirmationCode}> Click here</a>`,
          });
        res.status(200).json({ data: user, message: 'User created successfully'});
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  };

exports.login=async(req,res)=>{
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.status(400).json({success: false,errors: errors.array()});
  }
  else{
    const {email,password}=req.body;
    try{
      const user=await userService.getUser({email:email});
      if(user){
        if (user.status != 'Active') {
          res.status(401).send({message: 'Pending Account. Please Verify Your Email!'});
        }
        else{
          if(await checkHash(password,user.password)){
            const token=generateToken({ id:user._id,email:user.email});
            res.status(200).send({message:'User is logged in successfully',token});
          }else{
            res.status(409).send({message: 'Please enter a valid password'});
          }
        }
      }
      else{
        res.status(409).json({ message:'No such email'});
      }
    }catch(err)
    {
      res.status(500).json({ message: err.message });
    }

  }
};

exports.verifyUser=async(req,res)=>{
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.status(400).json({success: false,errors: errors.array()});
  }
  else{
    try{
      const user=await userService.getUser({confirmationCode: req.params.confirmationCode});
      if(!user){
        return res.status(404).send({ message: 'User Not found.' });
      }
      else{
        user.status='Active';
        await userService.updateUser(user.id,user);
        res.status(200).json({ message:'Email verified successfully'});
      }
  
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
};

