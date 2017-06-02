import React, { Component } from 'react';
import '../App.css'



class Register extends Component {
  constructor(props){
    super(props)
    //the initial state of the website
    this.state={
      cat:{
        name:"",
        color:"",
        breed:"",
        gender:"",
        habitat:"",
        personality:"",
        age:""
      }
    }
  }
  handleChange(event){
    let target = event.target
    //target.name is the properties of cat??? what is target.value?
    let cat = this.state.cat
    cat[target.name]= target.value
    this.setState({
      cat: cat
    })
  }
  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-6 col-xs-offset-3'>
              <div className='panel panel-default'>
                <div className='panel-body'>
                  <h3>Register</h3>
                  <form>
                    <div className='row'>
                      <div className='col-xs-12'>
                        <div>
                          <label htmlFor='name'>First Name</label>
                          <br />
                          <input
                            type='text'
                            name='firstname'
                            value={this.state.cat.name}
                            onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div>
                          <label>Last Name</label>
                          <br />
                          <input
                            type='text'
                            name='lastname'
                            value={this.state.cat.breed}
                            onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div>
                          <label>Email</label>
                          <br />
                          <input
                            type='text'
                            name='email'
                            value={this.state.cat.color}
                            onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div>
                          <label>Password</label>
                          <br />
                          <input
                            type='password'
                            name='password'
                            value={this.state.cat.color}
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

export default Register;
