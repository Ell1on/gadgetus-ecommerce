import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPopularProducts } from '../actions/productActions'
import Product from './../components/Product';
import Carousel from 'react-multi-carousel'


function ProductPopularCarousel() {
    const dispatch = useDispatch()

    const productPopular = useSelector(state => state.productPopular)
    const {error, loading, products} = productPopular
   
    useEffect(() => {
        dispatch(listPopularProducts())
    }, [dispatch])

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1024 },
          items: 4,
          slidesToslide: 3
        },
        desktop: {
          breakpoint: { max: 1024, min: 800 },
          items: 3,
          slidesToslide: 3
        },
        tablet: {
          breakpoint: { max: 800, min: 464 },
          items: 2,
          slidesToslide: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
        <div>        
        <h1>Популярные товары</h1>
        {loading ? <Loader/>   
            : error ? <Message variant='danger' >{error}</Message>
            :
        <Carousel responsive={responsive} 
            swipeable={false}
            draggable={false}
            showDots={false}
            
            ssr={false} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={300}
            keyBoardControl={true}
            customTransition="all .1"
            transitionDuration={100}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
                {Array.isArray(products) && products.map(product => (

                    <div key={product._id}  >
                        <Product product={product} />
                    </div>
                ))}
        </Carousel>
        }
    </div>
                
    )
}

export default ProductPopularCarousel