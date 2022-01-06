import { MinusCircleOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row } from "antd";
import React from "react";

function NewTypeItem({ item, newItemsdeleteHandler }: any) {
	return (
		<Form.Item
			key={item}
			name={`new_${item}`}
			id={`newItem_${item}`}
			style={{ marginBottom: "7px" }}
			initialValue={item}
			shouldUpdate={true}
		>
			<Row>
				<Col xs={20} sm={22} md={12} lg={10}>
					<Input />
				</Col>
				<Col>
					<MinusCircleOutlined
						className="dynamic-delete-button"
						onClick={() => {
							newItemsdeleteHandler(item);
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
}

export default NewTypeItem;
