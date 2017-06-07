import {EventEmitter} from 'events';
import dispatcher from '../dispatchers/dispatcher';

class UserStore extends EventEmitter{
  constructor(){
    super();
    this.User = null
    this.errors = {}
    this.fields = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  }

  updateUser(User){
    this.User = User
    this.emit('login')
  }

  getUser(){
    return this.User
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

  addUser(User){
    this.User = User
    console.log("new user set")
    this.emit('user_created')
  }

  handleAction(action){
    switch(action.type){
      case("NEW_USER"):{
        console.log(action);
        this.addUser(action.User);
        break;
      }
      case("LOGIN_USER"):{
        console.log(action);
        this.updateUser(action.User);
        break;
      }
      default:{}
    }
  }
}


const userStore = new UserStore();
window.store = userStore;
dispatcher.register(userStore.handleAction.bind(userStore))
export default userStore;
