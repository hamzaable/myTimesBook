import {
	Card,
	Form,
	Col,
	Select,
	Input,
	Button,
	Typography,
	Row,
	Divider,
} from "antd";
import React, { useEffect, useState } from "react";
import { getFirebase } from "react-redux-firebase";
import TextEditor from "./textEditor";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import {
	loadingFinish,
	loadingStart,
} from "../../redux/settings/settingsActions";
import Loading from "./loading";

function TimeLog() {
	const fb = getFirebase();
	const user = useSelector((state: any) => state.fb.auth);
	const globalLoading = useSelector(
		(state: any) => state.settings.globalLoading
	);

	const dispatch = useDispatch();

	const [taskTypes, setTaskTypes] = useState<string[]>([]);
	const [newTaskType, setNewTaskType] = useState<string>("");

	useEffect(() => {
		getLogTypes();
	}, []);

	const getLogTypes = async () => {
		dispatch(loadingStart());
		const collectionRef = fb
			.firestore()
			.collection(`users`)
			.doc(user.uid)
			.collection("types");
		// let documentRef = collectionRef.where("UID", "==", state.fb.auth.uid);
		const documentRef = collectionRef;
		const results: string[] = [];
		await documentRef
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					if (doc.exists) {
						results.push(doc.data()["typeName"]);
					}
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});

		const uniqueResults: string[] = [...new Set(results)];
		dispatch(loadingFinish());
		if (uniqueResults.length !== 0) {
			setTaskTypes(uniqueResults);
		}
		return;
	};

	const addNewTaskType = async () => {
		let query = fb
			.firestore()
			.collection(`users`)
			.doc(user.uid)
			.collection("types")
			.doc();
		await query
			.set(
				{
					typeName: newTaskType,
					addedBy: user.uid,
					// dateAdded: fb.firestore.Timestamp.fromDate(
					// 	new Date()
					// ).toDate(),
				},
				{ merge: true }
			)
			.then(() => {
				setTaskTypes((prev) => {
					return [...prev, newTaskType];
				});
				setNewTaskType("");
			})
			.catch(() => {
				console.log("Document not successfully written!");
			});
	};

	const handleFormSubmit = (data: any) => {
		console.log("handleFormSubmit ~ data", data);
	};

	return globalLoading ? (
		<Loading />
	) : (
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
						<Select
							dropdownRender={(menu) => (
								<div>
									{menu}
									<Divider style={{ margin: "4px 0" }} />
									<div
										style={{
											display: "flex",
											flexWrap: "nowrap",
											padding: 8,
										}}
									>
										<Input
											style={{ flex: "auto" }}
											value={newTaskType}
											onChange={(e) => {
												setNewTaskType(e.target.value);
											}}
										/>
										<a
											style={{
												flex: "none",
												padding: "8px",
												display: "block",
												cursor: "pointer",
											}}
											onClick={addNewTaskType}
										>
											<PlusOutlined /> Add New
										</a>
									</div>
								</div>
							)}
						>
							{taskTypes.map((taskType) => {
								return (
									<Select.Option
										key={taskType}
										value={taskType}
									>
										{taskType}
									</Select.Option>
								);
							})}
							<Select.Option value="uid">Any</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item label="Title" name="typeDetail">
						<Input />
					</Form.Item>

					<Form.Item name="description">
						<TextEditor placeholder="Description" />
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

					<Form.Item>
						<Button
							type="primary"
							style={{ width: "100%" }}
							// htmlType="submit"
							onClick={getLogTypes}
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
