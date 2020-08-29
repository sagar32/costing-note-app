import React from "react";
//import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import Cost from "./containers/Cost";
import Login from "./containers/Login";


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated :false
    }
  }
  changeAuthState(newAuthState){
    this.setState({isAuthenticated:newAuthState})
  }
  render(){

    return (
      <div className="App container">
          <div className="navbar">
            <span className="item">
                {
                  this.state.isAuthenticated
                  ?
                  <h4>HD Textile</h4>
                  :
                  <Link to="/">
                    Login
                  </Link>
                }
  
            </span>
          </div>
          {
              this.state.isAuthenticated
              ?      
              <Cost isAuthenticated={this.state.isAuthenticated} changeAuthState={(newAuthState)=>this.changeAuthState(newAuthState)}/>
              :
              <Login isAuthenticated={this.state.isAuthenticated} changeAuthState={(newAuthState)=>this.changeAuthState(newAuthState)}/>
          }

        {/* <Routes isAuthenticated={this.state.isAuthenticated} changeAuthState={(newAuthState)=>this.changeAuthState(newAuthState)} /> */}
      </div>
    );
  }
}

export default App;