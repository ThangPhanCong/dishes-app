import React, {Component} from "react";
import Data from "../../data/dishes.json";
import {MEALS, TITLE_MEALS, TITLE_PEOPLE} from "../../common/Const";
import {Container, Col, Form, FormGroup, Input, Label, Button, Alert} from "reactstrap";
import { Link } from "react-router-dom";
import "./StepOne.css";
import {setOrder, removeOrder, getOrder} from "../../services/StorageService";

class StepOne extends Component {
    state = {
        data: [],
        meals: [],
        payloadSelected: {},
        isShowError: false
    };

    componentDidMount() {
        this._getData();
    }

    async _getData() {
        try {
            const dataOrders = await getOrder('orders');
            console.log("data orders:", dataOrders)
            this.setState({
                data: Data.dishes,
                meals: MEALS,
                payloadSelected: dataOrders || {}
            });
        } catch (error) {
            console.log("GetMeal.error:", error);
        }
    }

    _changePayloadSelected(selected, title) {
        const { payloadSelected } = this.state;

        payloadSelected[`${title}`] = selected.target.value;
        this.setState({payloadSelected});
    }

    async _handleNextStep() {
        try {
            const { payloadSelected } = this.state;

            await setOrder('orders', payloadSelected);
            this.props.history.push('/StepTwo');
        } catch (error) {
            console.log("SetOrderStepOne._error:", error);
        }
    }

    _renderMeal() {
        const { meals, payloadSelected } = this.state;
        
        return (
            <Form>
                <Label>Please Select a meal</Label>
                <FormGroup>
                    <Input type="select" name="select"
                        value={payloadSelected && payloadSelected.meal || ''}
                        onChange={(value) => this._changePayloadSelected(value, TITLE_MEALS)}>
                        {
                            meals.map((meal, index) => <option key={index}>{meal}</option>)
                        }
                    </Input>
                </FormGroup>
            </Form>
        )
    }

    _renderNumberOfPeople() {
        const { payloadSelected } = this.state;

        return(
            <Form>
                <Label>Please Enter Number of people</Label>
                <FormGroup>
                    <Input type="number"
                        name="number"
                        value={payloadSelected && payloadSelected.people || ''}
                        max={10} min={1} onChange={(value) => this._changePayloadSelected(value, TITLE_PEOPLE)} />
                </FormGroup>
            </Form>
        )
    }

    _renderError() {
        const {payloadSelected} = this.state;
        const isDisabled = payloadSelected ? (!payloadSelected.meal || !payloadSelected.people) : true ;

        return(
            <div>
                {isDisabled ? <Alert color="danger" className="alert-error">
                    Please fill all required!
                </Alert> : null}
            </div>
        )
    }

    _renderButtonNext() {
        const { payloadSelected } = this.state;
        const isDisabled = payloadSelected ? (!payloadSelected.meal || !payloadSelected.people) : true;
        
        return (
            <Button outline color="primary" className="button-next" onClick={isDisabled ? () => {} : () => this._handleNextStep()}>
                Next
            </Button>
        )
    }

    render() {
        return(
            <div className="stepOneContainer">
                {this._renderMeal()}
                {this._renderNumberOfPeople()}
                {this._renderError()}
                {this._renderButtonNext()}
            </div>
        )
    }
}

export default StepOne;