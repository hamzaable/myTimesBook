import Loader from "react-loader-spinner";

function Loading() {
	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%,-50%)",
			}}
            id="customLoader"
		>
			<Loader
				type="Grid"
				color="#1890ff"
				secondaryColor="Grey"
				height={40}
				width={40}
			/>
		</div>
	);
}

export default Loading;
