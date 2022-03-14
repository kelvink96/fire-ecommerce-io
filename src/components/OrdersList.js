import React, {useEffect, useState} from 'react';
import {collection, getDocs} from "firebase/firestore";
import firebaseDB from "../firebase.config";
import {Accordion, Image, Table} from "react-bootstrap";
import EmptyDataIcon from "../assets/img/empty-icon.png";

const OrdersList = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		getDocs(collection(firebaseDB, "orders")).then(res => {
			const ordersArray = [];

			res.forEach(doc => {
				const obj = {id: doc.id, ...doc.data()};

				ordersArray.push(obj);
			});
			console.log(ordersArray);
			setOrders(ordersArray);
		}).catch(err => {
			console.log(err);
		});
	}, [])

	return (
		<div>
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
		</div>
	);
};

export default OrdersList;
