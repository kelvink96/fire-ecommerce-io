import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Image, Table} from "react-bootstrap";
import {BsTrash} from "react-icons/bs";

const CartPage = () => {
	const {cartItems} = useSelector(state => state.cartReducer);
	const dispatch = useDispatch();
	const [totalAmount, setTotalAmount] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
		let temp = 0;

		cartItems.forEach(c => temp += Number(c.price.split('KSh')[1]));
		setTotalAmount(temp);
		console.log(totalAmount);
		setLoading(false);
	}, [cartItems]);

	const deleteFromCart = (product) => {
		dispatch({type: "DELETE_FROM_CART", payload: product})
	}

	return (
		<Layout loading={loading}>
			<Card>
				<Card.Body>
					<Table responsive>
						<thead>
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
								<td><Button variant="outline-danger" onClick={() => deleteFromCart(c)}><BsTrash/>
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
					<Card.Footer className="bg-transparent border-0 float-end"><Button>place order</Button></Card.Footer>
				</Card.Body>
			</Card>
		</Layout>
	);
};

export default CartPage;
