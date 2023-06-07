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
        <h1>Заказ: {order._id}</h1>
        <Row>
            <Col md={8} >
                <ListGroup variant='flush' >
                    <ListGroup.Item>
                        <h2>Адрес</h2>

                        <p> <strong>Имя:</strong> {order.user.name} </p>
                        <p> <strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>  </p>

                        <p>
                            
                            <strong>Адрес: </strong>
                            {order.ShippingAddress.address},{order.ShippingAddress.city},
                            {'  '}
                            {order.ShippingAddress.postalCode},
                            {'  '}
                            {order.ShippingAddress.country}
                        </p>

                        {order.isDelivered ? (
                            <Message variant='success' >Доставлено {order.deliveredAt} </Message>
                        ) : (<Message variant='warning' >Еще в пути</Message>
                        )}

                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Способ оплаты</h2>

                        <p>
                            <strong>Способ оплаты: </strong>
                           {order.paymentMethod}
                            
                        </p>
 
                        {order.isPaid ? (
                            <Message variant='success' >Оплачено {order.paidAt} </Message>
                        ) : (<Message variant='warning' >Не оплачено</Message>
                        )}

                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Заказанные товары</h2>
                        {order.orderItems.length === 0 ? <Message variant='info' >
                            Нет заказанных товаров
                        </Message> : (
                            <ListGroup variant='flush' >
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index} >
                                        <Row>
                                            <Col md={1} sm={2} >
                                                <Image src={item.image} fluid rounded />
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
                                    Р{order.itemsPrice}
                                </Col>
                            </Row>   
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Адрес:
                                </Col>
                                <Col>
                                    Р{order.shippingPrice}
                                </Col>
                            </Row>   
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Доставка:
                                </Col>
                                <Col>
                                    Р{order.taxPrice}
                                </Col>
                            </Row>   
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Сумма заказа:
                                </Col>
                                <Col>
                                    Р{order.totalPrice}
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
                                Отметить как доставлено
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