import React, {useState, useEffect} from 'react'
import { Form, button, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation,  } from 'react-router-dom';
import Loader from '../components/Loader'

import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from './../components/Message';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

function ProfileScreen() {

  const location = useLocation()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const userDetails = useSelector(state => state.userDetails)
  const {error, loading, user} = userDetails
  console.log(user);

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const success = userUpdateProfile

  useEffect(() => {
      if(!userInfo) {
        navigate('/login')
      }else{
        if(!user || !user.name || success || userInfo._id !==user._id ){
          dispatch({type: USER_UPDATE_PROFILE_RESET})
          dispatch(getUserDetails('profile'))
        }else{
          setName(user.name)
          setEmail(user.email)
        }
      }
  },[dispatch, navigate, userInfo, user, success])

  const submitHandler = (e) => {
      e.preventDefault();

      if(password != confirmPassword) {
          setMessage('Passwords do not match')
      }else{
          dispatch(updateUserProfile({
            'id': user._id, 
            'name': name,
            'email': email,
            'password': password,
          }))
          setMessage('')
      }
  }
 
  return (
    <Row>
      <Col md={3} >
          <h2>User Profile</h2>
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
                    Update
                </Button> 

            </Form> 
          
      </Col>
      <Col md={9} >
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen