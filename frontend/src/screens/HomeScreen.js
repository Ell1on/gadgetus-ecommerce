import React, {useState, useEffect} from 'react'
import { Row, Col, CardGroup } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
import {listProducts} from '../actions/productActions'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useLocation } from 'react-router-dom';
import ProductCarousel from './ProductCarousel'
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-multi-carousel'
import ProductPopularCarousel from './ProductPopularCarousel';
import ProductBestSelling from './ProductBestSelling';
import TopCategoriesScreen from './TopCategoriesScreen'

function HomeScreen() {

  const dispatch = useDispatch()
  const location = useLocation()
  let keyword = location.search
  const productList = useSelector(state => state.productList)
  const {error, loading, products} = productList
  console.log(keyword);

  useEffect(() =>{
    dispatch(listProducts(keyword))

  }, [dispatch, keyword])
  
  

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 30,
      slidesToslide: 3
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
      partialVisibilityGutter: 30,
      slidesToslide: 3
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
      partialVisibilityGutter: 30,
      slidesToslide: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div>
      {!keyword && <ProductCarousel /> }
      
        <h1>Latest Products</h1>
        {loading ? <Loader/>   
          : error ? <Message variant='danger' >{error}</Message>
            :
            <Carousel responsive={responsive} 
              swipeable={false}
              draggable={false}
              showDots={false}
              ssr={false} 
              infinite={true}
              autoPlaySpeed={300}
              keyBoardControl={true}
              customTransition="all .1"
              transitionDuration={100}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              
              
            >   
            
              {Array.isArray(products) && products?.map((product, index) => (
                  <div key={product._id}>
                      <Product len={products.length}  product={product} index={index}  />
                  </div>
              ))}
              
            </Carousel>
            
        
              }
      <TopCategoriesScreen />

      <ProductPopularCarousel />   
      <ProductBestSelling />
    </div>
  )
}

export default HomeScreen