import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {Accordion, Button, Card, Form, Image, Modal, Spinner, Table, Toast, ToastContainer} from "react-bootstrap";
import {BsCheck2Circle, BsExclamationCircle, BsTrash} from "react-icons/bs";
import {collection, getDocs} from "firebase/firestore";
import firebaseDB from "../firebase.config";
import EmptyDataIcon from "../assets/img/empty-icon.png";

const OrdersPage = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getDocs(collection(firebaseDB, "orders")).then(res => {
			const ordersArray = [];

			res.forEach(doc => {
				const obj = {id: doc.id, ...doc.data()};

				ordersArray.push(obj);
				setLoading(false);
			});
			console.log(ordersArray);
			setOrders(ordersArray);
			setLoading(false);
		}).catch(err => {
			console.log(err);
			setLoading(false);
		});
	}, [])

	return (
		<Layout loading={loading}>
			<h3>orders</h3>
			<Accordion flush>
				{orders.map((o, idx) => {
					return (
						<Accordion.Item eventKey={`${idx}`}>
							<Accordion.Header>Order id - {o.id}: Items - {o.cartItems.length}</Accordion.Header>
							<Accordion.Body>
								<Table responsive>
									<thead>
									<tr>
										<th>image</th>
										<th>item</th>
										<th>price</th>
									</tr>
									</thead>
									<tbody>
									{o.cartItems.map(c => {
										return (
											<tr key={`cart-${c.id}`}>
												<td>{<Image src={c.imageUrl} height={60} rounded={3}/>}</td>
												<td>{c.name}</td>
												<td>{c.price}</td>
											</tr>
										)
									})}
									</tbody>
								</Table>
							</Accordion.Body>
						</Accordion.Item>
					)
				})}
			</Accordion>
			{orders.length === 0 &&
				<div className="d-flex flex-column justify-content-center align-items-center" style={{height: "50vh"}}>
					<Image src={EmptyDataIcon} fluid height={100} width={100}/>
					<h6>no orders data</h6>
				</div>
			}
		</Layout>
	);
};

export default OrdersPage;
