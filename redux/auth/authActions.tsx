import { authActions } from "./authReducer";

export const signin = (data: any) => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		const fb = getFirebase();
		await fb
			.auth()
			.signInWithEmailAndPassword(data.email, data.password)
			.then((value: any) => {
				dispatch(authActions.signIn(data));
			})
			.catch(function (error: any) {
				const errorCode = error.code;
				console.log(errorCode);
				const errorMessage = error.message;
				console.log("return ~ errorMessage", errorMessage);
				fb.auth().signOut();
			});
	};
};

export const signout = () => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		const fb = getFirebase();
		await fb.auth().signOut();
		dispatch(authActions.signOut({}));
	};
};
