import Cookies from "js-cookie";
import { Component } from "react";

import "./index.css";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    is_error: false,
    error_msg: "",
  };

  successLogin = (jwt_Token) => {
    const { history } = this.props;
    Cookies.set("jwt_token", jwt_Token, { expires: 10 });
    history.replace("/");
  };
  errorLogin = (error_message) => {
    this.setState({ is_error: true, error_msg: error_message });
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submitForm = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const { username, password } = this.state;
      const userDetails = { username, password };
      const url = "https://demo.credy.in/api/v1/usermodule/login/";
      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.is_success === true) {
        const { token } = data.data;
        this.successLogin(token);
      } else {
        console.log(data.error.message);
        this.errorLogin(data.error.message);
      }
      console.log(data);
    }
  };

  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    );
  };

  render() {
    const { is_error, error_msg } = this.state;
    return (
      <div className="login-form-container">
        <div className="form-container">
          <h1 className="login-head">SignIn</h1>
          <form className="form" onKeyPress={this.submitForm}>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {is_error && <p className="error-message">** {error_msg} **</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
