import {EventEmitter} from 'events';
import dispatcher from '../dispatchers/dispatcher';

class UserStore extends EventEmitter{
  constructor(){
    super();
    this.user = null
    this.newUser = {}
  }

  getNewUser(){
    return this.newUser;
  }

  updateUser(user){
    this.user = user
  }

  getUser(){
    return this.user
  }

  addUser(user){
    this.newUser = user
    console.log("new user set")
    this.users.push(user)
    this.emit('user_created')
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
      default:{}
    }
  }
}


const userStore = new UserStore();
window.store = userStore;
dispatcher.register(userStore.handleAction.bind(userStore))
export default userStore;
