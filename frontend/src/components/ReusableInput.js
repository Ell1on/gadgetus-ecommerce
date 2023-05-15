import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { updateCategorySection } from '../actions/productActions';
import { useDispatch } from 'react-redux';

const ReusableInput = (props) => {

    const dispatch = useDispatch()

    const [value, setValue] = useState(props.value)

    const handleChange =(e) => {
        e.preventDefault()
        setValue(e.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        // const ids = event.target.selectedOptions[0].getAttribute("data-custom");
        dispatch(updateCategorySection(props.idcat, props.idsec, value));
        console.log(props.idcat);
        console.log(props.idsec);
        console.log(value);
        
    }



    return (
        <Form.Group className="d-flex align-items-center mt-3">
    <input 
      value={value}
      onChange={handleChange} 
      className="form-control d-flex"
      
    />

    <Button
        className='ms-3'
        onClick={handleSubmit} 
    > 

      <i className="fa fa-plus"></i>
    </Button>

    </Form.Group>
    );
};

export default ReusableInput;