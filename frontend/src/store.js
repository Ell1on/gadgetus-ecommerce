import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productListReducers, 
    productDetailsReducers, 
    productDeleteReducers, 
    productCreateReducers,
    productUpdateReducers,
    productReviewReducers,
    productTopRatedReducers,
    productPopularReducers,
    productTopSellingReducers,
    productInfoReducers,
    productUpdateInfoReducers,
    productDeleteInfoReducers,
    productBrandReducers,
    productCategoryReducers,
    brandDeleteReducers,
    categoryDeleteReducers,
    productUpdateBrandReducers,
    productUpdateCategoryReducers,
    productBrandsListReducers,
    BrandDetailsReducers,
    productCategoryListReducers,
    categoryDetailsReducers,
    productSetBrandReducers,
    productSetCategoryReducers,
    productByCategoryReducers,
    topCategoriesReducers,
    productReviewsReducers,
    productHighPriceReducers,
    productLowPriceReducers,
    productNumReviewsReducers,
    productSectionListReducers,
    productSubsectionListReducers,
    sectionDeleteReducers,
    subsectionDeleteReducers,
    productUpdateSectionReducers,
    productUpdateSubsectionReducers,
    sectionDetailsReducers,
    subsectionDetailsReducers,
    productSetSectionReducers,
    productSetSubsectionReducers,
    productSectionReducers,
    productSubsectionReducers
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer } from './reducers/userReducers';
import { userRegisterReducer, 
        userDetailsReducer, 
        userUpdateProfileReducer,
        userListReducer,
        userDeleteReducer, 
        userUpdateReducer 
    } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListReducer, orderDeliveredReducer } from './reducers/orderReducers';
import { favoritesReducer } from './reducers/favoritesReducer';


const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    productDelete: productDeleteReducers,
    productCreate: productCreateReducers,
    productInfo: productInfoReducers,
    productUpdateInfo: productUpdateInfoReducers,
    productDeleteInfo: productDeleteInfoReducers,
    productUpdate: productUpdateReducers,
    productReview: productReviewReducers,
    productTopRated: productTopRatedReducers,
    productPopular: productPopularReducers,
    productTopSelling: productTopSellingReducers,
    productBrand: productBrandReducers,
    productCategory: productCategoryReducers,
    brandDelete: brandDeleteReducers,
    categoryDelete: categoryDeleteReducers,
    productUpdateBrand: productUpdateBrandReducers,
    productUpdateCategory: productUpdateCategoryReducers,
    productBrandsList: productBrandsListReducers,
    BrandDetails: BrandDetailsReducers,
    productCategoryList: productCategoryListReducers,
    categoryDetails: categoryDetailsReducers,
    productSetBrand: productSetBrandReducers,
    productSetCategory: productSetCategoryReducers,
    productByCategory: productByCategoryReducers,
    topCategories:topCategoriesReducers,


    productSectionList: productSectionListReducers,
    productSubsectionList: productSubsectionListReducers,

    productSection: productSectionReducers,
    productSubsection: productSubsectionReducers,
    sectionDelete: sectionDeleteReducers,
    subsectionDelete: subsectionDeleteReducers,
    productUpdateSection: productUpdateSectionReducers,
    productUpdateSubsection: productUpdateSubsectionReducers,
    sectionDetails: sectionDetailsReducers,
    subsectionDetails: subsectionDetailsReducers,
    productSetSection: productSetSectionReducers,
    productSetSubsection: productSetSubsectionReducers,






    // productReviews: productReviewsReducers,
    // productHighPrice: productHighPriceReducers,
    // productLowPrice: productLowPriceReducers,
    // productNumReviews: productNumReviewsReducers,
    cart: cartReducer,
    favorites: favoritesReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    orderDelivered: orderDeliveredReducer,
    

 })

const cartItemsFromStorage = localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')) : []

    
const favoritesItemsFromStorage = localStorage.getItem('favoritesItems')?
    JSON.parse(localStorage.getItem('favoritesItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
    JSON.parse(localStorage.getItem('shippingAddress')) : []


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    
    },
    favorites: {
        favoritesItems: favoritesItemsFromStorage
    },
    userLogin: {userInfo: userInfoFromStorage},
    
    
}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store












