import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { getFirebase } from "react-redux-firebase";
import {
	reduxFirestore,
	getFirestore,
	createFirestoreInstance,
} from "redux-firestore";
import { composeWithDevTools } from "redux-devtools-extension";
import firebase from "../firebase/firebaseConfig";
import * as storage from "firebase/compat/storage";
import rootReducer from "./rootReducers";
import fbConfig from "../firebase/firebaseConfig";

const store = createStore(
	rootReducer,
	composeWithDevTools(
		compose(
			applyMiddleware(
				thunk.withExtraArgument({ getFirebase, getFirestore, storage })
			),
			reduxFirestore(fbConfig)
		)
	)
);

export const rrfProps = {
	firebase,
	config:
		(fbConfig,
		{
			useFirestoreForProfile: true,
			userProfile: "users",
			enableClaims: true,
			attachAuthIsReady: true,
		}),
	dispatch: store.dispatch,
	createFirestoreInstance,
};

export default store;

export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch