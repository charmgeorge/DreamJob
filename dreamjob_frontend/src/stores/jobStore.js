import {EventEmitter} from 'events'
import Dispatcher from '../dispatchers/dispatcher'

class JobStore extends EventEmitter{
  constructor(){
    super()
    this.jobs = []
    this.newJob = {}
    this.message = ""
    this.details = {}
  }

  getJobs(){
    return this.jobs
  }

  getDetails (){
    return this.details
  }

  getMessage(){
    return this.message
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

  updateDetails(attributes){
    this.details = attributes
    // this.jobs.find(job => job.id === attributes.id)
    this.updateMessage('Job details retrieved!')
    this.emit('jobDetails')
  }

  updateJobDetails(attributes){
    this.details = attributes
    this.updateMessage('Job details updated!')
    this.emit('jobDetailsUpdated')
  }

  handleActions(action){
   switch(action.type){
     case("CREATE_JOB"):{
       this.updateNewJob(action.job)
       break
     }
     case("UPDATE_JOBS"):{
       this.updateJobs(action.jobs)
       break
     }
     case("GET_DETAILS"):{
       this.updateDetails(action.job)
       break
     }
     case("UPDATE_JOB_DETAILS"):{
       debugger
       this.updateJobDetails(action.job)
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
