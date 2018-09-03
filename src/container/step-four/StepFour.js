import React, { Component } from "react";
import {Row, Col, Form, FormGroup, Input, Label, Button, Alert, Card, CardBody} from "reactstrap";
import {getOrder, setOrder, removeOrder} from "../../services/StorageService";
import "./StepFour.css";

class StepFour extends Component {
    state = {
        orders: {},
        isSubmit: false
    }

    componentDidMount() {
        this._getFullOrder();
    }

    async _getFullOrder() {
        try {
            const orders = await getOrder('orders');

            this.setState({ orders });
        } catch (error) {
            console.log("GetFullOrder.error:", error);
        }
    }

    _handleSubmitOrder() {
        const { orders } = this.state;

        if(Object.keys(orders).length) {
            this.setState({isSubmit: true});
            removeOrder('orders');
        }
      
    }

    _cancelOrder() {
        this.setState({orders: {}});
        removeOrder('orders');
    }

    _goBack(){
        this.props.history.goBack();
    }

    _renderDish(dish) {
        if(dish.length) {
            return(
                <div  className="list-dish">
                    {dish.map((d, index) => <Row key={index} className="dish-item">
                        <Col className="name-dish">{d.name_dish}</Col>
                        <Col className="count-dish">{d.count_dish}</Col>
                    </Row>)}
                </div>
            )
        }
        
    }

    _renderHeader() {
        return(
            <Col>
                <div className="header">Meal</div>
                <div className="header">No of People</div>
                <div className="header">Restaurant</div>
                <div className="header">Dishes</div>
            </Col>
        )
    }

    _renderFullOrder() {
        const { orders } = this.state;
        
        return(
            <Col>
                <div className="order-item">{orders.meal || ''}</div>
                <div className="order-item">{orders.people || ''}</div>
                <div className="order-item">{orders.restaurant || ''}</div>
                {this._renderDish(orders.dish || {})}
            </Col>
        )
    }

    _renderButton() {
        return(
            <Row className="button-group">
                <Col sm={4}>
                    <Button outline color="success" className="button-previous" onClick={() => this._goBack()}>
                        Previous
                    </Button>
                </Col>
                
                <Col sm={4}>
                    <Button outline color="warning" className="button-previous" onClick={() => this._cancelOrder()}>
                        Cancel 
                    </Button>
                </Col>

                <Col sm={4}>
                    <Button outline color="primary" className="button-next" onClick={() => this._handleSubmitOrder()}>
                        Submit
                    </Button>
                </Col>
            </Row>
        )
    }

    _renderAlertSubmit() {
        return (
            <Alert color="success">
                Submit Order SuccessFully!
            </Alert>
        )
    }

    render() {
        const { isSubmit, orders } = this.state;

        return(
            <div>
                {isSubmit ? this._renderAlertSubmit() : orders ?
                    <div>
                        <Row>
                            {this._renderHeader()}
                            {this._renderFullOrder()}
                        </Row>
                        {this._renderButton()}
                    </div>: <Alert color="danger">Please fill previous steps!</Alert>}
            </div>
        )
    }
}

export default StepFour;