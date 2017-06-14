import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {checkLogin, userLogout} from './actions/actions';
import AddJob from './routes/AddJob';
import CompanyCompare from './routes/CompanyCompare';
import Glassdoor from './routes/Glassdoor';
import Header from './components/Header'
import history from './history'
import Home from './routes/Home';
import JobDetails from './routes/JobDetails';
import JobIndex from './routes/JobIndex';
import JobSearch from './routes/JobSearch';
import JobSearchResults from './routes/JobSearchResults';
import jobStore from './stores/JobStore';
import Login from './routes/Login';
import NoMatch from './components/NoMatch';
import React, { Component } from 'react';
import RegisterUser from './routes/RegisterUser';
import Results from './routes/Results';
import userStore from './stores/UserStore';

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
   userStore.on('logout', this.handleLogoutFinal.bind(this))
    jobStore.on('message', this.updateMessage.bind(this))
    userStore.on('login', this.handleLogin.bind(this))
    userStore.on('message', this.updateUserMessage.bind(this))
  }

  handleLogoutFinal(){
    this.setState( {
      currentUser: userStore.getUser()
    })

    history.push("/")
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
          <Router history={history}>
            <div>
              <Header
                history={history}
                user={this.state.currentUser}
                logout={this.handleLogout.bind(this)}
               />
              <Switch>
                <Route exact path = "/" component={Home} />
                <Route exact path = "/register" component={RegisterUser}></Route>
                <Route exact path = '/add_job' component={AddJob}></Route>
                <Route exact path = '/job_index' component={JobIndex}></Route>
                <Route exact path = '/job_index_alternate' component={alternateView}></Route>
                <Route exact path = '/job_details/:id' component={jobDetails}></Route>
                <Route exact path = '/login' component={Login}></Route>
                <Route exact path = '/glassdoor/:company' component={Glassdoor}></Route>
                <Route exact path = '/job_research' component={JobSearch}></Route>
                <Route exact path = '/search_results/:job/:location' component={JobSearchResults} />
                <Route exact path = '/compare' component={CompanyCompare} />
                <Route exact path = "/compare/results" component={Results} />
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
