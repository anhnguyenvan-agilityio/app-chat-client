import React, { Component } from "react";
import "./styles/LoginPage.css";
import CustomInput from "../components/CustomInput";
import { getLocalUser } from "../helpers/loginHelper";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const user = getLocalUser();
    if (user) {
      this.props.history.push("/home");
    }
  }

  signIn = event => {
    event.preventDefault();

    this.props.login({
      variables: {
        user: {
          email: this.refs.email.value,
          password: this.refs.password.value
        }
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card-login card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin">
                  <CustomInput
                    ref="email"
                    title="Email address"
                    id="inputEmail"
                    type="email"
                  />
                  <CustomInput
                    ref="password"
                    title="Password"
                    id="inputPassword"
                    type="password"
                  />

                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                    onClick={this.signIn}
                  >
                    Sign in
                  </button>
                </form>
                <p style={{ marginTop: "30px", fontSize: "15px" }}>
                  List Account
                </p>
                <p style={{ fontSize: "12px" }}>
                  ironman@gmail.com / password: 123456
                </p>
                <p style={{ fontSize: "12px" }}>
                  thor@gmail.com / password: 123456
                </p>
                <p style={{ fontSize: "12px" }}>
                  captainamerican@gmail.com / password: 123456
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
