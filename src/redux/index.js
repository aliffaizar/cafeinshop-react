import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import registerReducer from "./registerSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
export const store = configureStore({
	reducer: {
		login: loginReducer,
		register: registerReducer,
		category: categoryReducer,
		product: productReducer,
		cart: cartReducer,
	},
});
