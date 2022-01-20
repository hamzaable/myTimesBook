import { Modal } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { timeDifferencer, timeExpander } from "../../Functions/Converter";
import {
	getLogTypeDetails,
	getTimeLogModal,
} from "../../redux/settings/settingsActions";
import TimeLog from "./timelog";
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
	const [description, setDescription] = useState("");
	const [selectedDate, setSelectedDate] = useState(props.defaultDate);

	React.useEffect(() => {
		console.log("data changed");
	}, [modalData]);
	const [confirmLoading, setConfirmLoading] = React.useState(false);

	const handleOk = () => {
		setConfirmLoading(true);
		setTimeout(() => {
			props.setModalVisible(false);
			setConfirmLoading(false);
		}, 2000);
	};

	const handleCancel = () => {
		console.log("Clicked cancel button");
		dispatch(getTimeLogModal(false, ""));
	};

	const [activeDate, setActiveDate] = React.useState<moment.Moment>(moment());




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
				/>
			</Modal>
		</>
	);
}

export default TimeLogModal;
