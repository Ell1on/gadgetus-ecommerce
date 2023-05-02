import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form,  } from 'react-bootstrap'
import Rating from '../components/Rating';
import axios from 'axios'
import {useDispatch, useSelector } from 'react-redux'
import {listProductsDetails, listProducts, listProductByCategoriesDetails} from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_INFO_RESET } from './../constants/productConstants';
import Product from './../components/Product';
import Sort from '../components/Sort';
import Filters from '../components/Filters';


function ProductByCategoryScreen({}) {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams();
  
    const productByCategory = useSelector(state => state.productByCategory) 
    const {loading:loadingByCat, error:errorByCat, products} = productByCategory 

    console.log(products);
    useEffect(() =>{
        // dispatch(listProductByCategoriesDetails({id:id}));

    }, [dispatch, id])



    return (
      <div>
        <Sort id={id} />
          {loadingByCat ? (
              <Loader />
          ) : errorByCat ? (
              <Message variant='danger'>{errorByCat}</Message>
          ) : (
              <Row>
                <Col xl={3} className='bg-grey' >
                    <Filters product={products} id={id} />
                </Col>
                  {Array.isArray(products) && products.map(product => (
                      <Col key={product._id}  md={6} lg={4} xl={3}>
                          <Product product={product} />
                      </Col>
                  ))}
              </Row>
          )}
      </div>
  )
}

export default ProductByCategoryScreen