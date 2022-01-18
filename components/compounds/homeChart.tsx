import React from "react";

import dynamic from "next/dynamic";
import { Typography } from "antd";
import VsTimeLine from "../elements/vsTimeLine";
const GuageChart = dynamic<any>(() => import("../elements/guageChart"), {
	ssr: false,
});


const styles:any = {
	root: {
		textAlign: "center",
		position: "relative",
		width: "400px",
		height: "400px",
		// height: "300px",
		// width: "600px",
		margin: "auto",
	},
	overlay: {
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 40,
		left: 0,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		fontSize: 40,
		color: "black",
		// background: "#FFFFFF33",
		textAlign: "center",
		// This is important to preserve the chart interactivity
		pointerEvents: "none",
	},
	totalLabel: {
		// fontSize: 24,
        margin: 0,
	},
};

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
			<div style={styles.root}>
				<GuageChart data={data} />
				<div style={styles.overlay}>
                    <Typography.Title style={styles.totalLabel}  level={4}>Total</Typography.Title>
                    <Typography.Title style={styles.totalLabel}  level={4}>05:00</Typography.Title>
				</div>
			</div>
		</>
	);
};
export default HomeChart;
