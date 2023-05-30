import {
    SEARCH_LIST_REQUEST, 
    SEARCH_LIST_SUCCESS, 
    SEARCH_LIST_FAIL,

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

    PRODUCT_UPDATE_INFO_REQUEST, 
    PRODUCT_UPDATE_INFO_SUCCESS, 
    PRODUCT_UPDATE_INFO_FAIL,

    PRODUCT_LIST_INFO_REQUEST, 
    PRODUCT_LIST_INFO_SUCCESS, 
    PRODUCT_LIST_INFO_FAIL,

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

    PRODUCT_CATEGORY_SET_REQUEST,
    PRODUCT_CATEGORY_SET_SUCCESS,
    PRODUCT_CATEGORY_SET_FAIL,
    PRODUCT_CATEGORY_SET_RESET,

    PRODUCT_BY_CATEGORY_REQUEST,
    PRODUCT_BY_CATEGORY_SUCCESS,
    PRODUCT_BY_CATEGORY_FAIL,

    PRODUCT_CATEGORY_TOP_REQUEST,
    PRODUCT_CATEGORY_TOP_SUCCESS,
    PRODUCT_CATEGORY_TOP_FAIL ,

    PRODUCT_RATED_REQUEST,
    PRODUCT_RATED_SUCCESS,
    PRODUCT_RATED_FAIL,
    PRODUCT_RATED_RESET,

    PRODUCT_SECTION_SET_REQUEST,
    PRODUCT_SECTION_SET_SUCCESS,
    PRODUCT_SECTION_SET_FAIL,
    PRODUCT_SECTION_SET_RESET,
    PRODUCT_SECTION_REQUEST,
    PRODUCT_SECTION_SUCCESS,
    PRODUCT_SECTION_FAIL,
    PRODUCT_SECTION_RESET,
    PRODUCT_SECTION_DELETE_REQUEST,
    PRODUCT_SECTION_DELETE_SUCCESS,
    PRODUCT_SECTION_DELETE_FAIL,
    PRODUCT_SECTION_DELETE_RESET,
    PRODUCT_SECTION_UPDATE_REQUEST,
    PRODUCT_SECTION_UPDATE_SUCCESS,
    PRODUCT_SECTION_UPDATE_FAIL,
    PRODUCT_SECTION_UPDATE_RESET,
    PRODUCT_SECTION_DETAILS_REQUEST,
    PRODUCT_SECTION_DETAILS_SUCCESS,
    PRODUCT_SECTION_DETAILS_FAIL,
    PRODUCT_SECTION_DETAILS_RESET,
    PRODUCT_SECTION_LIST_REQUEST,
    PRODUCT_SECTION_LIST_SUCCESS,
    PRODUCT_SECTION_LIST_FAIL,
    PRODUCT_SECTION_LIST_RESET,



    PRODUCT_SUBSECTION_SET_REQUEST,
    PRODUCT_SUBSECTION_SET_SUCCESS,
    PRODUCT_SUBSECTION_SET_FAIL,
    PRODUCT_SUBSECTION_SET_RESET,
    PRODUCT_SUBSECTION_REQUEST,
    PRODUCT_SUBSECTION_SUCCESS,
    PRODUCT_SUBSECTION_FAIL,
    PRODUCT_SUBSECTION_RESET,
    PRODUCT_SUBSECTION_DELETE_REQUEST,
    PRODUCT_SUBSECTION_DELETE_SUCCESS,
    PRODUCT_SUBSECTION_DELETE_FAIL,
    PRODUCT_SUBSECTION_DELETE_RESET,
    PRODUCT_SUBSECTION_UPDATE_REQUEST,
    PRODUCT_SUBSECTION_UPDATE_SUCCESS,
    PRODUCT_SUBSECTION_UPDATE_FAIL,
    PRODUCT_SUBSECTION_UPDATE_RESET,
    PRODUCT_SUBSECTION_DETAILS_REQUEST,
    PRODUCT_SUBSECTION_DETAILS_SUCCESS,
    PRODUCT_SUBSECTION_DETAILS_FAIL,
    PRODUCT_SUBSECTION_DETAILS_RESET,
    PRODUCT_SUBSECTION_LIST_REQUEST,
    PRODUCT_SUBSECTION_LIST_SUCCESS,
    PRODUCT_SUBSECTION_LIST_FAIL,
    PRODUCT_SUBSECTION_LIST_RESET,

    PRODUCT_BY_SECTION_REQUEST,
    PRODUCT_BY_SECTION_SUCCESS,
    PRODUCT_BY_SECTION_FAIL,

    PRODUCT_BY_SUBSECTION_REQUEST,
    PRODUCT_BY_SUBSECTION_SUCCESS,
    PRODUCT_BY_SUBSECTION_FAIL,


    PRODUCT_CATEGORY_SECTION_REQUEST,
    PRODUCT_CATEGORY_SECTION_SUCCESS,
    PRODUCT_CATEGORY_SECTION_FAIL,
    PRODUCT_CATEGORY_SECTION_RESET,

    PRODUCT_RECOMMENDED_REQUEST,
    PRODUCT_RECOMMENDED_SUCCESS,
    PRODUCT_RECOMMENDED_FAIL,


} from '../constants/productConstants'

