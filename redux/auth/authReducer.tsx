
import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLogin: false, data: null, error: false };

const authSlice = createSlice({
	name: "authReducer",
	initialState,
	reducers: {
		signIn(state, action: any) {
			state.isLogin = true;
            state.data = action.payload
		},
		signOut(state, action: any) {
			state.isLogin = false;
		},
	},
});

export const authActions = authSlice.actions;

// export default store;
const authReducer = authSlice.reducer;
export default authReducer;
