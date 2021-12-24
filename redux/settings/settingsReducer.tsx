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
	loading: false,
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
			state.loading = true;
		},
		dataFetchEnd(state, action: any) {
			state.loading = false;
		},
	},
});

export const settingsActions = settingsSlice.actions;

const settingsReducer = settingsSlice.reducer;
export default settingsReducer;
