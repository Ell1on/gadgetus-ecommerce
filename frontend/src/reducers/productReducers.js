import {
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST, 
    PRODUCT_DELETE_SUCCESS, 
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST, 
    PRODUCT_CREATE_SUCCESS, 
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_REQUEST, 
    PRODUCT_UPDATE_SUCCESS, 
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_CREATE_REVIEW_REQUEST, 
    PRODUCT_CREATE_REVIEW_SUCCESS, 
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_TOP_REQUEST, 
    PRODUCT_TOP_SUCCESS, 
    PRODUCT_TOP_FAIL,

    PRODUCT_POPULAR_REQUEST, 
    PRODUCT_POPULAR_SUCCESS, 
    PRODUCT_POPULAR_FAIL,

    PRODUCT_TOP_SELLING_REQUEST, 
    PRODUCT_TOP_SELLING_SUCCESS, 
    PRODUCT_TOP_SELLING_FAIL,

    PRODUCT_CREATE_INFO_REQUEST, 
    PRODUCT_CREATE_INFO_SUCCESS, 
    PRODUCT_CREATE_INFO_FAIL,
    PRODUCT_CREATE_INFO_RESET,

    PRODUCT_LIST_INFO_REQUEST, 
    PRODUCT_LIST_INFO_SUCCESS, 
    PRODUCT_LIST_INFO_FAIL,
    PRODUCT_UPDATE_INFO_REQUEST, 
    PRODUCT_UPDATE_INFO_SUCCESS, 
    PRODUCT_UPDATE_INFO_FAIL,
    PRODUCT_UPDATE_INFO_RESET,

    PRODUCT_DELETE_INFO_REQUEST, 
    PRODUCT_DELETE_INFO_SUCCESS, 
    PRODUCT_DELETE_INFO_FAIL,

    PRODUCT_BRAND_REQUEST, 
    PRODUCT_BRAND_SUCCESS, 
    PRODUCT_BRAND_FAIL,
    PRODUCT_BRAND_RESET,

    PRODUCT_CATEGORY_REQUEST, 
    PRODUCT_CATEGORY_SUCCESS, 
    PRODUCT_CATEGORY_FAIL,
    PRODUCT_CATEGORY_RESET,

    PRODUCT_BRAND_UPDATE_REQUEST, 
    PRODUCT_BRAND_UPDATE_SUCCESS, 
    PRODUCT_BRAND_UPDATE_FAIL,
    PRODUCT_BRAND_UPDATE_RESET,

    PRODUCT_CATEGORY_UPDATE_REQUEST, 
    PRODUCT_CATEGORY_UPDATE_SUCCESS, 
    PRODUCT_CATEGORY_UPDATE_FAIL,
    PRODUCT_CATEGORY_UPDATE_RESET,

    PRODUCT_BRAND_DELETE_REQUEST, 
    PRODUCT_BRAND_DELETE_SUCCESS, 
    PRODUCT_BRAND_DELETE_FAIL,
    PRODUCT_BRAND_DELETE_RESET,

    PRODUCT_CATEGORY_DELETE_REQUEST, 
    PRODUCT_CATEGORY_DELETE_SUCCESS, 
    PRODUCT_CATEGORY_DELETE_FAIL,
    PRODUCT_CATEGORY_DELETE_RESET,

    PRODUCT_BRAND_LIST_REQUEST, 
    PRODUCT_BRAND_LIST_SUCCESS, 
    PRODUCT_BRAND_LIST_FAIL,


    PRODUCT_BRAND_DETAILS_REQUEST, 
    PRODUCT_BRAND_DETAILS_SUCCESS, 
    PRODUCT_BRAND_DETAILS_FAIL,
    PRODUCT_BRAND_DETAILS_RESET,

    PRODUCT_CATEGORY_DETAILS_REQUEST,
    PRODUCT_CATEGORY_DETAILS_SUCCESS,
    PRODUCT_CATEGORY_DETAILS_FAIL,
    PRODUCT_CATEGORY_DETAILS_RESET,
    
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_CATEGORY_LIST_RESET,

    PRODUCT_BRAND_SET_REQUEST,
    PRODUCT_BRAND_SET_SUCCESS,
    PRODUCT_BRAND_SET_FAIL,
    PRODUCT_BRAND_SET_RESET,

    PRODUCT_CATEGORY_SET_REQUEST,
    PRODUCT_CATEGORY_SET_SUCCESS,
    PRODUCT_CATEGORY_SET_FAIL,
    PRODUCT_CATEGORY_SET_RESET,

    PRODUCT_BY_CATEGORY_REQUEST,
    PRODUCT_BY_CATEGORY_SUCCESS,
    PRODUCT_BY_CATEGORY_FAIL,

    PRODUCT_CATEGORY_TOP_REQUEST,
    PRODUCT_CATEGORY_TOP_SUCCESS,
    PRODUCT_CATEGORY_TOP_FAIL,
    PRODUCT_CATEGORY_TOP_RESET,

    PRODUCT_RATED_REQUEST,
    PRODUCT_RATED_SUCCESS,
    PRODUCT_RATED_FAIL,
    PRODUCT_RATED_RESET,

    PRODUCT_HIGHPRICE_REQUEST,
    PRODUCT_HIGHPRICE_SUCCESS,
    PRODUCT_HIGHPRICE_FAIL,
    PRODUCT_HIGHPRICE_RESET,

    PRODUCT_LOWPRICE_REQUEST,
    PRODUCT_LOWPRICE_SUCCESS,
    PRODUCT_LOWPRICE_FAIL,
    PRODUCT_LOWPRICE_RESET,

    PRODUCT_NUMREVIEWS_REQUEST,
    PRODUCT_NUMREVIEWS_SUCCESS,
    PRODUCT_NUMREVIEWS_FAIL,
    PRODUCT_NUMREVIEWS_RESET,

    PRODUCT_FILTER_REQUEST,
    PRODUCT_FILTER_SUCCESS,
    PRODUCT_FILTER_FAIL,
    PRODUCT_FILTER_RESET,


} from '../constants/productConstants';

