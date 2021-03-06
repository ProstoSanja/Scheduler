import React from 'react';
import './App.scss';

import FirebaseContext from './Utils/FirebaseContext';
import {DAY_LENGTH_IN_MILLS} from './Utils/Consts';

import ScheduleDay from './Components/ScheduleDay'
// import ScheduleInfo from './Components/ScheduleInfo';

class App extends React.Component {

  constructor() {
    super();
    var date = new Date();
    date.setUTCHours(0,0,0,0);
    this.state.today = date;
  }

  state = {
    data: [],
    days: 4,
    today: 0,
  }

  componentDidMount() {
    this.context.addCallback((schedule) => {this.setState({data: schedule});}, 'schedule');
  }

  render() {
    var daySchedule = [];
    for (let i = 0; i < this.state.days; i++) {
      daySchedule.push(
        <ScheduleDay key={i} allEntries={this.state.data} dayStartInMills={this.state.today.getTime() + i*DAY_LENGTH_IN_MILLS}/>
      )
    }

    return (
      <div className="App">
        {/* <ScheduleInfo allEntries={this.state.data}/> */}
        <div className="schedule">
          { daySchedule }
        </div>
      </div>
    );
  }
}

App.contextType = FirebaseContext;

export default App;
