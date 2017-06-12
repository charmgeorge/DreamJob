import {EventEmitter} from 'events';
import dispatcher from '../dispatchers/dispatcher';
import { updateJobs } from '../actions/actions';

class UserStore extends EventEmitter{
  constructor(props){
    super(props)
    this.user = null
    this.message = ""
    // this.errors = {} moving to new line per Antonios code ex
    this.fields = {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    }
    this.errors = {}
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

  getErrors(){
    // {}
    // or
    // {firstname: 'is requires'}
    return this.errors
  }
  //cg
  validate(fields){
    this.fields = fields
    this.errors = {}
    this.validatePresence('firstname')
    this.validatePresence('lastname')
    this.validatePresence('email')
    this.validatePresence('password')
    this.validateEmail('email')
    this.validatePassword('password')
    // I added validatePassword to set password params
  }

  validatePresence(fieldName){
    if(this.fields[fieldName] === ''){
      this.addError(fieldName, 'is Required')
    }
  }

  validateEmail(fieldName){
    const filter = /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/
    if(!filter.test(this.fields[fieldName])){
      this.addError(fieldName, 'is not a valid email address')
    }
  }


  validatePassword(fieldName){
    const filter = /\d+/

    if((this.fields[fieldName].length > 6 )&&
    (filter.test(this.fields[fieldName]))&&
    (!this.fields[fieldName].includes("$"))&&
    (!this.fields[fieldName].includes("*"))){

    }else{
      this.addError(fieldName, 'is not a valid password')
    }
  }

  addError(fieldName, message){
    this.errors[fieldName] = message
  }


  addUser(user){
    this.user = user
    localStorage.setItem('authToken', user.authToken);
    localStorage.setItem('authTokenExpiration', user.authTokenExpiration);
    localStorage.setItem('email', user.email);
    this.emit('user_created')
    this.emit('login')
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
      updateJobs()
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
