import { useEffect } from "react";
import Billing from "../components/home/billing";
import { useDispatch, useSelector } from "react-redux";
import MenuFilter from "../components/home/menuFilter";
import Products from "../components/home/products";
import { getProducts } from "../redux/productSlice";

const Home = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.product);
	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	return (
		<div className='flex-1 space-x-2 h-full flex flex-row '>
			<div className='flex-1 h-full'>
				<MenuFilter />
				<div className='h-full overflow-y-auto'>
					<div className='grid grid-cols-2 mb-20 gap-3'>
						{products.map((product) => (
							<div key={product._id}>
								<Products product={product} />
							</div>
						))}
					</div>
				</div>
			</div>

			<Billing />
		</div>
	);
};

export default Home;
