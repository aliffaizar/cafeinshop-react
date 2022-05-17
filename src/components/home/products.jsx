import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";

const Products = ({ product }) => {
	const dispatch = useDispatch();
	const onClick = (product) => {
		dispatch(addItem(product));
	};
	return (
		<div className='flex flex-row shadow-lg bg-accent rounded-lg p-4'>
			<img
				alt={product.name}
				className='h-44 w-32 object-cover object-center rounded border border-gray-200'
				src={product.imageUrl}
			/>
			<div className='px-3'>
				<h1 className='text-primary text-lg font-medium mb-1'>
					{product.name}
				</h1>

				<p className='line-clamp-3 text-sm'>{product.description}</p>
				<div className='flex mt-2 items-center font-medium text-primary text-sm pb-2 border-b-2 border-primary/40 mb-3'>
					<div className='flex'>
						<span className='mr-2'>Category:</span>
						<p className=''>{product.category.name}</p>
					</div>
				</div>
				<div className='flex'>
					<span className='font-medium text-base text-primary'>{`RP. ${product.price}`}</span>
					<button
						onClick={() => onClick(product)}
						className='flex ml-auto text-accent text-sm bg-primary border-0 py-1 px-4 focus:outline-none hover:bg-primary/90 rounded'
					>
						Add Item
					</button>
				</div>
			</div>
		</div>
	);
};

export default Products;
