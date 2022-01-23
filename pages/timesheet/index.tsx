import React, { useEffect, useState } from "react";
import moment from "moment";
import DateRangeSelector from "../../components/elements/dateRangeSelector";
import { Typography, Divider } from "antd";
import DataTable from "../../components/elements/dataTable";

function Timesheet() {
	const [dateRange, setDateRange] = useState([
		{
			startDate: new Date(moment().startOf("month").format()),
			endDate: new Date(moment().endOf("month").format()),
			key: "selection",
		},
	]);

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
