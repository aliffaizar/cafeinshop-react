import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, resetLogin } from "../redux/loginSlice";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isError, isSuccess, message } = useSelector(
		(state) => state.login
	);
	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess || user) {
			navigate("/");
		}
		dispatch(resetLogin());
	}, [user, isError, isSuccess, message, navigate, dispatch]);
	const onChange = (e) =>
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	const submitHandle = (e) => {
		e.preventDefault();
		const userData = { email, password };
		dispatch(login(userData));
	};
	return (
		<div className='bg-base/10 flex h-screen bg-ligth justify-center items-center'>
			<div className='flex bg-accent flex-col space-y-3 p-5 shadow w-96 rounded-lg'>
				<h1 className='text-3xl text-center text-primary font-semibold'>
					Login
				</h1>
				<form className='space-y-3 py-2' onSubmit={submitHandle}>
					<input
						required
						name='email'
						type='email'
						value={email}
						onChange={onChange}
						placeholder='email'
						className='w-full py-2 px-3 rounded'
					/>
					<input
						required
						name='password'
						type='password'
						value={password}
						onChange={onChange}
						placeholder='password'
						className='w-full py-2 px-3 rounded'
					/>
					<div className='flex justify-end'>
						<button className='bg-primary rounded px-5 py-1 my-1 right-0 text-accent'>
							Login
						</button>
					</div>
					<p className='text-primary text-center'>
						Have not an account?{" "}
						<Link className='text-secondary hover:font-semibold' to='/register'>
							Register here
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
