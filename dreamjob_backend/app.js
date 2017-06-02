var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var User = require('./models').User

app.use(express.static('public'))
app.use(bodyParser.json())



app.get('/', function (request, response) {
  response.json({message: 'API Example App'})
});

app.post('/create_user', function(request, response){
  let userParams = request.body.user
  User.create(userParams).then((user) => {
    response.status(200)
    response.json({status:'success', user: user})
  })
  .catch((error)=>{
    response.status(400)
    response.json({status: 'error', error: error})
  })
})

app.listen(4000, function () {
 console.log('Todo Server listening on port 4000!');
});
