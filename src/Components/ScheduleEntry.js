import React from 'react';
import './ScheduleEntry.scss';


class ScheduleEntry extends React.Component {

  state = {
  }

  render() {
    return (
      <div className={"entry " + this.props.type}
        style={{
          height: this.props.height,
          marginTop: this.props.offset
        }}
      >
        { this.renderBody() }
      </div>
    );
  }

  renderBody() {
    switch (this.props.type) {
      case "missing":
        return "Missing Programming";
      case "back":
        return this.props.index;
      default:
        return this.props.entry.name;
    }
  }
}
export default ScheduleEntry;
