import {EventEmitter} from 'events'
import Dispatcher from '../dispatchers/dispatcher'

class JobResearchStore extends EventEmitter{
  constructor(props){
    super(props)
    this.jobs = []
    this.companies = []
  }

  getJobs(){
    return this.jobs
  }

  getCompanies(){
    return this.companies
  }

  updateJobsAndCompanies(action){
    this.jobs = action.body.jobs;
    this.companies = action.body.companies;
    // console.log('companies', this.companies);
    this.emit('jobResearchStoreUpdated');
  }

  handleActions(action){
    switch(action.type){
      case("JOB_DETAILS"):{
        // console.log('actionssss ', action);
         this.updateJobsAndCompanies(action)
         break
      }
      default:{}
    }
  }
}

const jobResearchStore = new JobResearchStore()
Dispatcher.register(jobResearchStore.handleActions.bind(jobResearchStore))
window.jobResearchStore = jobResearchStore
export default jobResearchStore;
