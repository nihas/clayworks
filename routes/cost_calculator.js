var mysql      = require('mysql');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'clayworks'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nihasnizar@gmail.com',
      pass: 'Monu@8669'
    }
  });

  var mailOptions = {
    from: 'nihasnizar@gmail.com',
    to: 'nihas@intellicar.in',
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
  };

// home
exports.home = function(req,res){
    // console.log(req.session.email);
    // if(req.session.email){
        res.render('index.html', { title: 'Hello - Please Login To Your Account' });
    // }else{
        // dashboard(req,res);
    // }
}

exports.sendMail = function(req,res){
    // res.redirect('dashboard');
    // res.render('dashboard.html', { title: 'Hello - Please Login To Your Account' });
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

exports.register = function(req,res){
    res.render('index.html', { title: 'Hello - Please Login To Your Account' });
}
