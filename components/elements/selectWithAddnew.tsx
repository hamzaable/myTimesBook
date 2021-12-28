import { PlusOutlined } from "@ant-design/icons";
import { Select, Divider, Input, Spin } from "antd";
import React from "react";
import Loading from "../compounds/loading";

function SelectWithAddnew(props: any) {
	return (
		<>
			<Select
				dropdownRender={(menu) => (
					<div>
						{menu}
						<Divider style={{ margin: "4px 0" }} />
						<div
							style={{
								display: "flex",
								flexWrap: "nowrap",
								padding: 8,
							}}
						>
							<Input
								style={{ flex: "auto" }}
								value={props.newvalue}
								onChange={props.newOnChange}
							/>
							<a
								style={{
									flex: "none",
									padding: "8px",
									display: "block",
									cursor: "pointer",
								}}
								onClick={props.onAddNew}
							>
								<PlusOutlined /> Add
							</a>
						</div>
					</div>
				)}
				id={props.id}
				onChange={props.onChange}
				value={props.value}
				onClick={props.onClick}
				notFoundContent={
					props.fetching ? <Loading size="12" /> : "No Data"
				}
			>
				{props.optionsArray.map((data: any) => {
					return (
						<Select.Option key={data} value={data}>
							{data}
						</Select.Option>
					);
				})}
			</Select>
		</>
	);
}

export default SelectWithAddnew;
