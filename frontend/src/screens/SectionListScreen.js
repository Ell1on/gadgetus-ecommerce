import React, {useState, useEffect} from 'react'
import { Table,  Row, Col, Button } from 'react-bootstrap';
import { Link, useParams,useNavigate, useLocation,  } from 'react-router-dom';
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';

import Message from './../components/Message';
import { listProductsSections, deleteSection, createProduct, createSection } from '../actions/productActions';
import { LinkContainer } from 'react-router-bootstrap';
import { PRODUCT_SECTION_RESET } from '../constants/productConstants'; 
import { productListReducers } from './../reducers/productReducers';
import { deleteCategory } from './../actions/productActions';

function SectionListScreens() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productSectionList = useSelector(state => state.productSectionList) 
    const {loading, error, sections} = productSectionList

    const userLogin = useSelector(state => state.userLogin) 
    const {userInfo} = userLogin

    const sectionDelete = useSelector(state => state.sectionDelete)
    const {loading:loadingSectionDelete, error:errorSectionDelete, success:successSectionDelete} = sectionDelete

    const productSection = useSelector(state => state.productSection) 
    const {loading:loadingSection, error:errorSection, success:successSection, section: createdSection} = productSection 

    
    useEffect(() => {
        dispatch({type:PRODUCT_SECTION_RESET})

        if(!userInfo.isAdmin )
        {
            navigate('/login')
        }

        if(successSection)
        {
            navigate(`/admin/section/${createdSection._id}/edit`)
        }else{
            dispatch(listProductsSections())
        }

        

    }, [ dispatch, navigate, userInfo, successSection,createdSection, successSectionDelete])

    console.log(sections);

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteSection(id))
        }
        
    }

    const createSectionHandler = () => {
        dispatch(createSection())
    }

  return (
    <div>
        <Row className="align-items-center" >
            <Col>
                <h1>Sections</h1>
            </Col>

            <Col className='text-end' >
                <Button className='my-3' onClick={createSectionHandler} >
                    <i className='fa fa-plus' ></i> Create Section
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
                        {sections?.map(section => (
                            <tr key={section._id} >
                                <td>{section._id}</td>
                                <td>{section.section}</td>

                                <td>
                                    <div className='text-end' >
                                    <LinkContainer to={`/admin/section/${section._id}/edit`}  >
                                        <Button variant='light' className='btn-sm' >
                                           <i className="fa fa-edit"></i>
                                        </Button> 
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(section._id) }>
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

export default SectionListScreens