import dispatcher from '../dispatchers/dispatcher';
import jobStore from '../stores/jobStore'

export function newUser(userInfo){
  let success;
  const params = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo)
      }
  fetch('http://localhost:4000/create_user', params)
    .then((response)=>{
      success = response.ok
      return response.json()
    })
    .then((body)=>{
      if (success){
        dispatcher.dispatch({
          type: "NEW_USER",
          user: body.user
        })
        console.log("success!", body.user)
      }
      else {
        console.log("failure!", body.user)
      }
    })
}

export function updateJobDetails(attributes){
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(attributes)
  }
  fetch('http://localhost:4000/update_job_details/' + attributes.job.id, params).then((response)=>{
    debugger
    if(response.ok){
      response.json().then((body)=>{
        dispatcher.dispatch({
          type: 'UPDATE_JOB_DETAILS',
          job: body.job
        })
      })
    }
  }).catch(function(err){
    debugger
      jobStore.updateMessage("There was an error: " + err)
  })
}

export function getDetails(jobId){
  const params = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
  }
  fetch("http://localhost:4000/getDetails/" + jobId, params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        dispatcher.dispatch({
          type: 'GET_DETAILS',
          job: body.job
        })
      })
    }
  }).catch(function(err){
      jobStore.updateMessage("There was an error: " + err)
  })
}

export function updateJobs(){
  const params = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
  }
  fetch("http://localhost:4000/jobs", params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        dispatcher.dispatch({
          type: 'UPDATE_JOBS',
          jobs: body.jobs
        })
      })
    }
  }).catch(function(error){
  })
}

export function createJob(attributes){
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(attributes)
  }
  fetch('http://localhost:4000/create_job', params).then((response)=>{
    if(response.ok){
      response.json().then((body)=>{
        dispatcher.dispatch({
          type: 'CREATE_JOB',
          job: body.job
        })
      })
    }
  }).catch(function(err){
      jobStore.updateMessage("There was an error: " + err)
  })
}
