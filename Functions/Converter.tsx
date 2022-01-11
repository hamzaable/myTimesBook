import moment from "moment";
import { getFirebase } from "react-redux-firebase";


export const momentToFirestamp = (data: any) => {
	// @ts-ignore
	return getFirebase().firestore.Timestamp.fromDate(new Date(moment(data).format()));
};

export const firestampToMoment = (data: any) => {
	// @ts-ignore
	return moment(data.toDate());
};
