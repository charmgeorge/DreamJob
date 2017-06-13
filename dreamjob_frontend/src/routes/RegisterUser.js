import React, { Component } from 'react';
import {newUser} from '../actions/actions';
import userStore from '../stores/UserStore';
import {Panel, Form, FormGroup, Col, ControlLabel, FormControl, Button} from 'react-bootstrap';

class RegisterUser extends Component {
  constructor(props){
    super(props)
    this.state={
      user:{
        firstname:"",
        lastname:"",
        email:"",
        password:""
      },
      message: '',
      errors: {}
    }
  }

  componentWillMount(){
    userStore.on('user_created', ()=> {
      this.props.history.push("/job_index")
    })
  }


  handleChange(e){
    let target = e.target
    let user = this.state.user
    user[target.name]= target.value
    this.setState({
      user: user
    })
  }
//cg
  validate(){
    userStore.validate(this.state.user)
    this.setState({errors: userStore.getErrors()})
  }

  handleSubmit(e){
    e.preventDefault()
    this.validate()
    if(this.isValid()){
      newUser(this.state)
    }
  }

  isValid(){
    return Object.keys(this.state.errors).length === 0
  }

  errorClass(field){
    if(this.state.errors && this.state.errors[field] && this.state.errors[field].length !== 0){
      return 'form-group has-error'
    } else {
      return 'form-group '
    }
  }

  render() {
    return (
      <div>
        <div>
          <Panel className='formSize' header="Register" bsStyle="danger">
            { !this.isValid() &&
              <div className='alert alert-danger'>
                Please verify that all fields are filled in below
              </div>
            }
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup controlId="formHorizontalFirstName">
                <div className={this.errorClass('firstname')}>
                  <Col componentClass={ControlLabel} sm={4}>
                    First Name
                  </Col>
                  <Col sm={4}>
                    <FormControl type='text' name='firstname' value={this.state.user.firstname} onChange={this.handleChange.bind(this)} placeholder="First Name" />
                  </Col>
                </div>
              </FormGroup>

              <FormGroup controlId="formHorizontalLastName">
                <div className={this.errorClass('lastname')}>
                  <Col componentClass={ControlLabel} sm={4}>
                    Last Name
                  </Col>
                  <Col sm={4}>
                    <FormControl type='text' name='lastname' value={this.state.user.lastname} onChange={this.handleChange.bind(this)} placeholder="Last Name" />
                  </Col>
                </div>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <div className={this.errorClass('email')}>

                  <Col componentClass={ControlLabel} sm={4}>
                    Email
                  </Col>
                  <Col sm={4}>
                    <FormControl type='email' name='email' value={this.state.user.email} onChange={this.handleChange.bind(this)} placeholder="email" />
                  </Col>
                </div>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <div className={this.errorClass('password')}>
                  <Col componentClass={ControlLabel} sm={4}>
                    Password
                  </Col>
                  <Col sm={4}>
                    <FormControl type='password' name='password' value={this.state.user.password} onChange={this.handleChange.bind(this)} placeholder="Password" />
                  </Col>
                </div>
              </FormGroup>

              <FormGroup>
                <Col smOffset={4} sm={4}>
                  <Button type="submit">
                    Submit
                  </Button>
                </Col>
              </FormGroup>

            </Form>
          </Panel>
        </div>
      </div>
    );
  }
}

export default RegisterUser;


// <div>
//  <div className='container'>
//    <div className='row'>
//      <div className='col-xs-6 col-xs-offset-3'>
//        <div className='panel panel-default'>
//          <div className='panel-body'>
//            { !this.isValid() &&
//             <div className='alert alert-danger'>
//               Please verify that all fields are filled in below
//             </div>
//           }
//           <h3>Register</h3>
//           <form className='form'
//             onSubmit={this.handleSubmit.bind(this)}>
//             <div className='row'>
//               <div className='col-xs-12'>
//                 <div className={this.errorClass('firstname')}>
//                   <label className='control-label' htmlFor='firstname'>
//                     First Name
//                     <input
//                       type='text'
//                       name='firstname'
//                       value={this.state.user.firstname}
//                       onChange={this.handleChange.bind(this)}
//                       className='form-control'
//                     />
//                     {this.state.errors.firstname}
//                   </label>
//                 </div>
//                 <div className={this.errorClass('lastname')}>
//                   <label className='control-label' htmlFor='lastname'>
//                     Last Name
//                   <br />
//                   <input
//                     type='text'
//                     name='lastname'
//                     value={this.state.user.lastname}
//                     onChange={this.handleChange.bind(this)}
//                     className='form-control'
//                 />
//                     {this.state.errors.lastname}
//                     </label>
//                 </div>
//                 <div className={this.errorClass('email')}>
//                   <label className='control-label' htmlFor='email'>
//                     Email
//                   <br />
//                   <input
//                     type='text'
//                     name='email'
//                     value={this.state.user.email}
//                     onChange={this.handleChange.bind(this)}
//                     className='form-control'
//                   />
//                   {this.state.errors.email}
//                   </label>
//                 </div>
//                 <div className={this.errorClass('password')}>
//                   <label className='control-label' htmlFor='password'>
//                     Password
//                   <br />
//                   <input
//                     type='password'
//                     name='password'
//                     value={this.state.user.password}
//                     onChange={this.handleChange.bind(this)}
//                     className='form-control'
//                   />
//                   {this.state.errors.password}
//                     </label>
//                 </div>
//                 <div>
//                   <br />
//                   <input type='submit' value='Submit' className = 'btn btn-primary' />
//
//                 </div>
//               </div>
//             </div>
//           </form>
//       </div>
//     </div>
//   </div>
// </div>
