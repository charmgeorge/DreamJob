import dispatcher from '../dispatchers/dispatcher';
import userStore from '../stores/UserStore';
import jobStore from '../stores/JobStore'

export function sort(attribute){
  const params = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
  }

  // let theUrl = "http://localhost:4000/jobs?authToken=" + currentUser.authToken
  let currentUser = userStore.getUser()
  let theUrl = "http://localhost:4000/sort/" + attribute + "?authToken=" + currentUser.authToken;

  fetch(theUrl, params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        dispatcher.dispatch({
          type: 'SORT_JOBS',
          jobs: body.jobs
        })
      })
    }
  }).catch(function(err){
      jobStore.updateMessage("There was an error: " + err)
  })
}

export function checkLoginRedir(props){
  let currentUser = userStore.getUser()
  if(currentUser === null){
    props.history.push("/login")
    return false
  }
  return true
}

export function userLogout(){
  debugger;
  dispatcher.dispatch({
    type: "LOGOUT"
  })
}

export function checkLogin(){
  dispatcher.dispatch({
    type: 'CHECK_LOGIN'
  })
}

export function newUser(userInfo){
  let success;
  const params = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo)
      }
  fetch('http://localhost:4000/create_user', params).then((response)=>{
      success = response.ok
      return response.json()
    })
    .then((body)=>{
      if (success){
        dispatcher.dispatch({
          type: "NEW_USER",
          user: body.user
        })
      }
      else {
        console.log("failure!", body)
      }
    })
}

export function loginUser(userInfo){
  let success;
  const params = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo)
      }
  fetch('http://localhost:4000/login_user', params)
    .then((response)=>{
      success = response.ok
      return response.json()
    })
    .then((body)=>{
      if (success){
        dispatcher.dispatch({
          type: "LOGIN_USER",
          user: body.user
        })
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
    if(response.ok){
      response.json().then((body)=>{
        dispatcher.dispatch({
          type: 'UPDATE_JOB_DETAILS',
          job: body.job
        })
      })
    }
  }).catch(function(err){
      jobStore.updateMessage("There was an error: " + err)
  })
}

export function deleteJob(jobId){
  const params = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
  }
  fetch("http://localhost:4000/deleteJob/" + jobId, params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        dispatcher.dispatch({
          type: 'DELETE_JOB',
        })
      })
    }
  }).catch(function(err){
      jobStore.updateMessage("There was an error: " + err)
  })
}

export function glassdoorDetails(company){
  const params = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
  }
  fetch("http://localhost:4000/glassdoor/" + company, params).then(function(response){
    if(response.status === 200){
      response.json().then(function(data){
        dispatcher.dispatch({
          type: 'GLASSDOOR',
          data: data
        })
      })
    }else{
      jobStore.updateMessage("Couldn't find the company in Glassdoor")
    }
  })
  .catch(function(err){
      jobStore.updateMessage("Couldn't find the company in Glassdoor")
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
  let currentUser = userStore.getUser()
  const params = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }

  let theUrl = "http://localhost:4000/jobs?authToken=" + currentUser.authToken
  fetch(theUrl, params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        dispatcher.dispatch({
          type: 'UPDATE_JOBS',
          jobs: body.jobs
        })
      })
    }
  }).catch(function(err){
    jobStore.updateMessage("There was an error: " + err)
  })
}

export function createJob(attributes){

  let currentUser = userStore.getUser()
  if(currentUser){
    attributes.authToken = currentUser.authToken
    attributes.email = currentUser.email
  }

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


export function researchJob(searchDetails){
  const params = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
  }

  let job = searchDetails.job;
  let location = searchDetails.location;

  fetch("http://localhost:4000/job_research/" + job + "/" + location, params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        dispatcher.dispatch({
          type: 'JOB_DETAILS',
          body: body
        })
      })
    }
  }).catch(function(err){
      jobStore.updateMessage("There was an error: " + err)
  })
}
