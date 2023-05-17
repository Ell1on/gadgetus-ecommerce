import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listTopCategories, listProductsCategories } from '../actions/productActions'
import Product from './../components/Product';
import Carousel from 'react-multi-carousel'
import { PRODUCT_CATEGORY_TOP_RESET } from './../constants/productConstants';
import { Card, Col, Container, Row  } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { CardGroup } from 'react-bootstrap';



function TopCategoriesScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    
    const topCategories = useSelector(state => state.topCategories)
    const {error, loading, categories} = topCategories
    console.log("FAFDF", categories);

    // const productCategoryList = useSelector(state => state.productCategoryList) 
    // const {loading:loadingCat, error:errorCat,categories} = productCategoryList
   
    useEffect(() => {
        dispatch({type:PRODUCT_CATEGORY_TOP_RESET})
        // dispatch(listTopCategories())
        dispatch(listTopCategories())

        
    }, [ dispatch, navigate,])

    


   console.log(id);

    return (
        
  <Row xs={1} md={2} lg={3} xl={6} className="no-gutters">
    
    {categories?.map((category, index) => (
      <Col  className="mb-4">
        <Card className="rounded border-0 mx-2 square-card">
          <Card.Body>
            <LinkContainer to={`/admin/categories/categorylist/${category._id}`}>
              <Card.Title>{category.category}</Card.Title>
            </LinkContainer>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>



                
    )
}

export default TopCategoriesScreen