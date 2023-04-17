import React, {useState, useEffect} from 'react'
import { Table,  Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation,  } from 'react-router-dom';
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from './../components/Message';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { LinkContainer } from 'react-router-bootstrap';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'; 
import { productListReducers } from './../reducers/productReducers';

function ProductListScreens() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productList = useSelector(state => state.productList) 
    const {loading, error, products} = productList

    const productDelete = useSelector(state => state.productDelete) 
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete 

    const userLogin = useSelector(state => state.userLogin) 
    const {userInfo} = userLogin

    const productCreate = useSelector(state => state.productCreate) 
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct} = productCreate

    
    
    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin )
        {
            navigate('/login')
        }

        if(successCreate)
        {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts())
        }

    }, [ dispatch, navigate, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteProduct(id))
        }
        
    }

    const createProductHandler = (id) => {
        dispatch(createProduct(id))
    }

  return (
    <div>
        <Row className="align-items-center" >
            <Col>
                <h1>Products</h1>
            </Col>

            <Col className='text-end' >
                <Button className='my-3' onClick={createProductHandler} >
                    <i className='fa fa-plus' ></i> Create Product
                </Button>
            </Col>
        </Row>

        {loadingDelete && <Loader /> }
        {errorDelete && <Message variant='danger'>{errorDelete}</Message> }

        {loadingCreate && <Loader /> }
        {errorCreate && <Message variant='danger'>{errorCreate}</Message> }

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
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>

                    <tbody>
                        {products?.map(product => (
                            <tr key={product._id} >
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product?.categories}</td>
                                <td>{product?.brands}</td>

                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}  >
                                        <Button variant='light' className='btn-sm' >
                                           <i className="fa fa-edit"></i>
                                        </Button> 
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id) }>
                                        <i className="fa fa-trash"></i>
                                    </Button> 
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

export default ProductListScreens