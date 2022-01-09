import { useRef, useState } from "react";

function Report() {
    const [state, setstate] = useState()
   
	return (
		<div>
            <button onClick={(e:any)=>{setstate(e)}}>Hamza Rehman Saleemi</button>
		</div>
	);
}

export default Report;
