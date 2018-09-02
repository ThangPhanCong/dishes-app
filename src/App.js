import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from "react-router-dom";
import StepOne from './container/step-one/StepOne';
import StepTwo from './container/step-two/StepTwo';
import {Container, Col, Form, FormGroup, Input, Label, Button, Row} from "reactstrap";
import StepThree from './container/step-three/StepThree';

class App extends Component {
  render() {
    return (
      <Container className="App">
        <Row>
          <Col sm={4}/>
          <Col sm={5}>
            <BrowserRouter>
              <div>
                <Route path="/" exact component={StepOne} />
                <Route path="/StepTwo" exact component={StepTwo} />
                <Route path="/StepThree" exact component={StepThree} />
              </div>
            </BrowserRouter>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
