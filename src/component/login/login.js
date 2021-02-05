import React from "react";
import axios from "axios";
import "./login.css";
import notification from "../notification/notification";
import Header from "../header/header";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",

        password: "",
      },
      error: {
        email: {
          msg: "",
          isDirty: false,
        },
        password: {
          msg: "",
          isDirty: false,
        },
      },
      isSubmitting: false,
      isValidForm: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    // console.log(name, value);
    this.setState(
      (previousState) => ({
        data: {
          ...previousState.data,
          [name]: value,
        },
      }),
      () => {
        this.validateError(name);
      }
    );
  };

  validateError(fieldName) {
    // console.log(this.state)
    let err;
    switch (fieldName) {
      case "email":
        err = this.state.data[fieldName]
          ? this.state.data[fieldName].includes("@")
            ? { message: "", isTouched: true }
            : { message: "Invalid Email", isTouched: false }
          : { message: "Email is required", isTouched: true };
        break;
      case "password":
        err = this.state.data[fieldName]
          ? { message: "", isTouched: true }
          : { message: "password is required", isTouched: false };
        break;
      default:
        break;
    }

    this.setState(
      (previousState) => ({
        error: {
          ...previousState.error,
          [fieldName]: {
            ["msg"]: err.message,
            ["isDirty"]: err.isTouched,
          },
        },
      }),
      () => {
        this.validateForm();
      }
    );
  }

  validateForm = () => {
    let isValid =
      this.state.error.email.isDirty && this.state.error.password.isDirty
        ? true
        : false;
    this.setState({
      isValidForm: isValid,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      isSubmitting: true,
    });

    axios
      .post("http://127.0.0.1:5000/login", this.state.data)
      .then((data) => {
        notification.showSuccess(`welcome ${data.data.firstname}`);
        localStorage.setItem("user", JSON.stringify(data.data.firstname));
        localStorage.setItem("token", JSON.stringify(data.data.token));
        this.setState({
          isSubmitting: false,
        });
        // console.log(data.data);

        this.props.history.push(`/`);
      })
      .catch((err) => {
        this.setState({
          isSubmitting: false,
        });
        console.log(err);
        notification.errorHandler(err);
      });
  };

  render() {
    let btn = this.state.isSubmitting ? (
      <button disabled className="btn btn-info mb-3 mt-3">
        Logging...
      </button>
    ) : (
      <button
        className="btn btn-primary mb-3 mt-3"
        disabled={!this.state.isValidForm}
      >
        Login
      </button>
    );
    return (
      <>
        <Header />
        <div className="login">
          <div className="login-title">Login</div>
          <form onSubmit={this.handleClick}>
            <div class="form-group mb-2">
              <label for="exampleInputEmail1" className="input">
                Email address
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                autoComplete="nope"
                onChange={this.handleChange}
              />
              <small id="emailHelp" class="form-text text-danger">
                {this.state.error.email.msg}
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1" className="input">
                Password
              </label>

              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                autoComplete="nope"
                onChange={this.handleChange}
              />
              <small id="emailHelp" class="form-text text-danger">
                {this.state.error.password.msg}
              </small>
            </div>

            {btn}
          </form>
        </div>
      </>
    );
  }
}
