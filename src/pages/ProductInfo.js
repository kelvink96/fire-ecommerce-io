import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import firebaseDB from "../firebase.config";
import Layout from "../components/Layout";
import {Button, Card, Col, Image, Row} from "react-bootstrap";

const ProductInfo = () => {
	const [product, setProduct] = useState([]);
	const [loading, setLoading] = useState(false);
	const params = useParams();

	useEffect(() => {
		getProductsData();
	}, [])

	const getProductsData = async () => {
		try {
			setLoading(true);
			const productTemp = await getDoc(doc(firebaseDB, "products", params.productid));
			setProduct(productTemp.data());
			setLoading(false);
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	return (
		<Layout loading={loading}>
			{product && (
				<div>
					<h3 className="">product infomation</h3>
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
									<Card.Text>{product.price}</Card.Text>
									<Button size="lg">add to cart</Button>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</div>)}
		</Layout>
	);
};

export default ProductInfo;
