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
import SelectWithAddnew from "../elements/selectWithAddnew";

function TimeLog() {
	const fb = getFirebase();
	const user = useSelector((state: any) => state.fb.auth);
	const globalLoading = useSelector(
		(state: any) => state.settings.globalLoading
	);

	const dispatch = useDispatch();

	const [taskTypeOptions, setTaskTypeOptions] = useState<string[]>([]);
	const [newTaskType, setNewTaskType] = useState<string>("");
	const [selectedTaskType, setSelectedTaskType] = useState<string>("");

	const [taskTypeDetailOptions, setTaskTypeDetailOptions] = useState<
		string[]
	>([]);
	const [newTaskTypeDetail, setNewTaskTypeDetail] = useState<string>("");
	const [selectedTaskTypeDetail, setSelectedTaskTypeDetail] =
		useState<string>();

	// useEffect(() => {
	// 	getLogTypes();
	// }, []);

	function titleCase(str: string) {
		return str
			.split(" ")
			.map(
				(item) =>
					item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
			)
			.join(" ");
	}
	const getLogTypes = async () => {
		// dispatch(loadingStart());
		const collectionRef = fb
			.firestore()
			.collection(`users`)
			.doc(user.uid)
			.collection("types");
		// const documentRef = collectionRef.where("UID", "==", state.fb.auth.uid);
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
		// dispatch(loadingFinish());
		if (uniqueResults.length !== 0) {
			setTaskTypeOptions(uniqueResults);
		} else {
			setTaskTypeOptions([]);
		}
		return;
	};

	useEffect(() => {
		if (selectedTaskType && selectedTaskType !== "") {
			getLogTypeDetails(selectedTaskType);
		}
	}, [selectedTaskType]);

	const getLogTypeDetails = async (type: string) => {
		// dispatch(loadingStart());
		const collectionRef = fb
			.firestore()
			.collection(`users`)
			.doc(user.uid)
			.collection("typeDetails");
		const documentRef = collectionRef.where("type", "==", type);
		const results: string[] = [];
		await documentRef
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					if (doc.exists) {
						results.push(doc.data()["typeData"]);
					}
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});

		const uniqueResults: string[] = [...new Set(results)];
		// dispatch(loadingFinish());
		if (uniqueResults.length !== 0) {
			setTaskTypeDetailOptions(uniqueResults);
		} else {
			setTaskTypeDetailOptions([]);
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
				setTaskTypeOptions((prev) => {
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

	const addNewTaskTypeDetail = () => {};

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
					<Row gutter={6}>
						<Col xs={24} sm={24} md={24} lg={10}>
							<Form.Item label="Log Type" name="logType">
								<SelectWithAddnew
									newvalue={newTaskType}
									newOnChange={(e: any) => {
										setNewTaskType(e.target.value);
									}}
									onAddNew={addNewTaskType}
									optionsArray={taskTypeOptions}
									onChange={(e: any) => {
										setSelectedTaskType(e);
									}}
									value={selectedTaskType}
									onClick={() => {
										getLogTypes();
									}}
								/>
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={24} lg={14}>
							<Form.Item
								label={
									selectedTaskType
										? `${titleCase(
												selectedTaskType
										  )} Detail`
										: "Details"
								}
								name="typeName"
							>
								<SelectWithAddnew
									newvalue={newTaskTypeDetail}
									newOnChange={(e: any) => {
										setNewTaskTypeDetail(e.target.value);
									}}
									onAddNew={addNewTaskTypeDetail}
									optionsArray={taskTypeDetailOptions}
									onChange={(e: any) => {
										setSelectedTaskTypeDetail(e);
									}}
									value={selectedTaskTypeDetail}
								/>
							</Form.Item>
						</Col>
					</Row>

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
							htmlType="submit"
							// onClick={getLogTypes}
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
