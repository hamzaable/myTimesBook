import { Form, Input, Checkbox, Button, Typography } from "antd";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { signin } from "../../redux/auth/authActions";
import { useDispatch, useSelector } from "react-redux";

import Router from "next/router";

interface Login {
	email: string;
	password: string;
	requires: boolean;
}

const Login: NextPage = () => {
	const dispatch = useDispatch();
	const isLogin = useSelector((state: any) => state.auth.isLogin);
	useEffect(() => {
		if (isLogin === true) {
			Router.push("dashboard");
		} else {
			// alert("something wrong happened");
		}
	}, [isLogin]);

	const loginSubmit = async (values: Login) => {
		dispatch(signin(values));
	};

	return (
		<>
			<div className="page">
				<Typography.Title>Login</Typography.Title>
				<div className="form-container">
					<Form
						name="Login"
						labelCol={{
							span: 8,
						}}
						wrapperCol={{
							span: 10,
						}}
						initialValues={{
							remember: true,
						}}
						onFinish={loginSubmit}
						//   onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: "Please input your email!",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: "Please input your password!",
								},
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item
							name="remember"
							valuePropName="checked"
							wrapperCol={{
								offset: 8,
								span: 16,
							}}
						>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>

						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 16,
							}}
						>
							<Button type="primary" htmlType="submit">
								Login
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
};

export default Login;
