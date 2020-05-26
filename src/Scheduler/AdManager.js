class AdControl {

  obsControl = null;
  firebaseContext = null;

  adlist = {};

  runningUntil = 0;
  announcedNext = false;
  callback = null;

  constructor(firebaseContext, obsControl) {
    this.firebaseContext = firebaseContext;
    this.obsControl = obsControl;
    
    this.firebaseContext.db
      .collection("ads")
      .onSnapshot((querySnapshot) => {this.adlistUpdate(querySnapshot)});
  }

  adlistUpdate(querySnapshot) {
    console.log("update received: ads");
    var result = {};
    querySnapshot.forEach((doc) => {
      result[doc.id] = doc.data();
    });
    this.adlist = result;
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
    if (Object.keys(this.adlist).length < 1) {
      this.callback = (setTimeout(() => { this.displayNextAd(); }, 1000));
    } else if (this.announcedNext) { // TODO: this tshould be !this.announceNext
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
    var selectedId, selectedAd;
    for (const id in this.adlist) {
      const ad = this.adlist[id];
      if (ad.timesShown < selectedAd?.timesShown || !selectedAd) {
        selectedAd = ad;
        selectedId = id;
      }
    }
    if (selectedId) {
      this.firebaseContext.db.collection("ads").doc(selectedId).update({timesShown: selectedAd.timesShown+1});
    }
    return selectedAd;
  }

}
export default AdControl;
