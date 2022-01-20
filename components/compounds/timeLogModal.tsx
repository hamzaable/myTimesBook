import { Modal } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	firestampToMoment,
	momentToFirestamp,
	timeDifferencer,
	timeExpander,
} from "../../Functions/Converter";
import {
	getLogTypeDetails,
	getTimeLogModal,
} from "../../redux/settings/settingsActions";
import {
	getOneTimeLog,
	getTimeLogs,
	updateOneTimeLog,
} from "../../redux/timeLog/timeLogActions";
import { LOG } from "../../types/types";
import Loading from "./loading";
import TimeLogForm from "./timeLogForm";

function TimeLogModal(props: any) {
	const dispatch = useDispatch();
	interface MODALDATA {
		isVisible: boolean;
		openID: string;
	}
	const modalData: MODALDATA = useSelector(
		(state: any) => state.settings.isTimeLogModalVisible
	);

	const [selectedTaskType, setSelectedTaskType] = useState<string>("");
	const [selectedTaskTypeDetail, setSelectedTaskTypeDetail] =
		useState<string>();
	const [selectedStartTime, setSelectedStartTime] = useState<any>();
	const [selectedFinishTime, setSelectedFinishTime] = useState<any>();
	const [selectedDuration, setSelectedDuration] = useState<any>();

	const [selectedReportTo, setSelectedReportTo] = useState<any>();
	const [tags, setTags] = useState<string[] | undefined>();
	const [description, setDescription] = useState("");
	const [selectedDate, setSelectedDate] = useState(props.defaultDate);
	const [isFetching, setIsFetching] = useState(false);

	React.useEffect(() => {
		setIsFetching(true);
		if (modalData.isVisible === true) {
			// get data first
			dispatch(getOneTimeLog(modalData.openID)).then((value: LOG) => {
				setSelectedTaskType(value.type);
				setSelectedTaskTypeDetail(value.typeDetail);
				setDescription(value.description);
				setSelectedDuration(value.duration);
				setTags(value.tags);
				setSelectedDate(firestampToMoment(value.logDate));
				setSelectedStartTime(firestampToMoment(value.timeFinish));
				setSelectedFinishTime(firestampToMoment(value.timeStart));
				setSelectedReportTo(value.reportTo);
				setIsFetching(false);
			});
		}
	}, [modalData]);
	const [confirmLoading, setConfirmLoading] = React.useState(false);

	const handleOk = () => {
		setConfirmLoading(true);

		const timeStartCalc = moment(selectedDate);
		timeStartCalc.hours(moment(selectedStartTime).hour());
		timeStartCalc.minutes(moment(selectedStartTime).minutes());
		timeStartCalc.seconds(0);

		const timeFinishCalc = moment(selectedDate);
		timeFinishCalc.hours(moment(selectedFinishTime).hour());
		timeFinishCalc.minutes(moment(selectedFinishTime).minutes());
		timeFinishCalc.seconds(0);

		// if there is duration but no start and end time

		if (selectedDuration && !selectedFinishTime && !selectedStartTime) {
			timeStartCalc.hours(0);
			timeStartCalc.minutes(0);
			timeStartCalc.seconds(0);

			timeFinishCalc.hours(+timeExpander(selectedDuration).hours);
			timeFinishCalc.minutes(timeExpander(selectedDuration).minutes);
			timeFinishCalc.seconds(0);
		}

		// if nothin in time is entered , just add the start time
		if (!selectedDuration && !selectedFinishTime && !selectedStartTime) {
			timeStartCalc.hours(moment().hours());
			timeStartCalc.minutes(moment().minutes());
			timeStartCalc.seconds(0);
			setSelectedStartTime(timeStartCalc);
		}

		const timeStartFormatted = momentToFirestamp(selectedStartTime);
		const timeFinishFormatted = momentToFirestamp(selectedFinishTime);

		const totalMinutes =
			timeExpander(selectedDuration).hours * 60 +
			timeExpander(selectedDuration).minutes;

		const submitter = {
			logDate: momentToFirestamp(selectedDate),
			description: description,
			duration: selectedDuration,
			reportTo: selectedReportTo,
			tags: ["a", "b"],
			timeStart: timeStartFormatted,
			timeFinish: timeFinishFormatted,
			timeStartCalc: momentToFirestamp(timeStartCalc),
			timeFinishCalc: momentToFirestamp(timeFinishCalc),
			type: selectedTaskType,
			typeDetail: selectedTaskTypeDetail,
			durationMinutes: +totalMinutes,
		};
		// console.log("handleFormSubmit ~ submitter", submitter);

		dispatch(updateOneTimeLog(modalData.openID, submitter)).then(()=>{
            dispatch(
				getTimeLogs({
					dateStart: new Date(
						moment(selectedDate).startOf("day").toDate()
					),
					dateFinish: new Date(
						moment(selectedDate).endOf("day").toDate()
					),
				})
			);
            setConfirmLoading(false);
            dispatch(getTimeLogModal(false, ""));
        })

	
	};

	const handleCancel = () => {
		dispatch(getTimeLogModal(false, "")).then(() => {
			setSelectedTaskType("");
			setSelectedTaskTypeDetail("");
			setSelectedDuration("");
			setDescription("");
			setSelectedStartTime("");
			setSelectedFinishTime("");
			setSelectedReportTo("");
			setSelectedDate("");
			setConfirmLoading(false);
		});
	};

	useEffect(() => {
		if (!isFetching) {
			// if finish time change with start time present
			if (selectedStartTime && selectedFinishTime) {
				const calcDuration = timeDifferencer(
					moment(selectedStartTime).hours(),
					moment(selectedStartTime).minutes(),
					moment(selectedFinishTime).hours(),
					moment(selectedFinishTime).minutes()
				);
				setSelectedDuration(calcDuration);

				//  if finish time is null remove duration

				if (
					selectedFinishTime === "Invalid date" ||
					selectedStartTime === "Invalid date"
				) {
					setSelectedDuration(null);
					// form.setFieldsValue({
					// 	duration: null,
					// });
				}
			}
		}
	}, [selectedStartTime, selectedFinishTime]);

	useEffect(() => {
		if (selectedStartTime && selectedFinishTime) {
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
			}
		}
	}, [selectedDuration]);

	useEffect(() => {
		if (selectedTaskType && selectedTaskType !== "") {
			dispatch(getLogTypeDetails(selectedTaskType));
		}
	}, [selectedTaskType]);

	useEffect(() => {
		setSelectedTaskType("");
		setSelectedTaskTypeDetail("");
		setSelectedStartTime("");
	}, []);

	return (
		<>
			<Modal
				title="Update Time Log"
				visible={modalData.isVisible}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				destroyOnClose={true}
				keyboard={true}
				width={800}
				style={{ top: "50px" }}
			>
				{isFetching ? (
					<Loading />
				) : (
					<TimeLogForm
						selectedTaskType={selectedTaskType}
						setSelectedTaskType={(e: any) => {
							setSelectedTaskType(e);
							setSelectedTaskTypeDetail("");
						}}
						setSelectedTaskTypeDetail={(e: any) => {
							setSelectedTaskTypeDetail(e);
						}}
						selectedTaskTypeDetail={selectedTaskTypeDetail}
						description={description}
						setDescription={(e: any) => {
							setDescription(e);
						}}
						setSelectedDate={(e: any) => {
							setSelectedDate(e);
						}}
						selectedDate={selectedDate}
						setSelectedStartTime={(e: any) => {
							setSelectedStartTime(e);
						}}
						selectedStartTime={selectedStartTime}
						setSelectedFinishTime={(e: any) => {
							setSelectedFinishTime(e);
						}}
						selectedFinishTime={selectedFinishTime}
						selectedDuration={selectedDuration}
						setSelectedDuration={(e: any) => {
							setSelectedDuration(e);
						}}
						selectedReportTo={selectedReportTo}
						setSelectedReportTo={(e: any) => {
							setSelectedReportTo(e);
						}}
						tags={tags}
						setTags={(e: any) => {
							setTags(e);
						}}
					/>
				)}
			</Modal>
		</>
	);
}

export default TimeLogModal;
