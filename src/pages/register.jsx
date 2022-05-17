import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../redux/registerSlice";

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password1: "",
	});
	const { name, email, password, password1 } = formData;
	const { user, isError, isLoading, isSucces, message } = useSelector(
		(state) => state.register
	);

	useEffect(() => {
		if (isError) toast.error(message);
		if (isSucces || user) {
			navigate("/login");
			toast.success("Account was created");
		}
		return () => {
			dispatch(reset());
		};
	}, [user, isError, isSucces, message, navigate, dispatch]);
	const onChange = (e) =>
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password1) {
			toast.error("Password do not match");
		} else {
			const userData = {
				name,
				email,
				password,
			};
			dispatch(register(userData));
		}
	};

	return (
		<div className='bg-base/10 flex h-screen bg-ligth justify-center items-center'>
			<div className='flex bg-accent flex-col space-y-3 p-5 shadow w-96 rounded-lg'>
				<h1 className='text-3xl text-center text-primary font-semibold'>
					Register
				</h1>
				<form className='space-y-3 py-2' onSubmit={onSubmit}>
					<input
						name='name'
						value={name}
						onChange={onChange}
						type='text'
						placeholder='Name'
						className='w-full py-2 px-3 rounded'
					/>
					<input
						name='email'
						value={email}
						onChange={onChange}
						type='email'
						placeholder='email'
						className='w-full py-2 px-3 rounded'
					/>
					<input
						name='password'
						value={password}
						onChange={onChange}
						type='password'
						placeholder='password'
						className='w-full py-2 px-3 rounded'
					/>
					<input
						name='password1'
						value={password1}
						onChange={onChange}
						type='password'
						placeholder='confirm password'
						className='w-full py-2 px-3 rounded'
					/>
					<div className='flex justify-end'>
						{isLoading ? (
							<button className='bg-secondary rounded px-5 py-1 my-1 right-0 text-accent'>
								Submitting...
							</button>
						) : (
							<button className='bg-primary rounded px-5 py-1 my-1 right-0 text-accent'>
								Register
							</button>
						)}
					</div>
					<p className='text-primary text-center'>
						Have an account?{" "}
						<Link to='/login' className='text-secondary hover:font-semibold'>
							Login here
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Register;
