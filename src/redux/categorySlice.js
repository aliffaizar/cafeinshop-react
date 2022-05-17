import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoriesService from "../services/categories";

const initialState = {
	categories: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

// create a category
export const createCategory = createAsyncThunk(
	"categories/create",
	async (data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().login.user.token;
			return await categoriesService.createCategory(data, token);
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

//get categories
export const getCategories = createAsyncThunk(
	"caregories/getCategories",
	async (_, thunkAPI) => {
		try {
			return await categoriesService.getCategories();
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

//update or edit category
export const editCategory = createAsyncThunk(
	"categories/edit",
	async (data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().login.user.token;
			return await categoriesService.editCategory(data, token);
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

//delete category
export const deleteCategory = createAsyncThunk(
	"categories/delete",
	async (_id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().login.user.token;
			return await categoriesService.deleteCategory(_id, token);
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

//category Slice
export const categorySlcie = createSlice({
	name: "category",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builders) => {
		builders
			.addCase(createCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.categories.push(action.payload);
			})
			.addCase(createCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getCategories.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCategories.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.categories = action.payload;
			})
			.addCase(getCategories.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.message = action.payload;
			})
			.addCase(deleteCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.categories = state.categories.filter(
					(category) => category._id !== action.payload._id
				);
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(editCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const index = state.categories.findIndex(
					(category) => category._id === action.payload._id
				);
				state.categories[index] = {
					...state.categories[index],
					...action.payload,
				};
			})
			.addCase(editCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = categorySlcie.actions;
export default categorySlcie.reducer;
