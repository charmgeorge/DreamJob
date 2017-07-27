import {EventEmitter} from 'events'
import Dispatcher from '../dispatchers/dispatcher'
import {updateJobs} from '../actions/actions'

class JobStore extends EventEmitter{
  constructor(){
    super()
    this.jobs = []
    this.newJob = {}
    this.message = ""
    this.details = {}
    this.err = ""
  }

  getJobs(){
    return this.jobs
  }

  getDetails (){
    return this.details
  }

  get404Details (){
    return this.err;
  }

  getMessage(){
    return this.message
  }

  clearJobs(){
    this.jobs = []
  }

  updateMessage(str){
    this.message = str
    this.emit('message')
  }

  updateNewJob(attributes){
    this.newJob = attributes
    this.jobs.push(attributes)
    this.updateMessage('Job has been added!')
    this.emit('jobAdded')
  }

  updateJobs(attributes){
    this.jobs = attributes
    this.updateMessage('Jobs are loaded')
    this.emit('jobsLoaded')
  }

  sortJobs(attributes){
    this.jobs = attributes
    this.updateMessage('Jobs were sorted')
    this.emit('sorted')
  }

  updateDetails(attributes){
    this.details = attributes
    this.updateMessage('Job details retrieved!')
    this.emit('jobDetails')
  }

  updateJobDetails(attributes){
    this.details = attributes
    this.updateMessage('Job details updated!')
    updateJobs()
    this.emit('jobDetailsUpdated')
  }

  updateGlassdoor(alldata){
    this.details = alldata.data
    // console.log(alldata.data); // see what it brings when it fails
    this.updateMessage('Glassdoor details retrieved!')
    this.emit('glassdoor')
  }

  updateGlassdoorError(err) {
    this.err = err;
    // console.log(err);
    this.emit('glassdoor_404');
    // console.log(this.err);
  }

  handleActions(action){
   switch(action.type){
     case("CREATE_JOB"):{
       this.updateNewJob(action.job)
       break
     }
     case("DELETE_JOB"):{
       updateJobs()
       this.emit('jobDeleted')
       break
     }
     case("UPDATE_JOBS"):{
       this.updateJobs(action.jobs)
       break
     }
     case("LOGOUT"):{
       this.clearJobs()
       break
     }
     case("GET_DETAILS"):{
       this.updateDetails(action.job)
       break
     }
     case("UPDATE_JOB_DETAILS"):{
       this.updateJobDetails(action.job)
       break
     }
     case("GLASSDOOR"):{
       this.updateGlassdoor(action.data)
       break
     }
     case("GLASSDOOR_NOTFOUND") : {
       this.updateGlassdoorError(action.err)
       break;
     }
     case("SORT_JOBS"):{
       this.sortJobs(action.jobs)
       break
     }
     default:{}
   }
 }
}

const jobStore = new JobStore()
Dispatcher.register(jobStore.handleActions.bind(jobStore))
window.jobStore = jobStore
export default jobStore
