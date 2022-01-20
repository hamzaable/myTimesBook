import { useRef, useState } from "react";
import HomeChart from "../../components/compounds/homeChart";

function Report() {
	const [state, setstate] = useState();

	return (
		<div>
			<button
				onClick={(e: any) => {
					setstate(e);
				}}
			>
				Hamza Rehman Saleemi
			</button>
			<HomeChart />
		</div>
	);
}

export default Report;
