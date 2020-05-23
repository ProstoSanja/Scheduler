import React from 'react';
import './ScheduleDay.scss';

import {DAY_LENGTH_IN_MILLS} from './../Utils/Consts';

import ScheduleEntry from './ScheduleEntry'

class ScheduleDay extends React.Component {

  state = {
  }

  render() {
    return (
      <div className={"day"}>
        {/* {new Date(this.props.dayStartInMills).toDateString()} */}
        {generate24hNet()}
        {this.renderDayEntries()}
      </div>
    );
  }

  renderDayEntries() {
    var dayStartInMills = this.props.dayStartInMills;
    return this.props.allEntries.filter((entry) => {
      var start = entry.start.toMillis();
      var end = start + entry.length*1000;
      return (start >= dayStartInMills && start < dayStartInMills + DAY_LENGTH_IN_MILLS) || (start < dayStartInMills && end > dayStartInMills)
    }).map((entry, index) => {
      var start = entry.start.toMillis();
      var end = start + entry.length*1000;
      if (start < dayStartInMills) {
        start = dayStartInMills;
      }
      if (end > dayStartInMills + DAY_LENGTH_IN_MILLS) {
        end = dayStartInMills + DAY_LENGTH_IN_MILLS;
      }
      return (
        <ScheduleEntry
          key={index}
          entry={entry}
          height={heightFromSeconds((end - start)/1000)}
          offset={heightFromSeconds((start-dayStartInMills)/1000)}
        />
      )
    });
  }
}

function generate24hNet() {
  var result = [];
  for (let i = 0; i < 24; i++) {
    result.push(      
      <ScheduleEntry
        key={i+"B"}
        type={"back"}
        index={i}
        height={heightFromSeconds(3600)}
        offset={heightFromSeconds(3600 * i)}
      />
    )
  }
  return result;
}

function heightFromSeconds(seconds) {
  return seconds * 100 / 86400 + "vh";
}

export default ScheduleDay;
