import type { NextPage } from "next";
import Head from "next/head";
import "antd/dist/antd.css";
import styles from "../styles/Home.module.css";
import { Button, DatePicker, Space } from "antd";
import Link from "next/link";

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>my Times Book</title>
				<meta
					name="description"
					content="a better app to log time for different activities"
				/>
				<link rel="icon" href="#" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to Next gen time logger, currently named as
					myTimesLogger!
				</h1>
				<div style={{ padding: 100 }}>
					<Space direction="horizontal">
						<Link href="/login" passHref>
							<Button type="primary">Login</Button>
						</Link>
						<Button type="primary">Register</Button>
					</Space>
				</div>
			</main>
		</div>
	);
};

export default Home;
