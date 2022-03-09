const initialState = {
	cartItems: ["item1"]
}

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_TO_CART": {
			return {
				...state, cartItems: [...state.cartItems, action.payload]
			}
		}
		default :
			return state;
	}
}
