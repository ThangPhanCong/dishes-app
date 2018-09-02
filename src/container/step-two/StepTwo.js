import React, {Component} from "react";
import {Container, Col, Form, FormGroup, Input, Label, Button, Alert} from "reactstrap";
import Data from "../../data/dishes.json";
import {getOrder} from "../../services/StorageService";

class StepTwo extends Component {
    state = {
        restaurants: [],
        restaurantSelected: {}
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
                        {
                            restaurants.map((res, index) => <option key={index}>{res.restaurant}</option>)
                        }
                    </Input>
                </FormGroup>
            </Form>
        )
    }

    render() {
        return(
            <div>
                {this._renderRestaurant()}
            </div>
        )
    }
}

export default StepTwo;