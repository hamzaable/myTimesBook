import React from "react";

import dynamic from "next/dynamic";
import { Typography } from "antd";

const { ResponsiveBar } = {
	ResponsiveBar: dynamic<any>(
		() => import("@nivo/bar").then((mod) => mod.ResponsiveBar),
		{
            ssr: false,
		}
	),
};

const HomeChart = () => {
	const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
      ];
	return (
		<>
        <Typography.Title>Graph</Typography.Title>
        <div style={{ height: "400px" }}>
				<ResponsiveBar
					data={data}
					keys={["earnings"]}
					indexBy="quarter"
				/>
			</div>
		</>
	);
};
export default HomeChart;
