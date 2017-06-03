import {EventEmitter} from 'events'
import Dispatcher from '../Dispatcher'

class JobStore extends EventEmitter{
  constructor(){
    super()
    this.jobs = []
    this.newJob = {}
    this.message = ""
  }

  getJobs(){
    return this.jobs
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
     default:{}
   }
 }
}

const jobStore = new JobStore()
Dispatcher.register(jobStore.handleActions.bind(jobStore))
window.jobStore = jobStore
export default jobStore
