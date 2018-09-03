import React, { Component } from "react";
import {Row, Col, Form, FormGroup, Input, Label, Button, Alert, Card, CardBody} from "reactstrap";
import {getOrder, setOrder, removeOrder} from "../../services/StorageService";
import Data from "../../data/dishes.json";
import { NAME_DISH, COUNT_DISH } from "../../common/Const";
import "./StepThree.css";

class StepThree extends Component {
    state = {
        dishes: [],
        selectedDish: [],
        currentDish: {},
        isShowError: false
    };

    componentDidMount() {
        this._getDish();
    }

    async _getDish() {
        try {
            const data = Data.dishes;
            const dataOrders = await getOrder('orders');
            if (dataOrders && dataOrders.meal && dataOrders.restaurant) {
                const dishes = data.filter(d => d.restaurant === dataOrders.restaurant && d.availableMeals.includes(dataOrders.meal));

                this.setState({dishes, selectedDish: dataOrders.dish ? dataOrders.dish : []});
            }
           
        } catch (error) {
            console.log("GetDishes._error:", error);
        }
    }

    _selectDish(selected, title) {
        const { selectedDish, currentDish } = this.state;

        currentDish[`${title}`] = selected.target.value;

        this.setState({ selectedDish, currentDish, isShowError: false });
    }

    _addDish() {
        const { selectedDish, currentDish } = this.state;

        if (currentDish && currentDish.count_dish && currentDish.name_dish) {
            selectedDish.push(currentDish);
            setOrder('orders', { dish: selectedDish });
            this.setState({ selectedDish, currentDish: {}, isShowError: false });
        } else {
            this.setState({ isShowError: true })
        }
    }

    _cancelItem(index) {
        const { selectedDish } = this.state;

        selectedDish.splice(index, 1);
        setOrder('orders', { dish: selectedDish});
        this.setState({selectedDish});
    }

    
    _goBack(){
        this.props.history.goBack();
    }

    async _handleNextStep() {
        try {
            const { selectedDish } = this.state;

            if (selectedDish.length) {
                // await setOrder('orders', { dish: selectedDish });
                this.props.history.push('/StepFour');
            } else {
                this.setState({isShowError: true});
            }
        } catch (error) {
            console.log("SetOrderDishes._error:", error);
        }
    }

    _renderSelectDish() {
        const { dishes, currentDish } = this.state;

        return(
            <Row>
                <Col sm={5}>
                    <Label>Please Select a Dish</Label>
                    <FormGroup>
                        <Input type="select" name="select"
                            value={currentDish.name_dish || ''}
                            onChange={(value) => this._selectDish(value, NAME_DISH)}
                        >
                            <option value="" />
                            {
                                dishes.map((dis, index) => <option key={index}>{dis.name}</option>)
                            }
                        </Input>
                    </FormGroup>
                </Col>

                <Col sm={7}>
                    <Label>Please enter no of servings</Label>
                    <FormGroup>
                        <Input type="number"
                            name="number" min={1}
                            value={currentDish.count_dish || ''}
                            onChange={(value) => this._selectDish(value, COUNT_DISH)} />
                    </FormGroup>
                </Col>
            </Row>
        )
    }

    _renderDish() {
        const { selectedDish } = this.state;

        return(
            <Row>
                {selectedDish.map((selected, index) => <Col sm={4} key={index}>
                    <Card className="card-container">
                        <CardBody>
                            <img src={require('../../assets/cancel.png')} width={8} height={8}
                                onClick={() => this._cancelItem(index)}
                                className="cancel-item" />
                            <div>{selected.name_dish}</div>
                            <div>{selected.count_dish}</div>
                        </CardBody>

                    </Card>
                </Col>)}
                <Col sm={2}>
                    <img src={require('../../assets/plus.png')} onClick={() => this._addDish()} className="button-plus" />
                </Col>
            </Row>
        )
    }

    _renderButton() {
        return(
            <Row className="button-group">
                <Col sm={6}>
                    <Button outline color="success" className="button-previous" onClick={() => this._goBack()}>
                        Previous
                    </Button>
                </Col>

                <Col sm={6}>
                    <Button outline color="primary" className="button-next" onClick={() => this._handleNextStep()}>
                        Next
                    </Button>
                </Col>
            </Row>
        )
    }

    _renderAlertError() {
        const { isShowError } = this.state;

        return (
            <div>
                {isShowError ?
                    <Alert color="danger" className="alert-error">
                        Please Insert No of servings and Name Dish!
                    </Alert> : null}
            </div>
        )
    }

    render() {
        return(
            <div>
                {this._renderSelectDish()}
                {this._renderDish()}
                {this._renderAlertError()}
                {this._renderButton()}
            </div>
        )
    }
}

export default StepThree;