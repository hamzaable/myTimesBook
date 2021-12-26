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
import MainLayout from "../../components/Layout/mainLayout";

function Dashboard(props: any) {
	const user = useSelector((state: any) => state.fb.auth);
	const handleFormSubmit = () => {};
	return (
		<div>
			{/* <Navigation /> */}
			<Typography.Title>Dashboard</Typography.Title>
			<Typography.Title level={4}>New Time Log</Typography.Title>
			<Card style={{borderRadius:"10px"}}>
				<Form
					onFinish={handleFormSubmit}
					labelCol={{ md: 24, lg: 24 }}
					wrapperCol={{ md: 24, lg: 24 }}
					layout="vertical"
				>
					<Col span={10}>
						<Form.Item label="Log Type" name="logType">
							<Input />
						</Form.Item>

						<Form.Item label="Type Detail" name="typeDetail">
							<Input />
						</Form.Item>

						<Form.Item label="Last Name" name="lastname">
							<Input />
						</Form.Item>

						<Form.Item label="Default Language" name="language">
							<Select>
								<Select.Option value="english">
									English
								</Select.Option>
								<Select.Option value="german">
									German
								</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item label="Time Step Jumps" name="timesteps">
							<InputNumber
								style={{ width: "100%" }}
								min={1}
								max={50}
							/>
						</Form.Item>
					</Col>
					<Col span={12}></Col>
					<Col span={10}>
						<Form.Item>
							<Button
								type="primary"
								style={{ width: "100%" }}
								htmlType="submit"
							>
								Add Time Log
							</Button>
						</Form.Item>
					</Col>
				</Form>
			</Card>
		</div>
	);
}

export default Dashboard;
