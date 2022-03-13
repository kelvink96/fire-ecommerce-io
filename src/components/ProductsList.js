import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Image, Modal, Spinner, Stack, Table, Toast, ToastContainer} from "react-bootstrap";
import {BsCheck2Circle, BsExclamationCircle, BsPen, BsTrash} from "react-icons/bs";
import {useSelector} from "react-redux";
import {addDoc, collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
import firebaseDB from "../firebase.config";

const ProductsList = () => {
	const {cartItems} = useSelector(state => state.cartReducer);
	const [loading, setLoading] = useState(false);
	const [showToasts, setShowToast] = useState({show: false, message: '', title: ''});
	const [show, setShow] = useState(false);
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState([{name: "", price: "", imageUrl: "", category: ""}]);
	const [add, setAdd] = useState(false);

	useEffect(() => {
		setLoading(true);
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
		getProductsData();
		setLoading(false);
	}, [cartItems]);

	const getProductsData = async () => {
		try {
			setLoading(true);
			const productsItems = await getDocs(collection(firebaseDB, "products"));
			const productsArray = [];
			productsItems.forEach(p => {
				const obj = {id: p.id, ...p.data()}

				productsArray.push(obj);
				setLoading(false);
			});
			setProducts(productsArray);
		} catch (err) {
			setLoading(false);
			console.log(err);
			setShowToast({show: true, type: 'error', message: err.message, title: 'error'});
		}
	}

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const editHandler = (item) => {
		setAdd(false);
		setProduct(item);
		setShow(true);
	}

	const updateHandler = () => {
		setLoading(true);
		setDoc(doc(firebaseDB, "products", product.id), product).then(res => {
			setLoading(false);
			setShowToast({show: true, type: 'success', message: 'product update successful', title: 'success'});
			getProductsData();
			handleClose();
		}).catch(err => {
			setLoading(false);
			setShowToast({show: true, type: 'error', message: err.message, title: 'error'});
		});
	}

	const addHandler = () => {
		setProduct({name: "", price: "", imageUrl: "", category: ""});
		setAdd(true);
		handleShow();
	}

	const addProduct = () => {
		setLoading(true);
		addDoc(collection(firebaseDB, "products"), product).then(res => {
			setLoading(false);
			setShowToast({show: true, type: 'success', message: 'product added successfully', title: 'success'});
			getProductsData();
			handleClose();
		}).catch(err => {
			setLoading(false);
			setShowToast({show: true, type: 'error', message: err.message, title: 'error'});
		});
	}

	const deleteProduct = (item) => {
		console.log(item);
		// eslint-disable-next-line no-restricted-globals
		const c = confirm('are you sure you want to delete this product?');
		if (c) {
			deleteDoc(doc(firebaseDB, "products", item.id)).then(res => {
				setShowToast({show: true, type: 'success', message: 'product deleted successfully', title: 'success'});
				getProductsData();
			}).catch(err => {
				setShowToast({show: true, type: 'error', message: err.message, title: 'error'});
			});
		}
	}

	return (
		<div>
			<Card>
				<Card.Header className="d-flex justify-content-between align-items-center bg-transparent">
					<h4>products list</h4>
					<Button onClick={addHandler}>add product</Button>
				</Card.Header>
				<Card.Body>
					<Table responsive hover>
						<thead className="table-secondary">
						<tr>
							<th>image</th>
							<th>name</th>
							<th>category</th>
							<th>price</th>
							<th>actions</th>
						</tr>
						</thead>
						<tbody>
						{products.map(p =>
							<tr key={`prod-${p.id}`}>
								<td>{<Image src={p.imageUrl} height={60} rounded={3}/>}</td>
								<td>{p.name}</td>
								<td>{p.category}</td>
								<td>{p.price}</td>
								<td>
									<Stack gap={2} direction="horizontal">
										<Button variant="outline-secondary" size="sm" onClick={() => editHandler(p)}>
											<BsPen/>
											<span className="ms-1">edit</span>
										</Button>
										<div className="vr"/>
										<Button variant="outline-danger" size="sm" onClick={() => deleteProduct(p)}>
											<BsTrash/>
											<span className="ms-1">delete</span>
										</Button>
									</Stack>
								</td>
							</tr>)}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>{add ? "Add product item" : "Edit product item"}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>name</Form.Label>
							<Form.Control type="text" placeholder="enter name..." value={product.name}
														onChange={(evt) => setProduct({...product, name: evt.target.value})}/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>image url</Form.Label>
							<Form.Control type="text" placeholder="enter image url..." value={product.imageUrl}
														onChange={(evt) => setProduct({...product, imageUrl: evt.target.value})}/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>price</Form.Label>
							<Form.Control type="text" placeholder="enter price..." value={product.price}
														onChange={(evt) => setProduct({...product, price: evt.target.value})}/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>category</Form.Label>
							<Form.Control type="tel" placeholder="enter category..." value={product.category}
														onChange={(evt) => setProduct({...product, category: evt.target.value})}/>
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
						Saving...
					</Button> : (add ?
							<Button variant="primary" onClick={addProduct}>Add</Button> :
							<Button variant="primary" onClick={updateHandler}>Save</Button>
					)}
				</Modal.Footer>
			</Modal>
			<ToastContainer position="bottom-end" className="pe-3 mb-3">
				{showToasts.show &&
					<Toast className="" onClose={() => setShowToast({show: false})} show={showToasts.show}
								 delay={10000} autohide
								 bg={showToasts.type === "success" ? "success" : "danger"}>
						<Toast.Header>
							{showToasts.type === "success" ? <BsCheck2Circle/> : <BsExclamationCircle/>}
							<strong className="ms-2 me-auto">{showToasts.title}</strong>
							<small>just now</small>
						</Toast.Header>
						<Toast.Body className="text-white">{showToasts.message}</Toast.Body>
					</Toast>
				}
			</ToastContainer>
		</div>
	);
};

export default ProductsList;
