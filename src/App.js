import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductInfo from "./pages/ProductInfo";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import AdminPage from "./pages/AdminPage";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ProtectedRoutes><HomePage/></ProtectedRoutes>}/>
					<Route path="/productinfo/:productid" element={<ProtectedRoutes><ProductInfo/></ProtectedRoutes>}/>
					<Route path="/cart" element={<ProtectedRoutes><CartPage/></ProtectedRoutes>}/>
					<Route path="/orders" element={<ProtectedRoutes><OrdersPage/></ProtectedRoutes>}/>
					<Route path="/admin" element={<ProtectedRoutes><AdminPage/></ProtectedRoutes>}/>

					<Route path="/login" element={<LoginPage/>}/>
					<Route path="/register" element={<RegisterPage/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App;

export const ProtectedRoutes = ({children}) => {
	if (localStorage.getItem("currentUser")) {
		return children
	} else {
		return <Navigate to="/login"/>
	}
}
