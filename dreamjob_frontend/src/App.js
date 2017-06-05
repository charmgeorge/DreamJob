import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import addJob from './routes/addJob';
import jobStore from './stores/jobStore';
import jobIndex from './routes/jobIndex';
import RegisterUser from './routes/RegisterUser';
import Home from './routes/Home';
import {updateJobs} from './actions';

class App extends Component {
  constructor(props){
    super(props)
    updateJobs()
    this.state = {
      message:jobStore.getMessage()
    }
  }

  updateMessage(){
    this.setState({
      message:jobStore.getMessage()
    })
  }

  componentWillMount(){
    jobStore.on('message', this.updateMessage.bind(this))
  }

  render() {
    return (
      <div>
        <div className="message">{this.state.message}</div>
        <div className="App">
          <h2>Dream Job</h2>
          <p className="App-intro">
            MOTTO TO GO HERE
          </p>
          <Router>
            <div>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/register" component={RegisterUser}></Route>
              <Route exact path = '/addJob' component={addJob}></Route>
              <Route exact path = '/jobIndex' component={jobIndex}></Route>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
