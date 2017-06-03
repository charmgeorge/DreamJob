import dispatcher from '../dispatchers/dispatcher';


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
        console.log("success!", body.user)
      }
      else {
        console.log("failure!", body.user)
      }
    })
}
