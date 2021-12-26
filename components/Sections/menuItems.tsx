import { Menu } from "antd";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { signout } from "../../redux/auth/authActions";
import { NavLink } from "react-router-dom";
import {
	FieldTimeOutlined,
	HomeOutlined,
	LogoutOutlined,
	PicLeftOutlined,
	SettingOutlined,
} from "@ant-design/icons";

function MenuItems() {
	const dispatch = useDispatch();

	return (
		<Menu
			defaultSelectedKeys={["dashboard"]}
			defaultOpenKeys={["dashboard"]}
			mode="inline"
			style={{
				height: "100%",
				borderRight: 0,
				// display: "flex",
				// flexDirection: "column",
			}}
		>
			<Menu.Item key="dashboard" icon={<HomeOutlined />}>
				<Link href="/dashboard">Dashboard</Link>
			</Menu.Item>
			<Menu.Item key="2" icon={<FieldTimeOutlined />}>
				Timesheet
			</Menu.Item>
			<Menu.Item key="3" icon={<PicLeftOutlined />}>
				<Link href="/reports">Reports</Link>
			</Menu.Item>
			<Menu.Item key="settings" icon={<SettingOutlined />}>
				<Link href="/settings">Settings</Link>
			</Menu.Item>
			<Menu.Item
				key="5"
				icon={<LogoutOutlined />}
				onClick={() => dispatch(signout())}
			>
				<span>Signout</span>
			</Menu.Item>
		</Menu>
	);
}

export default MenuItems;
