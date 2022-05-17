import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetLogin, logout } from "../redux/loginSlice";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.login);
	const handleLogout = () => {
		dispatch(logout());
		dispatch(resetLogin());
	};
	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [navigate, user]);
	return (
		<header className='mx-auto w-full px-3 py-2 bg-accent shadow'>
			<div className='flex flex-row justify-between items-center'>
				<Link to='/'>
					<h1 className='text-3xl text-primary font-mono font-bold'>
						Cafein Shop
					</h1>
				</Link>
				<nav className='inline-flex items-center space-x-3'>
					{user && (
						<p className='text-primary'>
							welcome
							<span className='text-primary font-mono ml-2 capitalize font-semibold'>
								{user.name}
							</span>
						</p>
					)}
					<button
						className='rounded-lg bg-secondary text-accent text-sm hover:bg-secondary/90 px-3 py-1'
						onClick={handleLogout}
					>
						Logout
					</button>
				</nav>
			</div>
		</header>
	);
};

export default Header;
