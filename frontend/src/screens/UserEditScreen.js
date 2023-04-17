import React, {useState, useEffect} from 'react'
import { Form, button, Row, Col, Button } from 'react-bootstrap';
import {Link, useParams, useNavigate, Navigate} from 'react-router-dom'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from './../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';

function UserEditScreen() {

    const {id} = useParams(); 
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isAdmin, setAdmin] = useState()
    const navigate = useNavigate()

    const dispatch = useDispatch()
 
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails
    
    const userUpdate = useSelector(state => state.userUpdate)
    const {error:errorUpdate, loading:loadingUpdadte, success:successUpdate} = userUpdate
  
    useEffect(() => {

        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            navigate('/admin/userlist')
        }else{
            if(!user.name || user._id !== Number(id)){
                dispatch(getUserDetails(id))
            }else{
                setName(user.name)
                setEmail(user.email)
                setAdmin(user.isAdmin)
            }
        }

    },[user, id, successUpdate, navigate])
   

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({_id:user._id, name, email, isAdmin}))
    }

  return (
    <div>
        <Link to='/admin/userlist'>
            Go Back
        </Link>

         <FormContainer   >
            <h1>Edit User</h1>
            {loadingUpdadte && <Loader /> }
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}  className="d-grid gap-2">

                    <Form.Group controlId='name' >
                        <Form.Label>
                        Name
                        </Form.Label>
                        <div className="form-floating">
                            <input 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                type="name" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="name@example.com"
                            />
                            <label className="opacity-50">Enter Name</label>
                        </div>
                    </Form.Group>

                    <Form.Group controlId='email' >
                        <Form.Label>
                            Email Address
                        </Form.Label>
                        <div className="form-floating">
                            <input 
                                
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="name@example.com"
                            />
                            <label className="opacity-50">Enter Email</label>
                        </div>
                    </Form.Group>

                    <Form.Group controlId='isadmin' >
                        
                        <fieldset className="form-group">
                            <legend className="mt-2"></legend>
                            <div className="form-check">
                                <input type="checkbox" 
                                        label='Is Admin' 
                                        id="isAdmin"
                                        ckecked={isAdmin}
                                        onChange={(e) => setAdmin(e.target.checked)} 
                                        
                                        className="form-check-input"  
                                        
                                        />
                                <label className="form-check-label">
                                    Is Admin
                                </label>
                            </div>
                        </fieldset>
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

export default UserEditScreen