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
      User:{
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
    userStore.on('User_created', ()=> {
      this.props.history.push("/")
    })
  }

  handleChange(e){
    let target = e.target
    //target.name is the properties of cat??? what is target.value?
    let User = this.state.User
    User[target.name]= target.value
    this.setState({
      User: User
    })
  }
//cg
  validate(){
    userStore.validate()
    this.setState({errors: userStore.getErrors()})
  }

  handleSubmit(e){
    e.preventDefault()
    this.validate()
    console.log('handle submit with state: ', this.state);
    newUser(this.state)
  }

  isValid(){
    return Object.keys(this.state.errors).length === 0
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
                  <form className='form' onSubmit={this.handleSubmit.bind(this)}>
                    <div className='row'>
                      <div className='col-xs-12'>
                        <div>
                          <label htmlFor='name'>First Name</label>
                          <br />
                          <input
                            type='text'
                            name='firstname'
                            value={this.state.User.firstname}
                            onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div>
                          <label>Last Name</label>
                          <br />
                          <input
                            type='text'
                            name='lastname'
                            value={this.state.User.lastname}
                            onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div>
                          <label>Email</label>
                          <br />
                          <input
                            type='text'
                            name='email'
                            value={this.state.User.email}
                            onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div>
                          <label>Password</label>
                          <br />
                          <input
                            type='password'
                            name='password'
                            value={this.state.User.password}
                            onChange={this.handleChange.bind(this)}/>
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
