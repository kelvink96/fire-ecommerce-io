import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {collection, getDocs} from "firebase/firestore";
import firebaseDB from "../firebase.config";
import Layout from "../components/Layout";
import {useDispatch, useSelector} from "react-redux";

const HomePage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchKey, setSearchKey] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('');
	const {cartItems} = useSelector(state => state.cartReducer);
	const dispatch = useDispatch();

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
		} catch (e) {
			setLoading(false);
			console.log(e);
		}
	}

	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
		getProductsData();
	}, [cartItems]);

	const addToCart = (product) => {
		dispatch({type: "ADD_TO_CART", payload: product})
	}

	return (
		<Layout loading={loading}>
			<Card className="mb-3">
				<Card.Body>
					<div className="d-flex w-50 gap-3">
						<Form.Control type="text" placeholder="search products..." value={searchKey}
													onChange={e => setSearchKey(e.target.value)}/>
						<Form.Select aria-label="categories filter" value={categoryFilter}
												 onChange={e => setCategoryFilter(e.target.value)}>
							<option value="">all categories</option>
							<option value="home & office">home & office</option>
							<option value="health & beauty">health & beauty</option>
							<option value="supermarket">supermarket</option>
							<option value="phones & tablets">phones & tablets</option>
							<option value="electronics">electronics</option>
							<option value="fashion">fashion</option>
						</Form.Select>
					</div>
				</Card.Body>
			</Card>
			<Row xs={1} md={2} lg={3} xl={4} className="g-3">
				{
					products
						.filter(p => p.name.toLowerCase().includes(searchKey))
						.filter(p => p.category.toLowerCase().includes(categoryFilter))
						.map((p, idx) => (<Col key={`prod-${p.id}`}>
							<Card className="h-100">
								<Link to={`/productinfo/${p.id}`} className="text-decoration-none text-dark">
									<Card.Body>
										<Card.Img variant="top" src={p.imageUrl} height={150} style={{objectFit: "contain"}}/>
										<Card.Title className="mb-5 mt-3">{p.name}</Card.Title>
									</Card.Body>
								</Link>
								<Card.Footer className="bg-transparent border-0">
									<div className="position-absolute bottom-0 mb-3 d-flex gap-2">
										<Button onClick={() => addToCart(p)}>add to cart</Button>
									</div>
								</Card.Footer>
							</Card>
						</Col>))}
			</Row>
		</Layout>);
};

export default HomePage;