export const productListReducers = (state = {product: []}, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true, products:[]}
            
        case PRODUCT_LIST_SUCCESS:
            return {loading:false, products:action.payload}

        case PRODUCT_LIST_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state
    }
}

export const productBrandsListReducers = (state = {brand: []}, action) => {
    switch(action.type){
        case PRODUCT_BRAND_LIST_REQUEST:
            return {loading:true, brands:[]}
            
        case PRODUCT_BRAND_LIST_SUCCESS:
            return {loading:false, brands:action.payload}

        case PRODUCT_BRAND_LIST_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state
    }
}

export const productCategoryListReducers = (state = {category: []}, action) => {
    switch(action.type){
        case PRODUCT_CATEGORY_LIST_REQUEST:
            return {loading:true, categories:[]}
            
        case PRODUCT_CATEGORY_LIST_SUCCESS:
            return {loading:false, categories:action.payload}

        case PRODUCT_CATEGORY_LIST_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state


    }
}



export const productDetailsReducers = (state = {product: {reviews: []}}, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true, ...state}
            
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product:action.payload}

        case PRODUCT_DETAILS_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state
    }
}

export const BrandDetailsReducers = (state = {brand: {}}, action) => {
    switch(action.type){
        case PRODUCT_BRAND_DETAILS_REQUEST:
            return {loading:true, ...state}
            
        case PRODUCT_BRAND_DETAILS_SUCCESS:
            return {loading:false, brand:action.payload}

        case PRODUCT_BRAND_DETAILS_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state


    }
}

export const categoryDetailsReducers = (state = {category: {}}, action) => {
    switch(action.type){
        case PRODUCT_CATEGORY_DETAILS_REQUEST:
            return {loading:true, ...state}
            
        case PRODUCT_CATEGORY_DETAILS_SUCCESS:
            return {loading:false, category:action.payload}

        case PRODUCT_CATEGORY_DETAILS_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state


    }
}

export const productByCategoryReducers = (state = {products: {}}, action) => {
    switch(action.type){
        case PRODUCT_BY_CATEGORY_REQUEST:
            return {loading:true, ...state}
            
        case PRODUCT_BY_CATEGORY_SUCCESS:
            return {loading:false, products:action.payload}

        case PRODUCT_BY_CATEGORY_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state


    }
}

export const productDeleteReducers = (state = { }, action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading:true}
            
        case PRODUCT_DELETE_SUCCESS:
            return {loading:false, success:true}

        case PRODUCT_DELETE_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state


    }
}

