import React from "react";
import axios from "axios";
import "./register.css";
import notification from "../notification/notification";
import Header from "../header/header";

const formData = {
  firstname: "",
  lastname: "",
  password: "",
  email: "",
};

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        ...formData,
      },

      error: {
        ...formData,
      },

      isValid: false,
      isSubmitting: false,
    };
  }

  handleChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    let { name, value } = e.target;
    this.setState(
      (previousState) => ({
        data: {
          ...previousState.data,
          [name]: value,
        },
      }),
      () => {
        this.validateInput(name);
      }
    );
  };

  validateInput = (Fieldname) => {
    // console.log(this.state.data)
    let err;
    switch (Fieldname) {
      case "firstname":
        err = this.state.data[Fieldname] ? "" : "firstname is required";
        break;

      case "lastname":
        err = this.state.data[Fieldname] ? "" : "lastname is required";
        break;

      case "email":
        err = this.state.data[Fieldname]
          ? this.state.data[Fieldname].includes("@")
            ? ""
            : "Invalid email"
          : "email is required";
        break;

      case "password":
        err =
          this.state.data[Fieldname].length > 7
            ? ""
            : "password must be atleast 8 characters long";
        break;

      default:
        err = "";
        break;
    }

    this.setState(
      (errState) => ({
        error: {
          ...errState.error,
          [Fieldname]: err,
        },
      }),
      () => this.validateForm()
    );
  };

  validateForm = () => {
    let formVaild;
    const isFormValid = Object.values(this.state.error).filter((err) => err);
    // console.log(isFormValid.length);
    if (isFormValid.length) {
      formVaild = false;
    } else {
      formVaild = true;
    }
    this.setState({
      isValid: formVaild,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      isSubmitting: true,
    });

    axios
      .post("http://127.0.0.1:5000/register", this.state.data)
      .then((data) => {
        // console.log(data);
        // console.log('i am sucessfull');
        this.setState({
          isSubmitting: false,
        });
        notification.showSuccess("Registration sucessfull");
        this.props.history.push("/");
        console.log(data, "data");
      })
      .catch((err) => {
        console.log(err.response, "error", err);
        this.setState({
          isSubmitting: false,
        });
        notification.errorHandler(err);
      });
  };

  render() {
    let btn;
    btn = this.state.isSubmitting ? (
      <button
        disabled={true}
        className="btn btn-info my-4 btn-block"
        type="submit"
      >
        submitting...
      </button>
    ) : (
      <button
        disabled={!this.state.isValid}
        className="btn btn-info my-4 btn-block"
        type="submit"
      >
        Sign in
      </button>
    );

    return (
      <>
        <Header />
        <div className="register">
          <div className="register-title">Register</div>
          <form onSubmit={this.handleSubmit}>
            <div class="form-group mb-2">
              <label for="first name" className="input">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first name"
                aria-describedby="emailHelp"
                placeholder=" First Name"
                name="firstname"
                onChange={this.handleChange}
              />

              <small id="emailHelp" class="form-text text-danger">
                {this.state.error.firstname}
              </small>
            </div>
            <div class="form-group">
              <label for="last name" className="input">
                Last Name
              </label>

              <input
                type="text"
                className="form-control"
                id="last name"
                placeholder="Last Name"
                name="lastname"
                onChange={this.handleChange}
              />
              <small id="emailHelp" class="form-text text-danger">
                {this.state.error.lastname}
              </small>
            </div>
            <div class="form-group mb-2">
              <label for="exampleInputEmail1" className="input">
                Email address
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" email"
                name="email"
                onChange={this.handleChange}
              />
              <small id="emailHelp" class="form-text text-danger">
                {this.state.error.email}
              </small>
            </div>
            <div class="form-group">
              <label for="password" className="input">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                aria-describedby="emailHelp"
                placeholder=" password"
                name="password"
                onChange={this.handleChange}
              />
              <small id="emailHelp" class="form-text text-danger">
                {this.state.error.password}
              </small>
            </div>

            {btn}
          </form>
        </div>
      </>
    );
  }
}
