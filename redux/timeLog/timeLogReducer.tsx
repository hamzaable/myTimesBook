import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	dashboardTimeLogData: {},
};

const timeLogSlice = createSlice({
	name: "timeLogReducer",
	initialState,
	reducers: {
		updateAllData(state, action: any) {
			state.dashboardTimeLogData = action.payload;
		},
		
	},
});

export const timeLogActions = timeLogSlice.actions;

const timeLogReducer = timeLogSlice.reducer;
export default timeLogReducer;
