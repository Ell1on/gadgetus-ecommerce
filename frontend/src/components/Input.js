import React, {useState, useEffect} from "react";
import { Form, button, Row, Col, Button } from 'react-bootstrap';
import { listProductsDetails, updateProduct, createInfo, updateProductInfo, deleteProductInfo } from '../actions/productActions';
import {Link, useParams, useNavigate, Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_UPDATE_INFO_RESET } from './../constants/productConstants';
import Message from './../components/Message';
import Loader from '../components/Loader'

function FormInput(props) {

  const productUpdateInfo = useSelector(state => state.productUpdateInfo)
  const {loading:loadingUpdateInfo, error:errorUpdateInfo, success:successUpdateInfo} = productUpdateInfo

  const productDeleteInfo = useSelector(state => state.productDeleteInfo) 
  const {loading:loadingDeleteInfo, error:errorDeleteInfo, success:successDeleteInfo} = productDeleteInfo 

  const [inputType] = useState(props.type);
  const [inputValue, setInputValue] = useState(props.title);
  const [inputInfo, setInputInfo] = useState(props.information);

  const dispatch = useDispatch();

  function handleValueChange(event) {
    setInputValue(event.target.value);
    
  
  }
  function handleInfoChange(event) {

    setInputInfo(event.target.value);
  
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateProductInfo(props.pk, props.pk_alt, inputValue, inputInfo))
};
  

  useEffect(() => {
    dispatch({type:PRODUCT_UPDATE_INFO_RESET})


}, [dispatch, successUpdateInfo, successDeleteInfo])

const deleteHandler = () => {
  if(window.confirm('Are you sure you want to delete this Info?')){
      dispatch(deleteProductInfo(props.pk, props.pk_alt))
  }
  
}

  return (
    <>

    {loadingDeleteInfo && <Loader /> }
    {errorDeleteInfo && <Message variant='danger'>{errorDeleteInfo}</Message> }

    {loadingUpdateInfo && <Loader /> }
    {successUpdateInfo && <Message variant='success' >Info Submitted</Message> }
    {errorUpdateInfo && <Message variant='danger' >{errorUpdateInfo}</Message> }
    
    <Form.Group  className='d-flex  justify-content-between ' >  
    <div className='d-flex' pk_alt={props.pk_alt} id={props.pk}>
    
      <div className="m-2">
      <input 
          type={inputType} 
          value={inputValue}
          placeholder={inputValue}
          name={inputValue}
          onChange={handleValueChange} 
          className="form-control "
        />
        
      </div>
      
      <div className="m-2">
      <input 
          type={inputType} 
          value={inputInfo}
          placeholder={inputInfo}
          
          onChange={handleInfoChange} 
          className="form-control"
        />
      </div>
    </div>  
    <div className=' align-self-center p-2' >

    <Button variant='danger' onClick={() => deleteHandler(props.pk, props.pk_alt) }>
      <i className="fa fa-trash"></i>
    </Button> 

    <Button

        variant='primary'
        className=" align-self-center outline ms-2"
        onClick={handleSubmit}
    >
        <i className='fa fa-plus'  ></i>
    </Button>
    </div>
        
    </Form.Group>
    </>
  );
}
export default FormInput;