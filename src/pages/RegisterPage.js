import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Col, Container, Form, Row, Toast, ToastContainer} from "react-bootstrap";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {BsCheck2Circle, BsExclamationCircle} from "react-icons/bs";
import Loader from "../components/Loader";

const RegisterPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [showToasts, setShowToast] = useState({show: false, message: '', title: ''});
	const auth = getAuth()

	const register = () => {
		if (confirmPassword === password) {
			setLoading(true);
			createUserWithEmailAndPassword(auth, email, password).then(resp => {
				setShowToast({show: true, type: 'success', message: 'registration successful', title: 'success'});
				setLoading(false);
				setEmail('');
				setPassword('');
				setConfirmPassword('');
			}).catch(err => {
				console.log(err.message);
				setShowToast({show: true, type: 'error', message: err.message, title: 'error'});
				setLoading(false);
			});
		} else {
			setShowToast({show: true, type: 'error', message: 'password mismatch', title: 'error'});
		}
	}

	return (
		<Container fluid>
			{loading && <Loader/>}
			<Row className="p-0 h-100" style={{minHeight: "100vh"}}>
				<Col className="bg-primary d-flex flex-column align-items-center justify-content-center">
					<lottie-player
						src="https://assets10.lottiefiles.com/packages/lf20_mjlh3hcy.json"
						background="transparent"
						speed="1"
						style={{width: "300px", height: "300px"}}
						loop
						autoplay/>
				</Col>
				<Col className="w-100 d-flex flex-column align-items-center justify-content-center">
					<Container>
						<h2>register</h2>
						<hr/>
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>email</Form.Label>
								<Form.Control type="email" placeholder="name@example.com"
															onChange={(evt) => setEmail(evt.target.value)}/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>password</Form.Label>
								<Form.Control type="password" placeholder="password"
															onChange={(evt) => setPassword(evt.target.value)}/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>confirm password</Form.Label>
								<Form.Control type="password" placeholder="confirm password"
															onChange={(evt) => setConfirmPassword(evt.target.value)}/>
							</Form.Group>
							<div className="mb-3">
								<Button onClick={register}>register</Button>
							</div>
						</Form>
						<hr/>
						<Link to="/login">Already registered? click here to login.</Link>
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

export default RegisterPage;
