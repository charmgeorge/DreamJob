import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import addJob from './routes/addJob';
import jobStore from './stores/jobStore';
import userStore from './stores/UserStore';
import jobIndex from './routes/jobIndex';
import RegisterUser from './routes/RegisterUser';
import NoMatch from './components/NoMatch';
import Login from './routes/Login';
import Home from './routes/Home';
import Header from './components/Header'
import {checkLogin, userLogout} from './actions/actions';
import jobDetails from './routes/jobDetails';
import {updateJobs} from './actions/actions';

class App extends Component {
  constructor(props){
    super(props)
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



  render() {
    return (
      <div>
        <div className="message">{this.state.message}</div>
        <div className="App">

          <Router>
            <div>
              <Header user={this.state.currentUser} logout={this.handleLogout.bind(this)} />
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/register" component={RegisterUser}></Route>
                <Route exact path = '/add_job' component={addJob}></Route>
                <Route exact path = '/job_index' component={jobIndex}></Route>
                <Route exact path = '/job_details' component={jobDetails}></Route>
                <Route exact path = '/login' component={Login}></Route>
                <Route component={NoMatch} />
              </Switch>

            </div>
          </Router>





        </div>
      </div>
    );
  }
}

export default App;
