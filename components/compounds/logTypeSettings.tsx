import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteLogType } from "../../redux/settings/settingsActions";

function LogTypeSettings(props: any) {
	const dispatch = useDispatch();

	const formItemLayoutWithOutLabel = {
		wrapperCol: {
			xs: { span: 24, offset: 0 },
			sm: { span: 15, offset: 0 },
		},
	};

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 4 },
		},
		wrapperCol: {
			xs: { span: 24, offset: 0 },
			sm: { span: 15, offset: 0 },
		},
	};

	function getInputValue(id: string) {
		const temp: HTMLInputElement = document.getElementById(
			id
		) as HTMLInputElement;
		return temp.value;
	}

	const deleteInput = (data: string) => {
		const toDel = getInputValue(data);
		console.log("deleteInput ~ toDel", toDel);
		dispatch(deleteLogType(toDel));
	};
	return (
		<>
			<Form
				name="logTypes"
				{...formItemLayoutWithOutLabel}
				onFinish={(e) => {
					console.log("Received values of form:", e);
				}}
				initialValues={props.initialValues}
			>
				<Form.List name="logTypes">
					{(fields, { add, remove }, { errors }) => (
						<>
							{fields.map((field, index) => (
								<Form.Item
									{...(index === 0
										? formItemLayout
										: formItemLayoutWithOutLabel)}
									label={index === 0 ? "" : ""}
									key={index}
									style={{ marginBottom: "7px" }}
								>
									<Form.Item
										{...field}
										validateTrigger={["onChange", "onBlur"]}
										rules={[
											{
												required: true,
												whitespace: true,
												message:
													"Please input Log Type or delete this field.",
											},
										]}
										noStyle
									>
										<Input
											placeholder="Log Type"
											style={{ width: "60%" }}
											id={`Input${field.key}`}
										/>
									</Form.Item>

									<MinusCircleOutlined
										className="dynamic-delete-button"
										onClick={() => {
											deleteInput(`Input${field.key}`);

											// remove(field.name);
										}}
										style={{
											marginRight: "10px",
											marginLeft: "10px",
										}}
									/>
									<a
										onClick={() => {
											getInputValue(`Input${field.key}`);
										}}
									>
										{"  View Details"}
									</a>
								</Form.Item>
							))}
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => add()}
									style={{ width: "60%" }}
									icon={<PlusOutlined />}
								>
									Add more
								</Button>

								<Form.ErrorList errors={errors} />
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Save changes
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export default LogTypeSettings;
