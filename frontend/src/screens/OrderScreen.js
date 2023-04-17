import React, {useState, useEffect} from 'react'
import { Form, button, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { getOrderDetails, deliveredOrder } from '../actions/orderActions';
import { ORDER_DELIVERED_RESET } from '../constants/orderConstants';

function OrderScreen() {

    const {id} = useParams() 
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const userLogin= useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const orderDelivered= useSelector(state => state.orderDelivered)
    const {loading: loadingDelivered, error:errorDelivered, success:successDelivered} = orderDelivered

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }

        if(!order || order._id !== Number(id) || successDelivered){
            dispatch(getOrderDetails(id))
            dispatch({type: ORDER_DELIVERED_RESET})
        }
        
    }, [dispatch, order, id, successDelivered])

    const deliverHandler = () => {
        dispatch(deliveredOrder(order))
    }
 
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger' >{error}</Message>
  ) : (

    <div>
        <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8} >
                <ListGroup variant='flush' >
                    <ListGroup.Item>
                        <h2>Shipping</h2>

                        <p> <strong>Name:</strong> {order.user.name} </p>
                        <p> <strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>  </p>

                        <p>
                            
                            <strong>Shipping: </strong>
                            {order.ShippingAddress.address},{order.ShippingAddress.city},
                            {'  '}
                            {order.ShippingAddress.postalCode},
                            {'  '}
                            {order.ShippingAddress.country}
                        </p>

                        {order.isDelivered ? (
                            <Message variant='success' >Delivered on {order.deliveredAt} </Message>
                        ) : (<Message variant='warning' >Not Delivered</Message>
                        )}

                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>

                        <p>
                            <strong>Payment Method: </strong>
                           {order.paymentMethod}
                            
                        </p>
 
                        {order.isPaid ? (
                            <Message variant='success' >Paid on {order.paidAt} </Message>
                        ) : (<Message variant='warning' >Not Paid</Message>
                        )}

                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message variant='info' >
                            Order is empty
                        </Message> : (
                            <ListGroup variant='flush' >
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index} >
                                        <Row>
                                            <Col md={1} sm={2} >
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
                            <h2>Order Summary</h2>   
                        </ListGroup.Item>

                        <ListGroup.Item  >
                            <Row>
                                <Col  >
                                    Item:
                                </Col>
                                <Col  >
                                    ${order.itemsPrice}
                                </Col>
                            </Row>   
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Shipping:
                                </Col>
                                <Col>
                                    ${order.shippingPrice}
                                </Col>
                            </Row>   
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Tax:
                                </Col>
                                <Col>
                                    ${order.taxPrice}
                                </Col>
                            </Row>   
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Total:
                                </Col>
                                <Col>
                                    ${order.totalPrice}
                                </Col>
                            </Row>   
                        </ListGroup.Item>

                        {loadingDelivered && <Loader /> }            
                        {userInfo && userInfo.isAdmin && !order.isDelivered && (
                        <ListGroup.Item>
                            <Button
                                type="button"
                                className='btn'
                                onClick={deliverHandler}
                            > 
                                Mark As Deliver
                            </Button>
                        </ListGroup.Item>
                    ) }

                    </ListGroup>

                    

                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default OrderScreen