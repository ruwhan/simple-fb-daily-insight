import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { loadInsights } from "../../actions/insights";
import { selectCampaign, loadNextCampaigns } from "../../actions/campaigns";

import "./CampaignList.css";

class CampaignList extends React.Component {
  static propTypes = {
    campaigns: PropTypes.object,// .arrayOf(PropTypes.shape({}))
    loadInsights: PropTypes.func.isRequired,
    selectCampaign: PropTypes.func.isRequired,
    loadNextCampaigns: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.loadInsights = props.loadInsights;
    this.selectCampaign = props.selectCampaign;
    this.loadNextCampaigns = props.loadNextCampaigns;
  }

  componentDidMount = () => {
    this.containerEl = document.getElementsByClassName('campaign-list')[0];
    this.containerEl.addEventListener('scroll', this.onScrollCampaignList.bind(this));
  }

  componentWillUnmount = () => {
    if (this.containerEl) {
      this.containerEl.removeEventListener('scroll', this.onScrollCampaignList);
    }
  }

  /**
   * On scroll event handler.
   */
  onScrollCampaignList = (e) => {
    setTimeout(() => {
      if (e.target.scrollHeight - e.target.offsetHeight <= e.target.scrollTop) {
        this.loadNextCampaigns();
      }
    }, 0);
  }

  /**
   * On click item event handler.
   */
  onClickListItem = (item) => {
    this.selectCampaign(item);
    this.loadInsights();
  }

  /**
   * Render icon based on campaign objective.
   * 
   * @return {DOM}
   */
  renderIcon = (objective) => {
    switch (objective) {
      case 'APP_INSTALLS':
        return (<i title={objective} className="fas fa-mobile-alt"></i>);
      case 'BRAND_AWARENESS':
        return (<i title={objective} className="fas fa-certificate"></i>);
      case 'CONVERSIONS':
        return (<i title={objective} className="fas fa-cart-arrow-down"></i>);
      case 'EVENT_RESPONSES':
        return (<i title={objective} className="fas fa-calendar-check"></i>);
      case 'LEAD_GENERATION':
        return (<i title={objective} className="fas fa-cogs"></i>);
      case 'LINK_CLICKS':
        return (<i title={objective} className="fas fa-hand-pointer"></i>);
      case 'LOCAL_AWARENESS':
        return (<i title={objective} className="fas fa-user-cog"></i>);
      case 'MESSAGES':
        return (<i title={objective} className="fas fa-sms"></i>);
      case 'OFFER_CLAIMS':
        return (<i title={objective} className="fas fa-file-contract"></i>);
      case 'PAGE_LIKES':
        return (<i title={objective} className="far fa-thumbs-up"></i>);
      case 'POST_ENGAGEMENT':
        return (<i title={objective} className="far fa-comment-dots"></i>);
      case 'PRODUCT_CATALOG_SALES':
        return (<i title={objective} className="fas fa-dollar-sign"></i>);
      case 'REACH':
        return (<i title={objective} className="fas fa-crosshairs"></i>);
      case 'VIDEO_VIEWS':
        return (<i title={objective} className="fas fa-video"></i>);
      default:
        break;
    }
  }

  /**
   * Render campaign list.
   * 
   * @return {[DOM]}
   */
  renderCampaignList = () => {
    const { campaigns } = this.props;
    const { entities } = campaigns;
    const { byId } = entities;

    // APP_INSTALLS, BRAND_AWARENESS, CONVERSIONS, EVENT_RESPONSES, LEAD_GENERATION,
    // LINK_CLICKS, LOCAL_AWARENESS, MESSAGES, OFFER_CLAIMS, PAGE_LIKES,
    // POST_ENGAGEMENT, PRODUCT_CATALOG_SALES, REACH, VIDEO_VIEWS

    return entities.ids.map((id) => {
      const campaign = byId[id];
      
      return (
        <div className={`lightweight-list-item ${campaigns.selectedCampaigns[0] === id ? 'selected' : ''}`}
          onClick={ () => this.onClickListItem(campaign) }
          key={ id }
          alt={ campaign.name }
        >
          { this.renderIcon(campaign.objective) } { campaign.name }
        </div>
      )
    });
  }

  render = () => {
    const { campaigns } = this.props;

    return (
      <div className="campaign-list">
        <div className="lightweight-list">
          { this.renderCampaignList() }
          { campaigns.isLoading &&  <i className="fas fa-circle-notch fa-spin"></i> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  campaigns: state.campaigns
})

const mapActionToProps = {
  loadInsights,
  selectCampaign,
  loadNextCampaigns,
}

export default connect(mapStateToProps, mapActionToProps)(CampaignList);
