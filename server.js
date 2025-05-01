

require('dotenv').config(); 
console.log("📦 ENV TEST → EMAIL =", process.env.EMAIL);
console.log("📦 ENV TEST → PASSWORD =", process.env.PASSWORD ? "Loaded ✅" : "Missing ❌");


const nodemailer = require('nodemailer');
console.log(" server.js is running...");
console.log("EMAIL:", process.env.EMAIL);
console.log("PASSWORD:", process.env.PASSWORD ? "✅ Loaded" : "❌ Missing");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

let mailOptions = {
from: process.env.EMAIL,
to: 'dr.maher8496@gmail.com',
subject: 'Team Notification',
text:'Next match is on May 3!'
};

transporter.sendMail(mailOptions, function(err, data){
    if (err){
      console.error('❌ Email failed:', err);
    } else {
      console.log('✅ Email sent:', data.response);
    }
  });
  