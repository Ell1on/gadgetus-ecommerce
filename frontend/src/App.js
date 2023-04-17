import React from 'react';
import { Container } from 'react-bootstrap'
import { Router, Routes, Route, Link, Fragment} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen'
import UsersListScreens from './screens/UsersListScreens';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreens from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import BrandListScreen from './screens/BrandListScreen';
import CategoryListScreen from './screens/CategoryListScreen';
import BrandEditScreen from './screens/BrandEditScreen';
import CategoryEditScreen from './screens/CategoryEditScreen';
import ProductByCategoryScreen from './screens/ProductByCategoryScreen';


const App = () => {
  return (
    <div>
      <Header />
      <main className="py-3" >
        <Container>
          <Routes  >
            <Route exact="true"
              path='/'
              element= {<HomeScreen/>} 
            />
            <Route
              path='/product/:id'
              element= {<ProductScreen/>} 
            />
            <Route 
              path='/cart/:id'
              element= {<CartScreen/>} 
            />
            <Route 
              path='/cart/'
              element= {<CartScreen/>} 
            />

            <Route 
              path='/favorites/:id'
              element= {<FavoritesScreen/>} 
            />
            <Route 
              path='/favorites/'
              element= {<FavoritesScreen/>} 
            />  

            <Route 
              path='/login'
              element= {<LoginScreen/>} 
            />
            <Route 
              path='/register'
              element= {<RegisterScreen/>} 
            />
            <Route 
              path='/profile'
              element= {<ProfileScreen/>} 
            />
            <Route 
              path='/shipping'
              element= {<ShippingScreen/>} 
            />
            <Route 
              path='/payment'
              element= {<PaymentScreen/>} 
            />
            <Route 
              path='/placeorder'
              element= {<PlaceOrderScreen/>} 
            />

            <Route 
              path='/order/:id'
              element= {<OrderScreen/>} 
            />

            <Route 
              path='/admin/userlist'
              element= {<UsersListScreens/>} 
            />
            <Route 
              path='/admin/user/:id/edit'
              element= {<UserEditScreen/>} 
            />

            <Route 
              path='/admin/productlist'
              element= {<ProductListScreens/>} 
            />

            <Route 
              path='/admin/product/:id/edit'
              element= {<ProductEditScreen/>} 
            />

            <Route 
              path='/admin/orderlist'
              element= {<OrderListScreen/>} 
            />

            <Route 
              path='/admin/brands'
              element= {<BrandListScreen/>} 
            />

            <Route 
              path='/admin/categories'
              element= {<CategoryListScreen/>} 
            />

            <Route 
              path='/admin/brand/:id/edit'
              element= {<BrandEditScreen/>} 
            />

            <Route 
              path='/admin/category/:id/edit'
              element= {<CategoryEditScreen/>} 
            />
            <Route 
              path='/admin/categories/categorylist/:id'
              element= {<ProductByCategoryScreen/>} 
            />

          </Routes>
          
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;