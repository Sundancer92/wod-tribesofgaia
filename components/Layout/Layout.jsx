import Head from "next/head";
import Navbar from "../Navbar/Navbar";


export default function Layout({ children }) {
	return (
		<>
			<Head>
				<title>Camino del Sol</title>
			</Head>
			<Navbar />
			<div>{children}</div>
		</>
	);
}
