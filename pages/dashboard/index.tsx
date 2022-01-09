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
	Space,
	Typography,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DateRow from "../../components/compounds/dateRow";
import TimeLog from "../../components/compounds/timelog";
4;
import styledComponents from "styled-components";

function Dashboard(props: any) {
	const user = useSelector((state: any) => state.fb.auth);

	const [activeDate, setActiveDate] = useState<any>(moment());

	useEffect(() => {
		console.log(activeDate.format("ddd, DD MMM"));
	}, [activeDate]);
	return (
		<div>
             <Space direction="vertical" size={"middle"} style={{width:"100%"}}>
			<DateRow
				activeDate={activeDate}
				setActiveDate={(e: any) => {
					setActiveDate(e);
				}}
			/>
			{/* <Navigation /> */}
           
			<TimeLog defaultDate={activeDate} />
			
				<Row style={{ width: "100%" }}>
					<div
						style={{
							width: "100%",
							backgroundColor: "rgb(249, 250, 251)",
							borderRadius: "10px",
							boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 20px",
                            padding: "12px",
						}}
					>
						<Row gutter={12}>
							<Col>
								<label>projekt Name</label>
							</Col>

                            <Col>
								<label>projekt Detail</label>
							</Col>
						</Row>
                        <Row gutter={12}>
							<Col>
								<label>Description</label>
							</Col>

						</Row>
					</div>
				</Row>
			</Space>
		</div>
	);
}

export default Dashboard;
