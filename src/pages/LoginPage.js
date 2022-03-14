import React, {useState} from 'react';
import {Button, Col, Container, Form, Row, Toast, ToastContainer} from "react-bootstrap";
import {Link} from "react-router-dom";
import {signInWithEmailAndPassword, getAuth} from "firebase/auth";
import {BsCheck2Circle, BsExclamationCircle} from "react-icons/bs";
import Loader from "../components/Loader";

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [showToasts, setShowToast] = useState({show: false, message: '', title: ''});
	const auth = getAuth();

	const login = () => {
		setLoading(true);
		signInWithEmailAndPassword(auth, email, password).then(resp => {
			localStorage.setItem("currentUser", JSON.stringify(resp));
			setShowToast({show: true, type: 'success', message: 'login successful', title: 'success'});
			setLoading(false);
			window.location.href = "/";
		}).catch(err => {
			console.log(err.message);
			setShowToast({show: true, type: 'error', message: err.message, title: 'error'});
			setLoading(false);
		});
	}


	return (
		<Container fluid>
			{loading && <Loader/>}
			<Row className="p-0 h-100" style={{minHeight: "100vh"}}>
				<Col className="bg-primary d-flex flex-column align-items-center justify-content-center">
					<lottie-player
						src="https://assets10.lottiefiles.com/packages/lf20_q5pk6p1k.json"
						background="transparent"
						speed="1"
						style={{width: "300px", height: "300px"}}
						loop
						autoplay/>
				</Col>
				<Col className="w-100 d-flex flex-column align-items-center justify-content-center">
					<Container>
						<h2>login</h2>
						<hr/>
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>email</Form.Label>
								<Form.Control type="email" placeholder="name@example.com"
															onChange={(evt) => setEmail(evt.target.value)}/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>password</Form.Label>
								<Form.Control type="password" placeholder="password" onChange={(evt) => setPassword(evt.target.value)}/>
							</Form.Group>
							<div className="mb-3">
								<Button onClick={login}>login</Button>
							</div>
						</Form>
						<hr/>
						<Link to="/register">Not registered? click here to create an account.</Link>
					</Container>
				</Col>
			</Row>
			<ToastContainer position="bottom-end" className="pe-3 mb-3">
				{showToasts.show &&
					<Toast className="bg-opacity-10" onClose={() => setShowToast({show: false})} show={showToasts.show}
								 delay={10000} autohide
								 bg={showToasts.type === "success" ? "success" : "danger"}>
						<Toast.Header>
							{showToasts.type === "success" ? <BsCheck2Circle/> : <BsExclamationCircle/>}
							<strong className="ms-2 me-auto">{showToasts.title}</strong>
							<small>just now</small>
						</Toast.Header>
						<Toast.Body>{showToasts.message}</Toast.Body>
					</Toast>
				}
			</ToastContainer>
		</Container>);
};

export default LoginPage;
