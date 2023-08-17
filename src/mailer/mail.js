const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sinu0842@gmail.com',
      pass: 'yplpfejtziglehjs'
    }
  });

  let sendMail = async (email,name,otp)=>{

    const mailOptions = {
        from: 'sinu0842@gmail.com',
        to: email,
        subject: 'Invitation Mail',
        html: `<h1>Thanks for Registring With Us ${name}</h1>
        <p>Your OTP is <h3>${otp}</h3></p>
        `
      };
      transporter.sendMail(mailOptions,()=>{
        console.log(`mail send successfully`);
      });
  }


  module.exports ={
    sendMail
  }