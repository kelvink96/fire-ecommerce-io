import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const Header = () => {
	return (
		<div className="header">
			<Navbar bg="primary" variant="dark" expand="lg" fixed="top" className="shadow">
				<Container>
					<Navbar.Brand href="/">firecommerce</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav"/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link href="/user">user</Nav.Link>
							<Nav.Link href="/order">orders</Nav.Link>
							<Nav.Link href="/cart">cart</Nav.Link>
							<Nav.Link href="/">logout</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default Header;
