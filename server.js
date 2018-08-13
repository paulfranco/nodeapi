var express = require('express');
var app = express();
var bp = require('body-parser');

app.use(bp.json());

app.use(require('../middleware/headers.js'));
app.use(require('../middleware.validate-session'));


app.use('/test', function(req, res){
    res.send("hello world");
});

apps.use('/api/users', require('./routes/users'));
app.listen(3000, function() {
    console.log('app is listening on port 3000');
});