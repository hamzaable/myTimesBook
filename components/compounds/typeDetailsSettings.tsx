import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select, Row, Col, Space } from "antd";
import React, { useEffect, useState } from "react";
import { getLogTypeDetails } from "../../redux/settings/settingsActions";
import SelectWithAddnew from "../elements/selectWithAddnew";
import { useSelector, useDispatch } from "react-redux";

function TypeDetailsSettings(props: any) {
	const [selectedTaskType, setSelectedTaskType] = useState();
	const dispatch = useDispatch();

	const logTypes = useSelector((state: any) => state.settings.logTypesData);
	const logTypesDetails = useSelector(
		(state: any) => state.settings.logTypeDetailsData
	);

	useEffect(() => {
		if (logTypes) {
			setSelectedTaskType(logTypes[0]);
		}
	}, []);

	useEffect(() => {
		if (selectedTaskType && selectedTaskType !== "") {
			dispatch(getLogTypeDetails(selectedTaskType));
		}
	}, [selectedTaskType]);

	const formItemLayoutWithOutLabel = {
		wrapperCol: {
			xs: { span: 24, offset: 0 },
			sm: { span: 15, offset: 2 },
		},
	};

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 4 },
		},
		wrapperCol: {
			xs: { span: 24, offset: 0 },
			sm: { span: 15, offset: 2 },
		},
	};

	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		console.log("Received values of form:", values);
	};

	const handleChange = (e: any) => {
		setSelectedTaskType(e);
		// form.setFieldsValue({ sights: [] });
	};

	const logTypesOptions = logTypes.map((val: any) => {
		return { label: val, value: val };
	});

	const typeDetailsList = [...logTypesDetails];
	return (
		<>
			<Form
				form={form}
				name="dynamic_form_nest_item"
				onFinish={onFinish}
				autoComplete="off"
			>
				<Form.Item name="typeName" label="Log Type">
					<Select options={logTypesOptions} onChange={handleChange} />
				</Form.Item>

				{typeDetailsList.map((item: any, key: any) => {
					return (
						<Form.Item key={item} style={{ marginBottom: "7px" }}>
							<Row>
								<Col xs={24} sm={24} md={12} lg={10}>
									<Input defaultValue={item} />{" "}
								</Col>
								<Col>
									<MinusCircleOutlined
										className="dynamic-delete-button"
										onClick={() => console.log(item)}
										style={{
											marginRight: "10px",
											marginLeft: "10px",
										}}
									/>
								</Col>
							</Row>

							
						</Form.Item>
					);
				})}
			</Form>
		</>
	);
}

export default TypeDetailsSettings;
