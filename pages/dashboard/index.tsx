import { Space } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DateRow from "../../components/compounds/dateRow";
import TimeLog from "../../components/compounds/timelog";
import OneLogCard from "../../components/elements/oneLogCard";

function Dashboard(props: any) {
	const user = useSelector((state: any) => state.fb.auth);

	const [activeDate, setActiveDate] = useState<any>(moment());

	useEffect(() => {
		// console.log("I ran")
	}, [activeDate]);
	return (
		<div>
			<Space
				direction="vertical"
				size={"middle"}
				style={{ width: "100%" }}
			>
				<DateRow
					activeDate={activeDate}
					setActiveDate={(e: any) => {
						setActiveDate(e);
					}}
				/>

				<TimeLog defaultDate={activeDate} />

    				<OneLogCard />
    				<OneLogCard />
    				<OneLogCard />
			</Space>
		</div>
	);
}

export default Dashboard;
