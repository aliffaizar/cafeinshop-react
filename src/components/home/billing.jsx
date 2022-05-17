import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
	addQuantity,
	clearItems,
	createCart,
	getTotal,
	reduceQuantity,
	removeItem,
} from "../../redux/cartSlice";

const Billing = () => {
	const { items, totalPrice, totalQuantity } = useSelector(
		(state) => state.cart
	);

	const onSave = () => {
		if (items.length > 0) {
			const data = items.map((item) => {
				const product = item._id;
				const quantity = item.quantity;
				const subTotal = item.price * item.quantity;
				return { product, quantity, subTotal };
			});
			const finalData = {
				items: data,
				totalPrice: totalPrice,
				totalQuantity: totalQuantity,
			};
			dispatch(createCart(finalData));
			dispatch(clearItems());
		}
	};
	const dispatch = useDispatch();
	const onRemoveItem = (item) => {
		dispatch(removeItem(item));
	};
	const onReduce = (item) => {
		dispatch(reduceQuantity(item));
	};
	const onAdd = (item) => {
		dispatch(addQuantity(item));
	};
	const onClear = () => {
		dispatch(clearItems());
	};
	useEffect(() => {
		dispatch(getTotal());
	}, [dispatch, items]);
	return (
		<div className='w-96 bg-accent p-5 rounded overflow-y-auto mb-10'>
			<div className='flex justify-between items-center mb-3'>
				<h3 className='text-xl font-mono font-semibold'>Billing</h3>
				<button
					className='bg-secondary text-accent px-3 py-1 rounded-lg text-sm'
					onClick={onClear}
				>
					Clear All
				</button>
			</div>
			<div className='space-y-3'>
				{items.length === 0 ? <p className='text-center py-5'>Empty</p> : <></>}
				{items.map((item) => (
					<div
						key={item._id}
						className='flex bg-white rounded-lg p-3 shadow flex-row'
					>
						<img
							src={item.imageUrl}
							alt={item.name}
							className='h-24 w-16 object-cover object-center rounded border border-gray-200'
						/>
						<div className='px-2 w-full text-sm'>
							<div className='flex justify-between items-center'>
								<h1 className='text-primary text-base font-medium mb-1'>
									{item.name}
								</h1>
								<button
									onClick={() => onRemoveItem(item)}
									className='bg-secondary rounded px-2 text-accent'
								>
									Remove
								</button>
							</div>
							<p>
								Price:
								<span className='font-medium ml-2 text-primary'>{`Rp. ${item.price}`}</span>
							</p>
							<p className='flex justify-start items-center space-x-2'>
								<span>Quantity:</span>
								<button onClick={() => onReduce(item)} className='text-primary'>
									<FaMinus />
								</button>
								<span className='font-medium text-primary'>
									{item.quantity}
								</span>
								<button onClick={() => onAdd(item)} className='text-primary'>
									<FaPlus />
								</button>
							</p>
							<p>
								Subtotal:
								<span className='font-medium ml-2 text-primary'>
									{item.quantity * item.price}
								</span>
							</p>
						</div>
					</div>
				))}
				<div>
					<div className='bg-white rounded flex justify-between items-center p-3'>
						<p className='font-semibold text-primary'>Total: </p>
						<p className='font-semibold text-primary'>{`Rp. ${totalPrice}`}</p>
					</div>
					<button
						onClick={onSave}
						className='uppercase text-accent bg-primary rounded px-12 my-3 py-2'
					>
						Pay
					</button>
				</div>
			</div>
		</div>
	);
};

export default Billing;
