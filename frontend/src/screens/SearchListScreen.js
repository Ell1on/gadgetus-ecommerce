import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form,  } from 'react-bootstrap'
import Rating from '../components/Rating';
import axios from 'axios'
import {useDispatch, useSelector } from 'react-redux'
import {listProductsDetails, listProducts, listProductByCategoriesDetails} from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listSearch } from '../actions/productActions';
import Sort from '../components/Sort';
import Filters from '../components/Filters';
import Product from '../components/Product';


function SearchListScreen({}) {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams();
    const {_id} = useParams();
    console.log("dasd", id);
    console.log("DAD", _id);
  
    const searchList = useSelector((state) => state.searchList);
    const { loading, error, products } = searchList;

    console.log(products);
    // useEffect(() =>{
    //     dispatch(listSearch())

    // }, [dispatch, id])

    return (
        <div>
          <Sort/>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                  {/* <Col xl={3} className='bg-grey' >
                      <Filters product={products} />
                  </Col> */}
                    {Array.isArray(products) && products.map(product => (
                        <Col key={product._id}  md={6} lg={4} xl={3}>
                            <Product product={product} _id={_id} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    )
}

export default SearchListScreen