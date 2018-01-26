var mysql      = require('mysql');
var bcrypt = require('bcrypt');
var session = require('express-session');
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
// register
exports.register = function(req,res){
    // console.log("req",req.body);
    var today = new Date();
  bcrypt.hash(req.body.password, 10, function (err, hash){
    if (err) {
      console.log(err);
    }
    console.log("one "+hash);

    var users={
        "name":req.body.name,
        "email":req.body.email,
        "password":hash,
        "created_at":today,
        "modified_at":today
      }
      connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        console.log('The solution is: ', results);
        res.send({
          "code":200,
          "success":"user registered sucessfully"
            });
      }
      });
  })
    
  }

  //login 
  exports.login = function(req,res){
    var email= req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      // console.log('The solution is: ', results);
      if(results.length >0){
        bcrypt.compare( password,results[0].password, function (err, result) {
            if (result === true) {
                //true
                // res.send({
                //     "code":200,
                //     "success":"login sucessfull"
                //       });
                req.session.email=req.body.email;
                console.log(req.session);
                res.redirect('admin/dashboard');
            } else {
                //false
                res.send({
                    "code":204,
                    "success":"Email and password does not match"
                      });
            }
          })
        // if([0].password == password){
        //   res.send({
        //     "code":200,
        //     "success":"login sucessfull"
        //       });
        // }
        // else{
        //   res.send({
        //     "code":204,
        //     "success":"Email and password does not match"
        //       });
        // }
      }
      else{
        res.send({
          "code":204,
          "success":"Email does not exits"
            });
      }
    }
    });
  }