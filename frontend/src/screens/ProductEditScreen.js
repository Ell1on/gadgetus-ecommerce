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
    const [createInfoClicked, setCreateInfoClicked] = useState(false);

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
          dispatch({ type: PRODUCT_CREATE_INFO_RESET });
          dispatch(listProductsDetails(id));
        }

        if (successUpdate) {
          dispatch({ type: PRODUCT_UPDATE_RESET });
          navigate('/admin/productlist');
        }

        if (!product || !product.name || product._id !== Number(id)) {
          dispatch(listProductsDetails(id));
          dispatch(listProductsBrands());
          dispatch(listProductsCategories());
          dispatch(listProductsSections());
          dispatch(listProductsSubsections());
        } else {
          // Check if specific fields need to be updated or not
          const shouldUpdateName = name === '' && product.name;
          const shouldUpdatePrice = price === 0 && product.price;
          const shouldUpdateImage = image.length === 0 && product.image;
          const shouldUpdateCountInStock = countInStock === 0 && product.countInStock;
          const shouldUpdateDescription = description === '' && product.description;
          const shouldUpdateBrand = brand === '' && product.brands;
          const shouldUpdateCategory = category === '' && product.categories;
      
          if (shouldUpdateName) {
            setName(product.name);
          }
          if (shouldUpdatePrice) {
            setPrice(product.price);
          }
          if (shouldUpdateImage) {
            setImage(product.image);
          }
          if (shouldUpdateCountInStock) {
            setCountInStock(product.countInStock);
          }
          if (shouldUpdateDescription) {
            setDescription(product.description);
          }
          if (shouldUpdateBrand) {
            setBrand(product.brands);
          }
          if (shouldUpdateCategory) {
            setCategory(product.categories);
          }


        }
      }, [
        dispatch,
        navigate,
        successProductInfo,
        successUpdate,
        successUpdateInfo,
        successDeleteInfo,
        product,
        id,
        name,
        price,
        image,
        countInStock,
        description,
        brand,
        category,
        createInfoClicked
      ]);
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
        e.preventDefault()
        dispatch(createInfo(id))
        setCreateInfoClicked(true);
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
                        Название
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
                            <label className="opacity-50">Введите название</label>
                        </div>
                    </Form.Group>
                    <Form.Group controlId='price' >
                        <Form.Label>
                        Цена
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
                            <label className="opacity-50">Введите цену</label>
                        </div>
                    </Form.Group>
                    <Form.Group controlId='image' >
                        <Form.Label>
                            Изображения
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
                            <label className="opacity-50">Загрузите изображения</label>
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
                            Бренды
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
                            Категория
                        </Form.Label>
                        <Form.Control
                            as='select'
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <option value=''>Выберите категорию</option>
                            {categories?.map((category) => (
                                <option key={category._id} data-custom-1={category._id} value={category.category}>
                                    {category.category}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

<Form.Group controlId='subsection'>
  <Form.Label>
    Подкатегория
  </Form.Label>
  <Form.Control
    as='select'
    value={subsection}
    onChange={handleSubsectionChange}
  >
    <option value=''>Выберите подкатегорию</option>
    {cat?.length > 0 && cat[0]?.section?.map((sec) => (
      <option key={sec._id} data-custom-3={sec._id} value={sec.section}>
        {sec.section}
      </option>
    ))}
  </Form.Control>
</Form.Group>








                    <Form.Group controlId='countInStock' >
                        <Form.Label>
                        Наличие
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
                            <label className="opacity-50">Выберите количество</label>
                        </div>
                    </Form.Group>

                    <Form.Group controlId='description' >
                        <Form.Label>
                        Описание
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
                            <label className="opacity-50">Описание</label>
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
                        <i className='fa fa-plus' ></i> Создать Характеристику
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
                        Обновить
                    </Button> 
                </Form>    
            ) }
            
        </FormContainer>
    </div>
   
    )
}

export default ProductEditScreen