import moment from "moment";
import React, { useEffect, useState } from "react";
import { LOG } from "../../types/types";
import VsTimeLine from "../elements/vsTimeLine";
import { useSelector } from "react-redux";
import { firestampToMoment } from "../../Functions/Converter";

interface ITEM {
    id:string;
	content: string;
	start: any;
	end: any;
}

function HomeVisTimeline({ defaultDate }: { defaultDate: moment.Moment }) {
	const logData: LOG[] = useSelector(
		(state: any) => state.timeLog.dashboardTimeLogData
	);
	const [items, setItems] = useState<ITEM[]>([]);

	useEffect(() => {
		if (logData.length > 0) {
			setItems(
				logData.map((item: LOG) => {
					return {
                        id:item.id,
						content: item.typeDetail,
						start: firestampToMoment(item.timeStartCalc).format(),
						end: firestampToMoment(item.timeFinishCalc).format(),
					};
				})
			);
		}else{
            setItems([])
        }
	}, [logData]);

	useEffect(() => {
		console.log(items);
	}, [items]);

	return (
		<>
			<VsTimeLine
				items={items}
				start={defaultDate.endOf("day").format()}
				end={defaultDate.startOf("day").format()}
			/>
		</>
	);
}

export default HomeVisTimeline;
