import React from "react";

import dynamic from "next/dynamic";
import { Typography } from "antd";
import VsTimeLine from "../elements/vsTimeLine";
const GuageChart = dynamic<any>(() => import("../elements/guageChart"), {
	ssr: false,
});

const HomeChart = () => {
	const data = [
		{
			id: "elixir",
			label: "elixir",
			value: 553,
			color: "hsl(3, 70%, 50%)",
		},
		{
			id: "rust",
			label: "rust",
			value: 66,
			color: "hsl(54, 70%, 50%)",
		},
		{
			id: "haskell",
			label: "haskell",
			value: 484,
			color: "hsl(346, 70%, 50%)",
		},
		{
			id: "java",
			label: "java",
			value: 515,
			color: "hsl(191, 70%, 50%)",
		},
		{
			id: "c",
			label: "c",
			value: 70,
			color: "hsl(268, 70%, 50%)",
		},
	];
	return (
		<>
			
			<div style={{ height: "300px", width: "600px", margin: "auto" }}>
				<GuageChart data={data} />
			</div>
		</>
	);
};
export default HomeChart;
