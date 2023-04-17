import React, {useState, useEffect} from 'react'
import { Form, button, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation,  } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from './../actions/cartActions';


function ShippingScreen() {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const location = useLocation()
   
   
    const navigate = useNavigate()
   
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 />
        <h2>Shipping</h2>
        <Form  onSubmit={submitHandler} className="d-grid gap-2" sm='gap-4' >

            <Form.Group controlId='address'  >
                <Form.Label>
                    Address
                </Form.Label>
                <div className="form-floating">
                    <input 
                        required
                        value={address ? address : ''} 
                        onChange={(e) => setAddress(e.target.value)} 
                        type="city" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="name@example.com"
                    />
                    <label className="opacity-50" for="floatingInput">Enter City</label>
                </div>
            </Form.Group>

            <Form.Group controlId='city'  >
                <Form.Label>
                    City
                </Form.Label>
                <div className="form-floating">
                    <input 
                        required
                        value={city ? city : ''} 
                        onChange={(e) => setCity(e.target.value)} 
                        type="address" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="name@example.com"
                    />
                    <label className="opacity-50" for="floatingInput">Enter Address</label>
                </div>
            </Form.Group>

            <Form.Group controlId='postalCode'  >
                <Form.Label>
                    Postal Code
                </Form.Label>
                <div className="form-floating">
                    <input 
                        required
                        value={postalCode ? postalCode : ''} 
                        onChange={(e) => setPostalCode(e.target.value)} 
                        type="postalCode" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="name@example.com"
                    />
                    <label className="opacity-50" for="floatingInput">Enter Postal Code</label>
                </div>
            </Form.Group>

            <Form.Group controlId='country' className='mb-1'  >
                <Form.Label>
                    Country
                </Form.Label>
                <div className="form-floating">
                    <input 
                        required
                        value={country ? country : ''} 
                        onChange={(e) => setCountry(e.target.value)} 
                        type="country" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="name@example.com"
                    />
                    <label className="opacity-50" for="floatingInput">Enter Country</label>
                </div>
            </Form.Group>

            <Button type='submit' variant='primary'
                                className="form-floating btn btn-lg">
                Continue
            </Button>

        </Form>
    </FormContainer>
  )
}

export default ShippingScreen