import React from "react";

import "./Panel.css";

class Panel extends React.Component {
  
  render = () => {
    const { children } = this.props;

    return (
      <div className="rightweight-panel">
        <div className="panel-content">
          { children }
        </div>
      </div>
    );
  }
}

export default Panel;
