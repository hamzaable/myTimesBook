import { Modal } from "antd";
import moment from "moment";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTimeLogModal } from "../../redux/settings/settingsActions";
import TimeLog from "./timelog";

function TimeLogModal(props: any) {
	const dispatch = useDispatch();
	interface MODALDATA {
		isVisible: boolean;
		openID: string;
	}
	const modalData: MODALDATA = useSelector(
		(state: any) => state.settings.isTimeLogModalVisible
	);

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

	return (
		<>
			<Modal
				title="Update Time Log"
				visible={modalData.isVisible}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<TimeLog defaultDate={activeDate} />
			</Modal>
		</>
	);
}

export default TimeLogModal;
