import React, { Component } from 'react';
import userStore from '../stores/UserStore';

// const UserCP = ({state}) => (
//  <div>
//    <h1>hello, world</h1>
//    {/* {`Hi ${state.email}`} */}
//  </div>
// );

class UserCP extends Component {
  constructor(props){
    super(props)
    this.state = {
      userInfo: userStore.getFields()
    }
  }
  render(){
    console.log('the user info is, ', this.state);
    return(
      <div>
        <h1>hello, world</h1>
        <p>{this.state.userInfo.firstname}</p>
        <p>{this.state.userInfo.lastname}</p>
        <Image src={this.state.userInfo.imageUrl} alt={this.state.userInfo.firstname} />

      </div>
    )
  }
}

export default UserCP;
