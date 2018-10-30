var express = require('express')

var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const port = 3000
var router = express.Router();
var app = express()

 
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
 
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
 
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/me', function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, "config6556575757", function(err, decoded) {
   if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    res.status(200).send({ auth: true, username:"Ravi Saxena"});
  });
});



app.post('/login', function(req, res) {
	//console.log(req);
	//if (req.body.email==undefined) return res.status(404).send('No user found.');
 	//var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    var passwordIsValid=true;
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: 101 }, "config6556575757", {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  /*User.findOne({ email: req.body.email }, 
  	function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    passwordIsValid=true;
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });*/

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))