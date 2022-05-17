import Api from "../config/api";

//get all products
const getProducts = async () => {
	const res = await Api.get("/products");
	return res.data;
};

//create products
const createProduct = async (data, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await Api.post("/products", data, config);
	return res.data;
};

//edit or update product
const editProduct = async (data, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await Api.put(`/products/${data._id}`, data, config);
	return res.data;
};

//delete product
const deleteProduct = async (_id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await Api.delete(`/products/${_id}`, config);
	return res.data;
};

const productsService = {
	getProducts,
	createProduct,
	editProduct,
	deleteProduct,
};
export default productsService;
