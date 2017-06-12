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

  updateJobsAndCompanies(){
    console.log('updating');
  }



  handleActions(action){
    switch(action.type){
      case("something"):{
         this.updateJobDetails(action.job)
         break
      }
      case("not_glassdoor"):{
         this.updateGlassdoor(action.data)
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
