import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface ToggleButtonOnOffState {
  isOff: boolean;
}

class ToggleButtonOnOff extends React.Component<{}, ToggleButtonOnOffState> {
  constructor(props: {}) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { isOff: false };
  }

  handleClick() {
    this.setState((prevState) => ({ isOff: !prevState.isOff }));
  }



  render() {
    const { isOff } = this.state;
    const title = isOff ? 'ON' : 'OFF';
    return (
      <button onClick={this.handleClick}>{title}</button>
    );
  }
}

export default ToggleButtonOnOffState;