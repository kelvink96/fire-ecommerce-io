import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {doc, getDoc} from "firebase/firestore";
import firebaseDB from "../firebase.config";
import Layout from "../components/Layout";
import {useDispatch, useSelector} from "react-redux";

const ProductInfo = () => {
	const [product, setProduct] = useState([]);
	const [loading, setLoading] = useState(false);
	const params = useParams();
	const dispatch = useDispatch();
	const {cartItems} = useSelector(state => state.cartReducer);

	useEffect(() => {
		getProductData();
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);


	const getProductData = () => {
		const {productid} = params
		setLoading(true);
		getDoc(doc(firebaseDB, "products", productid))
			.then(res => {
				setProduct(res.data());
				setLoading(false);
			}).catch(err => {
			setLoading(false);
			console.log(err);
		});
	}

	const addToCart = (product) => {
		dispatch({type: "ADD_TO_CART", payload: product})
	}

	return (
		<Layout loading={loading}>
			{product &&
				<div>
					<h3 className="">product information</h3>
					<br/>
					<Card border="light" className="shadow">
						<Card.Header className="border-0 bg-transparent">
						</Card.Header>
						<Card.Body>
							<Row className="align-items-center">
								<Col sm={5}>
									<Image src={product.imageUrl} fluid/>
								</Col>
								<Col sm={7}>
									<Card.Title>{product.category}</Card.Title>
									<Card.Title>{product.name}</Card.Title>
									<Card.Text>{product.description}</Card.Text>
									<Card.Text><b>{product.price}</b></Card.Text>
									<hr/>
									<Button onClick={() => addToCart(product)}>Add to cart</Button>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</div>
			}
		</Layout>
	);
};

export default ProductInfo;
