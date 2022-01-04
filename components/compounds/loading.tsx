import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading: React.FC<{ size?: number }> = (props) => {
	const sizeStyle = {
		fontSize: props.size || 50,
	};

	const antIcon = <LoadingOutlined style={sizeStyle} spin />;
	return (
		<>
			<Spin indicator={antIcon} />
		</>
	);
};

export default Loading;
