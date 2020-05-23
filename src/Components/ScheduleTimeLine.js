import React from 'react';
import './ScheduleTimeLine.scss';


class ScheduleTimeLine extends React.Component {

  state = {
  }

  render() {
    return (
      <div className="timeline"
        style={{
          marginTop: this.props.offset
        }}
      />
    );
  }
}
export default ScheduleTimeLine;
