var mysql      = require('mysql');
var bcrypt = require('bcrypt');
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
// home
exports.home = function(req,res){
    // console.log(req.session.email);
    // if(req.session.email){
        res.render('index.html', { title: 'Hello - Please Login To Your Account' });
    // }else{
        // dashboard(req,res);
    // }
}

exports.dashboard = function(req,res){
    // res.redirect('dashboard');
    res.render('dashboard.html', { title: 'Hello - Please Login To Your Account' });
}

exports.register = function(req,res){
    res.render('index.html', { title: 'Hello - Please Login To Your Account' });
}
