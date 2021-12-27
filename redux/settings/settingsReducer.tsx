import { createSlice } from "@reduxjs/toolkit";

interface UserData {
	firstName: string;
	lastName: string;
	dateAdded: null;
	language: string;
	timeSteps: number;
	username: string;
}
const initialState = {
	userData: {
		firstName: "",
		lastName: "",
		dateAdded: null,
		language: "English",
		timeSteps: 5,
		username: "",
	},
	globalLoading: false,
};

const settingsSlice = createSlice({
	name: "settingsReducer",
	initialState,
	reducers: {
		updateAllData(state, action: any) {
			state.userData = action.payload;
		},
		updateSingleData(state, action: any) {
			// state.userData[action.fieldName] = action.fieldValue;
		},
		dataFetchStart(state, action: any) {
			state.globalLoading = true;
		},
		dataFetchEnd(state, action: any) {
			state.globalLoading = false;
		},
		globalLoadingStart(state) {
			state.globalLoading = true;
		},
		globalLoadingFinish(state) {
			state.globalLoading = false;
		},
	},
});

export const settingsActions = settingsSlice.actions;

const settingsReducer = settingsSlice.reducer;
export default settingsReducer;
