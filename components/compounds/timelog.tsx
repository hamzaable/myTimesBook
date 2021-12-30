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
import { MaskedInput } from "antd-mask-input";

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

	const [selectedDuration, setSelectedDuration] = useState<any>();

	// useEffect(() => {
	// 	getLogTypes();
	// }, []);

	useEffect(() => {
		if (selectedTaskType && selectedTaskType !== "") {
			getLogTypeDetails(selectedTaskType);
		}
	}, [selectedTaskType]);

	const splitNumber = (num: any) => {
		num = ("" + num).match(/^(-?[0-9]+)([,.][0-9]+)?/) || [];
		return [~~num[1], +(0 + (num[2] * 60).toFixed(0)) || 0];
	};

	const timeExpander = (value: any) => {
		const splitter = value.split(":");
		return { hours: parseInt(splitter[0]), minutes: parseInt(splitter[1]) };
	};

	const timeDifferencer = (
		sh: number,
		sm: number,
		fh: number,
		fm: number
	) => {
		const diff = splitNumber((fh * 60 + fm - (sh * 60 + sm)) / 60);
		if (fh * 60 + fm - (sh * 60 + sm) < 0) {
			return;
		}
		return `${("0" + diff[0]).slice(-2)}:${("0" + diff[1]).slice(-2)}`;
	};

	useEffect(() => {
		// if finish time change with start time present
		if (selectedStartTime && selectedFinishTime) {
			const { hours: startHour, minutes: startMinute } =
				timeExpander(selectedStartTime);

			const { hours: finishHour, minutes: finishMinute } =
				timeExpander(selectedFinishTime);
			const calcDuration = timeDifferencer(
				startHour,
				startMinute,
				finishHour,
				finishMinute
			);
			setSelectedDuration(calcDuration);
			form.setFieldsValue({
				duration: calcDuration,
			});

			//  if finish time is null remove duration

			if (
				selectedFinishTime === "Invalid date" ||
				selectedStartTime === "Invalid date"
			) {
				setSelectedDuration(null);
				form.setFieldsValue({
					duration: null,
				});
			}

			// Remove finnish date if start date remove
			// if (
			// 	selectedStartTime === "Invalid date"
			// ) {
			// 	setSelectedFinishTime(null);
			// 	form.setFieldsValue({
			// 		timeFinish: null,
			// 	});
			// }
		}
	}, [selectedStartTime, selectedFinishTime]);

	useEffect(() => {
		if (selectedStartTime) {
			if (selectedStartTime.length <= 5) {
				const { hours: durationHour, minutes: durationhMinute } =
					timeExpander(selectedDuration);
				const { hours: startHour, minutes: startMinute } =
					timeExpander(selectedStartTime);
				const totalHours =
					(durationHour * 60 +
						durationhMinute +
						(startHour * 60 + startMinute)) /
					60;
				const finishHours = splitNumber(totalHours);
				const finishTime = `${("0" + finishHours[0]).slice(-2)}:${(
					"0" + finishHours[1]
				).slice(-2)}`;
				setSelectedFinishTime(finishTime);
				form.setFieldsValue({
					timeFinish: moment(finishTime, "hh:mm"),
				});
				console.log("useEffect ~ finishHours", finishTime);
			}
		}
	}, [selectedDuration]);

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
										<Select.Option value="12121515">
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
										onChange={(value) => {
											const timeString =
												moment(value).format("HH:mm");
											setSelectedStartTime(timeString);
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
										onChange={(value) => {
											const timeString =
												moment(value).format("HH:mm");
											setSelectedFinishTime(timeString);
										}}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Divider style={{ marginTop: "0px" }} />
						<Form.Item label="Duration" name="duration">
							<MaskedInput
								mask="11:11"
								placeholder="hh:mm"
								value={selectedDuration}
								onBlur={(e: any) => {
									setSelectedDuration(e.target.value);
								}}
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
