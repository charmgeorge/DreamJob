import {EventEmitter} from 'events';
import dispatcher from '../dispatchers/dispatcher';

class UserStore extends EventEmitter{
  constructor(){
    super();
    this.user = null,
    this.message = ""
  }

  updateUser(user){
    this.user = user
    localStorage.setItem('authToken', user.authToken);
    localStorage.setItem('authTokenExpiration', user.authTokenExpiration);
    localStorage.setItem('email', user.email);
    this.emit('login')
  }

  getUser(){
    console.log(this.user);
    return this.user
  }

  getMessage(){
    return this.message
  }

  addUser(user){
    this.user = user
    console.log("new user set")
    this.emit('user_created')
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

  handleAction(action){
    switch(action.type){
      case("NEW_USER"):{
        console.log(action);
        this.addUser(action.user);
        break;
      }
      case("LOGIN_USER"):{
        console.log(action);
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
