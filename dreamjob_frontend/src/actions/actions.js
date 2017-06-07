import dispatcher from '../dispatchers/dispatcher';


export function newUser(userInfo){
  let success;
  const params = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo)
      }
  fetch('http://localhost:3000/create_user', params).then((response)=>{
      success = response.ok
      return response.json()
    })
    .then((body)=>{
      console.log(body);
      if (success){
        console.log('in if statement ', body);
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
  fetch('http://localhost:3000/login_user', params)
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
