import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Timeline, TimelineOptions } from "vis-timeline/esnext";
import "vis-timeline/styles/vis-timeline-graph2d.css";

function VsTimeLine({
	items,
	start,
	end,
}: {
	items: {
		content: string;
		start: string;
		end: string;
	}[];
	start: any;
	end: any;
}) {
	const timelineRef = useRef<any>();

	

	useEffect(() => {

        const options: TimelineOptions = {
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
            max: start,
            min: end,
            stack: true,
            stackSubgroups: false,
            type: "range",
            width: "100%",
            height: "100px",
            zoomable: true,
            zoomMin: 21600000,
            zoomMax: 21600000,
            showCurrentTime: true,
            showMajorLabels: false,
        };


		const visTimeline = document.createElement("div");
		const cleaner = timelineRef.current;
		cleaner.append(visTimeline);
		const timeline = new Timeline(visTimeline, items, options);
        timeline.redraw()
       

		return () => {
			cleaner.innerHTML = "";
		};
	}, [end, items, start]);

	return (
		<>
			<div
				id={"timeline"}
				style={{ fontSize: "11px" }}
				ref={timelineRef}
			></div>
		</>
	);
}

export default VsTimeLine;
