import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import userStore from '../stores/UserStore';
import { getUserDetails} from '../actions/actions';

class UserCP extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: this.props.user, // userStore.getUser(),
      // userData: getUserDetails(this.props.user.email), // call to userStore here and get name, etc
      // userInfo: null
    }
    //
    // getUserDetails(this.state.currentUser.email);
    // console.log('this user is', this.state.currentUser.email);
    // console.log('the props here', this.props);
  }
  // check if user
  // componentDidMount(){
  //   if (!this.state.currentUser) { // probably won't happen
  //     this.props.history.push("/");
  //   } else {
  //     this.setState({
  //       userData: getUserDetails(this.props.user.email)
  //     }, this.getInfo)
  //   }
  // }
  //
  // getInfo() {
  //   this.setState({
  //     userInfo: userStore.getUserData()
  //   })
  //   // console.log('info is', this.state.userInfo);
  // }

    // if (this.state.currentUser) { // probably won't happen
    //   // console.log('nick', this.props.history);
    //   this.getData();
    // }
    // this.setState({ currentUser: userStore.getUser() }, this.getData);
    //  userData: userStore.getUserData()
    // })
    // console.log('aqui', this.state.currentUser);

  // getData() {
  //   if (!this.state.currentUser) { // probably won't happen
  //     this.props.history.push("/");
  //   } else {
  //     this.setState({
  //       userData: getUserDetails(this.state.currentUser.email)
  //     })
  //   }
  // }

  render() {
    // show their image, email, name,
    // console.log('props in usercp', this.state.currentUser.email);
    // const obj =  userStore.getUserData();
    // console.log('coffee', obj);
    // const obj = this.getData();
    // console.log('final userData', this.state.userData);
    return (
      <div className="container">
        {/* <p>{this.userData}</p> */}
        <h3>Welcome to your user control panel:</h3>
        {/* <p>First Name: {this.state.userData && this.state.userData.firstname} </p> */}
        <p>Email: {this.state.currentUser && this.state.currentUser.email}</p>
      </div>
    );
  }
}

export default UserCP;
