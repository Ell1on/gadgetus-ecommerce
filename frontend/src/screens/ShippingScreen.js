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
        <h2>Адрес</h2>
        <Form  onSubmit={submitHandler} className="d-grid gap-2" sm='gap-4' >

            <Form.Group controlId='address'  >
                <Form.Label>
                    Адрес
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
                    <label className="opacity-50" for="floatingInput">Введите город</label>
                </div>
            </Form.Group>

            <Form.Group controlId='city'  >
                <Form.Label>
                    Город
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
                    <label className="opacity-50" for="floatingInput">Введите адрес</label>
                </div>
            </Form.Group>

            <Form.Group controlId='postalCode'  >
                <Form.Label>
                    Почтовый индекс
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
                    <label className="opacity-50" for="floatingInput">Введите почтовый индекс</label>
                </div>
            </Form.Group>

            <Form.Group controlId='country' className='mb-1'  >
                <Form.Label>
                    Страна
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
                    <label className="opacity-50" for="floatingInput">Введите страну</label>
                </div>
            </Form.Group>

            <Button type='submit' variant='primary'
                                className="form-floating btn btn-lg">
                Продолжить
            </Button>

        </Form>
    </FormContainer>
  )
}

export default ShippingScreen