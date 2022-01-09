import React, { useRef } from "react";

function Renders() {
	let renders: any = useRef(0);
	console.log(
		"number of time rendered",
		(renders.current = renders.current+0.5 )
	);
	return <>
    {renders.current}
    </>;
}

export default Renders;
