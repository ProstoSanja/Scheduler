import React from 'react';
import './App.scss';

import FirebaseContext from './Utils/FirebaseContext';
import {DAY_LENGTH, DAY_LENGTH_IN_MILLS} from './Utils/Consts';

import ScheduleEntry from './Components/ScheduleEntry'

class App extends React.Component {

  state = {
    data: [],
  }

  componentDidMount() {
    this.context.db.collection("schedule").orderBy("start").onSnapshot((querySnapshot) => {this.receiveScheduleUpdate(querySnapshot)});
  }

  receiveScheduleUpdate(querySnapshot) {
    console.log("schedule update received");

    var date = new Date();
    date.setUTCHours(0,0,0,0);
    var today = date.getTime();
    var yesterday = today - 86400000;
    
    var result = []
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      result.push(data);
    });

    this.setState({
      data: result,
      dates: {
        yesterday: yesterday,
        today: today,
      }
    });
  }

  render() {
    var net = generate24hNet();
    var daysnum = 4;
    var scedule = entriesForDays(this.state.data, this.state.dates?.yesterday, daysnum);
    return (
      <div className="App">
        <div className="daySchedule">
          {net}
          {/* { entriesBetweenTimestamps(this.state.data, this.state.dates?.yesterday, this.state.dates?.today) } */}
          { scedule[0] }
        </div>
        <div className="daySchedule">
          {net}
          { scedule[1] }
          {/* { entriesBetweenTimestamps(this.state.data, this.state.dates?.today, this.state.dates?.tomorrow) } */}
        </div>
        <div className="daySchedule">
          {net}
          { scedule[2] }
          {/* { entriesBetweenTimestamps(this.state.data, this.state.dates?.tomorrow, this.state.dates?.aftertomorrow) } */}
        </div>
        <div className="daySchedule">
          {net}
          { scedule[3] }
          {/* { entriesBetweenTimestamps(this.state.data, this.state.dates?.aftertomorrow, this.state.dates?.afterafter) } */}
        </div>
      </div>
    );
  }
}

function entriesForDays(array, day1start, totaldays) {
  var result = {};
  for (let i = 0; i < totaldays; i++) {
      result[i] = [];
  }
  var lastEnd = day1start;

  array.forEach((entry, index) => {
    var startTime = entry.start.toMillis()
    var startDay = Math.floor((startTime - day1start) / DAY_LENGTH_IN_MILLS);
    var startDayStart = day1start + (startDay * DAY_LENGTH_IN_MILLS);

    //insert missing programming bits
    if (lastEnd < startTime) {
      var offset = (lastEnd - startDayStart) / 1000;
      var breakLength = (startTime - lastEnd) / 1000;
      result[startDay].push(
        <ScheduleEntry
          key={index + "M"}
          type={"missing"}
          height={heightFromSeconds(offset >= 0 ? breakLength : breakLength + offset)}
          offset={heightFromSeconds(offset >= 0 ? offset : 0)}
        />
      );
      if (offset < 0) {
        result[startDay-1].push(
          <ScheduleEntry
            key={index + "MP"}
            type={"missing"}
            height={heightFromSeconds(offset * -1)}
            offset={heightFromSeconds(DAY_LENGTH + offset)}
          />
        );
      }
    }

    //insert actual schedule items
    var startTimeInDay = (startTime - startDayStart) / 1000;
    var overflow = startTimeInDay + entry.length - DAY_LENGTH
    result[startDay].push(
      <ScheduleEntry
        key={index}
        entry={entry}
        height={heightFromSeconds(overflow > 0 ? entry.length - overflow : entry.length)}
        offset={heightFromSeconds(startTimeInDay)}
      />
    );
    if (overflow > 0) {
      result[startDay+1].push(
        <ScheduleEntry
          key={index + "C"}
          entry={entry}
          height={heightFromSeconds(overflow)}
          offset={heightFromSeconds(0)}
        />
      );
    }

    lastEnd = startTime + (entry.length * 1000);
  });

  //to be continued
  var blockEnd = day1start + totaldays*DAY_LENGTH_IN_MILLS
  if (lastEnd < blockEnd) {
    result[totaldays-1].push(
      <ScheduleEntry
        key={"END"}
        type={"missing"}
        height={heightFromSeconds((blockEnd - lastEnd) / 1000)}
        offset={heightFromSeconds((lastEnd % DAY_LENGTH_IN_MILLS) / 1000)}
      />
    );
  }

  return result;
}

function generate24hNet() {
  var result = [];
  for (let i = 0; i < 24; i++) {
    result.push(<div className="entry back" key={i+1000} style={{
      height: heightFromSeconds(3600),
      marginTop: heightFromSeconds(3600*i)
    }}>
      {i}
    </div>)
  }
  return result;
}

function heightFromSeconds(seconds) {
  return seconds * 100 / 86400 + "vh";
}
App.contextType = FirebaseContext

export default App;
