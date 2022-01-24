import React, { useEffect, useState } from "react";
import moment from "moment";
import DateRangeSelector from "../../components/elements/dateRangeSelector";
import { Typography, Divider } from "antd";
import DataTable from "../../components/elements/dataTable";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredTimeLogs } from "../../redux/timeLog/timeLogActions";
import { DATERANGE, LOG } from "../../types/types";

function Timesheet() {
	const dispatch: any = useDispatch();
	const logData: LOG[] = useSelector(
		(state: any) => state.timeLog.filterTimeLogData
	);

	const [dateRange, setDateRange] = useState<DATERANGE[]>([
		{
			startDate: new Date(moment().startOf("month").format()),
			endDate: new Date(moment().endOf("month").format()),
			key: "selection",
		},
	]);

	useEffect(() => {
		//fetch data from firebase
		dispatch(
			getFilteredTimeLogs({
				dateStart: dateRange[0].startDate,
				dateFinish: dateRange[0].endDate,
			})
		);
	}, [dateRange]);

	useEffect(() => {
		console.table(logData);
	}, [logData]);

	return (
		<div>
			<Typography.Title>Timesheet</Typography.Title>
			<Divider style={{ marginTop: "0" }} />
			{/* LeftArrow */}
			{/* Month / Date Range */}
			{/* Right Arrow */}

			<div
				style={{
					marginTop: "0px",
					marginBottom: "20px",
					alignItems: "center",
				}}
			>
				<DateRangeSelector
					dateRange={dateRange}
					setDateRange={(e) => {
						setDateRange([e.selection]);
					}}
				/>
			</div>
			<DataTable />
			<Typography.Title>My Name is Lagan</Typography.Title>
		</div>
	);
}

export default Timesheet;
