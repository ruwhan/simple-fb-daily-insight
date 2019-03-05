import PropTypes from "prop-types";
import React from "react";

import "./List.css";

class List extends React.Component {
  static propTypes = {
    componentCssClass: PropTypes.string,
    itemCssClass: PropTypes.string,
    items: PropTypes.array.isRequired.isRequired,
    labelField: PropTypes.string.isRequired,
    keyField: PropTypes.any.isRequired,
    onItemClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    items: [],
    labelField: 'name',
    keyField: 'id',
  }

  constructor(props) {
    super(props);

    this.onItemClick = props.onItemClick;
  }

  renderItems = () => {
    const { itemCssClass, items, labelField, keyField } = this.props;

    return items.map((item) => (
      <div className={`lightweight-list-item ${itemCssClass ? itemCssClass : ''}`}
        onClick={ () => this.onItemClick(item) }
        key={ item[keyField] }
        alt={ item[labelField] }
      >
        { item[labelField] }
      </div>
    ));
  }

  render = () => {
    const { componentCssClass } = this.props;

    return (
      <div className={`lightweight-list ${componentCssClass ? componentCssClass : ''}`}>
        { this.renderItems() }
      </div>
    );
  }
}

export default List;
