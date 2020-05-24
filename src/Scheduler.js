import {DAY_LENGTH_IN_MILLS} from './Utils/Consts';

class Scheduler {

  schedule = [];

  constructor(firebaseContext) {
    firebaseContext.addCallback( (schedule) => {this.schedulerUpdate(schedule); });
    var date = new Date();
    date.setUTCHours(0,0,0,0);
  }

  schedulerUpdate(schedule) {
    this.schedule = schedule;
  }

}
export default Scheduler;
