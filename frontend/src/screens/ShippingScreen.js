import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import { locations } from '../data/LocationsAvailable' // Locations is an Array of objects, which includes a hierarchy of countries > States > cities

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  // the Ternary operator in useState Hook is used because Firs time the User came and it does not have any Cart Address available, So to Prevent this Error !! A component is changing an uncontrolled input to be controlled. !! we uses the Ternary
  const [address, setAddress] = useState(
    shippingAddress.address && shippingAddress.address
      ? shippingAddress.address
      : '',
  )
  const [pinCode, setPinCode] = useState(
    shippingAddress.pinCode && shippingAddress.pinCode
      ? shippingAddress.pinCode
      : '',
  )
  const [city, setCity] = useState(
    shippingAddress.city && shippingAddress.city ? shippingAddress.city : '',
  )
  const [state, setState] = useState(
    shippingAddress.state && shippingAddress.state ? shippingAddress.state : '',
  )
  const [country, setCountry] = useState(
    shippingAddress.country && shippingAddress.country
      ? shippingAddress.country
      : '',
  )

  // Once we Receive the Country we will find the State from our Country array in Locations Object and find the the States Available in it.
  const statesAvl = locations.countries.find(
    ({ countryName }) => countryName === country,
  )
  // Once we Receive the StatesAvl we will find the Cities from our statesAvl object and then iterate through the Cities in it.
  const citiesAvl = statesAvl?.states.find(
    ({ stateName }) => stateName === state,
  )

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, pinCode, state, country }))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <CheckoutSteps step1 step2 />
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            as="select"
            type="text"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>{'Select Country...'}</option>
            {locations.countries.map((value, key) => {
              return (
                <option value={value.countryName} key={key}>
                  {value.countryName}
                </option>
              )
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            as="select"
            type="text"
            value={state}
            required
            onChange={(e) => setState(e.target.value)}
          >
            <option>{'Select State...'}</option>
            {statesAvl?.states.map((value, key) => {
              return (
                <option value={value.stateName} key={key}>
                  {value.stateName}
                </option>
              )
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            as="select"
            type="text"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          >
            <option>{'Select City...'}</option>
            {citiesAvl?.cities.map((value, key) => {
              return (
                <option value={value} key={key}>
                  {value}
                </option>
              )
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Pin Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={pinCode}
            required
            onChange={(e) => setPinCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="my-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
