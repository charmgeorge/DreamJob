import React, { Component } from 'react';
import {newUser} from '../actions/actions';
import userStore from '../stores/UserStore';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';

let imageUrl; // need to just put this in an environment vars file...
if(process.env.NODE_ENV === 'production'){
  imageUrl = "/";
} else {
  imageUrl = "http://localhost:4000/";
};
console.log('imageUrl is: ', imageUrl);

class RegisterUser extends Component {
  constructor(props){
    super(props)
    this.state={
      currentUser: userStore.getUser(),
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
    if (this.state.currentUser) { // check if user is signed in. if so, send away from register page
      console.log('sending away from register page');
      this.props.history.push("/job_index");
    }
    userStore.on('user_created', ()=> {
      this.props.history.push("/job_index")
    })
  }

  handleChange(e){
    let target = e.target
    let user = this.state.user
    user[target.name]= target.value
    this.setState({
      user: user
    })
  }
//cg
  validate(){
    userStore.validate(this.state.user)
    this.setState({errors: userStore.getErrors()})
  }

  handleSubmit(e){
    e.preventDefault()
    this.validate()
    if(this.isValid()){
      newUser(this.state)
    }
  }

  isValid(){
    return Object.keys(this.state.errors).length === 0
  }

  handleImage(err, response){
    if(err){
      console.error('there was an error: ', err);;
    } else {
      let event = {
        target: {
          name: 'imageUrl',
          value: response
        }
      }
      console.log('res', response);
      this.handleChange(event);
    }
  }

  errorClass(field){
    if(this.state.errors && this.state.errors[field] && this.state.errors[field].length !== 0){
      return 'form-group has-error'
    } else {
      return 'form-group '
    }
  }

  render() {
    return (
      <div className='formContainer'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-6 col-xs-offset-3'>
              <div className='panel panel-default'>
                <div className='panel-body'>
                  { !this.isValid() &&
                    <div className='alert alert-danger'>
                      Please verify that all fields are filled in below
                    </div>
                  }
                  <h3>Register</h3>
                  <ImagesUploader
                   url={imageUrl + 'files'}
                   optimisticPreviews
                   multiple={false}
                   onLoadEnd={this.handleImage.bind(this)}
                   label="Upload a profile picture (optional)"
                  />
                  <form className='form'
                    onSubmit={this.handleSubmit.bind(this)}>
                    <div className='row'>
                      <div className='col-xs-12'>
                        <div className={this.errorClass('firstname')}>
                          <label className='control-label' htmlFor='firstname'>
                            First Name
                            <input
                              type='text'
                              name='firstname'
                              value={this.state.user.firstname}
                              onChange={this.handleChange.bind(this)}
                              className='form-control'
                            />
                            {this.state.errors.firstname}
                          </label>
                        </div>
                        <div className={this.errorClass('lastname')}>
                          <label className='control-label' htmlFor='lastname'>
                            Last Name
                          <br />
                          <input
                            type='text'
                            name='lastname'
                            value={this.state.user.lastname}
                            onChange={this.handleChange.bind(this)}
                            className='form-control'
                        />
                            {this.state.errors.lastname}
                            </label>
                        </div>
                        <div className={this.errorClass('email')}>
                          <label className='control-label' htmlFor='email'>
                            Email
                          <br />
                          <input
                            type='text'
                            name='email'
                            value={this.state.user.email}
                            onChange={this.handleChange.bind(this)}
                            className='form-control'
                          />
                          {this.state.errors.email}
                          </label>
                        </div>
                        <div className={this.errorClass('password')}>
                          <label className='control-label' htmlFor='password'>
                            Password
                          <br />
                          <input
                            type='password'
                            name='password'
                            value={this.state.user.password}
                            onChange={this.handleChange.bind(this)}
                            className='form-control'
                          />
                          {this.state.errors.password}
                            </label>
                        </div>
                        <div>
                          <br />
                          <input
                            type='submit'
                            value='Submit'
                            disabled={!this.state.user.password || !this.state.user.email ||
                              !this.state.user.firstname || !this.state.user.lastname}
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

export default RegisterUser;
