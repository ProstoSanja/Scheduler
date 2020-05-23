import React from 'react';
import './ScheduleDay.scss';

import {DAY_LENGTH_IN_MILLS} from './../Utils/Consts';

import ScheduleEntry from './ScheduleEntry'
import ScheduleTimeLine from './ScheduleTimeLine'

class ScheduleDay extends React.Component {

  state = {
    height: 0,
  };

  parentRef = React.createRef();

  componentDidMount() {
    window.addEventListener("resize", this._handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._handleResize);
  }

  _handleResize = () => { this.handleResize(); }
  handleResize() {
    this.setState({
      height: this.parentRef.current.offsetHeight,
    });
  }

  render() {
    return (
      <div className={"day"} ref={this.parentRef}>
        {this.generate24hNet()}
        {this.renderDayEntries()}
        {this.renderTimeLine()}
      </div>
    );
  }

  renderTimeLine() {
    var nowOffset = new Date().getTime() - this.props.dayStartInMills;
    if (nowOffset < DAY_LENGTH_IN_MILLS && nowOffset >= 0) {
      return (
        <ScheduleTimeLine offset={this.heightFromSeconds(nowOffset/1000)} />
      );
    }
    return null;
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
          height={this.heightFromSeconds((end - start)/1000)}
          offset={this.heightFromSeconds((start-dayStartInMills)/1000)}
        />
      );
    });
  }

  generate24hNet() {
    var result = [];
    for (let i = 0; i < 24; i++) {
      result.push(      
        <ScheduleEntry
          key={i+"B"}
          type={"back"}
          index={i}
          height={this.heightFromSeconds(3600)}
          offset={this.heightFromSeconds(3600 * i)}
        />
      );
    }
    return result;
  }
  
  heightFromSeconds(seconds) {
    return seconds * this.state.height / 86400 + "px";
  }

}

export default ScheduleDay;
