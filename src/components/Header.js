import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useSelector} from "react-redux";
import {BsCart} from "react-icons/bs";

const Header = () => {

	const {cartItems} = useSelector(state => state.cartReducer);
	const {user} = JSON.parse(localStorage.getItem("currentUser"));

	const logOut = () => {
		localStorage.removeItem("currentUser");
		window.location.reload();
	}

	return (
		<div className="header">
			<Navbar bg="secondary" variant="dark" expand="lg" fixed="top" className="shadow">
				<Container>
					<Navbar.Brand href="/">firecommerce</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav"/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link href="/">{user.email.split('@')[0]}</Nav.Link>
							<Nav.Link href="/">orders</Nav.Link>
							<Nav.Link href="/cart"><BsCart/> cart {cartItems.length}</Nav.Link>
							<Nav.Link onClick={logOut}>logout</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default Header;
