import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
	Form,
	Input,
	Button,
	Select,
	Row,
	Col,
	Space,
	notification,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
	addNewTaskTypeDetail,
	deleteLogTypeDetail,
	getLogTypeDetails,
} from "../../redux/settings/settingsActions";
import SelectWithAddnew from "../elements/selectWithAddnew";
import { useSelector, useDispatch } from "react-redux";
import NewTypeItem from "../elements/newTypeItem";

function TypeDetailsSettings(props: any) {
	const [selectedTaskType, setSelectedTaskType] = useState<string>("");
	const dispatch = useDispatch();

	const newItemInput = useRef("");

	const logTypes = useSelector((state: any) => state.settings.logTypesData);
	const logTypesDetails = useSelector(
		(state: any) => state.settings.logTypeDetailsData
	);

	const [newItems, setNewItems] = useState<number[]>([]);

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

	const [form] = Form.useForm();

	const arrMaker = (previous: number[] | []) => {
		return (Math.max(...previous) + 1) | 0;
	};

	const onFinish = (values: any) => {
		console.log("Received values of form:", values);

		const newTypes: any = [];
		const oldToUpdate: any = [];
		// Getting changed values from submitted array
		for (const key in values) {
			if (key.slice(0, 3) === "new") {
				newTypes.push({ key: key.slice(4), data: values[key] });
			} else if (key.slice(0, 3) === "old") {
				const toCompare = key.slice(4);
				if (toCompare !== values[key]) {
					oldToUpdate.push({ old: key.slice(4), new: values[key] });
				}
			}
		}
		console.log("newTypes ~ newTypes", newTypes);
		console.log("onFinish ~ oldToUpdate", oldToUpdate);
		// Publishing new values
		if (newTypes.length > 0) {
			newTypes.map((newTaskTypeDetail: any) => {
				if (newTaskTypeDetail.data !== "") {
					dispatch(
						addNewTaskTypeDetail(
							selectedTaskType,
							newTaskTypeDetail.data,
							true
						)
					).then(() => {
						newItemsdeleteHandler(newTaskTypeDetail.key);
					});
				}
			});
		}
		// Updating Old values
		if (oldToUpdate.length > 0) {
			oldToUpdate.map((task: any) => {
				if (task.new !== "") {
                    console.log(task.new,task.new)
					dispatch(
						addNewTaskTypeDetail(selectedTaskType, task.new, true)
					)
                    dispatch(
                        deleteLogTypeDetail(selectedTaskType, task.old)
                    );
				}
			});
		}
	};

	const handleChange = (e: any) => {
		setSelectedTaskType(e);
		// form.setFieldsValue({ sights: [] });
	};

	const newItemsdeleteHandler = (item: any) => {
		setNewItems((prev) => {
			const test = prev.filter((val) => {
				if (val != item) {
					return true;
				} else {
					return false;
				}
			});
			return [...test];
		});
	};

	const logTypesOptions = logTypes.map((val: any) => {
		return { label: val, value: val };
	});

	// const newItemsArray = Array(newItems).fill(0);

	const deleteOldInput = (item: any) => {
		dispatch(deleteLogTypeDetail(selectedTaskType, item));
	};
	return (
		<>
			<Form
				form={form}
				name="dynamic_form_nest_item"
				onFinish={onFinish}
				autoComplete="off"
				initialValues={{ typeName: props.logType || logTypes[0] }}
			>
				<Form.Item name="typeName" label="Log Type">
					<Select options={logTypesOptions} onChange={handleChange} />
				</Form.Item>

				{logTypesDetails.map((item: any, key: any) => {
					return (
						<Form.Item
							key={key}
							name={`old_${item}`}
							style={{ marginBottom: "7px" }}
							initialValue={item}
							shouldUpdate={true}
						>
							<Row>
								<Col xs={20} sm={22} md={12} lg={10}>
									<Input defaultValue={item} />
								</Col>
								<Col>
									<MinusCircleOutlined
										className="dynamic-delete-button"
										onClick={() => {
											deleteOldInput(item, key);
										}}
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
				{/* New Items */}
				{newItems.map((a, b) => {
					const item: number = a;
					return (
						<div key={a}>
							<NewTypeItem
								item={item}
								newItemsdeleteHandler={newItemsdeleteHandler}
							/>
						</div>
					);
				})}

				<Row>
					<Col xs={24} sm={24} md={12} lg={10}>
						<Form.Item style={{ width: "100%" }}>
							<Button
								type="dashed"
								onClick={() =>
									setNewItems((prev) => [
										...prev,
										arrMaker(prev),
									])
								}
								style={{ width: "100%" }}
								icon={<PlusOutlined />}
							>
								Add more
							</Button>
						</Form.Item>
					</Col>
				</Row>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Save changes
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export default TypeDetailsSettings;
