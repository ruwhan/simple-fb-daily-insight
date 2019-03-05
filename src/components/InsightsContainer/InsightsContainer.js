import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import InsightCharts from "../InsightCharts";
import Metric from "../RightWeight/Metric";
import FloatingMessage from "../RightWeight/FloatingMessage";
import "./InsightsContainer.css";

class InsightsContainer extends React.Component {
  static propTypes = {
    insights: PropTypes.object
  }

  render = () => {
    const { insights } = this.props;
    const { data } = insights.entities;

    return (
      data.length > 0 && (<div className="insights-container">
          <div className="basic-metric-container">
            <Metric value={data[0].cpc} label="cpc" faIcon="hand-pointer" />
            <Metric value={data[0].cpm} label="cpm" faIcon="bullseye" />
            <Metric value={data[0].cpp} label="cpp" faIcon="road" />
          </div>
          <div className="breakdown-charts">
            <InsightCharts />
          </div>
          { !insights.isLoading &&  <FloatingMessage message="Hello" /> }
        </div>)
    );    
  }
}

const mapStateToProps = (state) => ({
  insights: state.insights,
});

export default connect(mapStateToProps)(InsightsContainer);
