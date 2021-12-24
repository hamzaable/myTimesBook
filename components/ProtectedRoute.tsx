import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import MainLayout from "./Layout/mainLayout";
import {unProtectedRoutes} from '../components/Constants/unProtectedRoutes'

const ProtectedRoute = ({ router, children }: any) => {
	const isAuthenticated = useSelector((state: any) => state.fb.auth);
	const fbStatus = isLoaded(isAuthenticated);

	const pathIsProtected = unProtectedRoutes.indexOf(router.pathname) === -1;
	useEffect(() => {
		if (!isAuthenticated.uid && pathIsProtected && fbStatus) {
			router.push("login");
		} else {
			// router.push("dashboard");
		}
	}, [router, isAuthenticated.uid, pathIsProtected, fbStatus]);

	return isAuthenticated.uid && pathIsProtected && fbStatus ? (
		<MainLayout>{children}</MainLayout>
	) : (
		<>{children}</>
	);
};
export default ProtectedRoute;