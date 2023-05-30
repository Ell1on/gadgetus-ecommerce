import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import {Row, Col, Form, Button ,Hidden, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from './../screens/SearchBox';
import { listProductsBrands, listProductsCategories, listProductByCategoriesDetails } from '../actions/productActions';
import "../index.css"; // подключаем стили
import { MegaMenu } from 'primereact/megamenu';
import { CascadeSelect } from 'primereact/cascadeselect';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectCategory, setSelectedCategory] = useState(null);
  const [selectSection, setSelectSection] = useState(null);

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const productCategoryList = useSelector(state => state.productCategoryList) 
  const {loading:loadingCat, error:errorCat,categories} = productCategoryList

  const productBrandsList = useSelector(state => state.productBrandsList) 
  const {loading:loadingBrands, error:errorBrands,brands} = productBrandsList

  const productList = useSelector(state => state.productList) 
  const {loading, error, products} = productList

  // const productCategoryList = useSelector(state => state.productCategoryList) 
  // const {loadingCats, errorCats, categories} = productCategoryList

  console.log(categories);


  useEffect(() => {
      dispatch(listProductsCategories())
      dispatch(listProductsBrands())
  }, [dispatch, ])

  const logoutHandler = () => {
    dispatch(logout())
  }

  // const handleCategoryClick = (category) => {
  //   setSelectedCategory(category);
  //   dispatch(listProductByCategoriesDetails({
  //     id:category._id,
  //     category: category.category
  //   }))

  // };
  

  function handleCascadeSelectChange(categoryId, sectionId) {
    const options = { categoryId, sectionId };
    navigate(`/admin/categories/categorylist/${categoryId}/section/${sectionId}`);
    dispatch(listProductByCategoriesDetails(options));
}


  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, 'marginBottom': '60px'}}>
  <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg" >
    <Container >
      <LinkContainer to="/">
        <Navbar.Brand>Gadgetus</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav " style={{zIndex:99999}}>
        <Nav className="me-auto nav-all">


        <NavDropdown
  className="nav-item dropdown custom-dropdown border-0"
  title="Каталог"
  style={{ border: 'none' }}
>
  {categories?.map((category) => (
    <NavDropdown
      className="nav-item dropend custom-dropdown border-0"
      title={
        <span style={{ color: 'black', width: 300 }}>
          {category.category}
        </span>
      }
      id={category.id}
      key={category.id}
      onSelect={(eventKey, event) =>
        handleCascadeSelectChange(category._id, eventKey)
      }
    >
      {category?.section?.map((sec) => (
        <NavDropdown.Item
          className="dropdown-item border-0"
          href="#"
          eventKey={sec._id}
          key={sec._id}
        >
          {sec.section}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  ))}
</NavDropdown>


        </Nav>
        <SearchBox className="flex-grow-1" />
        <Nav>

          
          <LinkContainer to="/cart">
            <Nav.Link className="d-flex align-items-center">
              <i className="fas fa-shopping-cart me-1"></i>{" "}
              <div className="">Cart</div>
            </Nav.Link>
          </LinkContainer>
          
          <LinkContainer to="/favorites">
            <Nav.Link className="d-flex align-items-center">
              <i className="fa-solid fa-heart me-1"></i>{" "}
              <div className="">Favorites</div>
            </Nav.Link>
          </LinkContainer>
          
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="username">
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link>
                <i className="fas fa-user me-2"></i>Login
              </Nav.Link>
            </LinkContainer>
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title="Admin" id="adminmenue">
              <LinkContainer to="/admin/userlist">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/productlist">
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/orderlist">
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/brands">
                <NavDropdown.Item>Brands</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/categories">
                <NavDropdown.Item>Categories</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/sections">
                <NavDropdown.Item>Sections</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/subsections">
                <NavDropdown.Item>Subsections</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
</header>
  )
}

export default Header