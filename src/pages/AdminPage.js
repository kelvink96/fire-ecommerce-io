import React from 'react';
import Layout from "../components/Layout";
import {Tab, Tabs} from "react-bootstrap";
import ProductsList from "../components/ProductsList";
import OrdersList from "../components/OrdersList";

const AdminPage = () => {
	return (
		<Layout>
			<Tabs defaultActiveKey="products" id="uncontrolled-tab-example" className="mb-3">
				<Tab eventKey="products" title="products">
					<ProductsList/>
				</Tab>
				<Tab eventKey="orders" title="orders">
					<OrdersList/>
				</Tab>
			</Tabs>

		</Layout>
	);
};

export default AdminPage;
