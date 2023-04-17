import React, {useState, useEffect} from 'react'
import { Table,  Row, Col, Button } from 'react-bootstrap';
import { Link, useParams,useNavigate, useLocation,  } from 'react-router-dom';
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';

import Message from './../components/Message';
import { listProductsCategories, deleteProduct, createProduct, createCategory } from '../actions/productActions';
import { LinkContainer } from 'react-router-bootstrap';
import { PRODUCT_CATEGORY_RESET } from '../constants/productConstants'; 
import { productListReducers } from './../reducers/productReducers';
import { deleteCategory } from './../actions/productActions';

function CategoryListScreens() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productCategoryList = useSelector(state => state.productCategoryList) 
    const {loading, error, categories} = productCategoryList

    const userLogin = useSelector(state => state.userLogin) 
    const {userInfo} = userLogin

    const categoryDelete = useSelector(state => state.categoryDelete)
    const {loading:loadingCategoryDelete, error:errorCategoryDelete, success:successCategoryDelete} = categoryDelete

    const productCategory = useSelector(state => state.productCategory) 
    const {loading:loadingCategory, error:errorCategory, success:successCategory, category: createdCategory} = productCategory 

    console.log(categories);
    
    useEffect(() => {
        dispatch({type:PRODUCT_CATEGORY_RESET})

        if(!userInfo.isAdmin )
        {
            navigate('/login')
        }

        if(successCategory)
        {
            navigate(`/admin/category/${createdCategory._id}/edit`)
        }else{
            dispatch(listProductsCategories())
        }

        

    }, [ dispatch, navigate, userInfo, successCategory,createdCategory, successCategoryDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteCategory(id))
        }
        
    }

    const createCategoryHandler = () => {
        dispatch(createCategory())
    }

  return (
    <div>
        <Row className="align-items-center" >
            <Col>
                <h1>Categories</h1>
            </Col>

            <Col className='text-end' >
                <Button className='my-3' onClick={createCategoryHandler} >
                    <i className='fa fa-plus' ></i> Create Category
                </Button>
            </Col>
        </Row>




        {loading 
            ? (<Loader/>) 
            : error
            ? (<Message variant='danger'>{error}</Message>)
            :   
            (
                <Table striped bordered hover responsive className='table-sm' >
                        <thead>
                            <tr>
                                <th>ID</th>

                                <th>CATEGORIES</th>
                                <th></th>
                            </tr>
                        </thead>

                    <tbody>
                        {categories?.map(category => (
                            <tr key={category._id} >
                                <td>{category._id}</td>
                                <td>{category.category}</td>

                                <td>
                                    <div className='text-end' >
                                    <LinkContainer to={`/admin/category/${category._id}/edit`}  >
                                        <Button variant='light' className='btn-sm' >
                                           <i className="fa fa-edit"></i>
                                        </Button> 
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(category._id) }>
                                        <i className="fa fa-trash"></i>
                                    </Button> 
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            )
        }
    </div>
  )
}

export default CategoryListScreens