export const brandDeleteReducers = (state = { }, action) => {
    switch(action.type){
        case PRODUCT_BRAND_DELETE_REQUEST:
            return {loading:true}
            
        case PRODUCT_BRAND_DELETE_SUCCESS:
            return {loading:false, success:true}

        case PRODUCT_BRAND_DELETE_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state


    }
}

export const categoryDeleteReducers = (state = { }, action) => {
    switch(action.type){
        case PRODUCT_CATEGORY_DELETE_REQUEST:
            return {loading:true}
            
        case PRODUCT_CATEGORY_DELETE_SUCCESS:
            return {loading:false, success:true}

        case PRODUCT_CATEGORY_DELETE_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state


    }
}

export const productCreateReducers = (state = { }, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading:true}
            
        case PRODUCT_CREATE_SUCCESS:
            return {loading:false, success:true, product:action.payload}

        case PRODUCT_CREATE_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCT_CREATE_RESET:
            return {}
    

        default:
            return state
    }
}

export const productBrandReducers = (state = { }, action) => {
    switch(action.type){
        case PRODUCT_BRAND_REQUEST:
            return {loading:true}
            
        case PRODUCT_BRAND_SUCCESS:
            return {loading:false, success:true, brand:action.payload}

        case PRODUCT_BRAND_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCT_BRAND_RESET:
            return {}
    

        default:
            return state
    }
}

export const productCategoryReducers = (state = { }, action) => {
    switch(action.type){
        case PRODUCT_CATEGORY_REQUEST:
            return {loading:true}
            
        case PRODUCT_CATEGORY_SUCCESS:
            return {loading:false, success:true, category:action.payload}

        case PRODUCT_CATEGORY_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCT_CATEGORY_RESET:
            return {}
    
        default:
            return state
    }
}

export const productUpdateReducers = (state = {product:{}}, action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {loading:true}
            
        case PRODUCT_UPDATE_SUCCESS:
            return {loading:false, success:true, product:action.payload}

        case PRODUCT_UPDATE_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCT_UPDATE_RESET:
            return { product: {} }
        default:
            return state

    }
}

export const productSetBrandReducers = (state = {brand:{}}, action) => {
    switch(action.type){

        case PRODUCT_BRAND_SET_REQUEST:
            return {loading:true}
            
        case PRODUCT_BRAND_SET_SUCCESS:
            return {loading:false, success:true, value:action.payload}

        case PRODUCT_BRAND_SET_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCT_BRAND_SET_RESET:
            return { brand: {} }
    
        default:
            return state
    }
}

export const productSetCategoryReducers = (state = {category:{}}, action) => {
    switch(action.type){
        case PRODUCT_CATEGORY_SET_REQUEST:
            return {loading:true}
            
        case PRODUCT_CATEGORY_SET_SUCCESS:
            return {loading:false, success:true, value:action.payload}

        case PRODUCT_CATEGORY_SET_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCT_CATEGORY_SET_RESET:
            return { category: {} }
    
        default:
            return state
    }
}

export const productUpdateBrandReducers = (state = {brand:{}}, action) => {
    switch(action.type){
        case PRODUCT_BRAND_UPDATE_REQUEST:
            return {loading:true}
            
        case PRODUCT_BRAND_UPDATE_SUCCESS:
            return {loading:false, success:true, brand:action.payload}

        case PRODUCT_BRAND_UPDATE_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCT_BRAND_UPDATE_RESET:
            return { product: {} }

        default:
            return state
    }
}

export const topCategoriesReducers = (state = {category: []}, action) => {
    switch(action.type){
        case PRODUCT_CATEGORY_TOP_REQUEST:
            return {loading:true, category: []}
            
        case PRODUCT_CATEGORY_TOP_SUCCESS:
            return {loading:false, success:true, category:action.payload}

        case PRODUCT_CATEGORY_TOP_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCT_CATEGORY_TOP_RESET:
            return {}
    

        default:
            return state
    }
}

export const productUpdateCategoryReducers = (state = {category:{}}, action) => {
    switch(action.type){
        case PRODUCT_CATEGORY_UPDATE_REQUEST:
            return {loading:true}
            
        case PRODUCT_CATEGORY_UPDATE_SUCCESS:
            return {loading:false, success:true, category:action.payload}

        case PRODUCT_CATEGORY_UPDATE_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCT_CATEGORY_UPDATE_RESET:
            return { product: {} }
    

        default:
            return state


    }
}

