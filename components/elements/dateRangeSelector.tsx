import { Button } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

function DateRangeSelector({ dateRange, setDateRange }: any) {
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
				moment(dateRange[0].startDate).format(" DD MMMM YYYY")
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

	const [showCalendar, setShowCalendar] = useState(false);

	const addMonth = () => {
		const startDate = new Date(
			moment(dateRange[0].startDate)
				.startOf("month")
				.add(1, "months")
				.format()
		);

		const lastDate = new Date(moment(startDate).endOf("month").format());
		console.log("addMonth ~ lastDate", lastDate);

		setDateRange({
			selection: {
				startDate: startDate,
				endDate: lastDate,
				key: "selection",
			},
		});
	};

	const removeMonth = () => {
		const startDate = new Date(
			moment(dateRange[0].startDate)
				.startOf("month")
				.subtract(1, "months")
				.format()
		);

		const lastDate = new Date(moment(startDate).endOf("month").format());
		console.log("addMonth ~ lastDate", lastDate);

		setDateRange({
			selection: {
				startDate: startDate,
				endDate: lastDate,
				key: "selection",
			},
		});
	};

	return (
		<>
			<div
				style={{
					position: "relative",
                    zIndex:"9"
				}}
			>
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
							minWidth: "150px",
						}}
						onClick={() => {
							setShowCalendar(!showCalendar);
						}}
					>
						{dropdownText}
					</Button>
					<Button style={{ margin: "0 0px" }} onClick={addMonth}>
						<AiOutlineArrowRight style={{ fontSize: "20px" }} />
					</Button>
				</div>
				{showCalendar && (
					<div
						style={{
							position: "absolute",
							maxWidth: "472px",
							marginTop: "15px",
						}}
                        className={"daterangepicker"}
					>
						<DateRangePicker
							ranges={dateRange}
							onChange={(e: any) => {
								setDateRange(e);
							}}
							showDateDisplay={false}
						/>
						<div
							style={{
								backgroundColor: "white",
								display: "flex",
								justifyContent: "flex-end",
							}}
						>
							<span
								onClick={() => {
									setShowCalendar(false);
								}}
								style={{
									cursor: "pointer",
									padding: "4px 16px",
									margin: "0px 20px 10px 5px",
									backgroundColor: "rgb(230 247 255)",
									color: "#1890ff",
									borderRadius: "6px",
									border: "1px solid #1890ff",
									fontWeight: "500",
									fontSize: "0.8em",
								}}
							>
								OK
							</span>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default DateRangeSelector;