import axios from 'axios';
import Cookies from 'js-cookie';


export const listProducts = (keyword = '') => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})

        const {data} = await axios.get(`/api/products${keyword}`);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listSearch = (keyword = '') => async(dispatch) => {
    try{
        dispatch({type:SEARCH_LIST_REQUEST})

        const {data} = await axios.get(`/api/products/search/${keyword}`);

        dispatch({
            type: SEARCH_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: SEARCH_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listProductsBrands = () => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_BRAND_LIST_REQUEST})

        const {data} = await axios.get(`/api/brands/`);

        dispatch({
            type: PRODUCT_BRAND_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_BRAND_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listProductsCategories = () => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_CATEGORY_LIST_REQUEST})

        const {data} = await axios.get(`/api/categories/`);

        dispatch({
            type: PRODUCT_CATEGORY_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listProductsSections = () => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_SECTION_LIST_REQUEST})

        const {data} = await axios.get(`/api/sections/`);

        dispatch({
            type: PRODUCT_SECTION_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_SECTION_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listProductsSubsections = () => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_SUBSECTION_LIST_REQUEST})

        const {data} = await axios.get(`/api/subsections/`);

        dispatch({
            type: PRODUCT_SUBSECTION_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_SUBSECTION_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listTopProducts = () => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_TOP_REQUEST})

        const {data} = await axios.get(`/api/products/top/`);

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listPopularProducts = () => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_POPULAR_REQUEST})

        const {data} = await axios.get(`/api/products/popular/`);

        dispatch({
            type: PRODUCT_POPULAR_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_POPULAR_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listRecommendedProducts = (id) => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_RECOMMENDED_REQUEST})
        
        const {data} = await axios.get(`/api/products/${id}/recommendations/`);

        dispatch({
            type: PRODUCT_RECOMMENDED_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_RECOMMENDED_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listSellingProducts = () => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_TOP_SELLING_REQUEST})

        const {data} = await axios.get(`/api/products/selling/`);

        dispatch({
            type: PRODUCT_TOP_SELLING_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_TOP_SELLING_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listProductsDetails = (id) => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listBrandsDetails = (id) => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_BRAND_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/brands/${id}/`);

        dispatch({
            type: PRODUCT_BRAND_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_BRAND_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const listCategoriesDetails = (id) => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_BY_CATEGORY_REQUEST})

        const {data} = await axios.get(`/api/categories/categorylist/${id}/`);

        dispatch({
            type: PRODUCT_BY_CATEGORY_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_BY_CATEGORY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listSectionDetails = (id) => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_BY_SECTION_REQUEST})

        const {data} = await axios.get(`/api/sections/sectionlist/${id}/`);

        dispatch({
            type: PRODUCT_BY_SECTION_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_BY_SECTION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listSubsectionDetails = (id) => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_BY_SUBSECTION_REQUEST})

        const {data} = await axios.get(`/api/subsections/subsectionlist/${id}/`);

        dispatch({
            type: PRODUCT_BY_SUBSECTION_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_BY_SUBSECTION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const listProductByCategoriesDetails = (options) => async(dispatch) => {
    try{
    //   const { id, _id, category, sort, filter, price } = cat;
    //   console.log(cat);
    const queryParams = new URLSearchParams({
        category: options.category,
        sort: options.sort,
        filter: JSON.stringify(options.filter),
        price: options.price
      }).toString();
      
      const { data } = await axios.get(
        `/api/categories/categorylist/${options.categoryId}/section/${options.sectionId}/?${queryParams}`
      )
      dispatch({ type: PRODUCT_BY_CATEGORY_SUCCESS, payload: data })
    }catch(error){
      dispatch({
        type: PRODUCT_BY_CATEGORY_FAIL,
        payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
      })
    }
  }

export const listTopCategories = () => async(dispatch) => {

    try{
        dispatch({type:PRODUCT_CATEGORY_TOP_REQUEST})

        const {data} = await axios.get(`/api/categories/top/`);

        dispatch({
            type: PRODUCT_CATEGORY_TOP_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_CATEGORY_TOP_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }


}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_DELETE_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.delete(
            `/api/products/delete/${id}/`,
            config
        )
    
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}


export const deleteBrand = (id) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_BRAND_DELETE_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.delete(
            `/api/brands/delete/${id}/`,
            config
        )
    
        dispatch({
            type: PRODUCT_BRAND_DELETE_SUCCESS,
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_BRAND_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const deleteCategory = (id) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_CATEGORY_DELETE_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.delete(
            `/api/categories/delete/${id}/`,
            config
        )
    
        dispatch({
            type: PRODUCT_CATEGORY_DELETE_SUCCESS,
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_CATEGORY_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const deleteSection = (id) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_SECTION_DELETE_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.delete(
            `/api/sections/delete/${id}/`,
            config
        )
    
        dispatch({
            type: PRODUCT_SECTION_DELETE_SUCCESS,
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_SECTION_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const deleteSubsection = (id) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_SUBSECTION_DELETE_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.delete(
            `/api/subsections/delete/${id}/`,
            config
        )
    
        dispatch({
            type: PRODUCT_SUBSECTION_DELETE_SUCCESS,
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_SUBSECTION_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_CREATE_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.post(
            `/api/products/create/`,
            {},
            config
        )
    
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload:data
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}


export const createBrand = () => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_BRAND_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.post(
            `/api/brands/create/brand/`,
            {},
            config
        )
    
        dispatch({
            type: PRODUCT_BRAND_SUCCESS,
            payload:data
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_BRAND_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const createCategory = () => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_CATEGORY_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.post(
            `/api/categories/create/category/`,
            {},
            config
        )
    
        dispatch({
            type: PRODUCT_CATEGORY_SUCCESS,
            payload:data
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_CATEGORY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const createSection = (id, inform) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_SECTION_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `/api/categories/create/${id}/section/`,
            inform,
            config
        )
    
        dispatch({
            type: PRODUCT_SECTION_SUCCESS,
            payload:data
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_SECTION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}


export const createSubsection = () => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_SUBSECTION_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `/api/subsections/create/subsection/`,
            {},
            config
        )
    
        dispatch({
            type: PRODUCT_SUBSECTION_SUCCESS,
            payload:data
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_SUBSECTION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}



export const updateProduct = (product) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_UPDATE_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config
        )
    
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload:data
        })

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload:data})

    }catch (error) { 
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const setProductBrand = (brand) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_BRAND_SET_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.put(
            `/api/products/update/${brand._id}/brand/${brand.id}/`,
            brand, // второй аргумент - объект brand
            config
        )
    
        dispatch({
            type: PRODUCT_BRAND_SET_SUCCESS,
            payload:data
        })

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload:data})

    }catch (error) { 
        dispatch({
            type: PRODUCT_BRAND_SET_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const setProductCategory = (category) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_CATEGORY_SET_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                'X-CSRFToken': 'your_csrf_token_here',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.put(
            `/api/products/update/${category._id}/category/${category.id}/`,
            category, // второй аргумент - объект brand
            config
        )
    
        dispatch({
            type: PRODUCT_CATEGORY_SET_SUCCESS,
            payload:data
        })

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload:data})

    }catch (error) { 
        dispatch({
            type: PRODUCT_CATEGORY_SET_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const setProductSection = (section) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_SECTION_SET_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                'X-CSRFToken': 'your_csrf_token_here',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.put(
            `/api/products/update/${section._id}/section/${section.id}/`,
            section, // второй аргумент - объект brand
            config
        )
    
        dispatch({
            type: PRODUCT_SECTION_SET_SUCCESS,
            payload:data
        })

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload:data})

    }catch (error) { 
        dispatch({
            type: PRODUCT_SECTION_SET_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const setProductSubsection = (subsection) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_SUBSECTION_SET_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                'X-CSRFToken': 'your_csrf_token_here',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.put(
            `/api/products/update/${subsection._id}/subsection/${subsection.id}/`,
            subsection, // второй аргумент - объект brand
            config
        )
    
        dispatch({
            type: PRODUCT_SUBSECTION_SET_SUCCESS,
            payload:data
        })

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload:data})

    }catch (error) { 
        dispatch({
            type: PRODUCT_SUBSECTION_SET_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const updateBrand = (brand) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_BRAND_UPDATE_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.put(
            `/api/brands/update/${brand._id}/`,
            brand,
            config
        )
    
        dispatch({
            type: PRODUCT_BRAND_UPDATE_SUCCESS,
            payload:data
        })

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload:data})

    }catch (error) { 
        dispatch({
            type: PRODUCT_BRAND_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const updateCategory = (category) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_CATEGORY_UPDATE_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.put(
            `/api/categories/update/${category._id}/`,
            category,
            config
        )
    
        dispatch({
            type: PRODUCT_CATEGORY_UPDATE_SUCCESS,
            payload:data
        })

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload:data})

    }catch (error) { 
        dispatch({
            type: PRODUCT_CATEGORY_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const updateSection = (section) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_SECTION_UPDATE_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.put(
            `/api/sections/update/${section._id}/`,
            section,
            config
        )
    
        dispatch({
            type: PRODUCT_SECTION_UPDATE_SUCCESS,
            payload:data
        })

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload:data})

    }catch (error) { 
        dispatch({
            type: PRODUCT_SECTION_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const updateSubsection = (subsection) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_SUBSECTION_UPDATE_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.put(
            `/api/subsections/update/${subsection._id}/`,
            subsection,
            config
        )
    
        dispatch({
            type: PRODUCT_SUBSECTION_UPDATE_SUCCESS,
            payload:data
        })

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload:data})

    }catch (error) { 
        dispatch({
            type: PRODUCT_SUBSECTION_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const updateCategorySection = (_id, id, name) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CATEGORY_SECTION_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/categories/update/${_id}/section/update/${id}/`,
            {name},
            config,
        );

        dispatch({
            type: PRODUCT_CATEGORY_SECTION_SUCCESS,
            payload: data,
        });

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_CATEGORY_SECTION_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const deleteProductInfo = (_id, id,) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_DELETE_INFO_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.delete(
        `/api/products/delete/${_id}/info/delete/${id}/`,
        config
        )
    
        dispatch({
            type: PRODUCT_DELETE_INFO_SUCCESS,
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_DELETE_INFO_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}

export const updateProductInfo = (_id, id, inputValue, inputInfo) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_INFO_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/products/update/${_id}/info/update/${id}/`,
            {inputValue, inputInfo},
            config,
        );

        dispatch({
            type: PRODUCT_UPDATE_INFO_SUCCESS,
            payload: data,
        });

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_INFO_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};


export const createProductReview = (id, review) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_CREATE_REVIEW_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.post(
            `/api/products/${id}/reviews/`,
            review,
            config
        )
    
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload:data
        })
 
    }catch (error) { 
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}


export const createInfo = (id, information) => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_CREATE_INFO_REQUEST})

        const { 
            userLogin: {userInfo},
        } = getState()
    
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.post(
            `/api/products/update/${id}/info/`,
            information,
            config
        )
    
        dispatch({
            type: PRODUCT_CREATE_INFO_SUCCESS,
            payload:data
        })
 
    }catch (error) { 
        dispatch({
            type: PRODUCT_CREATE_INFO_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    
    }
}



export const sortProducts = (sort) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_RATED_REQUEST });
  
      const { data } = await axios.get('/api/products/sort/',
      sort
      );
  
      dispatch({
        type: PRODUCT_RATED_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_RATED_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

