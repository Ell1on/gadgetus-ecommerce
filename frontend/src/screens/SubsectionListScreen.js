import React, {useState, useEffect} from 'react'
import { Table,  Row, Col, Button } from 'react-bootstrap';
import { Link, useParams,useNavigate, useLocation,  } from 'react-router-dom';
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';

import Message from './../components/Message';
import { listProductsSubsections, deleteSubsection, createProduct, createSubsection } from '../actions/productActions';
import { LinkContainer } from 'react-router-bootstrap';
import { PRODUCT_SUBSECTION_RESET } from '../constants/productConstants'; 
import { productListReducers } from './../reducers/productReducers';
import { deleteCategory } from './../actions/productActions';

function SubsectionListScreens() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productSubsectionList = useSelector(state => state.productSubsectionList) 
    const {loading, error, subsections} = productSubsectionList

    const userLogin = useSelector(state => state.userLogin) 
    const {userInfo} = userLogin

    const subsectionDelete = useSelector(state => state.subsectionDelete)
    const {loading:loadingSubsectionDelete, error:errorSubsectionDelete, success:successSubsectionDelete} = subsectionDelete

    const productSubsection = useSelector(state => state.productSubsection) 
    const {loading:loadingSubsection, error:errorSubsection, success:successSubsection, subsection: createdSubsection} = productSubsection 

    
    useEffect(() => {
        dispatch({type:PRODUCT_SUBSECTION_RESET})

        if(!userInfo.isAdmin )
        {
            navigate('/login')
        }

        if(successSubsection)
        {
            navigate(`/admin/subsection/${createdSubsection._id}/edit`)
        }else{
            dispatch(listProductsSubsections())
        }

        

    }, [ dispatch, navigate, userInfo, successSubsection,createdSubsection, successSubsectionDelete])

    console.log(subsections);

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteSubsection(id))
        }
        
    }

    const createSubsectionHandler = () => {
        dispatch(createSubsection())
    }

  return (
    <div>
        <Row className="align-items-center" >
            <Col>
                <h1>Subsections</h1>
            </Col>

            <Col className='text-end' >
                <Button className='my-3' onClick={createSubsectionHandler} >
                    <i className='fa fa-plus' ></i> Create Subsection
                </Button>
            </Col>
        </Row>




        {loading 
            ? (<Loader/>) 
            : error
            ? (<Message variant='danger'>{error}</Message>)
            :   
            (
                <Table striped bordered hover responsive className='table-sm' >
                        <thead>
                            <tr>
                                <th>ID</th>

                                <th>SECTIONS</th>
                                <th></th>
                            </tr>
                        </thead>

                    <tbody>
                        {subsections?.map(subsection => (
                            <tr key={subsection._id} >
                                <td>{subsection._id}</td>
                                <td>{subsection.subsection}</td>

                                <td>
                                    <div className='text-end' >
                                    <LinkContainer to={`/admin/subsection/${subsection._id}/edit`}  >
                                        <Button variant='light' className='btn-sm' >
                                           <i className="fa fa-edit"></i>
                                        </Button> 
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(subsection._id) }>
                                        <i className="fa fa-trash"></i>
                                    </Button> 
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            )
        }
    </div>
  )
}

export default SubsectionListScreens