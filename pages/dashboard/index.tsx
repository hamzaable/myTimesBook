import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	CalendarOutlined,
	LeftOutlined,
	RightOutlined,
} from "@ant-design/icons";
import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Typography,
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TimeLog from "../../components/compounds/timelog";

function Dashboard(props: any) {
	const user = useSelector((state: any) => state.fb.auth);

	const [showDatePicker, setShowDatePicker] = useState(false);
	const [selectedData, setselectedData] = useState<any>();
	return (
		<div>
			{/* <Navigation /> */}
			<div
				style={{
					display: "flex",
					gap: "30px",
					placeContent: "center flex-start",
					alignItems: "center",
                    marginBottom:'10px'
				}}
			>
				<div>
					<Typography.Title
						level={3}
						style={{
							lineHeight: "1.6",
							marginBottom: "0px",
						}}
					>
						Today, 07/2022
					</Typography.Title>
				</div>
				<div>
					<CalendarOutlined
						onClick={() => setShowDatePicker(!showDatePicker)}
					/>

					<DatePicker
						defaultValue={moment("2015-01-01", "YYYY-MM-DD")}
						inputReadOnly
						allowClear={false}
						bordered={false}
						open={showDatePicker}
						onSelect={(e) => {
							console.log(e);
							setselectedData(e);
							setShowDatePicker(false);
						}}
						style={{
							border: "0px",
							background: "transparent",
							padding: "0px",
							margin: "0px",
							visibility: "hidden",
							width: "0px",
						}}
					/>
				</div>
				<div>
					<ArrowLeftOutlined />
				</div>
				<div>
					<ArrowRightOutlined />
				</div>
			</div>
			<TimeLog />
		</div>
	);
}

export default Dashboard;
