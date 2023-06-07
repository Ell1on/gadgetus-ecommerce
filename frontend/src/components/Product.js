import React from 'react'
import {Card, CardGroup, Image, Col} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';

function Product({len, product, index}) {

    console.log(product);
    return (
    
      <Card className={`mb-4 rounded border-0 ${index === 0 ? 'ml-0' : ''} ${index === product.length - 1 ? 'mr-0' : ''} mx-2`}>
        <Link to={`/product/${product._id}`}>
            <Image src={product?.images?.length > 0 ? product?.images[0].image : ''} fluid  className="d-flex align-items-center" style={{ height: "210px" }}/>
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <div className="my-3">
              <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
            </div>
          </Card.Text>
          <Card.Text as="h3">Р{product.price}</Card.Text>
        </Card.Body>
      </Card>
     
    );
}

export default Product