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