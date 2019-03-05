import React from "react";
import PropTypes from "prop-types";

import "./TopNavBar.css";

class TopNavBar extends React.Component {
  static propTypes = {
    profilePictureUrl: PropTypes.string,
    displayName: PropTypes.string.isRequired,
  }

  render = () => {
    const { profilePictureUrl, displayName } = this.props;
    return (
      <div className="rightweight-top-nav-bar">
        <div className="top-nav-bar-content">
          <h2>Insight Dashboard</h2>
          <div className="right-info">
            { profilePictureUrl && <img src={ profilePictureUrl } className="profile-picture" alt={ displayName } /> }
            <span>{ displayName }</span>
          </div>
        </div>
      </div>
    );
  }
}

export default TopNavBar;
