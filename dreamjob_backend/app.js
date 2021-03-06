var express = require('express');
var bodyParser = require('body-parser')
var Job = require('./models').Job
var User = require('./models').User
// var cors = require('cors')
const nodemailer = require('nodemailer');  //https://nodemailer.com/about/
var path = require('path')
var imagesUpload = require('images-upload-middleware').default;
var app = express();

const PORT = process.env.PORT || 4000;
var corsPrefetch = require('cors-prefetch-middleware').default

var fetch = require('node-fetch');  //https://www.npmjs.com/package/node-fetch

// pam AIzaSyB7eSxUSTleTHCiujx3iuXXvIwiuWc1jEQ


var Glassdoor = require('node-glassdoor').initGlassdoor({
    partnerId: 157533,
    partnerKey: "cE2dvplWMTK"
});

// const corsOptions = {
//   origin: 'http://localhost:3000'
// }

// app.use(cors())
app.use(corsPrefetch)
app.use(bodyParser.json())

// best way to handle the files??? eric
var apiUrl
if(process.env.NODE_ENV === 'production'){
  apiUrl = "/";
} else {
  apiUrl = "http://localhost:4000/";
};
console.log('backend app.js', apiUrl);

app.post('/files', imagesUpload(
  './public/images',
  `${apiUrl}images`))
  // 'http://localhost:4000/images'))

// error here with the path?  where is dreamjob_frontend/build ??? (got moved I think) ???nick
app.use(express.static(path.resolve(__dirname, '../dreamjob_frontend/build')));


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

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'welcome.dreamjob@gmail.com',
        pass: 'bangfalse'
    }
});

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
// fetch("http://localhost:4000/job_research?job=" + job + "&location=" + location, params).then(function(response){

//     });

/*
  make "almost duplicate" route as below (or make a general that can work for both companies/jobs)
  http://api.glassdoor.com/api/api.htm?t.p=157533&t.k=cE2dvplWMTK&userip=12.46.197.130&useragent=&format=json&v=1&action=jobs-stats&q=engineer&l=memphis&returnStates=true&returnJobTitles=true&returnEmployers=true&admLevelRequested=1
*/

app.get('/job_research/:job/:location', function (request, response) {
  let job = request.params['job'];
  let location = request.params['location'];

  fetch(`http://api.glassdoor.com/api/api.htm?t.p=157533&t.k=cE2dvplWMTK&userip=12.46.197.130&useragent=&format=json&v=1&action=jobs-stats&q=${job}&l=${location}&returnStates=true&returnJobTitles=true&returnEmployers=true&admLevelRequested=1`).then((response)=>{
      return response.json()
    })
    .then((body)=>{
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
    // send email
    let mailOptions = {
        from: '"Dream Job" <welcome.dreamjob+100@gmail.com>',
        to: `${request.body.user.email}`,
        subject: 'Welcome to Dream Job!',
        text: 'Hello and welcome from the team at DreamJob!',
        html: '<h1>Welcome!</h1><p>Thanks for joining our site <a href="https://bangfalse.herokuapp.com/">Dream Job</a>.</p><We hope you enjoy the application we built!</p></br><p>Thanks,</p></br><p> Your friends at Dream Job</p>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

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

app.get('/user_data/:email', function(req, res){
  const email = req.params.email;
  // console.log('this', email);
  User.findOne({ where: { email: email }}).then((user) => {
    if (user) {
      res.status(200);
      // console.log('user_data', user);
      res.json({ user: user });
    } else {
      res.status(404);
      res.json({ status: 'error', error: 'could not find user' })
    }
  })
})

app.post('/login_user', function(request, response){
  User.findOne({where: { email: request.body.user.email }}).then((user) => {
    if(user){
      // console.log('found user');
      // check the password and return 200 & the user if valid
     if(user.verifyPassword(request.body.user.password)){
      //  console.log('checked and passed');
       response.status(200)
       response.json({status: 'success', user: user})
     } else {
      //  console.log('checked and failed');
       response.status(401)
       response.json({status: 'error', error: 'could not log in'})
     }
      // console.log('user is: ', user);
      // response.status(200)
      // response.json({status:'success', user: user })
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

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../dreamjob_frontend/build', 'index.html'));
});

app.listen(PORT, function () {
 console.log(`Server listening on port ${PORT}!`);
});
