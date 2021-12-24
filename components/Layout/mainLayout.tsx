import React from "react";
import { Layout } from "antd";
import styles from "./mainLayout.module.css";
import MenuItems from "../Sections/MenuItems";

const { Header, Content, Sider } = Layout;

function MainLayout(props: any) {
	return (
		<>
			<Layout>
				<Header className={styles.header}>
					<div className="logo" />
					<div>
						<h1>My times Book</h1>
					</div>
				</Header>
				<Layout style={{ backgroundColor: "white" }}>
					<Sider
						width={240}
						collapsedWidth={200}
						className={styles.siteLayoutHeight}
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
							{props.children}
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</>
	);
}

export default MainLayout;
