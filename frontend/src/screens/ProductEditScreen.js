import React, {useState, useEffect} from 'react'
import { Form, button, Row, Col, Button } from 'react-bootstrap';
import {Link, useParams, useNavigate, Navigate} from 'react-router-dom'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { listProductsDetails, listProductsCategories,listProductsBrands, updateProduct, createInfo, setProductBrand, setProductCategory, createBrand, setProductSection, setProductSubsection, listProductsSections, listProductsSubsections } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Message from './../components/Message';
import { PRODUCT_UPDATE_RESET } from './../constants/productConstants';
import { PRODUCT_CREATE_INFO_RESET, PRODUCT_BRAND_RESET, PRODUCT_CATEGORY_RESET } from './../constants/productConstants';
import axios from 'axios';
import { login } from './../actions/userActions';
import FormInput from './../components/Input';

function ProductEditScreen() {

    const {id} = useParams();     
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [cats, setCats] = useState([])
    const [subsection, setSubsection] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    // const [uploading, setUploading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productCategoryList = useSelector(state => state.productCategoryList) 
    const {loading:loadingCat, error:errorCat,categories} = productCategoryList

    const productSubsectionList = useSelector(state => state.productSubsectionList) 
    const {loading:loadingS, error:errorS,subsections} = productSubsectionList
 
    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = productUpdate

    const productInfo = useSelector(state => state.productInfo)
    const {loading:loadingProductInfo, error:errorProductInfo, success:successProductInfo} = productInfo

    const productUpdateInfo = useSelector(state => state.productUpdateInfo)
    const {loading:loadingUpdateInfo, error:errorUpdateInfo, success:successUpdateInfo} = productUpdateInfo

    const productDeleteInfo = useSelector(state => state.productDeleteInfo) 
    const {loading:loadingDeleteInfo, error:errorDeleteInfo, success:successDeleteInfo} = productDeleteInfo 
   

    const productBrandsList = useSelector(state => state.productBrandsList) 
    const {loading:loadingBrands, error:errorBrands,brands} = productBrandsList

    const productSetBrand = useSelector(state => state.productSetBrand) 
    const {loading:loadingValue, error:errorValue, success:successValue, value} = productSetBrand 

    const productSetCategory = useSelector(state => state.productSetCategory) 
    const {loading:loadingValueCat, error:errorValueCat, success:successValueCat, valueCat} = productSetCategory 


    useEffect(() => {
        if (successProductInfo) {
          dispatch({ type: PRODUCT_CREATE_INFO_RESET })
        }
        if (successUpdate) {
          dispatch({ type: PRODUCT_UPDATE_RESET })
          navigate('/admin/productlist')
        }
        if (!product || !product.name || product._id !== Number(id)) {
            dispatch(listProductsDetails(id))
            dispatch(listProductsBrands())
            dispatch(listProductsCategories())
            dispatch(listProductsSections())
            dispatch(listProductsSubsections())

        } else {
          setName(product.name)
          setPrice(product.price)
          setImage(product.image)
          setCountInStock(product.countInStock)
          setDescription(product.description)
          setBrand(product.brands)
          setCategory(product.categories)
        //   setSection(product.sections)
        //   setSubsection(product.subsections)
          
        }
      }, [dispatch, navigate, successProductInfo, successUpdate, product, id, successUpdateInfo, successDeleteInfo])
      
    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(updateProduct({
            _id:id,
            name,
            price,
            image,
            countInStock,
            description,
           
        }))
    }

    const cat = categories?.filter((category) => category.category === cats)
    console.log("ABOB", cat);
    console.log("AMOGUS", category);

    const submitInfoHandler = (e) => {
        e.preventDefault(id)
        dispatch(createInfo(id))
    }

    const uploadFileHandler = async (e) => {
        const files = e.target.files;
        const formData = new FormData();
        
        for (let i = 0; i < files.length; i++) {
            formData.append('uploaded_images', files[i]);
        }
        
        formData.append('product_id', id)
        formData.append('description', description);
        // Add any additional form data you want to include
        
        setUploading(true);
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              };
        
            const { data } = await axios.post(`/api/products/upload/?product_id=${id}`, formData, config);
            console.log(data);
            setUploading(false);
        } catch (error) {
            setUploading(false);
        }
    }

    const handleBrandChange = (event) => {
        const selectedBrand = event.target.value;
        const selectedId = event.target.selectedOptions[0].getAttribute("data-custom");
        console.log(brands);
        console.log(id);
        dispatch(setProductBrand({
            _id:id,
            id: selectedId,
            brand: selectedBrand
        }))
        console.log(selectedId)
        console.log(selectedBrand)
        console.log(product);
    };

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCats(selectedCategory);
        const selectedId = event.target.selectedOptions[0].getAttribute("data-custom-1");
        const cs = categories?.filter(category => category.category === selectedCategory)?.map(category => category?.section?.map(sec => sec.section)).reduce((acc, val) => acc.concat(val), [])
        console.log(cs);
        console.log(category);
        console.log(id);
        dispatch(setProductCategory({
            _id:id,
            id: selectedId,
            category: selectedCategory,
            catSec: cs
        }))
        console.log(selectedId)
        console.log(selectedCategory)
        console.log(product);
    };

    // const handleSectionChange = (event) => {
    //     const selectedSection = event.target.value;
    //     const selectedId = event.target.selectedOptions[0].getAttribute("data-custom-2");
    //     console.log(section);
    //     console.log(id);
    //     dispatch(setProductSection({
    //         _id:id,
    //         id: selectedId,
    //         section: selectedSection
    //     }))
    //     console.log(selectedId)
    //     console.log(selectedSection)
    //     console.log(product);
    // };

    const handleSubsectionChange = (event) => {
        const selectedSubsection = event.target.value;
        const selectedId = event.target.selectedOptions[0].getAttribute("data-custom-3");
        console.log(subsection);
        console.log(id);
        dispatch(setProductSubsection({
            _id:id,
            id: selectedId,
            subsection: selectedSubsection
        }))
        console.log(selectedId)
        console.log(selectedSubsection)
        console.log(product);
    };

  return (
    <div>
        <Link to='/admin/productlist'>
            Go Back
        </Link>

         <FormContainer   >
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader /> }
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }

            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}  className="d-grid gap-2">

                    <Form.Group controlId='name' >
                        <Form.Label>
                        Name
                        </Form.Label>
                        <div className="form-floating">
                            <input 
                                name="myInput"
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                type="name" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="name@example.com"
                            />
                            <label className="opacity-50">Enter Name</label>
                        </div>
                    </Form.Group>
                    <Form.Group controlId='price' >
                        <Form.Label>
                        price
                        </Form.Label>
                        <div className="form-floating">
                            <input 
                                name="myInput"
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)} 
                                type="number" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder=""
                            />
                            <label className="opacity-50">Enter Price</label>
                        </div>
                    </Form.Group>
                    <Form.Group controlId='image' >
                        <Form.Label>
                            Images
                        </Form.Label> 
                        <div className="form-floating">
                            <input 
                            name="myInput"
                            value={image} 
                            onChange={(e) => setImage(e.target.value)} 
                            type="text" 
                            className="form-control" 
                            id="floatingInput" 
                            placeholder=""
                            multiple
                            />
                            <label className="opacity-50">Enter Images</label>
                        </div>
                        <div className="form-group">
                            <input 
                            className="form-control" 
                            type="file" 
                            id="formFile"
                            custom
                            onChange={uploadFileHandler}
                            multiple // добавлен атрибут multiple
                            />
                        </div>
                        {uploading && <Loader />}
                        </Form.Group>

                    <Form.Group controlId='brand'>
                        <Form.Label>
                            Brand
                        </Form.Label>
                        <Form.Control
                            as='select'
                            value={brand}
                            onChange={handleBrandChange}
                        >
                            <option value=''>Select brand</option>
                            {brands?.map((brand) => (
                                <option key={brand._id} data-custom={brand._id} value={brand.brand}>
                                    {brand.brand}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>
                            Category
                        </Form.Label>
                        <Form.Control
                            as='select'
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <option value=''>Select category</option>
                            {categories?.map((category) => (
                                <option key={category._id} data-custom-1={category._id} value={category.category}>
                                    {category.category}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    {/* <Form.Group controlId='section'>
                        <Form.Label>
                            Section
                        </Form.Label>
                        <Form.Control
                            as='select'
                            value={section}
                            onChange={handleCategoryChange}
                        >
                            <option value=''>Select category</option>
                            {categories?.map((category) => (
                                <option key={category._id} data-custom-1={category._id} value={category.category}>
                                    {category.category}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group> */}

                     {/* <Form.Group controlId='section'>
                        <Form.Label>
                            Section
                        </Form.Label>
                        <Form.Control
                            as='select'
                            value={section}
                            onChange={handleSectionChange}
                        >
                            <option value=''>Select section</option>
                            {sections?.map((section) => (
                                <option key={section._id} data-custom-2={section._id} value={section.section}>
                                    {section.section}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group> */}

<Form.Group controlId='subsection'>
  <Form.Label>
    Subsection
  </Form.Label>
  <Form.Control
    as='select'
    value={subsection}
    onChange={handleSubsectionChange}
  >
    <option value=''>Select subsection</option>
    {cat?.length > 0 && cat[0]?.section?.map((sec) => (
      <option key={sec._id} data-custom-3={sec._id} value={sec.section}>
        {sec.section}
      </option>
    ))}
  </Form.Control>
</Form.Group>








                    <Form.Group controlId='countInStock' >
                        <Form.Label>
                        Stock
                        </Form.Label>
                        <div className="form-floating">
                            <input 
                                value={countInStock} 
                                onChange={(e) => setCountInStock(e.target.value)} 
                                type="number" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder=""
                            />
                            <label className="opacity-50">Enter Stock</label>
                        </div>
                    </Form.Group>

                    <Form.Group controlId='description' >
                        <Form.Label>
                        Description
                        </Form.Label>
                        <div className="form-floating">
                            <input 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                type="text" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder=""
                            />
                            <label className="opacity-50">Description</label>
                        </div>
                    </Form.Group>
                    {loadingProductInfo && <Loader /> }
                    {successProductInfo && <Message variant='success' >Info Submitted</Message> }
                    {errorProductInfo && <Message variant='danger' >{errorProductInfo}</Message> }
                    <Button

                        variant='primary'
                        className="form-floating mt-3 "
                        onClick={submitInfoHandler}
                    >
                        <i className='fa fa-plus' ></i> Create info
                    </Button> 
                    <Row>
                        <Col lg={4} >
                            {product.info != 0? <h5>Название</h5> : ''}
                        </Col>
                        <Col lg={4} className='ms-4'>
                            {product.info != 0? <h5  >Характеристика</h5> : ''}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        {product.info?.map((i) => 
                            <div  >
                                <FormInput title={i.title} information={i.information} type='text' pk={product._id} pk_alt={i._id} /> 
                            </div>
                    )}
                        </Col>
                    </Row>
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

export default ProductEditScreen