import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout";
import Category from "./pages/category";
import Error404 from "./pages/error404";
import Home from "./pages/home";
import Login from "./pages/login";
import Menu from "./pages/menu";
import Register from "./pages/register";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/menus' element={<Menu />} />
					<Route path='/categories' element={<Category />} />
				</Route>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='*' element={<Error404 />} />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	);
}

export default App;
