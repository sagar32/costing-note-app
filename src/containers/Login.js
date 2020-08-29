import React, { useState, Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import LoaderButton from "../components/LoaderButton";
import { Redirect } from 'react-router';
// import Cost from "./Cost";
// import { render } from "@testing-library/react";


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      isLoading: false,
      redirect: false
    };
  }


  validateForm = () => {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();
     try {
      this.setState({ setIsLoading: true });
      if (this.setState.username == null &&
        this.setState.password == null ) {
        this.setState({ setIsLoading: false, redirect: true });


      }
    } catch (error) {
      console.log('error:', error);
      this.setState({ setIsLoading: false });
    }
  }



  render() {

    return (
      <div className="Login">

        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>UserName</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
              onChange={e => this.setState({username:e.target.value})}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={e => this.setState({password:e.target.value})}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            isLoading={this.state.isLoading}
            disabled={!this.validateForm()}

          >
            Login
               </LoaderButton>
        </form>
        {this.state.redirect && <Redirect to="/cost"/>}
      </div>
    );
  }
}

export default Login;