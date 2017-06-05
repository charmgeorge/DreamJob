import dispatcher from '../dispatchers/dispatcher';
import userStore from '../stores/UserStore';

export function checkLoginRedir(props){
  let currentUser = userStore.getUser()
  if(currentUser === null){
    props.history.push("/login")
    return false
  }
  return true
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
