import React from "react";
import {
	Button,
	Cascader,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Radio,
	Select,
	Switch,
	TreeSelect,
	Typography,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import MainLayout from "../../components/Layout/mainLayout";

function Settings() {
	const user = useSelector((state: any) => state.fb.auth);

	return (
		<>
			<Typography.Title>Settings</Typography.Title>

			<Typography.Title level={4}>User ID : {user.uid}</Typography.Title>
			<Form
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				layout="horizontal"
				initialValues={{}}
				onValuesChange={(e) => {
					{
						console.log(e);
					}
				}}
				// size={componentSize as SizeType}
			>
				<Form.Item label="Form Size" name="size">
					<Radio.Group>
						<Radio.Button value="small">Small</Radio.Button>
						<Radio.Button value="default">Default</Radio.Button>
						<Radio.Button value="large">Large</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item label="Input">
					<Input />
				</Form.Item>
				<Form.Item label="Select">
					<Select>
						<Select.Option value="demo">Demo</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label="TreeSelect">
					<TreeSelect
						treeData={[
							{
								title: "Light",
								value: "light",
								children: [
									{ title: "Bamboo", value: "bamboo" },
								],
							},
						]}
					/>
				</Form.Item>
				<Form.Item label="Cascader">
					<Cascader
						options={[
							{
								value: "zhejiang",
								label: "Zhejiang",
								children: [
									{
										value: "hangzhou",
										label: "Hangzhou",
									},
								],
							},
						]}
					/>
				</Form.Item>
				<Form.Item label="DatePicker">
					<DatePicker />
				</Form.Item>
				<Form.Item label="InputNumber">
					<InputNumber />
				</Form.Item>
				<Form.Item label="Switch" valuePropName="checked">
					<Switch />
				</Form.Item>
				<Form.Item label="Button">
					<Button>Button</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export default Settings;
