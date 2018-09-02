import React, {Component} from "react";
import {Row, Col, Form, FormGroup, Input, Label, Button, Alert} from "reactstrap";
import Data from "../../data/dishes.json";
import {getOrder, setOrder} from "../../services/StorageService";
import "./StepTwo.css";

class StepTwo extends Component {
    state = {
        restaurants: [],
        restaurantSelected: null
    };

    componentDidMount() {
        this._getRestaurant();
    }

    async _getRestaurant() {
        try {
            const data = Data.dishes;
            const dataOrders = await getOrder('orders');

            const restaurants = data.filter(d => d.availableMeals.includes(dataOrders.meal));

            this.setState({ restaurants });
        } catch (error) {
            console.log("GetRestaurant._error:", error);
        }
    }

    _selectRestaurant(selected) {
        const restaurantSelected = selected.target.value;

        this.setState({restaurantSelected});
    }

    async _handleNextStep() {
        try {
            const { restaurantSelected } = this.state;

            if (restaurantSelected) {
                await setOrder('orders', { restaurant: restaurantSelected });
                this.props.history.push('/StepThree');
            }
        } catch (error) {
            console.log("SetOrderRestaurant._error:", error);
        }
    }

    _renderRestaurant() {
        const { restaurants } = this.state;
        
        return (
            <Form>
                <Label>Please select a Restaurant</Label>
                <FormGroup>
                    <Input type="select" name="select"
                        // value={payloadSelected.meal}
                        onChange={(value) => this._selectRestaurant(value)}
                        >
                        <option value=""/>
                        {
                            restaurants.map((res, index) => <option key={index}>{res.restaurant}</option>)
                        }
                    </Input>
                </FormGroup>
            </Form>
        )
    }

    _renderButton() {
        return(
            <Row>
                <Col sm={6}>
                    <Button outline color="success" className="button-previous"
                    >
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

    render() {
        return(
            <div>
                {this._renderRestaurant()}
                {this._renderButton()}
            </div>
        )
    }
}

export default StepTwo;