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
	logTypesData: [],
	logTypeDetailsData: [],
	isTimeLogModalVisible: { isVisible: false, openID: "id" },
    parentsList:[]
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
		updateLogTypes(state, action: any) {
			state.logTypesData = action.payload;
		},
		addLogType(state, action: any) {
			state.logTypesData = state.logTypesData.concat(action.payload);
		},
		updateLogTypeDetails(state, action: any) {
			state.logTypeDetailsData = action.payload;
		},
		addLogTypeDetail(state, action: any) {
			state.logTypeDetailsData = state.logTypeDetailsData.concat(
				action.payload
			);
		},
		deleteLogTypeDetails(state, action: any) {
			state.logTypeDetailsData = state.logTypeDetailsData.filter(
				(item: string) => {
					if (item === action.payload) {
						return false;
					} else {
						return true;
					}
				}
			);
		},
		setTimeLogModal(state, action) {
			state.isTimeLogModalVisible = action.payload;
		},
        setParentsList(state,action){
            state.parentsList = action.payload
        }
	},
});

export const settingsActions = settingsSlice.actions;

const settingsReducer = settingsSlice.reducer;
export default settingsReducer;
