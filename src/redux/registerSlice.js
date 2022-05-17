import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import registerService from "../services/register";

const initialState = {
	user: null,
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const register = createAsyncThunk(
	"auth/registera",
	async (user, thunkAPI) => {
		try {
			return await registerService(user);
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
export const registerSlice = createSlice({
	name: "register",
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.message = "";
		},
	},
	extraReducers: (builders) => {
		builders
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			});
	},
});

export const { reset } = registerSlice.actions;
export default registerSlice.reducer;
