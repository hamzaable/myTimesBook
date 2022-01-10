import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./auth/authReducer";
import settingsReducer from "./settings/settingsReducer";
import timeLogReducer from "./timeLog/timeLogReducer";

const rootReducers = combineReducers({
	fb: firebaseReducer,
	fs: firestoreReducer,
	auth: authReducer,
	settings: settingsReducer,
	timeLog: timeLogReducer,
});

export default rootReducers;
