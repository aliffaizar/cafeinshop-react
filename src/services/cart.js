import Api from "../config/api";

//create or add cart items
const createCart = async (data, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await Api.post("/carts", data, config);
	return res.data;
};

//get all carts
const getCarts = async () => {
	const res = await Api.get("/carts");
	return res.data;
};

//get single cart
const getCart = async (_id) => {
	const res = await Api.get(`/carts/${_id}`);
	return res.data;
};

const cartServices = {
	createCart,
	getCart,
	getCarts,
};
export default cartServices;
