import React, {useState, useEffect} from 'react'
import { Form, button, Row, Col, Button } from 'react-bootstrap';
import {Link, useParams, useNavigate, Navigate} from 'react-router-dom'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { listBrandsDetails, updateBrand, createInfo, createCategory, createBrand } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Message from './../components/Message';
import { PRODUCT_BRAND_UPDATE_RESET } from './../constants/productConstants';
import { PRODUCT_CREATE_INFO_RESET, PRODUCT_BRAND_RESET, PRODUCT_CATEGORY_RESET } from './../constants/productConstants';
import axios from 'axios';
import { login } from './../actions/userActions';
import FormInput from './../components/Input';

function BrandEditScreen() {

    const {id} = useParams();     
    const [name, setName] = useState('')
 
    const navigate = useNavigate()
    const dispatch = useDispatch()
 
    const BrandDetails = useSelector(state => state.BrandDetails)
    const {error, loading, brand} = BrandDetails

    const productUpdateBrand = useSelector(state => state.productUpdateBrand)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = productUpdateBrand

    useEffect(() => {

        if(successUpdate) {
            dispatch({type:PRODUCT_BRAND_UPDATE_RESET})
            navigate('/admin/brands')
        } else {

            if(!brand || brand._id !== Number(id)) {
                dispatch(listBrandsDetails(id))
            } else {
                if (brand && brand.brand) {
                    setName(brand.brand);
                }
            }
        }
    }, [id, dispatch, navigate, successUpdate, brand]);

    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(updateBrand({
            _id:id,
            name,
        }))
    }

    return (
        <div>
            <Link to='/admin/brands'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Brand</h1>
                {loadingUpdate && <Loader /> }
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }

                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler} className="d-grid gap-2">
                        <Form.Group controlId='brand'>
                            <Form.Label>
                                Brand 
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
                                <label className="opacity-50" htmlFor="floatingInput">Enter Brand</label>
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

export default BrandEditScreen

// function BrandEditScreen() {

//     const {id} = useParams();     
//     const [name, setName] = useState()
//     // const [title, setTitle] = useState('')
//     // const [information, setInformation] = useState('')
 
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
 
//     const BrandDetails = useSelector(state => state.BrandDetails)
//     const {error, loading, brand} = BrandDetails

//     const productUpdateBrand = useSelector(state => state.productUpdateBrand)
//     const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = productUpdateBrand

//     const productInfo = useSelector(state => state.productInfo)
//     const {loading:loadingProductInfo, error:errorProductInfo, success:successProductInfo} = productInfo

//     const productUpdateInfo = useSelector(state => state.productUpdateInfo)
//     const {loading:loadingUpdateInfo, error:errorUpdateInfo, success:successUpdateInfo} = productUpdateInfo

//     const productDeleteInfo = useSelector(state => state.productDeleteInfo) 
//     const {loading:loadingDeleteInfo, error:errorDeleteInfo, success:successDeleteInfo} = productDeleteInfo 

//     useEffect(() => {

//         if(successUpdate) {
//             dispatch({type:PRODUCT_BRAND_UPDATE_RESET})
//             navigate('/admin/brands')
//         }else{

//             if(!brand.brand || brand._id !== Number(id) ){
//                 dispatch(listBrandsDetails(id))
                
//             }else{
//                 if (brand && brand.brand) {
//                     setName(brand.brand);
//                   }
   
//             }
            
            
//         }
        

//     },[ id, dispatch, navigate, successUpdate, ])
//    console.log(brand);

//     const submitHandler = (e) => {
//         e.preventDefault();
        
//         dispatch(updateBrand({
//             _id:id,
//             name,

//         }))

//     }

//   return (
//     <div>
//         <Link to='/admin/brands'>
//             Go Back
//         </Link>

//          <FormContainer   >
//             <h1>Edit Brand</h1>
//             {loadingUpdate && <Loader /> }
//             {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }

            
            
//             {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
//                 <Form onSubmit={submitHandler}  className="d-grid gap-2">

//                     <Form.Group controlId='brand' >
//                         <Form.Label>
//                         Brand 
//                         </Form.Label>
//                         <div className="form-floating">
//                             <input 
//                                 value={name} 
//                                 onChange={(e) => setName(e.target.value)} 
//                                 type="name" 
//                                 className="form-control" 
//                                 id="floatingInput" 
//                                 placeholder="name@example.com"
//                             />
//                             <label className="opacity-50">Enter Brand</label>
//                         </div>
//                     </Form.Group>
                    
//                     <Button
                    
//                         type='submit'
//                         variant='primary'
//                         className="form-floating mt-3 btn btn-lg"
//                     >
//                         Update
//                     </Button> 
//                 </Form>    
//             ) }
            
//         </FormContainer>
//     </div>
   
//     )
// }

// export default BrandEditScreen