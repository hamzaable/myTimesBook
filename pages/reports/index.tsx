import { Typography } from "antd";
import React, { useState } from "react";
import MenuItems from "../../components/Sections/menuItems";

function Report() {
	const [inputval, setInputval] = useState("");
	const [tasksArray, setTasksArray] = useState<string[]>([]);

	const addToArray = () => {
		setTasksArray((prev) => [...prev, inputval]);
		setInputval("");
	};
	const deleteHandler = (item: any) => {
		console.log(item);
		setTasksArray((prev) => {
			const test = prev.filter((val) => {
				console.log(val, item);
				if (val != item) {
					return true;
				} else {
					return false;
				}
			});
			console.log("test ~ test", test);
			return [...test];
		});
	};
	return (
		<div>
			<Typography.Title>Reports</Typography.Title>

			<input
				value={inputval}
				onChange={(e) => {
					setInputval(e.target.value);
				}}
			/>
			<button onClick={addToArray}>Add New Item</button>

			{tasksArray.map((val, key) => {
				return (
					<>
						<div key={val} style={{ display: "flex", paddingTop: "15px" }}>
							<input defaultValue={val} />
							<h1 >{val}</h1>
							<button onClick={() => deleteHandler(val)}>
								delete
							</button>
						</div>
					</>
				);
			})}
		</div>
	);
}

export default Report;
