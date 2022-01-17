import React from "react";
import OneLogCard from "../elements/oneLogCard";
import { useSelector, useDispatch } from "react-redux";
import { Col, Divider, Row, Space, Typography } from "antd";
import { makeTimeArray } from "../../Functions/Converter";
import { LOG } from "../../types/types";

function LogCardMaker() {
	const logData: LOG[] = useSelector(
		(state: any) => state.timeLog.dashboardTimeLogData
	);

	const totalMinutes = () => {
		const temp = makeTimeArray(
			logData
				.map((obj) => {
					return obj.durationMinutes;
				})
				.reduce((a, b) => {
					return a + b;
				}, 0) / 60
		);

		return temp[0].toString().padStart(2, "0") + ":" + temp[1].toString().padStart(2, "0");
	};

	return (
		<>
			{logData.length > 0 && (
				<Space
					direction="vertical"
					size={"middle"}
					style={{ width: "100%" }}
				>
					{logData.map((log: LOG) => {
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

					<div>
						<Divider
							orientation="right"
							plain
							style={{ borderWidth: "2px", margin: "0 0 10px 0" }}
						></Divider>
						<Row style={{ width: "100%" }}>
							<Col span={23}>
								<Typography.Title
									level={4}
									style={{ textAlign: "right" }}
								>
									{"Total : " + totalMinutes()}
								</Typography.Title>
							</Col>
						</Row>
					</div>
				</Space>
			)}
		</>
	);
}

export default LogCardMaker;
