import {
	Button,
	Col,
	DatePicker,
	Divider,
	Form,
	Input,
	Row,
	Select,
	TimePicker,
} from "antd";
import { MaskedInput } from "antd-mask-input";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { getFirebase } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import SelectWithAddnew from "../elements/selectWithAddnew";
import {
	addNewTaskType,
	addNewTaskTypeDetail,
	getLogTypes,
	getParentsList,
} from "../../redux/settings/settingsActions";
import { timeDifferencer, titleCase } from "../../Functions/Converter";
import Loading from "./loading";

interface PROPS {
	// setSelectedTaskType
	// setSelectedTaskTypeDetail
}
function TimeLogForm(props: any) {
	const fb = getFirebase();
	const user = useSelector((state: any) => state.fb.auth);
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const [isFetching, setIsFetching] = useState(false);

	const [newTaskType, setNewTaskType] = useState<string>("");
	const [newTaskTypeDetail, setNewTaskTypeDetail] = useState<string>("");
	const taskTypeOptions = useSelector(
		(state: any) => state.settings.logTypesData
	);

	const taskTypeDetailOptions = useSelector(
		(state: any) => state.settings.logTypeDetailsData
	);

	const [reportToOptions, setReportToOptions] = useState<
		{ label: string; value: string }[]
	>([{ label: "", value: "" }]);

	useEffect(() => {
		form.setFieldsValue({
			logType: props.selectedTaskType,
			typeDetail: props.selectedTaskTypeDetail,
			duration: props.selectedDuration,
			timeStart: props.selectedStartTime,
			timeFinish: props.selectedFinishTime,
			description: props.description,
			tags: props.tags,
			date: props.selectedDate,
			reportTo : props.selectedReportTo,
		});
	}, [
		props.selectedTaskType,
		props.selectedTaskTypeDetail,
		props.selectedStartTime,
		props.selectedFinishTime,
		props.selectedDuration,
		form,
		props.description,
		props.tags,
		props.selectedDate,
		props.selectedReportTo,
	]);

	const addNewTaskTypeHandler = async () => {
		if (!newTaskType) {
			return;
		}

		dispatch(addNewTaskType(newTaskType)).then(() => {
			setNewTaskType("");

			props.setSelectedTaskType(newTaskType);
			props.setSelectedTaskTypeDetail("");
		});
	};

	const logTypesClick = async () => {
		setIsFetching(true);
		dispatch(getLogTypes());
		setIsFetching(false);
	};

	const addNewTaskTypeDetailHandler = async () => {
		if (!props.selectedTaskType) {
			alert("Please Select Log Type !");
			return;
		}
		setIsFetching(true);

		dispatch(
			addNewTaskTypeDetail(
				props.selectedTaskType,
				newTaskTypeDetail,
				false
			)
		).then(() => {
			props.setSelectedTaskTypeDetail(newTaskTypeDetail);
			setNewTaskTypeDetail("");
		});

		setIsFetching(false);
	};

	const reportToOnclick = async (e: any) => {
		setIsFetching(true);
		const results: { label: string; value: string }[] = await dispatch(
			getParentsList()
		);
		const uniqueResults: { label: string; value: string }[] = [
			...new Set(results),
		];
		if (uniqueResults.length !== 0) {
			setReportToOptions(uniqueResults);
		} else {
			setReportToOptions([{ label: "", value: "" }]);
		}
		return;
	};

	return (
		<div>
			<Form
				// onFinish={props.handleFormSubmit}
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
													props.setSelectedTaskType(
														e
													);

													form.setFieldsValue({
														typeDetail: null,
													});
												}}
												value={props.selectedTaskType}
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
												props.selectedTaskType
													? `${titleCase(
															props.selectedTaskType
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
													props.setSelectedTaskTypeDetail(
														e
													);
												}}
												value={
													props.selectedTaskTypeDetail
												}
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
										value={props.description}
										onChange={(e) => {
											props.setDescription(
												e.target.value
											);
										}}
										placeholder={"Task Description"}
									/>
								</Form.Item>

								<Form.Item label="Tags" name="tags">
									<Select
										mode="tags"
										style={{ width: "100%" }}
										placeholder="Tags"
										value={props.tags}
										onChange={(e) => {
											props.setTags(e);
										}}
									>
										{/* <Option key={1}>{1}</Option> */}
									</Select>
								</Form.Item>

								<Form.Item label="Report to" name="reportTo">
									<Select
										value={props.selectedReportTo}
										onClick={reportToOnclick}
										notFoundContent={
											isFetching ? (
												<Loading size={12} />
											) : (
												"No Data"
											)
										}
										onChange={(e: any) => {
											props.setSelectedReportTo(e);
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
									props.setSelectedDate(e);
								}}
								showToday={true}
								format="DD.MM.YYYY"
								showTime={false}
								style={{ minWidth: "100%" }}
								allowClear={false}
								value={props.selectedDate}
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
											props.selectedStartTime,
											"HH:mm"
										)}
										onSelect={(value) => {
											// const timeString =
											// 	moment(value).format("HH:mm");
											props.setSelectedStartTime(value);
											form.setFieldsValue({
												timeStart: value,
											});
										}}
										onChange={(value) => {
											// const timeString =
											// 	moment(value).format("HH:mm");
											props.setSelectedStartTime(value);
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
											props.selectedFinishTime,
											"HH:mm"
										)}
										onSelect={(value) => {
											// const timeString =
											// 	moment(value).format("HH:mm");
											props.setSelectedFinishTime(value);
											form.setFieldsValue({
												timeFinish: value,
											});
										}}
										onChange={(value) => {
											// const timeString =
											// 	moment(value).format("HH:mm");
											props.setSelectedFinishTime(value);
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
								value={props.selectedDuration}
								onBlur={(e: any) => {
									props.setSelectedDuration(e.target.value);
								}}
							/>
						</Form.Item>
					</Col>
				</Row>
				{/* <Form.Item style={{ marginBottom: "0" }}>
					<Button
						type="primary"
						style={{ width: "100%", maxWidth: "200px" }}
						htmlType="submit"
						// onClick={testingFunction}
					>
						Add New Time Log
					</Button>
				</Form.Item> */}
			</Form>
		</div>
	);
}

export default TimeLogForm;
