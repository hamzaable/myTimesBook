import { notification } from "antd";
import { AppDispatch } from "../store";
import { settingsActions } from "./settingsReducer";

const {
	updateAllData,
	globalLoadingStart,
	globalLoadingFinish,
	updateLogTypes,
	updateLogTypeDetails,
	deleteLogTypeDetails,
	addLogType,
	addLogTypeDetail,
} = settingsActions;

export const getUserSettings = (data: any) => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		console.log("getUserSettings ~ getUserSettings");
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

export const loadingStart = () => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		dispatch(globalLoadingStart());
	};
};

export const loadingFinish = () => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		dispatch(globalLoadingFinish());
	};
};

export const getLogTypes = () => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
        console.log("getLogTypes")
		const fb = getFirebase();
		const state = getState();
		const documentRef = fb
			.firestore()
			.collection(`users`)
			.doc(state.fb.auth.uid)
			.collection("types");
		const results: string[] = [];
		await documentRef
			.get()
			.then((querySnapshot: any) => {
				querySnapshot.forEach((doc: any) => {
					if (doc.exists) {
						results.push(doc.data()["typeName"]);
					}
				});
			})
			.catch((error: any) => {
				console.log("Error getting documents: ", error);
			});

		const uniqueResults: string[] = [...new Set(results)];
		if (uniqueResults.length !== 0) {
			dispatch(updateLogTypes(uniqueResults));
		} else {
			dispatch(updateLogTypes([]));
		}
		return;
	};
};

export const getLogTypeDetails = (type: string) => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		console.log("getLogTypeDetails Ran");
		const fb = getFirebase();
		const state = getState();
		const collectionRef = fb
			.firestore()
			.collection(`users`)
			.doc(state.fb.auth.uid)
			.collection("typeDetails");
		const documentRef = collectionRef.where("type", "==", type);
		const results: string[] = [];
		await documentRef
			.get()
			.then((querySnapshot: any) => {
				querySnapshot.forEach((doc: any) => {
					if (doc.exists) {
						results.push(doc.data()["typeData"]);
					}
				});
			})
			.catch((error: any) => {
				console.log("Error getting documents: ", error);
			});

		const uniqueResults: string[] = [...new Set(results)];
		if (uniqueResults.length !== 0) {
			dispatch(updateLogTypeDetails(uniqueResults));
		} else {
			dispatch(updateLogTypeDetails([]));
		}
		return;
	};
};

export const updateLogTypeDetailsList = (typeName: string) => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		const state = getState();
		const uniqueResults = [...state.settings.logTypeDetailsData, typeName];
		dispatch(updateLogTypeDetails(uniqueResults));
	};
};

export const deleteLogType = (type: string) => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		const fb = getFirebase();
		const state = getState();
		const documentRef = fb
			.firestore()
			.collection(`users`)
			.doc(state.fb.auth.uid)
			.collection("types")
			.where("typeName", "==", type)
			.get()
			.then((querySnapshot: any) => {
				querySnapshot.forEach((doc: any) => {
					doc.ref.delete();
				});
			});
	};
};

export const deleteLogTypeDetail = (type: string, typeData: string) => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		const fb = getFirebase();
		const state = getState();
		const documentRef = fb
			.firestore()
			.collection(`users`)
			.doc(state.fb.auth.uid)
			.collection("typeDetails")
			.where("type", "==", type)
			.where("typeData", "==", typeData)
			.get()
			.then((querySnapshot: any) => {
				querySnapshot.forEach((doc: any) => {
					doc.ref.delete();
					dispatch(deleteLogTypeDetails(typeData));
				});
			});
	};
};

export const addNewTaskType = (type: string) => {
	return async (dispatch: any, getState: any, { getFirebase }: any) => {
		const fb = getFirebase();
		const state = getState();
		const documentRef = fb
			.firestore()
			.collection(`users`)
			.doc(state.fb.auth.uid)
			.collection("types")
			.doc();
		await documentRef
			.set(
				{
					typeName: type,
					addedBy: state.fb.auth.uid,
					dateAdded: fb.firestore.Timestamp.fromDate(
						new Date()
					).toDate(),
				},
				{ merge: true }
			)
			.then(() => {
				console.log("Document  successfully written!");
				dispatch(addLogType(type));
			})
			.catch(() => {
				console.log("Document not successfully written!");
			});
	};
};

export const addNewTaskTypeDetail = (
	type: string,
	typeDetail: string,
	showNotification: boolean
) => {
	return async (
		dispatch: AppDispatch,
		getState: any,
		{ getFirebase }: any
	): Promise<any> => {
		const fb = getFirebase();
		const state = getState();
		const documentRef = fb
			.firestore()
			.collection(`users`)
			.doc(state.fb.auth.uid)
			.collection("typeDetails")
			.doc();
		await documentRef
			.set(
				{
					type: type,
					typeData: typeDetail,
					addedBy: state.fb.auth.uid,
					dateAdded: fb.firestore.Timestamp.fromDate(
						new Date()
					).toDate(),
				},
				{ merge: true }
			)
			.then(() => {
				console.log("Document  successfully written!");
				dispatch(addLogTypeDetail(typeDetail));
				notification["success"]({
					message: `${typeDetail} Saved`,
					description: "Data updated successfully",
				});
			})
			.catch(() => {
				console.log("Document not successfully written!");
			});
	};
};
