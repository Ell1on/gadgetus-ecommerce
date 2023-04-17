import React, {useState, useEffect} from 'react'
import { Table,  Row, Col, Button } from 'react-bootstrap';
import { Link, useParams,useNavigate, useLocation,  } from 'react-router-dom';
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from './../components/Message';
import { listProductsBrands, deleteProduct, createProduct, createCategory, createBrand } from '../actions/productActions';
import { LinkContainer } from 'react-router-bootstrap';
import { PRODUCT_BRAND_RESET } from '../constants/productConstants'; 
import { productListReducers } from './../reducers/productReducers';
import { deleteBrand } from './../actions/productActions';

function ProductListScreens() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productBrandsList = useSelector(state => state.productBrandsList) 
    const {loading, error, brands} = productBrandsList

    const productDelete = useSelector(state => state.productDelete) 
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete 

    const userLogin = useSelector(state => state.userLogin) 
    const {userInfo} = userLogin

    const brandDelete = useSelector(state => state.brandDelete)
    const {loading:loadingBrandDelete, error:errorBrandDelete, success:successBrandDelete} = brandDelete

    const productCreate = useSelector(state => state.productCreate) 
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct} = productCreate

    const productBrand = useSelector(state => state.productBrand) 
    const {loading:loadingBrand, error:errorBrand, success:successBrand, brand: createdBrand} = productBrand 

    
    
    useEffect(() => {
        dispatch({type:PRODUCT_BRAND_RESET})

        if(!userInfo.isAdmin )
        {
            navigate('/login')
        }

        if(successBrand)
        {
            navigate(`/admin/brand/${createdBrand._id}/edit`)
        }else{
            dispatch(listProductsBrands())
        }

        

    }, [ dispatch, navigate, userInfo, successDelete, successCreate, successBrand,createdBrand, successBrandDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteBrand(id))
        }
        
    }
    console.log(brands);

    const createBrandHandler = () => {
        dispatch(createBrand())
    }

  return (
    <div>
        <Row className="align-items-center" >
            <Col>
                <h1>Brands</h1>
            </Col>

            <Col className='text-end' >
                <Button className='my-3' onClick={createBrandHandler} >
                    <i className='fa fa-plus' ></i> Create Brand
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

                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>

                    <tbody>
                        {brands?.map(brand => (
                            <tr key={brand._id} >
                                <td>{brand._id}</td>
                                <td>{brand.brand}</td>

                                <td>
                                    <div className='text-end' >
                                    <LinkContainer to={`/admin/brand/${brand._id}/edit`}  >
                                        <Button variant='light' className='btn-sm' >
                                           <i className="fa fa-edit"></i>
                                        </Button> 
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(brand._id) }>
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

export default ProductListScreens