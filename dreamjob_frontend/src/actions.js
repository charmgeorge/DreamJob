import Dispatcher from './Dispatcher'
import jobStore from './stores/jobStore'

export function updateJobs(){
  const params = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
  }
  fetch("http://localhost:4000/jobs", params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        Dispatcher.dispatch({
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
        Dispatcher.dispatch({
          type: 'CREATE_JOB',
          job: body.job
        })
      })
    }
  }).catch(function(err){
      jobStore.updateMessage("There was an error: " + err)
  })
}
