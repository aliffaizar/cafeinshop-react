import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartServices from "../services/cart";

const initialState = {
	carts: [],
	items: [],
	isError: false,
	isLoading: false,
	isSucces: false,
	message: "",
	totalPrice: 0,
	totalQuantity: 0,
};

//create a cart
export const createCart = createAsyncThunk(
	"carts/create",
	async (data, thunkAPI) => {
		try {
			const finalData = { ...data, user: thunkAPI.getState().login.user._id };
			const token = thunkAPI.getState().login.user.token;
			return await cartServices.createCart(finalData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		resetCart: (state) => initialState,
		addItem: (state, action) => {
			const index = state.items.findIndex(
				(item) => item._id === action.payload._id
			);
			if (index >= 0) {
				state.items[index].quantity += 1;
			} else {
				const tmpItems = { ...action.payload, quantity: 1 };
				state.items.push(tmpItems);
			}
		},
		removeItem: (state, action) => {
			const filteredItems = state.items.filter(
				(item) => item._id !== action.payload._id
			);
			state.items = filteredItems;
		},
		reduceQuantity: (state, action) => {
			const index = state.items.findIndex(
				(item) => item._id === action.payload._id
			);
			if (state.items[index].quantity > 1) {
				state.items[index].quantity -= 1;
			} else {
				const filteredItems = state.items.filter(
					(item) => item._id !== action.payload._id
				);
				state.items = filteredItems;
			}
		},
		addQuantity: (state, action) => {
			const index = state.items.findIndex(
				(item) => item._id === action.payload._id
			);
			state.items[index].quantity += 1;
		},
		clearItems: (state, action) => {
			state.items = [];
		},
		getTotal: (state, action) => {
			let { total, quantity } = state.items.reduce(
				(itemsTotal, items) => {
					const { price, quantity } = items;
					const subTotal = price * quantity;
					itemsTotal.total += subTotal;
					itemsTotal.quantity += quantity;
					return itemsTotal;
				},
				{ total: 0, quantity: 0 }
			);
			state.totalPrice = total;
			state.totalQuantity = quantity;
		},
	},
	extraReducers: (builders) => {
		builders
			.addCase(createCart.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createCart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSucces = true;
				state.carts.push(action.payload);
			})
			.addCase(createCart.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const {
	resetCart,
	addItem,
	removeItem,
	reduceQuantity,
	addQuantity,
	clearItems,
	getTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
