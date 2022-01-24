import React, { useEffect, useState } from "react";
import moment from "moment";
import DateRangeSelector from "../../components/elements/dateRangeSelector";
import { Typography, Divider, Tag, Space } from "antd";
import DataTable from "../../components/elements/dataTable";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredTimeLogs } from "../../redux/timeLog/timeLogActions";
import { DATERANGE, LOG } from "../../types/types";
import { firestampToMoment } from "../../Functions/Converter";
import { getTimeLogModal } from "../../redux/settings/settingsActions";

function Timesheet() {
	const dispatch: any = useDispatch();
	const logData: LOG[] = useSelector(
		(state: any) => state.timeLog.filterTimeLogData
	);

	const [dateRange, setDateRange] = useState<DATERANGE[]>([
		{
			startDate: new Date(moment().startOf("month").format()),
			endDate: new Date(moment().endOf("month").format()),
			key: "selection",
		},
	]);

	useEffect(() => {
		//fetch data from firebase
		dispatch(
			getFilteredTimeLogs({
				dateStart: dateRange[0].startDate,
				dateFinish: dateRange[0].endDate,
			})
		);
	}, [dateRange]);

	const makeupLogData = logData.map((log) => {
		return {
			key: log.id,
			Project: log.type,
			ProjectDetail: log.typeDetail,
			Description: log.description.slice(0, 150),
			Tags: log.tags,
			logDate: log.logDate
				? firestampToMoment(log.logDate).format("DD MMM")
				: "",
			StartTime: firestampToMoment(log.timeStart).format("hh:mm"),
			FinishTime: firestampToMoment(log.timeFinish).format("hh:mm"),
			Duration: log.duration,
			Minutes: log.durationMinutes,
		};
	});
	const uniqueProjects = () => {
		return [
			...new Set(
				makeupLogData.map((data) => {
					return data.Project;
				})
			),
		].map((data) => {
			return { text: data, value: data };
		});
		
	};

    const uniqueProjectsDetails = () => {
		return [
			...new Set(
				makeupLogData.map((data) => {
					return data.ProjectDetail;
				})
			),
		].map((data) => {
			return { text: data, value: data };
		});
		
	};

	const columns = [
		{
			title: "Project",
			dataIndex: "Project",
			// render: (name) => `${name.first} ${name.last}`,
			// width: "20%",
			filters: uniqueProjects(),
		},
		{
			title: "Project Detail",
			dataIndex: "ProjectDetail",
			filters: uniqueProjectsDetails(),
			// width: "20%",
		},
		{
			title: "Description",
			dataIndex: "Description",
			width: "20%",
		},
		// {
		// 	title: "Tags",
		// 	dataIndex: "Tags",
		//     width: "20%",
		//     render: (tags:string[]) => (
		//         <>
		//           {tags.map((oneTag:string) => {
		//             return (
		//               <Tag color={'geekblue'} key={oneTag}>
		//                 {oneTag.toUpperCase()}
		//               </Tag>
		//             );
		//           })}
		//         </>
		//       ),
		// },
		{
			title: "Date",
			dataIndex: "logDate",
		},
		{
			title: "Start Time",
			dataIndex: "StartTime",
		},
		{
			title: "Finish Time",
			dataIndex: "FinishTime",
		},
		{
			title: "Duration",
			dataIndex: "Duration",
			sorter: true,
		},
		{
			title: "Action",
			key: "action",
			render: (text: any, record: any) => (
				<Space size="middle">
					<a onClick={() => timeStartMaker(record.key)}>Edit</a>
				</Space>
			),
		},
	];

	const timeStartMaker = (logId: string) => {
		dispatch(getTimeLogModal(true, logId));
	};

	return (
		<div>
			{/* <Typography.Title>Timesheet</Typography.Title> */}
			{/* <Divider style={{ marginTop: "0" }} /> */}

			<div
				style={{
					marginTop: "0px",
					marginBottom: "20px",
					alignItems: "center",
				}}
			>
				<DateRangeSelector
					dateRange={dateRange}
					setDateRange={(e) => {
						setDateRange([e.selection]);
					}}
				/>
			</div>
			<DataTable logData={makeupLogData} columns={columns} />
		</div>
	);
}

export default Timesheet;
