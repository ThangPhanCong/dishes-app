import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, NavLink, Redirect } from "react-router-dom";
import StepOne from './container/step-one/StepOne';
import StepTwo from './container/step-two/StepTwo';
import {Container, Col, Form, FormGroup, Input, Label, Button, Row} from "reactstrap";
import StepThree from './container/step-three/StepThree';
import StepFour from './container/step-four/StepFour';

class App extends Component {
  _renderNavBar() {
    return(
      <Row className="nav-bar">
        <NavLink to="/" exact activeClassName="nav-active" className="nav-item">Step 1</NavLink>
        <NavLink to="/StepTwo" activeClassName="nav-active" className="nav-item">Step 2</NavLink>
        <NavLink to="/StepThree" activeClassName="nav-active" className="nav-item">Step 3</NavLink>
        <NavLink to="/StepFour" activeClassName="nav-active" className="nav-item">Step 4</NavLink>
      </Row>
    )
  }
  
  render() {
    return (
      <Container className="App">
        {this._renderNavBar()}
        <Row className="app-container">
          <Col sm={4}/>
          <Col sm={5}>
              <div>
                <Redirect to="/"/>
                <Route exact path="/"  component={StepOne} />
                <Route path="/StepTwo" exact component={StepTwo} />
                <Route path="/StepThree" exact component={StepThree} />
                <Route path="/StepFour" exact component={StepFour} />
              </div>
            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
