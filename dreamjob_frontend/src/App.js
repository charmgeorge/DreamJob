import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import addJob from './components/addJob'
import jobStore from './stores/jobStore'

class App extends Component {
  constructor(props){
    super(props)
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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Dream Job</h2>
        </div>
        <Router>
          <div>
            <Route exact path = '/addJob' component={addJob}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
