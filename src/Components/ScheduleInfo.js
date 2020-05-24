import React from 'react';
import './ScheduleInfo.scss';


class ScheduleInfo extends React.Component {

  state = { }

  render() {
    var now = new Date().getTime();
    var entries = this.props.allEntries
    var currentEntryIndex = this.getEntryAt(now, entries);
    if (currentEntryIndex != -1 && entries[currentEntryIndex].start.toMillis() > now) {
      currentEntryIndex--;
    }
    return (
      <div className="info">
        <p>
          {"Currently: " + this.entryToAdTimeCheck(entries, currentEntryIndex, now).name}
        </p>
        <p>
          {"Next: " + this.entryToAdTimeCheck(entries, currentEntryIndex+1, now).name}
        </p>
      </div>
    );
  }

  entryToAdTimeCheck(entries, index, atTime) {
    var entry = entries[index];
    var adtime = {name: "Ad-time"};
    if (!entry) {
      return adtime;
    }
    if (entry.start.toMillis() + entry.length*1000 < atTime) {
      return adtime;
    }
    // if (checkagainst && entry.start.toMillis() > now && entries[checkagainst].start.toMillis())
    return entry;
  }

  getEntryAt(time, entries) {
    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index];
      var end = entry.start.toMillis() + entry.length*1000;
      if (end > time) {
        return index;
      }
    }
    return -1;
  }

}
export default ScheduleInfo;
