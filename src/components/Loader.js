import React from 'react';
import {Spinner} from "react-bootstrap";
import "./styles.css";

const Loader = () => {
	return (
		<div className="d-flex justify-content-center loader">
			<Spinner animation="border" role="status" style={{width: "4rem", height: "4rem"}}>
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
	);
};

export default Loader;
