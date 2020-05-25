class AdControl {

  obsControl = null;

  adlist = [];

  runningUntil = 0;
  announcedNext = false;
  callback = null;

  constructor(firebaseContext, obsControl) {
    this.obsControl = obsControl;
    firebaseContext.addCallback( (adlist) => {this.adlistUpdate(adlist); }, 'ads');
  }

  adlistUpdate(adlist) {
    this.adlist = adlist;
  }
  
  startAdBlock(until) {
    this.runningUntil = until;
    this.announcedNext = false;
    this.displayNextAd();
  }
  stopAdBlock() {
    clearTimeout(this.callback);
    this.runningUntil = 0;
  }

  displayNextAd() {
    clearTimeout(this.callback);
    var now = new Date();
    var timeRemaining = this.runningUntil - now;
    if (!this.announcedNext) {
      this.announcedNext = true;
      //generate up next thing
    } else {
      var nextAd = this.getLeastRunAd();
      var nextAdLength = nextAd.length*1000;
      if ((timeRemaining - nextAdLength) >= 0) {
        this.obsControl.switchToSource(nextAd.url);
        this.callback = (setTimeout(() => { this.displayNextAd(); }, nextAdLength));
      } else {
        // display static 
      }
    }
  }

  getLeastRunAd() {

  }

}
export default AdControl;
