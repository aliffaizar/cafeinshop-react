import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, getProducts, reset } from "../redux/productSlice";
import AddProductForm from "../components/products/addProductForm";
import EditProductForm from "../components/products/editProductForm";
import { FaRegTrashAlt } from "react-icons/fa";
const Menu = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.product);

	useEffect(() => {
		dispatch(getProducts());
		return () => {
			dispatch(reset());
		};
	}, [dispatch]);
	const onDelete = (_id) => {
		dispatch(deleteProduct(_id));
	};
	return (
		<div className='h-full w-full flex space-y-5 flex-col overflow-auto'>
			<div className='flex w-full flex-row items-center justify-between'>
				<h1 className='text-3xl font-bold text-primary'>Menus</h1>
				<AddProductForm />
			</div>
			<div className='flex-1 bg-accent rounded overflow-y-auto '>
				<table className='min-w-max w-full table-auto mb-20'>
					<thead>
						<tr className='bg-primary text-accent capitalize text-sm leading-normal'>
							<th className='py-3 px-6 text-left'>Name</th>
							<th className='py-3 px-6 text-left'>Category</th>
							<th className='py-3 px-6 text-center'>Price</th>
							<th className='py-3 px-6 text-center'>Actions</th>
						</tr>
					</thead>
					<tbody className='text-gray-600 text-sm font-light'>
						{products.map((product) => (
							<tr
								key={product._id}
								className='border-b border-gray-200 hover:bg-gray-100'
							>
								<td className='py-3 px-6 text-left'>
									<div className='flex items-center'>
										<div className='mr-2'>
											<img
												className='h-14 w-14'
												alt={product.name}
												src={product.imageUrl}
											/>
										</div>
										<span className='font-medium'>{product.name}</span>
									</div>
								</td>
								<td className='py-3 px-6 text-left'>
									<div className='flex items-center'>
										<p>{product.category.name}</p>
									</div>
								</td>

								<td className='py-3 px-6 text-center'>
									<p>{product.price}</p>
								</td>
								<td className='py-3 px-6 text-center'>
									<div className='flex item-center justify-center'>
										<div className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
												/>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
												/>
											</svg>
										</div>
										<EditProductForm product={product} />
										<button onClick={() => onDelete(product._id)}>
											<div className='w-5 mr-2 transform hover:text-purple-500 hover:scale-110'>
												<FaRegTrashAlt />
											</div>
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Menu;
