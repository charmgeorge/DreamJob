var express = require('express');
var bodyParser = require('body-parser')
var Job = require('./models').Job
var User = require('./models').User
var cors = require('cors')
var app = express();

var fetch = require('node-fetch');  //https://www.npmjs.com/package/node-fetch


var Glassdoor = require('node-glassdoor').initGlassdoor({
    partnerId: 157533,
    partnerKey: "cE2dvplWMTK"
});

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

app.get('/jobs', authorization, function (request, response) {
  let id = request.currentUser.id ;
  Job.findAll(
    {
    where: {
      userId:id
    }
  }).then(function(jobs){
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

var direction = true;
app.get('/sort/:attribute', authorization, function (request, response) {
  let attribute = request.params["attribute"];
  let id = request.currentUser.id ;

  if (direction === true){
    sort = 'ASC'
    direction = !direction
  } else{
    sort = 'DESC'
    direction = !direction
  }

  Job.findAll({where: {userId:id}, order: [[attribute, sort]] })
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

app.get('/glassdoor/:company', function (request, response) {
  let company = request.params['company'];
  Glassdoor.findOneCompany(company,{country:""}).then(function (data) {
      if(Object.keys(data).length === 0){
        response.status(400)
        response.json({error:err});
      } else {
        response.json({
          data:data
        })
      }
    })
      .catch(function (err) {
          response.status(400)
          response.json({error:err});
      });
});

// nicks stuff for the research route:  will delete upon completion
// defaultCompanyURL = `http://api.glassdoor.com/api/api.htm?t.p=5317&
// t.k=n07aR34Lk3Y&
// userip=0.0.0.0&
// useragent=&
// format=json&
// v=1&
// action=jobs-stats&
// q=bank&
// l=sacramento&
// returnStates=true&
// admLevelRequested=1
//
//
// var ip = 12.46.197.130;
//
// pId = 157533;
// pKey = "cE2dvplWMTK";
// var companyURL = `http://api.glassdoor.com/api/api.htm?t.p=157533&t.k=cE2dvplWMTK&userip=12.46.197.130&useragent=&format=json&v=1&action=jobs-stats&q=web+developer&l=sacramento&returnStates=true&returnJobTitles=true&returnEmployers=true&admLevelRequested=1`

app.get('/job_research/:job/:location', function (request, response) {
  let job = request.params['job'];
  let location = request.params['location'];

  fetch(`http://api.glassdoor.com/api/api.htm?t.p=157533&t.k=cE2dvplWMTK&userip=12.46.197.130&useragent=&format=json&v=1&action=jobs-stats&q=${job}&l=${location}&returnStates=true&returnJobTitles=true&returnEmployers=true&admLevelRequested=1`).then((response)=>{
      return response.json()
    })
    .then((body)=>{
      // console.log("success!", body.status)
      response.json({
        jobs: body.response.jobTitles,
        companies: body.response.employers
      })
    })
    .catch((error) => {
      console.log('error', error);
      response.json({
        error: error
      })
    })
})

app.get('/', function (request, response) {
  Glassdoor.findOneCompany('microsoft',{country:""}).then(function (data) {
    response.json({
      data:data
    })
  })
});

app.post('/update_job_details/:id', function (request, response){
  let id = request.params['id'];
  Job.findOne({
    where:{id:id}
  })
  .then(function(job){
    job.update(request.body.job).then(function(update){
      response.status(200)
      response.json({status:'success', job:update})
    })
  }).catch(function(error){
    response.status(400)
    response.json({status:'error', error:error})
  })
})

app.post('/create_job', authorization, function (request, response){
  let jobParams = request.body.job

  jobParams.userId = request.currentUser.id;
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
