import { notification } from "antd";
import { AppDispatch } from "../store";
import { timeLogActions } from "./timeLogReducer";

const { updateAllData } = timeLogActions;

export const getTimeLog = (data: any) => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		const fb = getFirebase();
		const state = getState();
		let fetchedData: any = [];
		let query = fb
			.firestore()
			.collection("users")
			.doc(state.fb.auth.uid)
			.collection("timeLogs")
			.where("timeStartCalc", ">=", data.toString())
			.where("timeFinishCalc", "<=", (data + 86400000).toString());

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
