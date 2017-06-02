var express = require('express');
var bodyParser = require('body-parser')
var User = require('./models').User
var cors = require('cors')

var app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', function (request, response) {
  response.json({message: 'hello world!'})
});

app.post('/create_user', function(request, response){
  User.create(request.body.user).then((user) => {
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
