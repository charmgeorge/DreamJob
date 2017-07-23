import dispatcher from '../dispatchers/dispatcher';
import userStore from '../stores/UserStore';
import jobStore from '../stores/JobStore'
// import axios from 'axios';

var apiUrl
if(process.env.NODE_ENV === 'production'){
  apiUrl = "/";
} else {
  apiUrl = "http://localhost:4000/";
};
console.log(process.env)
console.log('api is ', apiUrl)

export function sort(attribute){
  const params = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
  }

  // let theUrl = "http://localhost:4000/jobs?authToken=" + currentUser.authToken
  let currentUser = userStore.getUser()
  let theUrl = apiUrl + "sort/" + attribute + "?authToken=" + currentUser.authToken;

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
  fetch(apiUrl + 'create_user', params).then((response)=>{
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
  fetch(apiUrl + 'login_user', params)
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
  fetch(apiUrl + 'update_job_details/' + attributes.job.id, params).then((response)=>{
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
  fetch(apiUrl + 'deleteJob/' + jobId, params).then(function(response){
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
  fetch(apiUrl + 'glassdoor/' + company, params).then(function(response){
    if(response.status === 200){
      response.json().then(function(data){
        dispatcher.dispatch({
          type: 'GLASSDOOR',
          data: data
        })
      })
    }else{
      dispatcher.dispatch({
        type: 'GLASSDOOR_NOTFOUND',
        err: 'Company not found on Glassdoor'
      })
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
  fetch(apiUrl + 'getDetails/' + jobId, params).then(function(response){
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

  let theUrl = apiUrl + 'jobs?authToken=' + currentUser.authToken
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
  fetch(apiUrl + 'create_job', params).then((response)=>{
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

//   axios.get(  `https://api.glassdoor.com/api/api.htm?t.p=157533&t.k=cE2dvplWMTK&userip=12.46.197.130&useragent=&format=json&v=1&action=jobs-stats&q=${job}&l=${location}&returnStates=true&returnJobTitles=true&returnEmployers=true&admLevelRequested=1`, { headers: {'Content-Type': 'application/json'}} ).then(res => {
//     console.log(res);
//   })

  // fetch(`http://api.glassdoor.com/api/api.htm?t.p=157533&t.k=cE2dvplWMTK&userip=12.46.197.130&useragent=&format=json&v=1&action=jobs-stats&q=${job}&l=${location}&returnStates=true&returnJobTitles=true&returnEmployers=true&admLevelRequested=1`, params).then((data)=>{
  //     return data.json()
  //   })
  //   .then((body)=>{
  //     console.log(body);
  //     // response.json({
  //     //   jobs: body.response.jobTitles,
  //     //   companies: body.response.employers
  //     // })
  //   })
  //   .catch((error) => {
  //     console.log('error', error);
  //     // response.json({
  //     //   error: error
  //     // })
  //   })

  fetch(apiUrl + "job_research/" + job + "/" + location, params).then(function(response){
  // leave for nick (in development) ??? eric
  // let url = "http://localhost:4000/job_research?job=" + job + "&location=" + location;
  // fetch(url, params).then(function(response){

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
  });
}

//
// export function compareCompanies(searchDetails){
//   const params = {
//       method: 'GET',
//       headers: {'Content-Type': 'application/json'}
//   }
//
//   let companyOne = searchDetails.companyOne;
//   let companyTwo = searchDetails.companyTwo;
//
//   fetch("http://localhost:4000/job_research/" + job + "/" + location, params).then(function(response){
//     if(response.status === 200){
//       response.json().then(function(body){
//         dispatcher.dispatch({
//           type: 'JOB_DETAILS',
//           body: body
//         })
//       })
//     }
//   }).catch(function(err){
//       jobStore.updateMessage("There was an error: " + err)
//   })
// }
