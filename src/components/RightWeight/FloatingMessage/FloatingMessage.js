import React from "react";
import PropTypes from "prop-types";

import "./FloatingMessage.css";

class FloatingMessage extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      hidden: false,
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        hidden: true
      });
    }, 3000);
  }

  render = () => {
    const { hidden } = this.state;
    const { message } = this.props;

    return (
      <div className="rightweight-floating-message">
        <div className={`message-container ${ hidden ? 'hide' : '' }`}>{message}</div>
      </div>
    );
  }
}

export default FloatingMessage;
