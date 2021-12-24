import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MainLayout from "../../components/Layout/mainLayout";

function Dashboard(props: any) {
	const user = useSelector((state: any) => state.fb.auth);

	return (
		<div>
			{/* <Navigation /> */}
			<h1>This is Dashboard page</h1>
			<h2>UID is {user.uid}</h2>
			<h2>
				<span>username is </span>
				{useSelector((state: any) => state.settings.userData.firstName)}
				<span>_</span>
				{useSelector((state: any) => state.settings.userData.lastName)}
			</h2>
		</div>
	);
}

export default Dashboard;
