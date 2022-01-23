import React, { useEffect, useState } from "react";
import {
	Table,
	Input,
	InputNumber,
	Popconfirm,
	Form,
	Typography,
	Button,
	Divider,
	Row,
} from "antd";
function DataTable() {
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
	});
	const allData = [
		{
			key: 0,
			name: { first: "Jack", last: "saleemi" },
			gender: "male",
			email: "hamzarsaleemi@gmail.com",
		},
		{
			key: 1,
			name: { first: "hamid", last: "raza" },
			gender: "female",
			email: "tatti",
		},
	];
	const [data, setData] = useState(allData);
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			// sorter: true,
			render: (name) => `${name.first} ${name.last}`,
			width: "20%",
			filters: [],
		},
		{
			title: "Gender",
			dataIndex: "gender",
			filters: [
				{ text: "Male", value: "male" },
				{ text: "Female", value: "female" },
			],
			width: "20%",
			// sorter: true,
		},
		{
			title: "Email",
			dataIndex: "email",
			filters: [
				{ text: "tatti", value: "tatti" },
				{ text: "potti", value: "potti" },
			],
		},
	];

	const handleTableChange = (pagination, filters, sorter) => {
		let isFiltered = false
        for (let prop in filters) {
			const selected = filters[prop];
			let result: any = [];
			if (selected) {
                isFiltered = true
				for (let i = 0; i < selected.length; i++) {
					const selectedValue = selected[i];
					const newData = allData.find((item: any) => {
						return item[prop] === selectedValue;
					});
					if (newData) {
						result.push(newData);
					}
				}
				if (result.length === 0) {
					setData([]);
				} else {
					setData(result);
				}
			} 
		}
        if(isFiltered == false){
            setData(allData);
        }
	};

	return (
		<div>
			<Table
				columns={columns}
				rowKey={(record) => record.key}
				dataSource={data}
				pagination={pagination}
				// loading={loading}
				onChange={handleTableChange}
			/>
		</div>
	);
}

export default DataTable;
