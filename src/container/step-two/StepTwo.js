import React, {Component} from "react";
import {Row, Col, Form, FormGroup, Input, Label, Button, Alert} from "reactstrap";
import Data from "../../data/dishes.json";
import {getOrder, setOrder} from "../../services/StorageService";
import "./StepTwo.css";

class StepTwo extends Component {
    state = {
        restaurants: [],
        restaurantSelected: null,
        isShowError: false,
        isRequire: false
    };

    componentDidMount() {
        this._getRestaurant();
    }

    async _getRestaurant() {
        try {
            const data = Data.dishes;
            const dataOrders = await getOrder('orders');

            if (dataOrders && dataOrders.meal) {
                const restaurants = data.filter(d => d.availableMeals.includes(dataOrders.meal));

                this.setState({ restaurants, restaurantSelected: dataOrders.restaurant ? dataOrders.restaurant: '', isRequire: false });
            } else {
                this.setState({isRequire: true})
            }

        } catch (error) {
            console.log("GetRestaurant._error:", error);
        }
    }

    _selectRestaurant(selected) {
        const restaurantSelected = selected.target.value;

        this.setState({restaurantSelected, isShowError: false});
    }

    _goBack(){
        this.props.history.goBack();
    }

    async _handleNextStep() {
        try {
            const { restaurantSelected } = this.state;

            if (restaurantSelected) {
                await setOrder('orders', { restaurant: restaurantSelected });
                this.props.history.push('/StepThree');
            } else {
                this.setState({isShowError: true})
            }
        } catch (error) {
            console.log("SetOrderRestaurant._error:", error);
        }
    }

    _renderAlertError() {
        const { isShowError } = this.state;

        return (
            <div>
                { isShowError ?  <Alert color="danger">
                    Please fill restaurant!
                </Alert> : null}
            </div>

        )
    }

    _renderRequire() {
        const { isShowError } = this.state;

        return (
            <div>
                <Alert color="danger">
                    Please fill previous step one!
                </Alert>
            </div>

        )
    }

    _renderRestaurant() {
        const { restaurants, restaurantSelected } = this.state;
        
        return (
            <Form>
                <Label>Please select a Restaurant</Label>
                <FormGroup>
                    <Input type="select" name="select"
                        value={restaurantSelected || ''}
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

    render() {
        const { isRequire } = this.state;

        return(
            <div>
              {isRequire ? this._renderRequire() : <div>
                {this._renderRestaurant()}
                {this._renderAlertError()}
                {this._renderButton()}
              </div>}
            </div>
        )
    }
}

export default StepTwo;