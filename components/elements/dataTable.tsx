import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { minutesToDuration, minutesToDurationDetail } from "../../Functions/Converter";
function DataTable({ logData, columns }: any) {
	const [data, setData] = useState(logData);

	useEffect(() => {
		setData(logData);
	}, [logData]);

	const handleTableChange = (pagination, filters, sorter) => {
		// console.log("handleTableChange ~ filters", filters);
		// console.log('handleTableChange ~ pagination', pagination)
		let dataLoop = [...logData];
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
					dataLoop = result;
					setData([]);
				} else {
					dataLoop = result;
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
				pagination={{
					pageSize: 7,
				}}
				// loading={loading}
				onChange={handleTableChange}
				summary={(pageData) => {
					let totalMinutes = 0;
					pageData.forEach(({ Minutes }) => {
						totalMinutes += Minutes;
					});

					return (
						<>
							<Table.Summary.Row style={{backgroundColor:'#fafafa',fontWeight:"600"}}>
                            <Table.Summary.Cell
									index={1} colSpan={5}
								></Table.Summary.Cell>
								<Table.Summary.Cell index={1}>
									Total
								</Table.Summary.Cell>
								
								<Table.Summary.Cell index={5} colSpan={2}>
									{minutesToDurationDetail(totalMinutes)}
								</Table.Summary.Cell>
							</Table.Summary.Row>
						</>
					);
				}}
			/>
		</div>
	);
}

export default DataTable;
