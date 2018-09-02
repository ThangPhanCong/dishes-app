import React, {Component} from "react";
import Data from "../../data/dishes.json";
import {MEALS, TITLE_MEALS, TITLE_PEOPLE} from "../../common/Const";
import {Container, Col, Form, FormGroup, Input, Label, Button, Alert} from "reactstrap";
import { Link } from "react-router-dom";
import "./StepOne.css";
import {setOrder, removeOrder} from "../../services/StorageService";

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

    _getData() {
        this.setState({
            data: Data.dishes,
            meals: MEALS
        });
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
                        value={payloadSelected.meal}
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
        return(
            <Form>
                <Label>Please Enter Number of people</Label>
                <FormGroup>
                    <Input type="number" name="number" max={10} min={1} onChange={(value) => this._changePayloadSelected(value, TITLE_PEOPLE)}/>
                </FormGroup>
            </Form>
        )
    }

    _renderError() {
        const {payloadSelected} = this.state;
        const isDisabled = !payloadSelected.meal || !payloadSelected.people;

        return(
            <div>
                {isDisabled ? <Alert color="danger" className="alert-error">
                    Please fill all required!
                </Alert> : null}
            </div>
        )
    }

    _renderButtonNext() {
        const {payloadSelected} = this.state;
        const isDisabled = !payloadSelected.meal || !payloadSelected.people;
        
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