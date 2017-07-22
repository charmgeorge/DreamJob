import React, { Component } from 'react';
import {loginUser} from '../actions/actions';
import userStore from '../stores/UserStore';

class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      user:{
        email:"",
        password:""
      },
      message: ''
    }
  }

  handleLogin(){
    this.props.history.push('/job_index')
  }
  componentWillMount(){
    userStore.on('login', this.handleLogin.bind(this))
  }
  componentWillUpdate(){
    userStore.on('login', this.handleLogin.bind(this))
  }

  handleChange(e){
    let target = e.target
    let user = this.state.user
    user[target.name]= target.value
    this.setState({
      user: user
    })
  }
  handleSubmit(e){
    e.preventDefault()
    loginUser(this.state)
  }
  render() {
    return (
      <div className='formContainer'>
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
                          <input
                            type='submit'
                            value='Submit'
                            disabled={!this.state.user.password || !this.state.user.email}
                            className='btn btn-primary'
                          />
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
