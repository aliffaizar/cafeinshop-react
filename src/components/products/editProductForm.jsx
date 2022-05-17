import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/categorySlice";
import { editProduct } from "../../redux/productSlice";

const EditProductForm = ({ product }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState(product);
	const { name, price, description, category, imageUrl } = formData;
	const { categories } = useSelector((state) => state.category);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);
	const openForm = () => {
		setIsOpen(true);
	};
	const closeForm = () => {
		setIsOpen(false);
	};
	const onChange = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(editProduct(formData));
		setIsOpen(false);
	};
	return (
		<>
			<button onClick={openForm}>
				<div className='w-5 mr-2 transform hover:text-purple-500 hover:scale-110'>
					<FaEdit />
				</div>
			</button>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={closeForm}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-lg  bg-accent py-3 px-5 text-left align-middle shadow-xl transition-all'>
									<Dialog.Title
										as='div'
										className='inline-flex w-full justify-between items-center'
									>
										<h3 className='text-primary text-xl font-medium'>
											Add Product
										</h3>
										<button
											onClick={closeForm}
											className='rounded-full p-1 bg-red-600 text-accent'
										>
											<FaTimes className='w-4 h-4' />
										</button>
									</Dialog.Title>
									<div className='mt-4'>
										<form className='space-y-2' onSubmit={onSubmit}>
											<input
												onChange={onChange}
												required
												name='name'
												type='text'
												value={name}
												placeholder='Name'
												className='w-full py-1 px-2 rounded'
											/>

											<select
												name='category'
												className='w-full py-1 px-2 rounded'
												onChange={onChange}
												required
												value={category._id}
											>
												<option value='' disabled>
													Select Category
												</option>
												{categories.map((category) => (
													<option key={category._id} value={category._id}>
														{category.name}
													</option>
												))}
											</select>
											<input
												onChange={onChange}
												required
												name='price'
												type='number'
												min={0}
												value={price}
												placeholder='Price'
												className='w-full py-1 px-2 rounded'
											/>
											<input
												required
												onChange={onChange}
												value={imageUrl}
												name='imageUrl'
												type='url'
												placeholder='Image Url'
												className='w-full py-1 px-2 rounded'
											/>
											<textarea
												rows={2}
												onChange={onChange}
												required
												name='description'
												type='text'
												value={description}
												placeholder='Description'
												className='w-full py-1 px-2 rounded'
											/>
											<div className='mt-4 space-x-3 inline-flex justify-end w-full'>
												<button
													type='button'
													className='inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-accent hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
													onClick={closeForm}
												>
													Close
												</button>
												<button
													type='submit'
													className='inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-accent hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
												>
													Save
												</button>
											</div>
										</form>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default EditProductForm;
