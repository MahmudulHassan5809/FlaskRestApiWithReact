import axios from 'axios';
import {GET_PRODUCT,ADD_PRODUCT , GET_PRODUCTS ,DELETE_PRODUCT,UPDATE_PRODUCT}  from './types';

//Add Product
export const addProduct = (productData) => dispatch => {
	axios
		.post('/product',productData)
		.then(res =>
       dispatch({
       	 type: ADD_PRODUCT,
       	 payload: res.data
       })
		)
		.catch(err => console.log(err));
}


// Get Products
export const getProducts = () => dispatch => {
  axios
    .get('/products')
    .then(res =>
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCTS,
        payload: null
      })
    );
};




// Delete Product
export const deleteProduct = id => dispatch => {
  axios
    .delete(`/product/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PRODUCT,
        payload: id
      })
    )
    .catch(err => console.log(err));
};




// Get Product
export const getProduct = id => dispatch => {
   axios
    .get(`/product/${id}`)
    .then(res =>
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCT,
        payload: null
      })
    );
};


export const updateProduct = (product,id) =>  dispatch => {
  axios
  .put(`product/${id}`,product)
  .then(res =>
      dispatch ({
      type: UPDATE_PRODUCT,
      payload: res.data
    })
   );

};






