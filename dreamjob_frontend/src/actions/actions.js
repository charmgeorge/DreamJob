import dispatcher from '../dispatchers/dispatcher';
import userStore from '../stores/UserStore';
import jobStore from '../stores/jobStore'

var APIURL
if(process.env.NODE_ENV === 'production'){
  APIURL = '/'
} else {
  APIURL = "http://localhost:4000/"
}

console.log('api', APIURL)

export function checkLoginRedir(props){
  let currentUser = userStore.getUser()

  if(currentUser === null){
    props.history.push("/login")
    return false
  }
  return true
}

export function userLogout(){
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
  fetch(APIURL + 'create_user', params).then((response)=>{
      success = response.ok
      return response.json()
    })
    .then((body)=>{
      if (success){
        dispatcher.dispatch({
          type: "NEW_USER",
          user: body
        })
        console.log("success!", body)
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
  fetch( APIURL +'login_user', params)
    .then((response)=>{
      success = response.ok
      return response.json()
    })
    .then((body)=>{
      if (success){
        dispatcher.dispatch({
          type: "LOGIN_USER",
          user: body.User
        })
        console.log("success!", body.User)
      }
      else {
        console.log("failure!", body.User)
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
  fetch(APIURL + 'update_job_details/' + attributes.job.id, params).then((response)=>{
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
  fetch(APIURL + "deleteJob/" + jobId, params).then(function(response){
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

export function getDetails(jobId){
  const params = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
  }
  fetch(APIURL + "getDetails/" + jobId, params).then(function(response){
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
  let theUrl = APIURL + "jobs?authToken=" + currentUser.authToken
  fetch(theUrl, params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        dispatcher.dispatch({
          type: 'UPDATE_JOBS',
          jobs: body.jobs
        })
      })
    }
  }).catch(function(error){
    console.log('error', error);
  })
}

export function createJob(attributes){

  let currentUser = userStore.getUser()
  console.log('in createJob ', currentUser);
  if(currentUser){
    attributes.authToken = currentUser.authToken,
    attributes.email = currentUser.email
  }

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(attributes)
  }
  fetch(APIURL + 'create_job', params).then((response)=>{
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
