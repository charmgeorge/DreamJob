import {EventEmitter} from 'events';
import dispatcher from '../dispatchers/dispatcher';

class UserStore extends EventEmitter{
  constructor(){
    super();
    this.user = null
    this.message = ""
    this.errors = {}
    this.fields = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  }

  updateUser(user){
    this.user = user
    localStorage.setItem('authToken', user.authToken);
    localStorage.setItem('authTokenExpiration', user.authTokenExpiration);
    localStorage.setItem('email', user.email);
    this.emit('login')
  }

  getUser(){
    return this.user
  }
  //cg
  getErrors(){
    // {}
    // or
    // {firstName: 'is requires'}
    return this.errors
  }
  //cg
  validate(){
    this.errors = {}
    this.validatePresence('firstName')
    this.validatePresence('lastName')
    this.validatePresence('email')
    this.validatePresence('password')
    // console.log("the errors", this.errors)
  }

  validatePresence(fieldName){
    if(this.fields[fieldName] === ''){
      this.addError(fieldName, 'is Required')
    }
  }

  // validateEmail(fieldName)

  addError(fieldName, message){
    this.errors[fieldName] = message
  }


  addUser(user){
    this.user = user
    console.log("new user set")
    this.emit('user_created')
  }

  getMessage(){
    return this.message
  }

  setUserFromLocal(){
    let token = localStorage.getItem('authToken')
    let expire = new Date(localStorage.getItem('authTokenExpiration'))
    if(token && expire >= new Date()){
      this.user = {
        authToken: token,
        authTokenExpiration: expire,
        email: localStorage.getItem('email')
      }
      this.emit('login')
    }
  }

  logout(){
    this.user = null
    localStorage.setItem('authToken', null);
    localStorage.setItem('authTokenExpiration', null);
    localStorage.setItem('email', "");
    this.emit('login')
  }

  handleAction(action){
    switch(action.type){
      case("NEW_USER"):{
        this.addUser(action.user);
        break;
      }
      case("LOGOUT"):{
        this.logout()
        break
      }
      case("LOGIN_USER"):{
        this.updateUser(action.user);
        break;
      }
      case("CHECK_LOGIN"):{
        this.setUserFromLocal()
        break
      }
      default:{}
    }
  }
}


const userStore = new UserStore();
window.store = userStore;
dispatcher.register(userStore.handleAction.bind(userStore))
export default userStore;
