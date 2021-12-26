import {
	Button,
	Card,
	Col,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Typography,
} from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TimeLog from "../../components/compounds/timelog";

function Dashboard(props: any) {
	const user = useSelector((state: any) => state.fb.auth);

	return (
		<div>
			{/* <Navigation /> */}
			<Typography.Title>Dashboard</Typography.Title>
			<TimeLog />
		</div>
	);
}

export default Dashboard;
