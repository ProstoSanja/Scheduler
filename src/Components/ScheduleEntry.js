import React from 'react';
import './ScheduleEntry.scss';


class ScheduleEntry extends React.Component {

  state = {
  }

  render() {
    var typeSpecificData = this.renderBody();
    return (
      <div className={"entry " + this.props.type}
        style={{
          height: this.props.height,
          width: typeSpecificData.width,
          marginLeft: typeSpecificData.marginLeft,
          marginTop: this.props.offset
        }}
      >
        { typeSpecificData.body }
      </div>
    );
  }

  renderBody() {
    switch (this.props.type) {
      case "missing":
        return "Missing Programming";
      case "back":
        return {body: this.props.index, marginLeft: 0, width: this.props.width};
      default:
        return {body: this.props.entry.name, marginLeft: this.props.width/10, width: this.props.width*9/10};
    }
  }
}
export default ScheduleEntry;
