import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {newUser} from '../actions/actions';
import userStore from '../stores/UserStore';

class Login extends Component {
  constructor(props){
    super(props)
    //the initial state of the website
    this.state={
      user:{
        email:"",
        password:""
      },
      message: ''
    }
  }
  //
  // componentWillMount(){
  //   userStore.on('user_created', ()=> {
  //     this.props.history.push("/")  //job_index
  //   })
  // }

  handleChange(e){
    let target = e.target
    //target.name is the properties of cat??? what is target.value?
    let user = this.state.user
    user[target.name]= target.value
    this.setState({
      user: user
    })
  }
  handleSubmit(e){
    e.preventDefault()
    console.log('handle submit with state: ', this.state);
    // newUser(this.state)
  }
  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-6 col-xs-offset-3'>
              <div className='panel panel-default'>
                <div className='panel-body'>
                  <h3>Login</h3>
                  <form className='form' onSubmit={this.handleSubmit.bind(this)}>
                    <div className='row'>
                      <div className='col-xs-12'>
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

export default Login;
