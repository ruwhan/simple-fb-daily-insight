import PropTypes from "prop-types";
import React from "react";

import "./Sidebar.css";

class Sidebar extends React.Component {
  static propTypes = {
    hidden: PropTypes.bool,
    children: PropTypes.element.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      sidebarHidden: false
    }
  }

  onClickExpandCollapseButton = (e) => {
    const { sidebarHidden } = this.state;
    this.setState({
      sidebarHidden: !sidebarHidden
    });
  }

  renderItems = (items = []) => {
    return items.map(
      <div></div>
    );
  }

  render = () => {
    const { sidebarHidden } = this.state;
    const { children, } = this.props;

    return (
      <div className={`lightweight-sidebar ${ sidebarHidden ? 'hidden' : '' }`}>
        <button className="expand-collapse-button" onClick={ this.onClickExpandCollapseButton }>
          <i className="fas fa-angle-double-left"></i>
        </button>
        { children }
      </div>
    );
  }
}

export default Sidebar;
