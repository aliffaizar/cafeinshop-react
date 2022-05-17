import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/categorySlice";

const MenuFilter = () => {
	const dispatch = useDispatch();
	const { categories } = useSelector((state) => state.category);
	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);
	return (
		<div className='flex px-3 items-center space-x-2 mb-3'>
			<button className='text-center px-4 py-1 rounded-lg text-sm bg-primary text-accent'>
				All
			</button>
			{categories.map((category) => (
				<button
					className='text-center px-4 py-1 rounded-lg text-sm bg-primary text-accent'
					key={category._id}
				>
					{category.name}
				</button>
			))}
		</div>
	);
};

export default MenuFilter;
