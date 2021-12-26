import { Card, Form, Col, Select, Input, Button, Typography } from "antd";
import React from "react";
import { getFirebase } from "react-redux-firebase";
import TextEditor from "./textEditor";
import { useSelector, useDispatch } from "react-redux";

function TimeLog() {
	const fb = getFirebase();
	const user = useSelector((state: any) => state.fb.auth);

	const handleFormSubmit = (data: any) => {
		console.log("handleFormSubmit ~ data", data);
	};

	const getLogTypes = () => {
		// let collectionRef = fb
		// 	.firestore()
		// 	.collection(`users`)
		// 	.doc(user.uid)
		// 	.collection('typeDetails');
		// let documentRef = collectionRef.doc("doc");
		// return documentRef
		// 	.set({ x: 10, y: 5 })
		// 	.then(() => {
		// 		return collectionRef.where("x", ">", 5).select("y").get();
		// 	})
		// 	.then((res) => {
		// 		console.log(`y is ${res.docs[0].get("y")}.`);
		// 	});
	};

	return (
		<Card style={{ borderRadius: "10px" }}>
			<Form
				onFinish={handleFormSubmit}
				labelCol={{ md: 24, lg: 24 }}
				wrapperCol={{ md: 24, lg: 24 }}
				layout="vertical"
			>
				<Col md={24} lg={14}>
					<Typography.Title
						level={4}
						style={{ textAlign: "center", color: "grey" }}
					>
						New Time Log
					</Typography.Title>

					<Form.Item label="Log Type" name="logType">
						<Select>
							<Select.Option value="uid">None</Select.Option>
							<Select.Option value="hamza">Hamza</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item label="Title" name="typeDetail">
						<Input />
					</Form.Item>

					<Form.Item label="Description" name="description">
						<TextEditor />
					</Form.Item>

					<Form.Item label="Tags" name="tags">
						<Select
							mode="tags"
							style={{ width: "100%" }}
							placeholder="Tags"
							// onChange={handleChange}
						>
							{/* <Option key={1}>{1}</Option> */}
						</Select>
					</Form.Item>

					<Form.Item label="Report to" name="reportTo">
						<Select>
							<Select.Option value="uid">None</Select.Option>
							<Select.Option value="hamza">Hamza</Select.Option>
						</Select>
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
	);
}

export default TimeLog;
