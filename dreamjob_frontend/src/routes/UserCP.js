import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import userStore from '../stores/UserStore';
import { getUserDetails} from '../actions/actions';

class UserCP extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: userStore.getUser(),
      userData: null // call to userStore here and get name, etc
    }
    //
    getUserDetails(this.state.currentUser.email);
    console.log('this user is', this.state.currentUser.email);
  }
  // check if user
  componentDidMount(){
    if (!this.state.currentUser) { // probably won't happen
      // console.log('nick', this.props.history);
      this.props.history.push("/");
    }
    this.setState({
     userData: userStore.getUserData()
    })
    console.log('aqui', this.state.userData);
  }
  render() {
    // show their image, email, name,
    // console.log('props in usercp', this.state.currentUser.email);
    const obj =  userStore.getUserData();
    console.log('coffee', obj);
    console.log('final userData', this.state.userData);
    return (
      <div>
        {/* <p>{this.userData}</p> */}
        <p>hey user // firstName, lastname, email, pic, email</p>
        <p>First Name: {obj && obj.firstname} </p>
        <p>Email: {this.state.currentUser && this.state.currentUser.email}</p>
      </div>
    );
  }
}

export default UserCP;
