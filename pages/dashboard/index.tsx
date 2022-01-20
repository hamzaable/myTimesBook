import { Space } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DateRow from "../../components/compounds/dateRow";
import HomeChart from "../../components/compounds/homeChart";
import HomeVisTimeline from "../../components/compounds/homeVisTimeline";
import LogCardMaker from "../../components/compounds/logCardMaker";
import TimeLog from "../../components/compounds/timelog";
import { getParentsList } from "../../redux/settings/settingsActions";
import { getTimeLogs } from "../../redux/timeLog/timeLogActions";

function Dashboard(props: any) {
	const dispatch = useDispatch();

	const [activeDate, setActiveDate] = useState<moment.Moment>(moment());

	useEffect(() => {
		fetchTimeLogs();
        fetchParents();
	}, [activeDate]);

	const fetchTimeLogs = () => {
		dispatch(
			getTimeLogs({
				dateStart: new Date(moment(activeDate).startOf("day").toDate()),
				dateFinish: new Date(moment(activeDate).endOf("day").toDate()),
			})
		);
	};

    const fetchParents = ()=>{
        dispatch(getParentsList())
    }
	return (
		<div>
			<Space
				direction="vertical"
				size={"middle"}
				style={{ width: "100%" }}
			>
				{/* <Button onClick={fetchTimeLogs}>Fetch TimeLogs</Button> */}
				<DateRow
					activeDate={activeDate}
					setActiveDate={(e: moment.Moment) => {
						setActiveDate(e);
					}}
				/>

				<div
					style={{
						// backgroundColor: "rgb(249 250 251)",
						// boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 20px",
						borderRadius: "10px",
						border: "1px solid lightgrey",
					}}
				>
					<HomeVisTimeline defaultDate={activeDate} />
				</div>

				<TimeLog defaultDate={activeDate} />
				<LogCardMaker />
			</Space>
		</div>
	);
}

export default Dashboard;
