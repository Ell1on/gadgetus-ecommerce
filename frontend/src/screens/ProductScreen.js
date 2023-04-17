import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, Modal,  Carousel} from 'react-bootstrap'
import Rating from '../components/Rating';
import axios from 'axios'
import {useDispatch, useSelector } from 'react-redux'
import {listProductsDetails, createProductReview, createInfo} from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_INFO_RESET } from './../constants/productConstants';
import ImageMagnify from 'react-image-magnify'
import { Galleria } from 'primereact/galleria';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; 

function ProductScreen({}) {

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [title, setTitle] = useState('') 
  const [information, setInformation] = useState('')
  const [images, setImages] = useState(null);



  const navigate = useNavigate()
  const {id} = useParams();
  
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const productReview = useSelector(state => state.productReview)
  const {loading:loadingProductReview, error:errorProductReview, success:successProductReview} = productReview

  const productInfo = useSelector(state => state.productInfo)
  const {loading:loadingProductInfo, error:errorProductInfo, success:successProductInfo} = productInfo


  useEffect(() => {
    dispatch(listProductsDetails(id))
  }, [dispatch, id])
  
  useEffect(() =>{
    if(successProductReview){
      setRating(0)
      setComment('')
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }
    if(successProductInfo){
      setTitle('')
      setInformation('')
      dispatch({type:PRODUCT_CREATE_INFO_RESET})
    }
    const img = product?.images?.map(image => image.image)

    setImages(img || []);


  }, [ product, successProductReview, successProductInfo])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  }

  const addToFavoritesHandler = () => {
    if (userInfo){
      navigate(`/favorites/${id}`);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(
      id,{
        rating,
        comment,
      }
    ))
  }

  const submitInfoHandler = (e) => {
    e.preventDefault()
    
    dispatch(createInfo(
      id,{
        title,
        information,
      }
    ))
  }

  const responsiveOptions = [
    {
        breakpoint: '991px',
        numVisible: 4
    },
    {
        breakpoint: '767px',
        numVisible: 3
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
];
  console.log(images);

const itemTemplateWithMagnify = (item) => {
  return (
    
      <div  style={{ position: 'relative', zIndex:9999 }}>
      <ImageMagnify {...{
          smallImage: {
              alt: 'Wristwatch by Ted Baker London',
              isFluidWidth: true,
              src: item,
          },
          largeImage: {
              src: item,
              width: 1200,
              height: 1800,
              zIndex: 9999

          }
      }}
      style={{ position: 'absolute', top: 0, left: 0 }}

       />
    </div>
  );
};

const thumbnailTemplate = (item) => {
  return <img src={item} alt={item.alt} style={{ maxWidth: '100px', width: '100%' }} />
}

  return (
    <div>
        <Link to="/" className="btn btn-light my-3 ">Go Back</Link>
        
        {loading ? 
          <Loader />
          : error
            ? <Message variant="danger" >{error}</Message>
            : (
            <div>
              
              <Row>
                <Col md={6}>
                  <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '640px' }} 
                          item={itemTemplateWithMagnify}
                          thumbnail={thumbnailTemplate} />
                </Col>
              
            
                <Col md={6}  >
                  <ListGroup className='border-0' >
                    <ListGroup.Item className='border-0'>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item className='border-0'>
                      <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                    </ListGroup.Item>

                    <ListGroup.Item className='border-0'>
                      Price: ${product.price}
                    </ListGroup.Item>

                    

                  </ListGroup>
                
                    <ListGroup varian="flush" className='border-0' >
                      <ListGroup.Item className='border-0'>
                        <Row>
                          <Col>
                            Price:
                          </Col>
                          <Col>
                            <strong>${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item varian="flush" className='border-0' >
                        <Row>
                          <Col>
                            Status:
                          </Col>
                          <Col>
                            <strong>{product.countInStock > 0 ? 'In Stock' : 'Out' }</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item varian="flush" className='border-0' >
                          <Row>
                            <Col>
                              Qty
                            </Col>
                            <Col xs="auto" className='my-1' >
                              <Form.Control
                                className="form-group"
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {
                                    
                                    [...Array(product.countInStock).keys()].map((x) => (
                                      
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    ))
                                  }

                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}

                      <ListGroup.Item className="d-grid gap-2 border-0" varian="flush" >
                        <Button 
                          onClick={addToCartHandler}
                          className="btn btn-lg btn-dark" 
                          disabled={product.countInStock == 0} 
                          type="button" >
                            Add to Cart
                        </Button>
                      </ListGroup.Item>

                      <ListGroup.Item className="d-grid gap-2 border-0" border="0" >
                        <Button 
                          onClick={addToFavoritesHandler}
                          className="btn btn-lg btn-dark"  
                          type="button" >
                            Add to Favorites
                        </Button>
                      </ListGroup.Item>

                    </ListGroup>
                </Col>
              </Row>

              <Row className="mt-4">
                <h4>Описание</h4>
                <Col>
                <ListGroup className="border-0">
                  <ListGroup.Item className="border-0">
                      Description: {product.description}
                    </ListGroup.Item>
                </ListGroup>
                </Col>
              </Row>
              
              <Row className='mt-4' >
                <h4> Технические характеристики </h4>
                 
                  
                  
              <Col md={3} sm={6} className='mt-2'>
                <ListGroup>
                  {product.info?.map((i) => (
                    <ListGroup.Item   className='d-flex border-0' >
                      <h6>{i.title}</h6>
                    </ListGroup.Item>    
                  ))}
                </ListGroup>
              </Col>
              <Col md={3} sm={6} className='mt-2'>
              <ListGroup className='d-flex'>   
                {product.info?.map((i) => (
                  <ListGroup.Item   className='d-flex  border-0 flex-end' >
                    <h6 className="flex-end">{i.information}</h6>
                  </ListGroup.Item>    
                ))}
               </ListGroup> 
              </Col>
              </Row>
              <Row>
                <Col md={6} >
                  <h4>Reviews</h4>  
                  {product.reviews.length === 0 && <Message variant='info' >No Reviews</Message> }              
                  <ListGroup variant='flush' >
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id} >
                        <strong>{review.name}</strong>
                        <Rating  value={review.rating} color='#f8e825' / >
                        <p>{review.createdAt?.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}

                    <ListGroup.Item>
                      <h4>Write a review</h4>

                      {loadingProductReview && <Loader /> }
                      {successProductReview && <Message variant='success' >Review Submitted</Message> }
                      {errorProductReview && <Message variant='danger' >{errorProductReview}</Message> }


                      {userInfo ? (
                        <Form onSubmit={submitHandler} >
                          <Form.Group  >
                            <Form.Label>
                              Rating
                            </Form.Label>
                            <Form.Control
                              as='select'
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </Form.Control>
                          </Form.Group> 

                          <Form.Group controlId='comment' >
                            <Form.Label>Review</Form.Label>
                            <Form.Control as='textarea' row='6' value={comment} onChange={(e) => setComment(e.target.value)} >

                            </Form.Control>
                          </Form.Group>

                          <Button 
                            disabled={loadingProductReview} 
                            type='submit'
                            variant='primary'
                            className='btn btn-primary mt-2'
                          >
                            Submit
                          </Button>

                        </Form>
                      ) : (
                        <Message variant='info' >Please <Link to='/login'>login</Link>to write a review </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>                  
              </Row>                    
            </div>
            )
        }
    </div>
  )
}

export default ProductScreen