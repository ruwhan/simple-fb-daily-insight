import PropTypes from "prop-types";
import React from "react";
import "./Modal.css";

class Modal extends React.Component {
  static propTypes = {
    hidden: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
  }

  render = () => {
    const { children, hidden } = this.props;
    
    return (
      <div className={`modal-lightweight ${hidden ? 'hidden' : ''}`}>
        <div className="modal-overlay">
          <div className="modal-content">
            { children }
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
