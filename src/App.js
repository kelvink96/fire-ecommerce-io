import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductInfo from "./pages/ProductInfo";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage/>}/>
					<Route path="/login" element={<LoginPage/>}/>
					<Route path="/register" element={<RegisterPage/>}/>
					<Route path="/productinfo/:productid" element={<ProductInfo/>}/>
					<Route path="/cart" element={<CartPage/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App;
