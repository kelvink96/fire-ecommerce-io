import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {Container} from "react-bootstrap";

const Layout = (props) => {
	return (
		<>
			<Header/>
			<div className="content bg-light" style={{paddingTop: "80px", minHeight: "100vh"}}>
				<Container>
					{props.children}
				</Container>
			</div>
			/
			<Footer/>
		</>
	);
};

export default Layout;
