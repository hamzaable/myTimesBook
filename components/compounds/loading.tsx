import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Loading(props: any) {
	const sizeStyle = {
		fontSize: props.size || 50,
	};

	const antIcon = <LoadingOutlined style={sizeStyle} spin />;
	return (
		<>
			<Spin indicator={antIcon} />
		</>
	);
}

export default Loading;
