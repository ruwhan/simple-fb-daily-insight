import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TopNavBar from "../RightWeight/TopNavBar";
import Sidebar from "../RightWeight/Sidebar";
import CampaignList from "../CampaignList";
import Modal from "../RightWeight/Modal";
import AccountList from "../AccountList";
import { loadAdAccounts } from "../../actions/adAccounts";

import "./Layout.css";

class Layout extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    adAccounts: PropTypes.object,
    loadAdAccounts: PropTypes.func.isRequired,
    profiles: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.loadAdAccounts = props.loadAdAccounts;
  }

  componentDidMount = () => {
    const { adAccounts } = this.props;
    const { isFetched } = adAccounts;

    if (!isFetched) {
      this.loadAdAccounts();
    }
  }

  render = () => {
    const { adAccounts, profiles } = this.props;
    const { entities } = profiles;
    const { picture } = entities.profile;
    const pictureData = picture.data;
    const { children } = this.props;

    return (
      <div className="dashboard">
        <TopNavBar profilePictureUrl={ pictureData.url } displayName={ entities.profile.name } />
        <Sidebar>
          <CampaignList />
        </Sidebar>
        { children }
        <Modal hidden={adAccounts.selectedAdAccount !== ''}>
          <AccountList />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  adAccounts: state.adAccounts,
  profiles: state.profiles,
});

const mapActionToProps = {
  loadAdAccounts,
}

export default connect(mapStateToProps, mapActionToProps)(Layout);
