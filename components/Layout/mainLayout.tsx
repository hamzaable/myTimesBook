import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import styles from "./mainLayout.module.css";
import MenuItems from "../Sections/menuItems";
import { TrophyOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

function MainLayout(props: any) {
	const [collapsed, setCollapsed] = useState(false);
	const updateDimensions = () => {
		setCollapsed(window.innerWidth <= 800 && true);
	};
	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		setCollapsed(window.innerWidth <= 800 && true);
		return () => {
			window.removeEventListener("resize", updateDimensions);
		};
	}, []);
	return (
		<>
			<Layout>
				<Header className={styles.header}>
					<div className="logo" />
					<div>
						<h1>Times Board</h1>
					</div>
				</Header>
				<Layout style={{ backgroundColor: "white" }}>
					<Sider
						width={240}
						className={styles.siteLayoutHeight}
						collapsed={collapsed}
					>
						<MenuItems />
					</Sider>
					<Layout
						style={{
							padding: "0 24px 24px",
							borderTopLeftRadius: "10px",
							borderBottomLeftRadius: "10px",
						}}
					>
						<Content
							className="site-layout-background"
							style={{
								padding: 24,
								margin: 0,
								minHeight: 280,
							}}
						>
                            <div className={styles.pagewidth}>
							{props.children}
                            </div>
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</>
	);
}

export default MainLayout;
