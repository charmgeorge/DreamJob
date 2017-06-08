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

const authorization = function(request, response, next){
  const token = request.query.authToken || request.body.authToken
  if(token){
    User.findOne({
      where: {authToken: token}
    }).then((user)=>{
      if(user){
        request.currentUser = user
        next()
      }else{
        response.status(401)
        response.json({message:'Authorization Token Invalid'})
      }
    })
  }else{
    response.status(401)
    response.json({message: 'Authorization Token Required'})
  }
}

app.get('/', function (request, response) {
  response.json({message: 'hello world!'})
});



/// have error getting id on line 47


app.get('/jobs', function (request, response) {

  // let id = request.currentUser.id;

  console.log('in jobs route', request)
  Job.findAll(
    {
    where: {
      userId:id
    }
  }
)
.then(function(jobs){
    response.status(200)
    response.json({
      status:'success',
      jobs:jobs
    })
  })
  .catch(function(error){
    response.status(400)
    response.json({status:'error', error:error})
  })
})

app.get('/deleteJob/:id', function (request, response) {
 var id = request.params["id"];
  Job.findOne({
    where:{id:id}
  }).then(function(job){
    job.destroy()
  }).then(function(deletedJob){
    response.status(200)
    response.json({
      status:'success',
    })
  })
})

app.get('/getDetails/:id', function (request, response) {
 var id = request.params["id"];
  Job.findOne({
    where:{id:id}
  }).then(function(job){
    response.status(200)
    response.json({
      status:'success',
      job:job
    })
  })
})

app.post('/update_job_details/:id', function (request, response){
  let id = request.params['id'];
  Job.findOne({
    where:{id:id}
  })
  .then(function(job){
    job.update(request.body.job).then(function(update){
      response.status(200)
      response.json({status:'success', job:update})
      console.log('update');
    })
  }).catch(function(error){
    response.status(400)
    response.json({status:'error', error:error})
  })
})

app.post('/create_job', authorization, function (request, response){
  let jobParams = request.body.job
//  userEmail: currentUser.email
  console.log('email is : ' , request.body.email);
  // User.findOne({
  //   where: {email: request.body.email}
  // })
  // .then(function(user) {
  //   debugger
  //   console.log('user is: ', user.id);
  //   return user.id
  // })
  //
  // console.log(jobParams);
  jobParams.userId = request.currentUser.id;
  console.log(request.currentUser.id);
  Job.create(jobParams).then(function(job){
    response.status(200)
    response.json({status:'success', job:job})
  }).catch(function(err){
    response.status(400)
    response.json({status:'error', error:err})
  })
})

app.post('/create_user', function(request, response){
  console.log(request.body.user)
  User.create(request.body.user).then((user) => {
    response.status(200)
    response.json({status:'success', user: user})
  })
  .catch((error)=>{
    response.status(400)
    response.json({
      message:"Could not create User",
      error: error})
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
