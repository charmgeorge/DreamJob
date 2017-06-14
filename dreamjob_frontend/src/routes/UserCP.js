import React, { Component } from 'react';


const UserCP = ({state}) => (
 <div>
   <h1>hello, world</h1>
   {`Hi ${state.email}`}
 </div>
);

// class UserCP extends Component {
//
//   render(){
//     return(
//       <h1>hello, world</h1>
//     )
//   }
// }

export default UserCP;
