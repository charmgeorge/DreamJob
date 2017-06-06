import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import addJob from './routes/addJob';
import jobStore from './stores/jobStore';
import userStore from './stores/UserStore';
import jobIndex from './routes/jobIndex';
import RegisterUser from './routes/RegisterUser';
import Login from './routes/Login';
import Home from './routes/Home';
import {updateJobs} from './actions';
import {checkLogin, userLogout} from './actions/actions';
// userLogout

class App extends Component {
  constructor(props){
    super(props)
    updateJobs()
    checkLogin()
    this.state = {
      message:jobStore.getMessage(),
      currentUser: userStore.getUser()
    }
  }

  handleLogout(){
    userLogout()
  }

  updateMessage(){
    this.setState({
      message:jobStore.getMessage()
    })
  }

  updateUserMessage(){
    this.setState({
      message: userStore.getMessage()
    })
  }

  componentWillMount(){
    jobStore.on('message', this.updateMessage.bind(this))
    userStore.on('login', this.handleLogin.bind(this))
    userStore.on('message', this.updateUserMessage.bind(this))
  }

  handleLogin(){
    this.setState({
      currentUser: userStore.getUser()
    })
  }

  login(){
    if(this.state.currentUser){
      return(
        <a onClick={this.handleLogout.bind(this)}>Logout</a>)
    } else {
      return(<Link to="/login">Login</Link>)
    }
  }


  render() {
    return (
      <div>
        <div className="message">{this.state.message}</div>
        <div className="App">
          <h2>Dream Job</h2>
          <p className="App-intro">
            {/* {this.state.currentUser.email} */}

          </p>
          <Router>
            <div>
              <div className="pull-right">
                <Link to="/">Home</Link> |
                <Link to="/add_job">Add Job</Link> |
                <Link to="/register">Register</Link> |
                {this.login()}
              </div>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/register" component={RegisterUser}></Route>
              <Route exact path = '/add_job' component={addJob}></Route>
              <Route exact path = '/job_index' component={jobIndex}></Route>
              <Route exact path = '/login' component={Login}></Route>

            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
