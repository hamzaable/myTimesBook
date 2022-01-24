import React, { useEffect, useState } from "react";
import { Table } from "antd";
function DataTable({ logData, columns }: any) {
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
	});

	const [data, setData] = useState(logData);

	useEffect(() => {
		setData(logData);
	}, [logData]);

	const handleTableChange = (pagination, filters, sorter) => {
		// console.log("handleTableChange ~ filters", filters);
		// console.log('handleTableChange ~ pagination', pagination)
        let dataLoop = [...logData]
		let isFiltered = false;
		for (let prop in filters) {
			const selected = filters[prop];
			let result: any = [];
			if (selected) {
				isFiltered = true;
				for (let i = 0; i < selected.length; i++) {
					const selectedValue = selected[i];
					const newData = dataLoop.filter((item: any) => {
                        return item[prop] == selectedValue;
					});
					if (newData) {
                        result.push(...newData);
                       
					}
				}
				if (result.length === 0) {
                    dataLoop = result
                    setData([]);
				} else {
                    dataLoop = result
					setData(result);
				}
			}
		}
		if (isFiltered == false) {
			setData(logData);
		}
	};

	return (
		<div>
			<Table
				columns={columns}
				rowKey={(record) => record.key}
				dataSource={data}
				// pagination={pagination}
				// loading={loading}
				onChange={handleTableChange}
			/>
		</div>
	);
}

export default DataTable;
