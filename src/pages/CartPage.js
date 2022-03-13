import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Form, Image, Modal, Spinner, Table, Toast, ToastContainer} from "react-bootstrap";
import {BsCheck2Circle, BsExclamationCircle, BsTrash} from "react-icons/bs";
import {addDoc, collection} from "firebase/firestore";
import firebaseDB from "../firebase.config";

const CartPage = () => {
	const {cartItems} = useSelector(state => state.cartReducer);
	const dispatch = useDispatch();
	const [totalAmount, setTotalAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [showToasts, setShowToast] = useState({show: false, message: '', title: ''});
	const [show, setShow] = useState(false);
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [pinCode, setPinCode] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		setLoading(true);
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
		let temp = 0;
		cartItems.forEach(c => temp += Number(c.price.split('KSh')[1].trim().split(",").join("")));
		setTotalAmount(temp);
		setLoading(false);
	}, [cartItems]);

	const deleteFromCart = (product) => {
		dispatch({type: "DELETE_FROM_CART", payload: product})
	}

	const handlePlaceOrder = () => {
		const addressInfo = {
			name, address, pinCode, phoneNumber
		};

		const orderPayload = {
			cartItems,
			addressInfo,
			email: JSON.parse(localStorage.getItem('currentUser')).user.email,
			userId: JSON.parse(localStorage.getItem('currentUser')).user.uid,
		}

		setLoading(true);
		addDoc(collection(firebaseDB, "orders"), orderPayload).then(resp => {
			setLoading(false);
			setShowToast({show: true, type: 'success', message: 'order placement successful', title: 'success'});
			localStorage.removeItem('cartItems');
			handleClose();
			window.location.reload();
		}).catch(err => {
			setLoading(false);
			setShowToast({show: true, type: 'error', message: err.message, title: 'error'});
		})
	}

	return (
		<Layout>
			<Card>
				<Card.Body>
					<Table responsive>
						<thead className="table-secondary">
						<tr>
							<th>image</th>
							<th>item</th>
							<th>price</th>
							<th>actions</th>
						</tr>
						</thead>
						<tbody>
						{cartItems.map(c =>
							<tr key={`cart-${c.id}`}>
								<td>{<Image src={c.imageUrl} height={60} rounded={3}/>}</td>
								<td>{c.name}</td>
								<td>{c.price}</td>
								<td><Button variant="outline-danger" size="sm" onClick={() => deleteFromCart(c)}><BsTrash/>
									<span className="ms-2">delete</span></Button></td>
							</tr>)}
						</tbody>
						<tfoot>
						<tr>
							<td colSpan={12}>
								<h5 className="fw-normal" style={{textAlign: "right"}}>Total amount =
									<b> kshs {totalAmount}</b>
								</h5>
							</td>
						</tr>
						</tfoot>
					</Table>
					<Card.Footer className="bg-transparent border-0 float-end">
						<Button onClick={handleShow}>Place order</Button>
					</Card.Footer>
				</Card.Body>
			</Card>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Submit order</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>name</Form.Label>
							<Form.Control type="text" placeholder="enter name..."
														onChange={(evt) => setName(evt.target.value)}/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>address</Form.Label>
							<Form.Control type="text" placeholder="enter address..."
														onChange={(evt) => setAddress(evt.target.value)}/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>pin code</Form.Label>
							<Form.Control as="textarea" rows={3} placeholder="enter pin code..."
														onChange={(evt) => setPinCode(evt.target.value)}/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>phone number</Form.Label>
							<Form.Control type="tel" placeholder="enter phone number..."
														onChange={(evt) => setPhoneNumber(evt.target.value)}/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					{loading ? <Button variant="primary" disabled>
						<Spinner
							as="span"
							animation="border"
							size="sm"
							role="status"
							aria-hidden="true"
							className="me-2"
						/>
						Loading...
					</Button> : <Button variant="primary" onClick={handlePlaceOrder}>
						Submit order
					</Button>}
				</Modal.Footer>
			</Modal>
			<ToastContainer position="bottom-end" className="pe-3 mb-3">
				{showToasts.show &&
					<Toast className="bg-opacity-10" onClose={() => setShowToast({show: false})} show={showToasts.show}
								 delay={10000} autohide
								 bg={showToasts.type === "success" ? "success" : "danger"}>
						<Toast.Header>
							{showToasts.type === "success" ? <BsCheck2Circle/> : <BsExclamationCircle/>}
							<strong className="ms-2 me-auto">{showToasts.title}</strong>
							<small>just now</small>
						</Toast.Header>
						<Toast.Body>{showToasts.message}</Toast.Body>
					</Toast>
				}
			</ToastContainer>
		</Layout>
	);
};

export default CartPage;
