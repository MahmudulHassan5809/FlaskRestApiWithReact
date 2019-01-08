import { GET_PRODUCT,ADD_PRODUCT,GET_PRODUCTS,DELETE_PRODUCT,UPDATE_PRODUCT}  from '../actions/types';
const initialState = {
	products: [],
	product: {},
	loading: false
};

export default function(state = initialState , action){
	switch (action.type) {
        case ADD_PRODUCT:
        	return {
        		...state,
        		products: [action.payload]
        	}

    	case GET_PRODUCTS:
	      	return {
		        ...state,
		        products: action.payload,
		        loading: false
	      	};
	    case GET_PRODUCT:
      		return {
		        ...state,
		        product: action.payload,
		        loading: false
      		};

	    case DELETE_PRODUCT:
      		return {
		        ...state,
		        products: state.products.filter(product => product.id !== action.payload)
	      	};
	    case UPDATE_PRODUCT:
	      return {
		        ...state,
		        products: action.payload,
		        loading: false
	      	};
		default:
			return state;
	}
}
