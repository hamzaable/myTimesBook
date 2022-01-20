import { notification } from "antd";
import { AppDispatch } from "../store";
import { timeLogActions } from "./timeLogReducer";

const { updateAllData } = timeLogActions;

export const getTimeLogs = (data: any) => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		const fb = getFirebase();
		const state = getState();
		let fetchedData: any = [];
		let query = fb
			.firestore()
			.collection("users")
			.doc(state.fb.auth.uid)
			.collection("timeLogs")
			.where("timeStartCalc", ">=", data.dateStart)
			.where("timeStartCalc", "<=", data.dateFinish)
			.orderBy("timeStartCalc");

		await query.get().then(async (querySnapshot: any) => {
			await Promise.all(
				querySnapshot.docs.map((doc: any) => {
					fetchedData.push({ id: doc.id, ...doc.data() });
					return null;
				})
			);
		});
		console.log(fetchedData);
		dispatch(updateAllData(fetchedData));
	};
};

export const addNewTimeLog = (data: any) => {
	return async (
		dispatch: any,
		getState: any,
		{ getFirebase }: any
	): Promise<any> => {
		const fb = getFirebase();
		const state = getState();

		const query = fb
			.firestore()
			.collection(`users`)
			.doc(state.fb.auth.uid)
			.collection("timeLogs")
			.doc();
		await query
			.set(data)
			.then(() => {
				notification["success"]({
					message: `Time Log Saved`,
					description: "Data added successfully",
				});
			})
			.catch(() => {
				console.log("Document not successfully written!");
			});
	};
};

export const getOneTimeLog = (id: string) => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		const fb = getFirebase();
		const state = getState();
		let query = fb
			.firestore()
			.collection("users")
			.doc(state.fb.auth.uid)
			.collection("timeLogs")
			.doc(id);
		const data = query
			.get()
			.then((doc: any) => {
				if (doc.exists) {
					return { id: doc.id, ...doc.data() };
				} else {
					console.log("No such document!");
				}
			})
			.catch((error: any) => {
				console.log("Error getting document:", error);
			});

		return await data;
	};
};

export const updateOneTimeLog = (id: string, data: any) => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		const fb = getFirebase();
		const state = getState();
		fb.firestore()
			.collection("users")
			.doc(state.fb.auth.uid)
			.collection("timeLogs")
			.doc(id)
			.update(data)
			.then(() => {
				notification["success"]({
					message: `Log Update`,
					description: "Data updated successfully",
				});
			});
	};
};
