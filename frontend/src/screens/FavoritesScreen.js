import React, {useEffect} from 'react'
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart, removeFromCart} from '../actions/cartActions';
import { addToFavorites, removeFromFavorites } from '../actions/favoritesActions'

function FavoritesScreen() {
  const favorites = useSelector(state => state.favorites)
  const {favoritesItems} = favorites

  const {id} = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  
  console.log(favoritesItems);

  useEffect(() => {
    if(id){
      dispatch(addToFavorites(id))
    }
  }, [dispatch, id])

  const removeFromFavoritesHandler = (id) => {
    dispatch(removeFromFavorites(id))
  }
  

  return (
    <Row>
       <Col >
        <h1>Избранное</h1>
        {favoritesItems.length === 0 ? (
          <Message variant='info' >
             Your favorites list is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush' >
            {favoritesItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col lg={1} xl={1} md={2} sm={4} >
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col >
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col >
                    ${item.price}

                  </Col>
                  
                  <Col md={1} >
                    <Button
                      type='button'
                      variant='light'
                      onClick={(e) => removeFromFavoritesHandler(item.product)}
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
       {/* <Col md={4} >
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
              PROCCED TO CHECKOUT

            </Button>
          </ListGroup.Item>

        </Card>
       </Col> */}
    </Row>
  )
} 

export default FavoritesScreen