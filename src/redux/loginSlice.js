import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginService from "../services/login";

const auth = JSON.parse(localStorage.getItem("auth"));
const initialState = {
	user: auth ? auth : null,
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

//login
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
	try {
		return await loginService.login(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

//logout
export const logout = createAsyncThunk(
	"auth/logout",
	async () => await loginService.logout()
);

export const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		resetLogin: (state) => {
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.message = "";
		},
	},
	extraReducers: (builders) => {
		builders
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			});
	},
});

export const { resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
