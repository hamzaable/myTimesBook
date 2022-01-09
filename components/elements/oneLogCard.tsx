import { Row, Col, Typography } from "antd";
import React from "react";
import { MdWorkOutline } from "react-icons/md";

function OneLogCard() {
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
			}}
		>
			<Row style={{ width: "100%", alignItems: "center" }}>
				<Col span={19}>
					<Row>
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
												Log Detail
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
												Log Description Lorem ipsum
												dolor
											</Typography.Paragraph>
										</Col>
									</Row>
								</Col>
							</Row>
						</Col>
						<Col span={8}>
							<Row>
								<label>Log Type</label>
							</Row>
							<Row>
								<span
									style={{
										backgroundColor: "#e1f5fe",
										padding: "3px 8px",

									}}
								>
									Tags
								</span>
							</Row>
						</Col>
					</Row>
				</Col>
				<Col span={5}>
					<Row
						gutter={12}
						style={{
							justifyContent: "space-evenly",
							alignItems: "center",
						}}
					>
						<Col>
							<div>Time</div>
						</Col>

						<Col>
							<Typography.Paragraph
								style={{
									fontSize: "18px",
									margin: "0px",
									// fontWeight: "600",
								}}
							>
								04:00
							</Typography.Paragraph>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
}

export default OneLogCard;
