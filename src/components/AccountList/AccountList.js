import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import AccountItem from "./AccountItem";
import { selectAdAccount } from "../../actions/adAccounts";

import "./AccountList.css";

class AccountList extends React.Component {
  static propTypes = {
    selectAdAccount: PropTypes.func.isRequired,
    adAccounts: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.selectAdAccount = props.selectAdAccount;
  }

  /**
   * On click account event handler.
   * 
   * @param {Object}  account
   * @return {Void}
   */
  handleClickAccountItem = (account) => {
    this.selectAdAccount(account.id);
  }

  /**
   * Render account item.
   * 
   * @return  {DOM}
   */
  renderItem = () => {
    const { adAccounts } = this.props;
    const { entities } = adAccounts;
    const { byId, ids } = entities;
    
    return (
      <ul>
        {
          ids.map((id) => (
            <li className="account-list-item" key={ id }>
              <AccountItem onClick={this.handleClickAccountItem} account={byId[id]} />
            </li>
          ))
        }
      </ul>
    );
  }

  render = () => {
    return (
      <div className="account-list">
        { this.renderItem() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  adAccounts: state.adAccounts
});

const mapActionToProps = {
  selectAdAccount,
}

export default connect(mapStateToProps, mapActionToProps)(AccountList);
