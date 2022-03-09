import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {collection, getDocs} from "firebase/firestore";
import firebaseDB from "../firebase.config";
import Layout from "../components/Layout";

const HomePage = () => {
	const [products, setProducts] = useState([]);

	/*const addProductsData = (evt) => {
		evt.preventDefault();
		alert('');
		cartProducts.map(async (product) => {
			try {
				await addDoc(collection(firebaseDB, "products"), product);
			} catch (e) {
				console.log(e.message);
			}
		});
	}*/

	useEffect(() => {
		getProductsData();
	}, [])

	const getProductsData = async () => {
		try {
			const productsItems = await getDocs(collection(firebaseDB, "products"));
			const productsArray = [];
			productsItems.forEach(p => {
				const obj = {id: p.id, ...p.data()}

				productsArray.push(obj);
			});
			setProducts(productsArray);
		} catch (e) {

		}
	}

	return (
		<Layout>
			{/*<Button size="lg" onClick={addProductsData}>add</Button>*/}
			<Row xs={1} md={2} lg={3} xl={4} className="g-3">
				{products.map((p, idx) => (
					<Col key={p.id}>
						<Card className="h-100">
							<Link to={`/productinfo/${p.id}`} className="text-decoration-none text-dark">
								<Card.Img variant="top" src={p.imageUrl} height={200} style={{objectFit: "contain"}}/>
								<Card.Body>
									<Card.Title>{p.name}</Card.Title>
									<Card.Text className="mb-5">
										This is a longer card with supporting text below as a natural
										lead-in to additional content. This content is a little bit longer.
									</Card.Text>
								</Card.Body>
								<Card.Footer className="bg-transparent border-0">
									<div className="position-absolute bottom-0 mb-3 d-flex gap-2">
										<Button>add to cart</Button>
									</div>
								</Card.Footer>
							</Link>
						</Card>
					</Col>
				))}
			</Row>
		</Layout>
	);
};

export default HomePage;
