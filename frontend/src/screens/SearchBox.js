import React, {useState} from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';

function SearchBox() {
    const [keyword, setKeyword] = useState('');
  
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (keyword) {
        navigate(`/?keyword=${keyword}`);
      } else {
        navigate(navigate(location.pathname));
      }
    };
  
    return (
        <div className="ps-5 px-5" style={{ flexGrow: 1 }}>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <FormControl
            type='text'
            placeholder='Search for products'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button variant='outline-primary' type='submit'>
            Search
          </Button>
        </InputGroup>
      </Form>
    </div>
    );
  }
  
  export default SearchBox;