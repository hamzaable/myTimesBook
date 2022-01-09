import { useRef, useState } from "react";
import Renders from "../../components/elements/renders";

function Test() {
	const [state, setstate] = useState();

	return (
		<div>
			<Renders />
			<button
				onClick={(e: any) => {
					setstate(e);
				}}
			>
				Hamza Rehman Saleemi
			</button>
		</div>
	);
}

export default Test;
