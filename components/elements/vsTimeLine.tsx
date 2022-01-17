import moment from "moment";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";
import { Timeline, TimelineOptions } from "vis-timeline/esnext";
import "vis-timeline/styles/vis-timeline-graph2d.css";

// const Timeline = dynamic(
// 	() => import("vis-timeline/peer").then((mod: any) => mod.Timeline),
// 	{ ssr: false }
// );

function VsTimeLine() {
	const timelineRef = useRef<any>();
	const data = [
		{ quarter: 1, earnings: 13000 },
		{ quarter: 2, earnings: 16500 },
		{ quarter: 3, earnings: 14250 },
		{ quarter: 4, earnings: 19000 },
	];

	const options: any = {
		editable: {
			add: true,
			remove: false,
			updateGroup: false,
			updateTime: true,
		},

		margin: {
			axis: 2,
			item: {
				vertical: 5,
				horizontal: 0,
			},
		},
		format: {
			minorLabels: {
				minute: "hh:mm",
				hour: "ha",
			},
		},
		orientation: {
			axis: "bottom",
			item: "bottom",
		},

		max: moment().endOf("day").format(),
		min: moment().startOf("day").format(),

		stack: true,
		stackSubgroups: false,
		type: "range",
		width: "100%",
		height: "100px",
		zoomable: true,
		zoomMin: 10800000,
		zoomMax: 21600000,
		showCurrentTime: true,
		showMajorLabels: false,
	};
	const items = [
		{
			content: "Step1",
			start: moment().add(1, "hours").format(),
			end: moment().add(7, "hours").format(),
		},
		{
			content: "Step2",
			start: moment().subtract(4, "hours").format(),
			end: moment().format(),
		},
	];

	useEffect(() => {
		const visTimeline = document.createElement("div");
		timelineRef.current.append(visTimeline);
		new Timeline(visTimeline, items, options);
		return () => {
			if (timelineRef.current) {
				timelineRef.current.innerHTML = "";
			}
		};
	}, []);
	return (
		<div>
			<div id={"timeline"} ref={timelineRef}></div>
		</div>
	);
}

export default VsTimeLine;
