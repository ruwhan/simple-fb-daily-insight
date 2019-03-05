import { ConnectedRouter } from "connected-react-router";
import React, { Component }  from "react";
import { connect } from "react-redux";
import routes from "./routes";
import { getLoginStatus } from "./actions/auth";

class App extends Component {
  constructor(props) {
    super(props);

    this.getLoginStatus = props.getLoginStatus;
  }

  componentDidMount = async () => {
    const me = this;
    // Initiate Facebook SDK
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function() {
      FB.init({ // eslint-disable-line no-undef
        appId      : process.env.REACT_APP_FB_APP_ID,
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
        
      FB.AppEvents.logPageView(); // eslint-disable-line no-undef
      
      me.getLoginStatus();
    };
  }
  
  render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        { routes }
      </ConnectedRouter>
    );
  }
}

const mapActionsToProps = {
  getLoginStatus
}

export default connect(undefined, mapActionsToProps)(App);
