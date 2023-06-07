import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listTopProducts } from '../actions/productActions'

function ProductCarousel() {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {error, loading, products} = productTopRated
   
    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (
        loading ? <Loader />
        : error
        ? <Message variant='danger'>{error}</Message>
        : (
            <Carousel pause='hover' className='bg-dark mx-2 ' >


                {Array.isArray(products) && products.map(product => (
                    <Carousel.Item key={product._id} >
                        <Link to={`/product/${product._id}`} className='text-decoration-none ' >
                            <Carousel.Caption className='' >
                                
                            </Carousel.Caption>
                            <h4 className='text-center pt-4 text-white' >{product.name}  </h4>
                            <Image src={product?.images?.length > 0 ? product?.images[0].image : ''} alt={product.name} fluid />
                            
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default ProductCarousel