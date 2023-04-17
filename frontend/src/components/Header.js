import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import {Row, Col, Form, Button, Dropdown ,Hidden } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from './../screens/SearchBox';
import { listProductsBrands, listProductsCategories, listProductByCategoriesDetails } from '../actions/productActions';
import { Link } from 'react-router-dom';


function Header() {

  const dispatch = useDispatch()

  const [selectedCategory, setSelectedCategory] = useState(null);

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const productCategoryList = useSelector(state => state.productCategoryList) 
  const {loading:loadingCat, error:errorCat,categories} = productCategoryList

  const productBrandsList = useSelector(state => state.productBrandsList) 
  const {loading:loadingBrands, error:errorBrands,brands} = productBrandsList

  console.log(categories);


  useEffect(() => {
      dispatch(listProductsCategories())
      dispatch(listProductsBrands())
  }, [dispatch, ])
  

  const logoutHandler = () => {
    dispatch(logout())
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    dispatch(listProductByCategoriesDetails({
      id:category._id,
      category: category.category
    }))

  };
  console.log(selectedCategory);

  return (
    <header>
  <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
    <Container >
      <LinkContainer to="/">
        <Navbar.Brand>Gadgetus</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav " style={{zIndex:99999}}>
        <Nav className="me-auto">
          <NavDropdown title="Catalog" id="basic-nav-dropdown">
            {categories?.map((category) => (
              <LinkContainer
                to={`/admin/categories/categorylist/${category._id}`}
              >
                <NavDropdown.Item
                  key={category._id}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.category}
                </NavDropdown.Item>
              </LinkContainer>
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