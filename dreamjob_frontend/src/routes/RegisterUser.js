import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {newUser} from '../actions/actions';
import userStore from '../stores/UserStore';
// import '../App.css'


class RegisterUser extends Component {
  constructor(props){
    super(props)
    //the initial state of the website
    this.state={
      user:{
        firstName:"",
        lastName:"",
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
    //target.name is the properties of cat??? what is target.value?
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
    newUser(this.state)
  }

  isValid(){
    debugger;
    return Object.keys(this.state.errors).length === 0
  }

  errorClass(field){
    if(this.state.errors && this.state.errors[field] && this.state.errors[field].length != 0){
      return 'form-group has-error'
    } else {
      return 'form-group '
    }
  }

  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-6 col-xs-offset-3'>
              <div className='panel panel-default'>
                <div className='panel-body'>
                  { !this.isValid() &&
                    <div className='alert alert-danger'>
                      Please verify that all fields are filled in below
                    </div>
                  }
                  <h3>Register</h3>
                  <form className='form'
                    onSubmit={this.handleSubmit.bind(this)}>
                    <div className='row'>
                      <div className='col-xs-12'>
                        <div className={this.errorClass('firstName')}>
                          <label className='control-label' htmlFor='firstName'>
                            First Name
                            <input
                              type='text'
                              name='firstName'
                              value={this.state.user.firstname}
                              onChange={this.handleChange.bind(this)}
                              className='form-control'
                            />
                            {this.state.errors.firstName}
                          </label>
                        </div>
                        <div className={this.errorClass('lastName')}>
                          <label className='control-label' htmlFor='lastName'>
                            Last Name
                          <br />
                          <input
                            type='text'
                            name='lastName'
                            value={this.state.user.lastname}
                            onChange={this.handleChange.bind(this)}
                            className='form-control'
                        />
                            {this.state.errors.lastName}
                            </label>
                        </div>
                        <div className={this.errorClass('email')}>
                          <label className='control-label' htmlFor='email'>
                            Email
                          <br />
                          <input
                            type='text'
                            name='email'
                            value={this.state.user.email}
                            onChange={this.handleChange.bind(this)}
                            className='form-control'
                          />
                          {this.state.errors.email}
                          </label>
                        </div>
                        <div className={this.errorClass('password')}>
                          <label className='control-label' htmlFor='password'>
                            Password
                          <br />
                          <input
                            type='password'
                            name='password'
                            value={this.state.user.password}
                            onChange={this.handleChange.bind(this)}
                            className='form-control'
                          />
                          {this.state.errors.password}
                            </label>
                        </div>
                        <div>
                          <br />
                          <input type='submit' value='Submit' className = 'btn btn-primary' />

                        </div>
                      </div>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default RegisterUser;
