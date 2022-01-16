import type { AppProps } from "next/app";
import "../styles/globals.css";
import "antd/dist/antd.css";
import React, { useEffect } from "react";

import store, { RootState, rrfProps } from "../redux/store";
import { Provider } from "react-redux";
import { isLoaded, ReactReduxFirebaseProvider } from "react-redux-firebase";
import ProtectedRoutes from "../components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { getUserSettings } from "../redux/settings/settingsActions";
import Router from "next/router";
import { unProtectedRoutes } from "../components/Constants/unProtectedRoutes";
import dynamic from "next/dynamic";

const AppWrapper: React.FC = (props) => {
	const isAuthenticated = useSelector((state: RootState) => state.fb.auth);
	const user = isAuthenticated.uid;
	const fbStatus = isLoaded(isAuthenticated);
	const dispatch = useDispatch();
	useEffect(() => {
		if (fbStatus === true) {
			if (user) {
				dispatch(getUserSettings(user));
				const pathIsProtected =
					unProtectedRoutes.indexOf(Router.pathname) === -1;
				if (!pathIsProtected) {
					Router.push("dashboard");
				}
			}
		}
	}, [dispatch, fbStatus, user]);
	return <>{props.children}</>;
};
function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...rrfProps}>
				<AppWrapper>
					<ProtectedRoutes router={router}>
						<Component {...pageProps} />
					</ProtectedRoutes>
				</AppWrapper>
			</ReactReduxFirebaseProvider>
		</Provider>
	);
}

export default MyApp;

// export default dynamic(() => Promise.resolve(MyApp), {
//     ssr: false,
//   });
