import React from "react";
import PropTypes from "prop-types";

import "./Metric.css";

class Metric extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string,
    faIcon: PropTypes.string
  }

  render = () => {
    const { value, label, faIcon } = this.props;
    return (
      <div className="rightweight-basic-metric">
        <div>
          { faIcon && <i className={`fas fa-${faIcon}`}></i>}
          { value }
          <span className="metric-info">{label}</span>
        </div>
      </div>
    );
  }
}

export default Metric;
