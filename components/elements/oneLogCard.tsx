import { Row, Col, Typography } from "antd";
import moment from "moment";
import React from "react";
import { MdWorkOutline } from "react-icons/md";
import { firestampToMoment } from "../../Functions/Converter";
import { getTimeLogModal } from "../../redux/settings/settingsActions";
import { useDispatch } from "react-redux";

function OneLogCard({
	id,
	type,
	typeDetail,
	tags,
	startTime,
	finishTime,
	duration,
	description,
}: any) {
	const dispatch = useDispatch();
	const timeStartMaker = (logId: string) => {
		dispatch(getTimeLogModal(true, logId));
		// return firestampToMoment(startTime).format("DD.MM.YYYY");
	};

	return (
		<div
			style={{
				width: "100%",
				backgroundColor: "rgb(249, 250, 251)",
				borderRadius: "10px",
				boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 20px",
				padding: "12px",
				paddingLeft: "24px",
				paddingRight: "24px",
				cursor: "pointer",
                
			}}
			onClick={() => timeStartMaker(id)}
		>
			<Row style={{ width: "100%", alignItems: "center" }}>
				<Col span={16}>
					<Row
						style={{
							justifyContent: "space-evenly",
							alignItems: "center",
						}}
					>
						<Col span={12}>
							<Row gutter={12}>
								<Col>
									<Row
										gutter={6}
										style={{
											alignItems: "flex-start",
										}}
									>
										<Col
											style={{
												fontSize: "14px",
												marginBottom: "0px",
												marginTop: "6px",
											}}
										>
											<MdWorkOutline />
										</Col>
										<Col>
											<Typography.Paragraph
												style={{
													fontSize: "large",
													margin: "0px",
												}}
											>
												{typeDetail}
											</Typography.Paragraph>
										</Col>
									</Row>
									<Row>
										<Col>
											<Typography.Paragraph
												style={{
													fontStyle: "italic",
													fontWeight: "400",
													color: "rgb(201, 195, 191)",
													marginBottom: "0",
												}}
											>
												{description}
											</Typography.Paragraph>
										</Col>
									</Row>
								</Col>
							</Row>
						</Col>
						<Col span={8}>
							<Row>
								<label>{type}</label>
							</Row>
							<Row>
								<span
									style={
										{
											// backgroundColor: "#e6f7ff",
											// padding: "3px 8px",
										}
									}
								>
									{tags.map((tag: string, i: number) =>
										i == tags.length - 1 ? tag : `${tag}, `
									)}
								</span>
							</Row>
						</Col>
					</Row>
				</Col>
				<Col span={8}>
					<Row
						gutter={12}
						style={{
							justifyContent: "space-evenly",
							alignItems: "center",
						}}
					>
						<Col>
							<div>
								{firestampToMoment(startTime).format("h a")}{" "}
								{" - "}
								{firestampToMoment(finishTime).format("h a")}
							</div>
						</Col>

						<Col>
							<Typography.Paragraph
								style={{
									fontSize: "18px",
									margin: "0px",
									// fontWeight: "600",
								}}
							>
								{duration}
							</Typography.Paragraph>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
}

export default OneLogCard;
