import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/categorySlice";

const AddCategoryForm = () => {
	const dispatch = useDispatch();
	const dummy = {
		name: "",
		description: "",
		imageUrl: "",
	};
	const [formData, setFormData] = useState(dummy);
	const { name, description, imageUrl } = formData;
	const [isOpen, setIsOpen] = useState(false);
	const closeForm = () => {
		setIsOpen(false);
	};
	const openForm = () => {
		setIsOpen(true);
	};
	const onChange = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createCategory(formData));
		setFormData(dummy);
		setIsOpen(false);
	};
	return (
		<>
			<button
				onClick={openForm}
				className='flex flex-row justify-center items-center space-x-2 py-2 px-4 bg-primary text-accent rounded-lg'
			>
				<FaPlus />
				<span>Add Category</span>
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
											Add Category
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
												required
												onChange={onChange}
												name='name'
												value={name}
												type='text'
												placeholder='Category Name'
												className='w-full py-1 px-2 rounded'
											/>
											<input
												required
												onChange={onChange}
												name='imageUrl'
												value={imageUrl}
												type='url'
												placeholder='Image Url'
												className='w-full py-1 px-2 rounded'
											/>
											<textarea
												rows={3}
												required
												onChange={onChange}
												name='description'
												value={description}
												type='text'
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

export default AddCategoryForm;
