import React, {useState, useEffect} from 'react'
import { Form, button, Row, Col, Button } from 'react-bootstrap';
import {Link, useParams, useNavigate, Navigate} from 'react-router-dom'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { listCategoriesDetails, updateCategory, createInfo, createCategory, createSection,  } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Message from './../components/Message';
import { PRODUCT_CATEGORY_UPDATE_RESET } from './../constants/productConstants';
import { PRODUCT_CREATE_INFO_RESET, PRODUCT_BRAND_RESET, PRODUCT_CATEGORY_RESET } from './../constants/productConstants';
import axios from 'axios';
import { login } from './../actions/userActions';
import FormInput from './../components/Input';
import ReusableInput from '../components/ReusableInput';

function CategoryEditScreen() {

    const {id} = useParams();     
    const [name, setName] = useState('')
    const [sec, setSec] = useState('')
 
    const navigate = useNavigate()
    const dispatch = useDispatch()
 
    const categoryDetails = useSelector(state => state.categoryDetails)
    const {error, loading, category} = categoryDetails

    const productUpdateCategory = useSelector(state => state.productUpdateCategory)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = productUpdateCategory

    const productSection = useSelector(state => state.productSection) 
    const {loading:loadingSection, error:errorSection, success:successSection, section: createdSection} = productSection 

    const productCategoryList = useSelector(state => state.productCategoryList) 
    const {loadingCats, errorCats, categories} = productCategoryList

    const cats = categories?.find((categ) => categ._id == id)
    console.log(cats);

    useEffect(() => {

        if(successUpdate) {
            dispatch({type:PRODUCT_CATEGORY_UPDATE_RESET})
            navigate('/admin/categories')
        } else {

            if (cats && cats._id === Number(id)) {
                dispatch(listCategoriesDetails(id))
            } else {
                if (cats && cats.category) {
                    setName(cats.category);
                }
            }
        }
    }, [id, dispatch, navigate, successUpdate, category, createdSection]);

    console.log(category)

    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(updateCategory({
            _id:id,
            name,
        }))
    }

    const submitSectionHandler = (e) => {
        e.preventDefault()
        dispatch(createSection(id))
        console.log(id);
    }

    const handleChange = (e) => {
        setSec(e.target.value)
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
                                Category 
                            </Form.Label>
                            <div className="form-floating">
                                <input 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    type="text" 
                                    className="form-control" 
                                    id="floatingInput" 
                                    placeholder="Enter Category"
                                />
                                <label className="opacity-50" htmlFor="floatingInput">Enter Category</label>
                            </div>
                        </Form.Group>

                        <Button
                            variant='primary'
                            className="form-floating mt-3 btn btn-lg"
                            onClick={submitSectionHandler}
                        >
                            Create Section
                        </Button> 



                        <div>
                            {cats?.section != 0? <h5>Название Секции</h5> : ''}
                        
                        
                            {cats?.section?.map((cat) => (
                                <ReusableInput  value={cat.section} idcat={id} idsec={cat._id} />
                            ))}
                        </div>         
                    
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