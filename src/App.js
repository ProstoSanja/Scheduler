import React from 'react';
import './App.scss';

import FirebaseContext from './Utils/FirebaseContext';
import {DAY_LENGTH_IN_MILLS} from './Utils/Consts';

import ScheduleDay from './Components/ScheduleDay'

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
    this.context.db
      .collection("schedule")
      .where("start", ">", this.state.today)
      .orderBy("start")
      .onSnapshot((querySnapshot) => {this.receiveScheduleUpdate(querySnapshot)});
  }

  receiveScheduleUpdate(querySnapshot) {
    console.log("schedule update received");
    
    var result = []
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    this.setState({
      data: result,
    });
  }

  render() {
    var daySchedule = []    
    for (let i = 0; i < this.state.days; i++) {
      daySchedule.push(
        <ScheduleDay key={i} allEntries={this.state.data} dayStartInMills={this.state.today.getTime() + i*DAY_LENGTH_IN_MILLS}/>
      )
    }

    return (
      <div className="App">
        <div className="info">

        </div>
        <div className="schedule">
          { daySchedule }
        </div>
      </div>
    );
  }
}

App.contextType = FirebaseContext

export default App;
