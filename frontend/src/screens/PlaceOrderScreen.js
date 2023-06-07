import React, {useState, useEffect} from 'react'
import { Form, button, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap';
import { Link, useNavigate, useLocation,  } from 'react-router-dom';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

function PlaceOrderScreen() {

    const navigate = useNavigate()
    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice )).toFixed(2)

    if(!cart.paymentMethod){
        navigate(`/payment`)
    }

    useEffect(() => {
        if(success) {
            navigate(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [success, navigate])
 
    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice: cart.shippingPrice  ,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8} >
                <ListGroup variant='flush' >
                    <ListGroup.Item>
                        <h2>Адрес</h2>

                        <p>
                            <strong>Адрес: </strong>
                            {cart.shippingAddress.address},{cart.shippingAddress.city},
                            {'  '}
                            {cart.shippingAddress.postalCode},
                            {'  '}
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Способ оплаты</h2>

                        <p>
                            <strong>Способ оплаты: </strong>
                           {cart.paymentMethod}
                            
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Товары</h2>
                        {cart.cartItems.length === 0 ? <Message variant='info' >
                            Нет товаров
                        </Message> : (
                            <ListGroup variant='flush' >
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index} >
                                        <Row>
                                            <Col md={2} sm={2} >
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`} >
                                                    {item.name}
                                                </Link>
                                            </Col>

                                            <Col md={4} >
                                                {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col>

                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) }

                    </ListGroup.Item>

                </ListGroup>
            </Col>

            <Col md={4} >
                <Card className='card border-light mb-3'  >
                    <ListGroup   >
                        <ListGroup.Item className='card-header' >
                            <h2>Сумма заказа</h2>   
                        </ListGroup.Item>

                        <ListGroup.Item  >
                            <Row>
                                <Col  >
                                    Товары:
                                </Col>
                                <Col  >
                                    Р{cart.itemsPrice}
                                </Col>
                            </Row>   
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Адрес:
                                </Col>
                                <Col>
                                    Р{cart.shippingPrice}
                                </Col>
                            </Row>   
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Доставка:
                                </Col>
                                <Col>
                                    Р{cart.taxPrice}
                                </Col>
                            </Row>   
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Сумма заказа:
                                </Col>
                                <Col>
                                    Р{cart.totalPrice}
                                </Col>
                            </Row>   
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant='danger' >{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item className="d-grid gap-2" >
                            <Button
                                type='button'
                                variant='primary'
                                className="form-floating btn btn-lg"
                                disabled={cart.cartItems === 0}
                                onClick={placeOrder}
                            >
                                Разместить заказ
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen