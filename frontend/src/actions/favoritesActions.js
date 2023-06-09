import axios from 'axios'
import {    FAVORITES_ADD_ITEM, 
    FAVORITES_REMOVE_ITEM, 

} from '../constants/favoriteConstants'

export const addToFavorites = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type:FAVORITES_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.images[0].image,
            price: data.price,
            countInStock: data.countInStock,
       
        }
    })

    localStorage.setItem('favoritesItems',JSON.stringify(getState().favorites.favoritesItems))
}

export const removeFromFavorites = (id) => (dispatch, getState) => {
    dispatch({
        type:FAVORITES_REMOVE_ITEM,
        payload: id,

    })
    localStorage.setItem('favoritesItems',JSON.stringify(getState().favorites.favoritesItems))

}