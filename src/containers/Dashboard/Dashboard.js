import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InsightsContainer from "../../components/InsightsContainer";
import Layout from "../../components/Layout";

import "./Dashboard.css";

class Dashboard extends React.Component {
  static propTypes = {
    campaigns: PropTypes.object
  }

  render = () => {
    const { campaigns } = this.props;
    const { entities, selectedCampaigns } = campaigns;
    const { byId } = entities;
    const selectedCampaign = byId[selectedCampaigns[0]]

    return (
      <Layout>
        <div className="content">
          <h1>{ selectedCampaign && selectedCampaign.name }</h1>
          <InsightsContainer />
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  campaigns: state.campaigns
})

export default connect(mapStateToProps)(Dashboard);
