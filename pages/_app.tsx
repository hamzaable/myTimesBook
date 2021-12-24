import type { AppProps } from "next/app";
import "../styles/globals.css";
import "antd/dist/antd.css";
import React, { useEffect } from "react";

import store, { rrfProps } from "../redux/store";
import { Provider } from "react-redux";
import { isLoaded, ReactReduxFirebaseProvider } from "react-redux-firebase";
import ProtectedRoutes from "../components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { getUserSettings } from "../redux/settings/settingsActions";
import Router, { useRouter } from "next/router";
import { unProtectedRoutes } from "../components/Constants/unProtectedRoutes";

const AppWrapper = (props: any) => {
	const isAuthenticated = useSelector((state: any) => state.fb.auth);
	const user = isAuthenticated.uid;
	const fbStatus = isLoaded(isAuthenticated);
	const dispatch = useDispatch();
	useEffect(() => {
		if (fbStatus === true) {
			if (user) {
				dispatch(getUserSettings(user.uid));
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
				<ProtectedRoutes router={router}>
					<AppWrapper>
						<Component {...pageProps} />
					</AppWrapper>
				</ProtectedRoutes>
			</ReactReduxFirebaseProvider>
		</Provider>
	);
}

export default MyApp;
