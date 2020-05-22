import React from 'react';
import './ScheduleEntry.scss';


class ScheduleEntry extends React.Component {

  state = {
  }

  render() {
      if (this.props.type == "missing") {
        return (
            <div className="entry missing" style={{
              height: this.props.height,
              marginTop: this.props.offset
            }}>
              {"Missing programming"}
            </div>
        );
      } else {
    return (
        <div className="entry" style={{
          height: this.props.height,
          marginTop: this.props.offset
        }}>
          {this.props.entry.name}
        </div>
    );
      }
  }
}
export default ScheduleEntry;
