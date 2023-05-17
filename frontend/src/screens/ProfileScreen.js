import React, {useState, useEffect} from 'react'
import { Form, button, Row, Col, Button, Table } from 'react-bootstrap';
import { Link, useNavigate, useLocation,  } from 'react-router-dom';
import Loader from '../components/Loader'

import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from './../components/Message';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { getOrderProfile } from '../actions/orderActions';
import { Card } from 'primereact/card';
import { LinkContainer } from 'react-router-bootstrap';

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

  const orderProfile = useSelector(state => state.orderProfile)
  const {orders} = orderProfile

  useEffect(() => {
      if(!userInfo) {
        navigate('/login')
      }else{
        if(!user || !user.name || success || userInfo._id !==user._id ){
          dispatch({type: USER_UPDATE_PROFILE_RESET})
          dispatch(getUserDetails('profile'))
          dispatch(getOrderProfile())
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
  console.log(orders);

  const [activeTab, setActiveTab] = useState('profile'); // Состояние активной вкладки

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
 
  return (

    <Row>
        <Col md={3}>
            <Card className="mt-2">
                <div className="d-grid">
                    <button
                        className={`btn btn-outline-primary mb-2 ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => handleTabChange('profile')}
                    >
                        Профиль
                    </button>
                    <button
                        className={`btn btn-outline-primary ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => handleTabChange('orders')}
                    >
                        Заказы
                    </button>
                </div>
            </Card>
        </Col>
      {activeTab === 'profile' && (
        <Col md={6} >
            <div> 
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
            </div>
        </Col>
      )}
      {activeTab === 'orders' && (
        <Col md={9}>
          <h2>My Orders</h2>
          
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map(order => (
                        <tr>
                            <td>{order._id}</td>
                            <td>{order.createdAt?.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid}</td>
                            <td>{order.isDelivered}</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`} > 
                                    <Button className='btn-sm' > 
                                        Details
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Col>
      )}
    </Row>

  )
}

export default ProfileScreen