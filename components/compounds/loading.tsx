import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading: React.FC<{ size?: number }> = (props) => {
	const sizeStyle = {
		fontSize: props.size || 50,
	};

	const antIcon = <LoadingOutlined style={sizeStyle} spin />;
	return (
		<>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Spin indicator={antIcon} />
			</div>
		</>
	);
};

export default Loading;
