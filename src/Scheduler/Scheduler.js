import {DAY_LENGTH_IN_MILLS} from '../Utils/Consts';
import {getTimesFromEntry, entriesEqual, getByTimeFromArray} from '../Utils/Entries';

import ObsControl from './ObsControl';

class Scheduler {

  obsControl = new ObsControl();

  now = new Date();
  schedule = [];
  currentlyactive = null;
  currentlyactiveIndex = -1;

  constructor(firebaseContext) {
    firebaseContext.addCallback( (schedule) => {this.schedulerUpdate(schedule); });
  }

  schedulerUpdate(schedule) {
    this.schedule = schedule;
    var [newActive, newIndex] = getByTimeFromArray(schedule, this.now);
    if (!entriesEqual(newActive, this.currentlyactive)) {
      console.log("schedulerUpdate, switch required");
      this.prepareSceneChange(newActive, newIndex);
    }
    this.currentlyactiveIndex = newIndex;
    this.currentlyactive = newActive;
  }

  prepareSceneChange(newActive, newIndex) {
    var nextEntry = this.schedule[newIndex+1];
    var [nextStart, nextEnd] = getTimesFromEntry(nextEntry);

    this.obsControl.switchToSource(newActive?.url);
  }

}
export default Scheduler;
