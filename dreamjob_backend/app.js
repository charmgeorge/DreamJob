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

app.get('/jobs', function (request, response) {
  Job.findAll().then(function(jobs){
    response.status(200)
    response.json({
      status:'success',
      jobs:jobs
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

//TODO UPDATING RECORDS IN DB
  .then(function(job){
    console.log("before", job);
    job.update({
      job:request.body.job


    }).then(function(update){
      response.status(200)
      response.json({status:'success', job:update})
      console.log('update');
    })
  }).catch(function(error){
    response.status(400)
    response.json({status:'error', error:error})
  })
})


  //   job:request.body.job
  //   return job.save()
  // })
  // .catch(function(error){
  //   response.status(400)
  //   response.json({status:'error', error:error})
  // })
  // })



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

app.listen(4000, function () {
 console.log('Todo Server listening on port 4000!');
});
