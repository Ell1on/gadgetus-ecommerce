import React, {useState, useEffect} from 'react'
import { Form, button, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation,  } from 'react-router-dom';
import Loader from '../components/Loader'

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from './../components/Message';

function RegisterScreen() {

    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
 
    const navigate = useNavigate()
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    },[navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();

        if(password != confirmPassword) {
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name, email, password)) 
        }
   
    }

  return (
    <FormContainer>
            <h1>Create an account</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger' >{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler} className="d-grid gap-2">

                <Form.Group controlId='name' >
                    <Form.Label>
                       Name
                    </Form.Label>
                    <div className="form-floating">
                        <input 
                            required
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            type="name" 
                            className="form-control" 
                            id="floatingInput" 
                            placeholder="name@example.com"
                        />
                        <label className="opacity-50" for="floatingInput">Enter Name</label>
                    </div>
                </Form.Group>

                <Form.Group controlId='email' >
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <div className="form-floating">
                        <input 
                            required
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            className="form-control" 
                            id="floatingInput" 
                            placeholder="name@example.com"
                        />
                        <label className="opacity-50" for="floatingInput">Enter Email</label>
                    </div>
                </Form.Group>

                <Form.Group controlId='password' >
                    <Form.Label>
                        Password
                    </Form.Label>
                    <div className="form-floating">
                        <input 
                            required
                            type="password" 
                            className="form-control" 
                            id="floatingPassword"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="opacity-50" for="floatingPassword">Enter Password</label>
                    </div>
                </Form.Group>

                <Form.Group controlId='passwordConfirm' >
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <div className="form-floating">
                        <input 
                            required
                            type="password" 
                            className="form-control" 
                            id="floatingPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label className="opacity-50" for="floatingPassword">Confirm Password</label>
                    </div>
                </Form.Group>
                
                <Button
                    type='submit'
                    variant='primary'
                    className="form-floating mt-3 btn btn-lg"
                >
                    Register
                </Button> 

            </Form>   
            <Row className="py-3" >
                <Col>
                    Already Registered? <Link to={redirect ? `/login?redirect=${redirect}` : `/login`} >Sign In</Link>
                </Col>
            </Row>  

    </FormContainer>
  )
}

export default RegisterScreen