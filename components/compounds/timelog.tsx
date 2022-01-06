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
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { getFirebase } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import {
	addNewTaskType,
	addNewTaskTypeDetail,
	getLogTypeDetails,
	getLogTypes,
	loadingFinish,
	updateLogTypeDetailsList,
} from "../../redux/settings/settingsActions";
import Loading from "./loading";
import SelectWithAddnew from "../elements/selectWithAddnew";
import moment from "moment";
import { MaskedInput } from "antd-mask-input";

function TimeLog() {
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
				const finishHours = makeTimeArray(totalHours);
				const finishTime = `${("0" + finishHours[0]).slice(-2)}:${(
					"0" + finishHours[1]
				).slice(-2)}`;
				setSelectedFinishTime(finishTime);
				form.setFieldsValue({
					timeFinish: moment(finishTime, "hh:mm"),
				});
			}
		}
	}, [selectedDuration]);

	useEffect(() => {
		if (selectedTaskType && selectedTaskType !== "") {
			setIsFetching(true);
			dispatch(getLogTypeDetails(selectedTaskType));
			setIsFetching(false);
		}
	}, [selectedTaskType]);

	const makeTimeArray = (num: any) => {
		num = ("" + num).match(/^(-?[0-9]+)([,.][0-9]+)?/) || [];
		return [~~num[1], +(0 + (num[2] * 60).toFixed(0)) || 0];
	};

	const timeExpander = (value: any) => {
		if (value) {
			if (value.length <= 5) {
				const splitter = value.split(":");
				return {
					hours: parseInt(splitter[0]),
					minutes: parseInt(splitter[1]),
				};
			}
		}
		return {
			hours: 0,
			minutes: 0,
		};
	};

	const timeDifferencer = (
		sh: number,
		sm: number,
		fh: number,
		fm: number
	) => {
		const diff = makeTimeArray((fh * 60 + fm - (sh * 60 + sm)) / 60);
		if (fh * 60 + fm - (sh * 60 + sm) < 0) {
			return;
		}
		return `${("0" + diff[0]).slice(-2)}:${("0" + diff[1]).slice(-2)}`;
	};

	const titleCase = (str: string) => {
		return str
			.split(" ")
			.map(
				(item) =>
					item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
			)
			.join(" ");
	};
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

	const testingFunction = () => {
		form.setFieldsValue({ typeDetail: null });
	};

	const MomentToTimestamp = (data: any) => {
		// @ts-ignore
		return fb.firestore.Timestamp.fromDate(new Date(moment(data).format()));
	};

	const handleFormSubmit = (data: any) => {
		const timeStartFormatted = MomentToTimestamp(data.timeStart);
		const timeFinishFormatted = MomentToTimestamp(data.timeFinish);

		const timeStartCalc = MomentToTimestamp(
			moment(
				data.date.format("DD/MM/YYYY") +
					" " +
					data.timeStart.format("hh:mm"),
				"DD/MM/YYYY hh:mm"
			)
		);

		const timeFinishCalc = MomentToTimestamp(
			moment(
				data.date.format("DD/MM/YYYY") +
					" " +
					data.timeFinish.format("hh:mm"),
				"DD/MM/YYYY hh:mm"
			)
		);

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
				console.log("Document successfully written!");
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
												<Loading size="12" />
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
								onChange={(e: any) => {}}
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
