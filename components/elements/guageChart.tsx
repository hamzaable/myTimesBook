import dynamic from "next/dynamic";
import React from "react";

const legends=[
    {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 34,
        translateY: 30,
        itemWidth: 80,
        itemHeight: 20,
        itemsSpacing: 1,
        symbolSize: 15,
        itemDirection: 'left-to-right'
    }
]

function GuageChart(props: any) {
	const { ResponsivePie } = {
		ResponsivePie: dynamic<any>(
			() => import("@nivo/pie").then((mod) => mod.ResponsivePie),
			{
				ssr: false,
			}
		),
	};

	return (
		<>
			<ResponsivePie
				data={props.data}
				margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
				innerRadius={0.5}
				// startAngle={90}
				// endAngle={270}
				padAngle={2}
				cornerRadius={3}
				activeOuterRadiusOffset={8}
				colors={{ scheme: "nivo" }}
				borderWidth={1}
				borderColor={{
					from: "color",
					modifiers: [["darker", 0.2]],
				}}
                enableArcLinkLabels={false}
				arcLinkLabelsColor={{ from: "color" }}
				arcLabelsTextColor={{
					from: "color",
					modifiers: [["darker", 2]],
				}}
                
				enableRadialLabels={false}
				slicesLabelsSkipAngle={40}
				
				legends={legends}
			/>
		</>
	);
}

export default GuageChart;