export const productReviewReducers = (state = { }, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading:true}
            
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading:false, success:true}

        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCT_CREATE_REVIEW_RESET:
            return { }
    
        default:
            return state
    }
}

export const productInfoReducers = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_INFO_REQUEST:
            return {loading:true}
            
        case PRODUCT_CREATE_INFO_SUCCESS:
            return {loading:false, success:true}

        case PRODUCT_CREATE_INFO_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCT_CREATE_INFO_RESET:
            return { }
        default:
            return state
    }
}

export const productUpdateInfoReducers = (state = { inputValue: {}, inputInfo:{} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_INFO_REQUEST:
            return { loading: true };

        case PRODUCT_UPDATE_INFO_SUCCESS:
            return { loading: false, success: true, value: action.payload };

        case PRODUCT_UPDATE_INFO_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_UPDATE_INFO_RESET:
            return { product: {} };

        default:
            return state;
    }
};

export const productDeleteInfoReducers = (state = { }, action) => {
    switch(action.type){
        case PRODUCT_DELETE_INFO_REQUEST:
            return {loading:true}
            
        case PRODUCT_DELETE_INFO_SUCCESS:
            return {loading:false, success:true}

        case PRODUCT_DELETE_INFO_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state


    }
}

export const productTopRatedReducers = (state = {products:[]}, action) => {
    switch(action.type){
        case PRODUCT_TOP_REQUEST:
            return {loading:true, products:[]}
            
        case PRODUCT_TOP_SUCCESS:
            return {loading:false, products:action.payload}

        case PRODUCT_TOP_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state


    }
}

export const productPopularReducers = (state = {products:[]}, action) => {
    switch(action.type){
        case PRODUCT_POPULAR_REQUEST:
            return {loading:true, products:[]}
            
        case PRODUCT_POPULAR_SUCCESS:
            return {loading:false, products:action.payload}

        case PRODUCT_POPULAR_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state


    }
}

export const productTopSellingReducers = (state = {products:[]}, action) => {
    switch(action.type){
        case PRODUCT_TOP_SELLING_REQUEST:
            return {loading:true, products:[]}
            
        case PRODUCT_TOP_SELLING_SUCCESS:
            return {loading:false, products:action.payload}

        case PRODUCT_TOP_SELLING_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state


    }
}


// export const productReviewsReducers = (state = {products:[]}, action) => {
//     switch(action.type){
//         case PRODUCT_RATED_REQUEST:
//             return {loading:true, products:[]}
            
//         case PRODUCT_RATED_SUCCESS:
//             return {loading:false, products:action.payload}

//         case PRODUCT_RATED_FAIL:
//             return {loading:false, error:action.payload}

//         default:
//             return state


//     }
// }

// export const productHighPriceReducers = (state = {products:[]}, action) => {
//     switch(action.type){
//         case PRODUCT_HIGHPRICE_REQUEST:
//             return {loading:true, products:[]}
            
//         case PRODUCT_HIGHPRICE_SUCCESS:
//             return {loading:false, products:action.payload}

//         case PRODUCT_HIGHPRICE_FAIL:
//             return {loading:false, error:action.payload}

//         default:
//             return state


//     }
// }

// export const productLowPriceReducers = (state = {products:[]}, action) => {
//     switch(action.type){
//         case PRODUCT_LOWPRICE_REQUEST:
//             return {loading:true, products:[]}
            
//         case PRODUCT_LOWPRICE_SUCCESS:
//             return {loading:false, products:action.payload}

//         case PRODUCT_LOWPRICE_FAIL:
//             return {loading:false, error:action.payload}

//         default:
//             return state


//     }
// }

// export const productNumReviewsReducers = (state = {products:[]}, action) => {
//     switch(action.type){
//         case PRODUCT_NUMREVIEWS_REQUEST:
//             return {loading:true, products:[]}
            
//         case PRODUCT_NUMREVIEWS_SUCCESS:
//             return {loading:false, products:action.payload}

//         case PRODUCT_NUMREVIEWS_FAIL:
//             return {loading:false, error:action.payload}

//         default:
//             return state


//     }
// }



  export const productSortReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case PRODUCT_RATED_REQUEST:
        return { loading: true, products: [] };
      case PRODUCT_RATED_SUCCESS:
        return { loading: false, products: action.payload };
      case PRODUCT_RATED_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
