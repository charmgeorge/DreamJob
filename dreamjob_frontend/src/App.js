import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AddJob from './routes/AddJob';
import jobStore from './stores/JobStore';
import userStore from './stores/UserStore';
import JobIndex from './routes/JobIndex';
import RegisterUser from './routes/RegisterUser';
import NoMatch from './components/NoMatch';
import Login from './routes/Login';
import Home from './routes/Home';
import Glassdoor from './routes/Glassdoor';
import {checkLogin, userLogout} from './actions/actions';
import Header from './components/Header'
import JobSearch from './routes/JobSearch';
import JobSearchResults from './routes/JobSearchResults';
import JobDetails from './routes/JobDetails';
import AlternateView from './routes/AlternateView';

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
        <div>
          <Router>
            <div>
              <Header user={this.state.currentUser} logout={this.handleLogout.bind(this)} />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={RegisterUser}></Route>
                <Route exact path = '/add_job' component={AddJob}></Route>
                <Route exact path = '/job_index' component={JobIndex}></Route>
                <Route exact path = '/job_index_alternate' component={AlternateView}></Route>
                <Route exact path = '/job_details/:id' component={JobDetails}></Route>
                <Route exact path = '/login' component={Login}></Route>
                <Route exact path = '/glassdoor/:company' component={Glassdoor}></Route>
                <Route exact path = '/job_research' component={JobSearch}></Route>
                <Route exact path = '/search_results/:job/:location' component={JobSearchResults} />
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
