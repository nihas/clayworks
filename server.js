var express    = require("express");
var login = require('./routes/loginroutes');
var admin = require('./routes/adminroutes');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(session({
    secret: 'keyboard cat'
  }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.set('views', './admin');
app.engine('html', require('ejs').renderFile);

var router = express.Router();
// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
        // res.render('index.html', { title: 'Hello - Please Login To Your Account' });
});

router.post('/admin', function(req, res) {
        login.login(req,res);
});

router.get('/admin', function(req, res) {

    if(req.session.email){
        res.redirect('admin/dashboard');
        admin.dashboard(req,res);
    }else{
        res.render('index.html', { title: 'Hello - Please Login To Your Account' });
    }
});
router.get('/admin/register', admin.register);
router.get('/admin/dashboard', admin.dashboard);

//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login)
app.use('/', router);
//for putting public css
app.use(express.static('public'));
//session

app.listen(5000);