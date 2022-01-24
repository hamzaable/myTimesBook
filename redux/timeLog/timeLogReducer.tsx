import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	dashboardTimeLogData: {},
    filterTimeLogData:[]
};

const timeLogSlice = createSlice({
	name: "timeLogReducer",
	initialState,
	reducers: {
		updateAllData(state, action: any) {
			state.dashboardTimeLogData = action.payload;
		},
        updateFilteredAllData(state, action: any) {
			state.filterTimeLogData = action.payload;
		},
		
	},
});

export const timeLogActions = timeLogSlice.actions;

const timeLogReducer = timeLogSlice.reducer;
export default timeLogReducer;
