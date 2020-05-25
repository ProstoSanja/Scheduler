import {getTimesFromEntry, entriesEqual, getByTimeFromArray} from '../Utils/Entries';

import ObsControl from './ObsControl';
import AdManager from './AdManager';

class Scheduler {

  obsControl = new ObsControl();
  adManager = new AdManager(this.obsControl);

  schedule = [];
  currentlyactive = {};

  callback = null;

  constructor(firebaseContext) {
    firebaseContext.addCallback( (schedule) => {this.schedulerUpdate(schedule); });
  }

  schedulerUpdate(schedule) {
    this.schedule = schedule;
    this.prepareSceneChange();
  }

  prepareSceneChange() {
    var [newActive, newIndex] = getByTimeFromArray(this.schedule, new Date());
    var [currentStart, currentEnd] = getTimesFromEntry(newActive);
    
    if (!entriesEqual(newActive, this.currentlyactive)) {
      console.log("switching scenes to:", newActive);
      if (!newActive) {
        var [nextStart, nextEnd] = getTimesFromEntry(this.schedule[newIndex+1]);
        currentEnd = nextStart;
        this.adManager.startAdBlock(currentEnd);
      } else {
        this.adManager.stopAdBlock();
        this.obsControl.switchToSource(newActive?.url);
      }
    }
    this.currentlyactive = newActive;

    if (currentEnd > 0) {
      this.enqueueSceneChangeAt(currentEnd);
    } else {
      console.log("end of programming reached");
    }
  }

  enqueueSceneChangeAt(startAt) {
    clearTimeout(this.callback);
    var timeUntilEntry = startAt - new Date();

    this.callback = (setTimeout(() => {
      console.log("timeout triggered");
      this.prepareSceneChange();
    }, timeUntilEntry));
  }

}
export default Scheduler;
