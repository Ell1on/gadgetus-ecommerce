import React, {useState, useEffect} from 'react'
import { Form, button, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation,  } from 'react-router-dom';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

function LoginScreen() {
    
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    },[navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))  
    }


    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger' >{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler} className="d-grid gap-2">

                <Form.Group controlId='email' >
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    {/* <Form.Control 
                        type='email' 
                        placeholder='Enter Email'
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}   
                    >
                    </Form.Control> */}
                    <div className="form-floating mb-3">
                        <input 
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
                    {/* <Form.Control 
                        type='password' 
                        placeholder='Enter password'
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}   
                    >
                    </Form.Control> */}
                    <div className="form-floating">
                        <input 
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
                <Button
                    type='submit'
                    variant='primary'
                    className="form-floating mt-3 btn btn-lg"
                >
                    Sign In
                </Button>
            </Form>
            <Row className="py-3" >
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : `/register`} >Register</Link>
                </Col>
            </Row>    
        </FormContainer>
    )
}

export default LoginScreen