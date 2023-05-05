import React, {useState, useEffect} from 'react'
import { Form, button, Row, Col, Button } from 'react-bootstrap';
import {Link, useParams, useNavigate, Navigate} from 'react-router-dom'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { listSubsectionDetails, updateSubsection, createInfo, createCategory,  } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Message from './../components/Message';
import { PRODUCT_SUBSECTION_UPDATE_RESET } from './../constants/productConstants';
import { PRODUCT_CREATE_INFO_RESET, PRODUCT_BRAND_RESET, PRODUCT_CATEGORY_RESET } from './../constants/productConstants';
import axios from 'axios';
import { login } from './../actions/userActions';
import FormInput from './../components/Input';

function SubsectionEditScreen() {

    const {id} = useParams();     
    const [name, setName] = useState('')
 
    const navigate = useNavigate()
    const dispatch = useDispatch()
 
    const subsectionDetails = useSelector(state => state.subsectionDetails)
    const {error, loading, subsection} = subsectionDetails

    const productUpdateSubsection = useSelector(state => state.productUpdateSubsection)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = productUpdateSubsection

    useEffect(() => {

        if(successUpdate) {
            dispatch({type:PRODUCT_SUBSECTION_UPDATE_RESET})
            navigate('/admin/subsections')
        } else {

            if(!subsection || subsection._id !== Number(id)) {
                dispatch(listSubsectionDetails(id))
            } else {
                if (subsection && subsection.subsection) {
                    setName(subsection.subsection);
                }
            }
        }
    }, [id, dispatch, navigate, successUpdate, subsection]);

    console.log(subsection)

    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(updateSubsection({
            _id:id,
            name,
        }))
    }

    return (
        <div>
            <Link to='/admin/subsections'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Subsection</h1>
                {loadingUpdate && <Loader /> }
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }

                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler} className="d-grid gap-2">
                        <Form.Group controlId='brand'>
                            <Form.Label>
                                Subsection 
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
                                <label className="opacity-50" htmlFor="floatingInput">Enter Subsection</label>
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

export default SubsectionEditScreen