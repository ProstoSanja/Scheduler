class AdControl {

  obsControl = null;

  runningUntil = 0;

  constructor(obsControl) {
    this.obsControl = obsControl;
  }
  
  startAdBlock(until) {
    this.runningUntil = until;
  }
  stopAdBlock() {
    this.runningUntil = 0;
  }

}
export default AdControl;
