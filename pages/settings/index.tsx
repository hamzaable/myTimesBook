import React, { useEffect } from "react";
import {
	Button,
	Form,
	Input,
	InputNumber,
	Select,
	Tabs,
	Typography,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import Loading from "../../components/compounds/loading";
import { getLogTypes, updateUserSettings } from "../../redux/settings/settingsActions";
import {
	FileDoneOutlined,
	MinusCircleOutlined,
	PlusOutlined,
	SettingOutlined,
	UserOutlined,
} from "@ant-design/icons";

function Settings() {
	const dispatch = useDispatch();

	const fbProfile = useSelector((state: any) => state.fb.profile);
	const fbStatus = isLoaded(fbProfile);

	const userData = useSelector((state: any) => state.settings.userData);

	const handleFormSubmit = async (data: any) => {
		dispatch(updateUserSettings(data));
	};

	const formItemLayoutWithOutLabel = {
		wrapperCol: {
			xs: { span: 24, offset: 0 },
			sm: { span: 20, offset: 4 },
		},
	};

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 4 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 20 },
		},
	};
    useEffect(() => {
        dispatch(getLogTypes())
    }, [])

	return !fbStatus ? (
		<Loading />
	) : (
		<>
			<Typography.Title>Settings</Typography.Title>
			{/* <Typography.Title level={4}>User ID : {user.uid}</Typography.Title> */}
			<Tabs
				// onChange={callback}
				type="card"
				style={{
					backgroundColor: "rgb(249, 250, 251)",
					boxShadow: "rgb(0 0 0 / 10%) 0px 0px 20px",
				}}
			>
				<Tabs.TabPane
					tab={
						<span>
							<SettingOutlined />
							User Settings
						</span>
					}
					key="1"
				>
					<Form
						onFinish={handleFormSubmit}
						labelCol={{ md: 24, lg: 14 }}
						wrapperCol={{ md: 24, lg: 14 }}
						layout="vertical"
					>
						<Form.Item
							label="Username"
							name="username"
							initialValue={userData.username}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="First Name"
							name="firstname"
							initialValue={userData.firstName}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Last Name"
							name="lastname"
							initialValue={userData.lastName}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Default Language"
							name="language"
							initialValue={userData.language}
						>
							<Select>
								<Select.Option value="english">
									English
								</Select.Option>
								<Select.Option value="german">
									German
								</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item
							label="Time Step Jumps"
							name="timesteps"
							initialValue={userData.timeSteps}
						>
							<InputNumber
								style={{ width: "100%" }}
								min={1}
								max={50}
							/>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								style={{ width: "100%" }}
								htmlType="submit"
							>
								Update
							</Button>
						</Form.Item>
					</Form>
				</Tabs.TabPane>
				<Tabs.TabPane
					tab={
						<span>
							<FileDoneOutlined />
							Log Types
						</span>
					}
					key="2"
				>
					<Form
						name="logTypes"
						{...formItemLayoutWithOutLabel}
						onFinish={(e) => {
							console.log("Received values of form:", e);
						}}
						initialValues={{
							names: ["hamza", "rehman", "saleemi"],
						}}
					>
						<Form.List name="names">
							{(fields, { add, remove }, { errors }) => (
								<>
									{fields.map((field, index) => (
										<Form.Item
											{...(index === 0
												? formItemLayout
												: formItemLayoutWithOutLabel)}
											label={
												index === 0 ? "Log Type" : ""
											}
											required={false}
											key={field.key}
										>
											<Form.Item
												{...field}
												validateTrigger={[
													"onChange",
													"onBlur",
												]}
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
												/>
											</Form.Item>
											{fields.length >= 1 ? (
												<MinusCircleOutlined
													className="dynamic-delete-button"
													onClick={() =>
														remove(field.name)
													}
												/>
											) : null}
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
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Tabs.TabPane>

				<Tabs.TabPane
					tab={
						<span>
							<UserOutlined />
							Linked Accounts
						</span>
					}
					key="3"
				>
					Content of Tab Pane 3
				</Tabs.TabPane>
			</Tabs>
		</>
	);
}

export default Settings;
