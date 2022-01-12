import {
	Card,
	Form,
	Col,
	Select,
	Input,
	Button,
	Row,
	Divider,
	DatePicker,
	TimePicker,
	notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { getFirebase } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import {
	addNewTaskType,
	addNewTaskTypeDetail,
	getLogTypeDetails,
	getLogTypes,
	loadingFinish,
} from "../../redux/settings/settingsActions";
import Loading from "./loading";
import SelectWithAddnew from "../elements/selectWithAddnew";
import moment from "moment";
import { MaskedInput } from "antd-mask-input";
import {
	momentToFirestamp,
	timeDifferencer,
	timeExpander,
	titleCase,
} from "../../Functions/Converter";

function TimeLog(props: any) {
	const fb = getFirebase();
	const user = useSelector((state: any) => state.fb.auth);
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const globalLoading = useSelector(
		(state: any) => state.settings.globalLoading
	);
	const taskTypeOptions = useSelector(
		(state: any) => state.settings.logTypesData
	);

	const taskTypeDetailOptions = useSelector(
		(state: any) => state.settings.logTypeDetailsData
	);

	const [isFetching, setIsFetching] = useState(false);

	const [newTaskType, setNewTaskType] = useState<string>("");
	const [selectedTaskType, setSelectedTaskType] = useState<string>("");

	const [newTaskTypeDetail, setNewTaskTypeDetail] = useState<string>("");
	const [selectedTaskTypeDetail, setSelectedTaskTypeDetail] =
		useState<string>();

	const [selectedStartTime, setSelectedStartTime] = useState<any>();
	const [selectedFinishTime, setSelectedFinishTime] = useState<any>();
	const [selectedDuration, setSelectedDuration] = useState<any>();

	const [selectedReportTo, setSelectedReportTo] = useState<any>();
	const [reportToOptions, setReportToOptions] = useState<
		{ label: string; value: string }[]
	>([{ label: "", value: "" }]);

	const [description, setDescription] = useState("");
	const [selectedDate, setSelectedDate] = useState(props.defaultDate);

	useEffect(() => {
		form.setFieldsValue({
			date: props.defaultDate,
		});
	}, [props.defaultDate]);

	useEffect(() => {
		// if finish time change with start time present
		if (selectedStartTime && selectedFinishTime) {
			const calcDuration = timeDifferencer(
				moment(selectedStartTime).hours(),
				moment(selectedStartTime).minutes(),
				moment(selectedFinishTime).hours(),
				moment(selectedFinishTime).minutes()
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
		}
	}, [selectedStartTime, selectedFinishTime]);

	useEffect(() => {
		if (selectedStartTime) {
			const { hours: durationHour, minutes: durationhMinute } =
				timeExpander(selectedDuration);

			const finishTime = moment(selectedStartTime);

			finishTime.date(selectedDate.date());
			finishTime.month(selectedDate.month());
			finishTime.year(selectedDate.year());

			finishTime
				.add(durationHour, "hours")
				.add(durationhMinute, "minutes");

			setSelectedFinishTime(moment(finishTime));
			form.setFieldsValue({
				timeFinish: moment(finishTime),
			});
		}
	}, [selectedDuration]);

	useEffect(() => {
		if (selectedTaskType && selectedTaskType !== "") {
			setIsFetching(true);
			dispatch(getLogTypeDetails(selectedTaskType));
			setIsFetching(false);
		}
	}, [selectedTaskType]);

	const logTypesClick = async () => {
		setIsFetching(true);
		dispatch(getLogTypes());
		setIsFetching(false);
	};

	const addNewTaskTypeHandler = async () => {
		if (!newTaskType) {
			return;
		}
		dispatch(addNewTaskType(newTaskType));
		setNewTaskType("");
		form.setFieldsValue({
			logType: newTaskType,
		});
		setSelectedTaskType(newTaskType);
	};

	const addNewTaskTypeDetailHandler = async () => {
		if (!selectedTaskType) {
			alert("Please Select Log Type !");
			return;
		}
		setIsFetching(true);

		dispatch(
			addNewTaskTypeDetail(selectedTaskType, newTaskTypeDetail, false)
		);

		setSelectedTaskTypeDetail(newTaskTypeDetail);
		setNewTaskTypeDetail("");

		setIsFetching(false);
	};
	const reportToOnclick = async (e: any) => {
		// dispatch(loadingStart());
		getParents();
	};

	const getParents = async () => {
		// dispatch(loadingStart());
		setIsFetching(true);

		const collectionRef = fb.firestore().collection(`userEmployees`);
		// const documentRef = collectionRef.where("UID", "==", state.fb.auth.uid);
		const documentRef = collectionRef;
		const results: { label: string; value: string }[] = [];
		await documentRef
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					if (doc.exists) {
						if (doc.data()["UID"] === user.uid) {
							results.push({
								value: doc.data()["PID"],
								label: doc.data()["pidName"],
							});
						}
					}
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});

		const uniqueResults: { label: string; value: string }[] = [
			...new Set(results),
		];
		dispatch(loadingFinish());
		if (uniqueResults.length !== 0) {
			setReportToOptions(uniqueResults);
		} else {
			setReportToOptions([{ label: "", value: "" }]);
		}
		return;
	};

	const MomentToTimestamp = (data: any) => {
		return momentToFirestamp(data);
	};

	const handleFormSubmit = (data: any) => {
		const timeStartFormatted = MomentToTimestamp(data.timeStart);
		const timeFinishFormatted = MomentToTimestamp(data.timeFinish);

		const timeStartCalc = MomentToTimestamp(
			moment(
				data.date.format("DD/MM/YYYY") +
					" " +
					data.timeStart.format("hh:mm a"),
				"DD/MM/YYYY hh:mm a"
			)
		);

		const timeFinishCalc = MomentToTimestamp(
			moment(
				data.date.format("DD/MM/YYYY") +
					" " +
					data.timeFinish.format("hh:mm a"),
				"DD/MM/YYYY hh:mm a"
			)
		);

		const totalMinutes =
			timeExpander(selectedDuration).hours * 60 +
			timeExpander(selectedDuration).minutes;

		const submitter = {
			description: description,
			duration: selectedDuration,
			reportTo: selectedReportTo,
			tags: data.tags,
			timeStart: timeStartFormatted,
			timeFinish: timeFinishFormatted,
			timeStartCalc: timeStartCalc,
			timeFinishCalc: timeFinishCalc,
			type: selectedTaskType,
			typeDetail: selectedTaskTypeDetail,
			durationMinutes: +totalMinutes,
		};
		console.log("handleFormSubmit ~ submitter", submitter);

		postNewTimeLog(submitter);
	};

	const postNewTimeLog = async (data: any) => {
		const query = fb
			.firestore()
			.collection(`users`)
			.doc(user.uid)
			.collection("timeLogs")
			.doc();
		await query
			.set(data)
			.then(() => {
				notification["success"]({
					message: `Time Log Saved`,
					description: "Data added successfully",
				});
				form.resetFields();
			})
			.catch(() => {
				console.log("Document not successfully written!");
			});
	};

	return globalLoading ? (
		<Loading />
	) : (
		<Card
			style={{
				borderRadius: "10px",
				backgroundColor: "#f9fafb",
				boxShadow: "0 0 20px rgba(0,0,0,.1)",
			}}
		>
			<Form
				onFinish={handleFormSubmit}
				labelCol={{ md: 24, lg: 24 }}
				wrapperCol={{ md: 24, lg: 24 }}
				layout="vertical"
				form={form}
				autoComplete="off"
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
												onAddNew={addNewTaskTypeHandler}
												optionsArray={taskTypeOptions}
												onChange={(e: any) => {
													setSelectedTaskType(e);
													setSelectedTaskTypeDetail(
														""
													);
													form.setFieldsValue({
														typeDetail: null,
													});
												}}
												value={selectedTaskType}
												onClick={() => {
													logTypesClick();
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
												onAddNew={
													addNewTaskTypeDetailHandler
												}
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

								<Form.Item
									// label="Task Name"
									name="description"
								>
									{/* <TextEditor
										placeholder="Task Details"
										onChange={(e) => {
  											setDescription(e);
										}}
										value={description}
									/> */}

									<Input.TextArea
										value={description}
										onChange={(e) => {
											setDescription(e.target.value);
										}}
										placeholder={"Task Description"}
									/>
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
									<Select
										value={selectedReportTo}
										onClick={reportToOnclick}
										notFoundContent={
											isFetching ? (
												<Loading size={12} />
											) : (
												"No Data"
											)
										}
										onChange={(e: any) => {
											setSelectedReportTo(e);
										}}
									>
										{reportToOptions.map((data: any) => {
											return (
												<Select.Option
													key={data.value}
													value={data.value}
												>
													{data.label}
												</Select.Option>
											);
										})}
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
									setSelectedDate(e);
								}}
								showToday={true}
								format="DD.MM.YYYY"
								showTime={false}
								style={{ minWidth: "100%" }}
								allowClear={false}
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
											// const timeString =
											// 	moment(value).format("HH:mm");
											setSelectedStartTime(value);
											form.setFieldsValue({
												timeStart: value,
											});
										}}
										onChange={(value) => {
											// const timeString =
											// 	moment(value).format("HH:mm");
											setSelectedStartTime(value);
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
											// const timeString =
											// 	moment(value).format("HH:mm");
											setSelectedFinishTime(value);
											form.setFieldsValue({
												timeFinish: value,
											});
										}}
										onChange={(value) => {
											// const timeString =
											// 	moment(value).format("HH:mm");
											setSelectedFinishTime(value);
										}}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Divider
							style={{ marginTop: "0px", marginBottom: "20px" }}
						/>
						<Form.Item label="Duration" name="duration">
							<MaskedInput
								autoComplete="none"
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
