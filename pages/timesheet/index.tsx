import { Button, Divider, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

function Timesheet() {
	const [dateRange, setDateRange] = useState([
		{
			startDate: new Date(moment().startOf("month").format()),
			endDate: new Date(moment().endOf("month").format()),
			key: "selection",
		},
	]);
	const [dropdownText, setDropdownText] = useState(
		moment().format("MMMM YYYY")
	);

	useEffect(() => {
		const startOfMonth = moment(dateRange[0].startDate)
			.startOf("month")
			.date();
		const endOfMonth = moment(dateRange[0].startDate).endOf("month").date();
		const selectionStart = moment(dateRange[0].startDate).date();
		const selectionEnd = moment(dateRange[0].endDate).date();
		if (selectionStart === startOfMonth && selectionEnd === endOfMonth) {
			setDropdownText(moment(dateRange[0].startDate).format("MMMM YYYY"));
		} else if (selectionStart === selectionEnd) {
			setDropdownText(
				moment(dateRange[0].startDate).format(" DDDo MMM YYYY")
			);
		} else {
			setDropdownText(
				moment(dateRange[0].startDate).format(" DD MMM YYYY") +
					" - " +
					moment(dateRange[0].endDate).format(" DD MMM YYYY")
			);
		}
		console.log("useEffect ~ selectionStart", selectionStart);
	}, [dateRange]);

	const addMonth = () => {
		const startDate = new Date(
			moment(dateRange[0].startDate)
				.startOf("month")
				.add(1, "months")
				.format()
		);

		const lastDate = new Date(
			moment(startDate)
				.endOf("month")
				.format()
		);
        console.log('addMonth ~ lastDate', lastDate)

		setDateRange([
			{
				startDate: startDate,
				endDate:lastDate,
				key: "selection",
			},
		]);
	};

    const removeMonth = () => {
		const startDate = new Date(
			moment(dateRange[0].startDate)
				.startOf("month")
				.subtract(1, "months")
				.format()
		);

		const lastDate = new Date(
			moment(startDate)
				.endOf("month")
				.format()
		);
        console.log('addMonth ~ lastDate', lastDate)

		setDateRange([
			{
				startDate: startDate,
				endDate:lastDate,
				key: "selection",
			},
		]);
	};

	return (
		<div>
			<Typography.Title>Timesheet</Typography.Title>
			<Divider style={{ marginTop: "0" }} />
			{/* LeftArrow */}
			{/* Month / Date Range */}
			{/* Right Arrow */}

			<div
				style={{
					display: "flex",
					alignItems: "center",
					boxSizing: "border-box",
				}}
			>
				<Button style={{ margin: "0 0px" }} onClick={removeMonth}>
					<AiOutlineArrowLeft style={{ fontSize: "20px" }} />
				</Button>
				<Button
					style={{
						margin: "0 0px",
						borderRight: "0",
						borderLeft: "0",
                        minWidth:"150px"
					}}
				>
					{dropdownText}
				</Button>
				<Button style={{ margin: "0 0px" }} onClick={addMonth}>
					<AiOutlineArrowRight style={{ fontSize: "20px" }} />
				</Button>
			</div>
			<Row style={{ marginTop: "20px", alignItems: "center" }}>
				<DateRangePicker
					ranges={dateRange}
					onChange={(e) => {
						setDateRange([e.selection]);
					}}
					showDateDisplay={false}
					// showMonthAndYearPickers={false}
					// onChange={this.handleSelect}
				/>
			</Row>
		</div>
	);
}

export default Timesheet;
