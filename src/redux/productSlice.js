import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsService from "../services/products";

const initialState = {
	products: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
};

//get all products
export const getProducts = createAsyncThunk(
	"products/getAll",
	async (_, thunkAPI) => {
		try {
			return await productsService.getProducts();
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

//create a product
export const createProduct = createAsyncThunk(
	"products/create",
	async (data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().login.user.token;
			return await productsService.createProduct(data, token);
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

//edit or update product
export const editProduct = createAsyncThunk(
	"products/edit",
	async (data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().login.user.token;
			return await productsService.editProduct(data, token);
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

//delete product
export const deleteProduct = createAsyncThunk(
	"products/delete",
	async (_id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().login.user.token;
			return await productsService.deleteProduct(_id, token);
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

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = action.payload;
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products.push(action.payload);
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(editProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const index = state.products.findIndex(
					(product) => product._id === action.payload._id
				);
				state.products[index] = {
					...state.products[index],
					...action.payload,
				};
			})
			.addCase(editProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = state.products.filter(
					(product) => product._id !== action.payload._id
				);
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
