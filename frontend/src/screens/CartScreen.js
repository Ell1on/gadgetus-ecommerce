import React, {useEffect} from 'react'
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart, removeFromCart} from '../actions/cartActions';

function CartScreen() {
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  const {id} = useParams()
  const location = useLocation()
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const navigate = useNavigate()

  const dispatch = useDispatch()

  
  console.log('cartItems:', cartItems);

  useEffect(() => {
    if(id){
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  
  const checkoutHandler = () => {
    navigate('/shipping')
  }

  return (
    <Row>
       <Col md={8}>
        <h1>Корзина</h1>
        {cartItems.length === 0 ? (
          <Message variant='info' >
             Ваша корзина пуста <Link to='/'>Назад</Link>

          </Message>
        ) : (
          <ListGroup variant='flush' >
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={3} >
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}

                  </Col>
                  <Col md={3} >
                    <Form.Control
                      className="form-group"
                      as="select"
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {
                          
                          [...Array(item.countInStock).keys()].map((x) => (
                            
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))
                        }

                    </Form.Control>
                  </Col>
                  <Col md={1} >
                    <Button
                      type='button'
                      variant='light'
                      onClick={(e) => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash' ></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) }
       </Col>
       <Col md={4} >
        <Card>
          <ListGroup variant='flush' >
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </h2>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item className='d-grid gap-2'>
            <Button
              type='button'
              className='btn btn-lg btn-dark'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Перейти к оплате 

            </Button>
          </ListGroup.Item>

        </Card>
       </Col>
    </Row>
  )
} 

export default CartScreen