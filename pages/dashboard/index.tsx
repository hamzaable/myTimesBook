import { Button, Space } from "antd";
import firebase from "firebase/compat";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFirebase } from "react-redux-firebase";
import DateRow from "../../components/compounds/dateRow";
import LogCardMaker from "../../components/compounds/logCardMaker";
import TimeLog from "../../components/compounds/timelog";
import OneLogCard from "../../components/elements/oneLogCard";
import { getTimeLogs } from "../../redux/timeLog/timeLogActions";

function Dashboard(props: any) {
	const dispatch = useDispatch();

	const [activeDate, setActiveDate] = useState<any>(moment());

    useEffect(() => {
		fetchTimeLogs();
	}, []);
	useEffect(() => {
		fetchTimeLogs();
	}, [activeDate]);

	const fetchTimeLogs = () => {
		dispatch(
			getTimeLogs({
				dateStart: new Date(moment(activeDate).startOf("day").toDate()),
				dateFinish: new Date(moment(activeDate).endOf("day").toDate()),
			})
		);
	};
	return (
		<div>
			<Space
				direction="vertical"
				size={"middle"}
				style={{ width: "100%" }}
			>
				<Button onClick={fetchTimeLogs}>Fetch TimeLogs</Button>
				<DateRow
					activeDate={activeDate}
					setActiveDate={(e: any) => {
						setActiveDate(e);
					}}
				/>

				<TimeLog defaultDate={activeDate} />
                <LogCardMaker />
			</Space>
		</div>
	);
}

export default Dashboard;
