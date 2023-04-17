import React, {useState, useEffect} from 'react'
import { Form, button, Row, Col, Button } from 'react-bootstrap';
import {Link, useParams, useNavigate, Navigate} from 'react-router-dom'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { listCategoriesDetails, updateCategory, createInfo, createCategory,  } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Message from './../components/Message';
import { PRODUCT_CATEGORY_UPDATE_RESET } from './../constants/productConstants';
import { PRODUCT_CREATE_INFO_RESET, PRODUCT_BRAND_RESET, PRODUCT_CATEGORY_RESET } from './../constants/productConstants';
import axios from 'axios';
import { login } from './../actions/userActions';
import FormInput from './../components/Input';

function CategoryEditScreen() {

    const {id} = useParams();     
    const [name, setName] = useState('')
 
    const navigate = useNavigate()
    const dispatch = useDispatch()
 
    const categoryDetails = useSelector(state => state.categoryDetails)
    const {error, loading, category} = categoryDetails

    const productUpdateCategory = useSelector(state => state.productUpdateCategory)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = productUpdateCategory

    useEffect(() => {

        if(successUpdate) {
            dispatch({type:PRODUCT_CATEGORY_UPDATE_RESET})
            navigate('/admin/categories')
        } else {

            if(!category || category._id !== Number(id)) {
                dispatch(listCategoriesDetails(id))
            } else {
                if (category && category.category) {
                    setName(category.category);
                }
            }
        }
    }, [id, dispatch, navigate, successUpdate, category]);

    console.log(category)

    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(updateCategory({
            _id:id,
            name,
        }))
    }

    return (
        <div>
            <Link to='/admin/categories'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Category</h1>
                {loadingUpdate && <Loader /> }
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }

                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler} className="d-grid gap-2">
                        <Form.Group controlId='brand'>
                            <Form.Label>
                                Brand 
                            </Form.Label>
                            <div className="form-floating">
                                <input 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    type="text" 
                                    className="form-control" 
                                    id="floatingInput" 
                                    placeholder="Enter Brand"
                                />
                                <label className="opacity-50" htmlFor="floatingInput">Enter Brand</label>
                            </div>
                        </Form.Group>
                    
                        <Button
                            type='submit'
                            variant='primary'
                            className="form-floating mt-3 btn btn-lg"
                        >
                            Update
                        </Button> 
                    </Form>    
                ) }
            </FormContainer>
        </div>
    )
}

export default CategoryEditScreen