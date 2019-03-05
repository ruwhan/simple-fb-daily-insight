import React from "react";
import PropTypes from "prop-types";

import "./DropDown.css";

class DropDown extends React.Component {
  static propTypes = {
    selectedValue: PropTypes.string,
    options: PropTypes.array.isRequired,
    onChangeOption: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      optionVisible: false,
      selectedValue: 'Pick one',
    }

    this.onChangeOption = props.onChangeOption;
  }

  componentDidMount = () => {
    document.addEventListener('click', this.onClickAnywhere);
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.onClickAnywhere);
  }

  componentDidUpdate = (lastProps) => {
    const { selectedValue } = lastProps;

    if (selectedValue && selectedValue !== this.state.selectedValue) {
      this.setState({
        selectedValue
      });
    }
  }

  /**
   * On click drop down field event handler.
   */
  onClickDropDownField = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();

    this.setState({
      optionVisible: !this.state.optionVisible,
    });
  }

  /**
   * On click option event handler.
   */
  onClickOption = (selectedValue) => {
    this.setState({
      selectedValue,
      optionVisible: false,
    });

    this.onChangeOption(selectedValue);
  }

  /**
   * On click anywhere event handler.
   */
  onClickAnywhere = (e) => {
    this.setState({
      optionVisible: false
    });

    const el = document
      .getElementsByClassName("rightweight-dropdown")[0]
      .getElementsByClassName("dropdown-options")[0];

    if (el && !el.classList.contains("hidden")) {
      el.classList.add("hidden");
    }
  }

  /**
   * Render option from props.
   */
  renderOptions = () => {
    const { options } = this.props;
    return options.map((item) => (
      <div onClick={ (e) => this.onClickOption(item.value || item.text) } key={`rightweight-dropdown-option-${item.value || item.text}`}>
        {item.text}
      </div>
    ));
  }

  /**
   * Get selected option based on value, or text if value is `undefined`.
   * 
   * @param {String}  selectedValue
   * @return  {String}
   */
  getSelectedOption = (selectedValue) => {
    const { options } = this.props;
    return options.find((item) => (item.value === selectedValue || item.text === selectedValue));
  }

  
  render = () => {
    const { selectedValue, optionVisible } = this.state;
    const selectedOption = this.getSelectedOption(selectedValue);

    return (
      <div className={`rightweight-dropdown`}>
        <input type="hidden" value={ selectedValue } />
        <div className="dropdown-field" onClick={ this.onClickDropDownField }>
          { selectedOption ? selectedOption.text : 'Please select' }
        </div>
        <div className={`dropdown-options  ${ optionVisible ? '' : 'hidden' }`}>
          { this.renderOptions() }
        </div>
      </div>
    );
  }
}

export default DropDown;
