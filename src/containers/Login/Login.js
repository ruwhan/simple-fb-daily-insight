import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { getLoginStatus, login } from "../../actions/auth";
import "./Login.css";

class Login extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      status: PropTypes.oneOf(['unknown', 'connected']),
      accessToken: PropTypes.string,
      expiresIn: PropTypes.number,
      reauthorizeRequiredIn: PropTypes.string,
      signedRequest: PropTypes.string,
      userId: PropTypes.string,
      isLoading: PropTypes.bool,
    }),
    getLoginStatus: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.login = props.login;
    this.getLoginStatus = props.getLoginStatus;
  }

  /**
   * On click Facebook login button event handler.
   * 
   * @return  {Event} e
   */
  onClickFbLogin = (e) => {
    e.preventDefault();
    this.login();
  }

  render() {
    const { auth } = this.props;

    return (
      (auth.status === 'connected' 
        ? <Redirect push to="/dashboard" /> 
        : (<div className="login">
            <button 
              onClick={this.onClickFbLogin}
              className="login-button"
              disabled={auth.isLoading}
            >
              Login using Facebook
            </button>
          </div>)
        )
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapActionToProps = {
  getLoginStatus,
  login,
}

export default connect(mapStateToProps, mapActionToProps)(Login);
