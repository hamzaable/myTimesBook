import React from "react";
import OneLogCard from "../elements/oneLogCard";
import { useSelector, useDispatch } from "react-redux";
import { Space } from "antd";

function LogCardMaker() {
	const logData: LOG[] = useSelector(
		(state: any) => state.timeLog.dashboardTimeLogData
	);

	interface LOG {
		id: string;
		duration: string;
		type: string;
		timeStart: { seconds: number; nanoseconds: number };
		timeStartCalc: { seconds: number; nanoseconds: number };
		timeFinish: { seconds: number; nanoseconds: number };
		timeFinishCalc: { seconds: number; nanoseconds: number };
		reportTo: string;
		typeDetail: string;
		tags: string[];
		description: string;
	}
	return (
		<>
			{logData.length > 0 && (
				<Space
					direction="vertical"
					size={"middle"}
					style={{ width: "100%" }}
				>
					{logData.map((log: LOG) => {
						{
							console.log(log);
						}
						return (
							<OneLogCard
								key={log.id}
								id={log.id}
								type={log.type}
								typeDetail={log.typeDetail}
								tags={log.tags}
								startTime={log.timeStartCalc}
								finishTime={log.timeFinishCalc}
								duration={log.duration}
								description={log.description}
							/>
						);
					})}
				</Space>
			)}
		</>
	);
}

export default LogCardMaker;
