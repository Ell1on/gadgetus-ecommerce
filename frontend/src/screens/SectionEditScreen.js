import React, {useState, useEffect} from 'react'
import { Form, button, Row, Col, Button } from 'react-bootstrap';
import {Link, useParams, useNavigate, Navigate} from 'react-router-dom'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { listSectionDetails, updateSection, createInfo, createCategory,  } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Message from './../components/Message';
import { PRODUCT_SECTION_UPDATE_RESET } from './../constants/productConstants';
import { PRODUCT_CREATE_INFO_RESET, PRODUCT_BRAND_RESET, PRODUCT_CATEGORY_RESET } from './../constants/productConstants';
import axios from 'axios';
import { login } from './../actions/userActions';
import FormInput from './../components/Input';

function SectionEditScreen() {

    const {id} = useParams();     
    const [name, setName] = useState('')
 
    const navigate = useNavigate()
    const dispatch = useDispatch()
 
    const sectionDetails = useSelector(state => state.sectionDetails)
    const {error, loading, section} = sectionDetails

    const productUpdateSection = useSelector(state => state.productUpdateSection)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = productUpdateSection

    useEffect(() => {

        if(successUpdate) {
            dispatch({type:PRODUCT_SECTION_UPDATE_RESET})
            navigate('/admin/sections')
        } else {

            if(!section || section._id !== Number(id)) {
                dispatch(listSectionDetails(id))
            } else {
                if (section && section.section) {
                    setName(section.section);
                }
            }
        }
    }, [id, dispatch, navigate, successUpdate, section]);

    console.log(section)

    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(updateSection({
            _id:id,
            name,
        }))
    }

    return (
        <div>
            <Link to='/admin/sections'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Section</h1>
                {loadingUpdate && <Loader /> }
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }

                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler} className="d-grid gap-2">
                        <Form.Group controlId='brand'>
                            <Form.Label>
                                Section 
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
                                <label className="opacity-50" htmlFor="floatingInput">Enter Section</label>
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

export default SectionEditScreen