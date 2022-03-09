import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {Container} from "react-bootstrap";
import Loader from "./Loader";

const Layout = (props) => {
	const {loading} = props;
	return (
		<div>
			<Header/>
			{loading ? <Loader/> :
				<div className="content bg-light" style={{paddingTop: "80px", minHeight: "100vh"}}>
					<Container>
						{props.children}
					</Container>
				</div>
			}
			<Footer/>
		</div>
	);
};

export default Layout;
