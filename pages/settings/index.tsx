import React from "react";
import { Button, Form, Input, InputNumber, Select, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import Loading from "../../components/Elements/loading";
import { updateUserSettings } from "../../redux/settings/settingsActions";

function Settings() {
	const dispatch = useDispatch();

	const fbProfile = useSelector((state: any) => state.fb.profile);
	const fbStatus = isLoaded(fbProfile);

	const userData = useSelector((state: any) => state.settings.userData);

	const handleFormSubmit = async (data: any) => {
		console.log("handleFormSubmit ~ data", data);
		dispatch(updateUserSettings(data));
	};
	return !fbStatus ? (
		<Loading />
	) : (
		<>
			<Typography.Title>Settings</Typography.Title>
			{/* <Typography.Title level={4}>User ID : {user.uid}</Typography.Title> */}
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
						<Select.Option value="english">English</Select.Option>
						<Select.Option value="german">German</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Time Step Jumps"
					name="timesteps"
					initialValue={userData.timeSteps}
				>
					<InputNumber style={{ width: "100%" }} min={1} max={50} />
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
		</>
	);
}

export default Settings;
