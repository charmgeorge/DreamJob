var express = require('express');
var bodyParser = require('body-parser')
var Job = require('./models').Job
var User = require('./models').User
var cors = require('cors')

var app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', function (request, response) {
  response.json({message: 'hello world!'})
});

app.post('/create_job', function (request, response){
  let jobParams = request.body.job
  Job.create(jobParams).then(function(job){
    response.status(200)
    response.json({status:'success', job:job})
  }).catch(function(err){
    response.status(400)
    response.json({status:'error', error:err})
  })
})

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

app.post('/login_user', function(request, response){
  User.findOne({where: { email: request.body.user.email }}).then((user) => {
    if(user){
      response.status(200)
      response.json({status:'success', user: user })
      console.log('user = ', user);
    } else {
      response.status(401)
      response.json({status: 'error', error: 'Could not log in' })
    }
  })
  .catch((error)=>{
    response.status(400)
    response.json({status: 'error', error: 'Could not log in'})
  })
})

app.listen(4000, function () {
 console.log('Todo Server listening on port 4000!');
});
