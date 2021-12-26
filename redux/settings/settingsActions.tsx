import { settingsActions } from "./settingsReducer";

const { updateAllData } = settingsActions;

export const getUserSettings = (data: any) => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		const fb = getFirebase();
		const state = getState();
		let fetchedData: any = [];
		let query = fb
			.firestore()
			.collection("users")
			.where("UID", "==", state.fb.auth.uid);

		await query.get().then(async (querySnapshot: any) => {
			await Promise.all(
				querySnapshot.docs.map((doc: any) => {
					fetchedData.push({ id: doc.id, ...doc.data() });
					return null;
				})
			);
		});
		dispatch(updateAllData(fetchedData[0]));
	};
};

export const updateUserSettings = (data: any) => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		const fb = getFirebase();
		const state = getState();
		let query = fb.firestore().collection("users").doc(state.fb.auth.uid);
		await query
			.set(
				{
					firstName: data.firstname,
					lastName: data.lastname,
					language: data.language,
					timeSteps: data.timesteps,
					username: data.username,
					UID: state.fb.auth.uid,
					dateAdded: fb.firestore.Timestamp.fromDate(
						new Date()
					).toDate(),
				},
				{ merge: true }
			)
			.then(() => {
				console.log("Document successfully written!");
				dispatch(getUserSettings(state.fb.auth.uid));
			})
			.catch(() => {
				console.log("Document not successfully written!");
			});

		// dispatch(updateAllData(fetchedData[0]));
	};
};
