import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import {Accordion,Image, Table} from "react-bootstrap";
import {collection, getDocs} from "firebase/firestore";
import firebaseDB from "../firebase.config";
import EmptyDataIcon from "../assets/img/empty-icon.png";

const OrdersPage = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const userId = JSON.parse(localStorage.getItem('currentUser')).user.uid;

	useEffect(() => {
		setLoading(true);
		getDocs(collection(firebaseDB, "orders")).then(res => {
			const ordersArray = [];

			res.forEach(doc => {
				if (doc.data().userId === userId) {
					const obj = {id: doc.id, ...doc.data()};

					ordersArray.push(obj);
					setLoading(false);
				}
			});
			setOrders(ordersArray);
			setLoading(false);
		}).catch(err => {
			console.log(err);
			setLoading(false);
		});
	}, [userId])

	return (
		<Layout loading={loading}>
			<h3>orders</h3>
			<Accordion>
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
