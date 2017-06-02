var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var Job = require('./models').Job

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', function (request, response) {
  response.json({message: 'API Example App'})
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

app.listen(4000, function () {
 console.log('Todo Server listening on port 4000!');
});
