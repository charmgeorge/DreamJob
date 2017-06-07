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
      this.props.history.push("/")
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
                  </div>

                  <h3>Register</h3>
                  <form className='form'
                    onSubmit={this.handleSubmit.bind(this)}>
                    <div className='row'>
                      <div className='col-xs-12'>
                        <div>
                          <label htmlFor='name'>First Name</label>
                          <br />
                          <input
                            type='text'
                            name='firstname'
                            value={this.state.user.firstname}
                            onChange={this.handleChange.bind(this)}

                            // pass in errors for this input
                            errors={this.state.errors.firstname}
                          />
                        </div>
                        <div>
                          <label>Last Name</label>
                          <br />
                          <input
                            type='text'
                            name='lastname'
                            value={this.state.user.lastname}
                            onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div>
                          <label>Email</label>
                          <br />
                          <input
                            type='text'
                            name='email'
                            value={this.state.user.email}
                            onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div>
                          <label>Password</label>
                          <br />
                          <input
                            type='password'
                            name='password'
                            value={this.state.user.password}
                            onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div>
                          <br />
                        </div>
                      </div>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterUser;
