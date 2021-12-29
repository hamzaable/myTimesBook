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
	Space,
	DatePicker,
	TimePicker,
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
import moment from "moment";

function TimeLog() {
	const fb = getFirebase();
	const user = useSelector((state: any) => state.fb.auth);
	const globalLoading = useSelector(
		(state: any) => state.settings.globalLoading
	);

	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const [isFetching, setIsFetching] = useState(false);

	const [taskTypeOptions, setTaskTypeOptions] = useState<string[]>([]);
	const [newTaskType, setNewTaskType] = useState<string>("");
	const [selectedTaskType, setSelectedTaskType] = useState<string>("");

	const [taskTypeDetailOptions, setTaskTypeDetailOptions] = useState<
		string[]
	>([]);
	const [newTaskTypeDetail, setNewTaskTypeDetail] = useState<string>("");
	const [selectedTaskTypeDetail, setSelectedTaskTypeDetail] =
		useState<string>();

	const [selectedStartTime, setSelectedStartTime] = useState<any>();
	const [selectedFinishTime, setSelectedFinishTime] = useState<any>();

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
		setIsFetching(true);

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
		form.setFieldsValue({
			typeDetail: null,
		});
		setIsFetching(false);
		return;
	};

	const addNewTaskType = async () => {
		if (!newTaskType) {
			return;
		}
		const query = fb
			.firestore()
			.collection(`users`)
			.doc(user.uid)
			.collection("types")
			.doc();
		await query
			.set(
				{
					typeName: titleCase(newTaskType),
					addedBy: user.uid,
					// @ts-ignore
					dateAdded: fb.firestore.Timestamp.fromDate(
						new Date()
					).toDate(),
				},
				{ merge: true }
			)
			.then(() => {
				setNewTaskType("");
				form.setFieldsValue({
					logType: newTaskType,
				});
				setSelectedTaskType(newTaskType);
			})
			.catch(() => {
				console.log("Document not successfully written!");
			});
	};

	const addNewTaskTypeDetail = async () => {
		if (!selectedTaskType) {
			alert("Please Select Log Type !");
			return;
		}
		const query = fb
			.firestore()
			.collection(`users`)
			.doc(user.uid)
			.collection("typeDetails")
			.doc();
		await query
			.set(
				{
					type: selectedTaskType,
					typeData: newTaskTypeDetail,
					addedBy: user.uid,
					// @ts-ignore
					dateAdded: fb.firestore.Timestamp.fromDate(
						new Date()
					).toDate(),
				},
				{ merge: true }
			)
			.then(() => {
				form.setFieldsValue({
					typeDetail: newTaskTypeDetail,
				});
				setSelectedTaskTypeDetail(newTaskTypeDetail);
				setTaskTypeDetailOptions((prev) => {
					return [...prev, newTaskTypeDetail];
				});
				setNewTaskTypeDetail("");
			})
			.catch(() => {
				console.log("Document not successfully written!");
			});
	};

	const testingFunction = () => {
		form.setFieldsValue({ typeDetail: null });
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
				form={form}
			>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24} lg={16}>
						<Row className="div-col">
							<Col span={24}>
								<Row gutter={6}>
									<Col xs={24} sm={24} md={24} lg={10}>
										<Form.Item
											label="Log Type"
											name="logType"
											className={"hamza"}
										>
											<SelectWithAddnew
												newvalue={newTaskType}
												newOnChange={(e: any) => {
													setNewTaskType(
														e.target.value
													);
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
												fetching={isFetching}
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
											name="typeDetail"
										>
											<SelectWithAddnew
												newvalue={newTaskTypeDetail}
												newOnChange={(e: any) => {
													setNewTaskTypeDetail(
														e.target.value
													);
												}}
												onAddNew={addNewTaskTypeDetail}
												optionsArray={
													taskTypeDetailOptions
												}
												onChange={(e: any) => {
													setSelectedTaskTypeDetail(
														e
													);
												}}
												value={selectedTaskTypeDetail}
											/>
										</Form.Item>
									</Col>
								</Row>

								<Form.Item name="description">
									<TextEditor placeholder="Description" />
									{/* <Input.TextArea placeholder="Description" /> */}
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
										<Select.Option value="uid">
											None
										</Select.Option>
										<Select.Option value="hamza">
											Hamza
										</Select.Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>
					</Col>
					<Col xs={24} sm={24} md={24} lg={8}>
						<Form.Item label="Date & Time" name="date">
							<DatePicker
								placeholder="Select Date"
								onChange={(e: any) => {
									console.log(e);
								}}
								showToday={true}
								format="DD.MM.YYYY"
								showTime={false}
								style={{ minWidth: "100%" }}
							/>
						</Form.Item>
						<Row gutter={6}>
							<Col span={12}>
								<Form.Item name="timeStart">
									<TimePicker
										placeholder="Start Time"
										minuteStep={5}
										// defaultValue={moment("12:08", "HH:mm")}
										format={"HH:mm"}
										style={{ minWidth: "100%" }}
										showNow={true}
										value={moment(
											selectedStartTime,
											"HH:mm"
										)}
										onSelect={(value) => {
											const timeString =
												moment(value).format("HH:mm");
											setSelectedStartTime(timeString);
											form.setFieldsValue({
												timeStart: value,
											});
										}}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item name="timeFinish">
									<TimePicker
										placeholder="Finish Time"
										minuteStep={5}
										// defaultValue={moment("12:08", "HH:mm")}
										format={"HH:mm"}
										style={{ minWidth: "100%" }}
										showNow={false}
										value={moment(
											selectedFinishTime,
											"HH:mm"
										)}
										onSelect={(value) => {
											const timeString =
												moment(value).format("HH:mm");
											setSelectedFinishTime(timeString);
											form.setFieldsValue({
												timeFinish: value,
											});
										}}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Divider style={{ marginTop: "0px" }} />
						<Form.Item label="Duration" name="duration">
							<TimePicker
								placeholder="Finish Time"
								minuteStep={5}
								// defaultValue={moment("12:08", "HH:mm")}
								format={"HH:mm"}
								style={{ minWidth: "100%" }}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Form.Item>
					<Button
						type="primary"
						style={{ width: "100%", maxWidth: "200px" }}
						htmlType="submit"
						// onClick={testingFunction}
					>
                    Add New Time Log
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
}

export default TimeLog;
