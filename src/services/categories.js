import Api from "../config/api";

//create or add category
const createCategory = async (data, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await Api.post("/categories", data, config);
	return res.data;
};
const editCategory = async (data, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await Api.put(`/categories/${data._id}`, data, config);
	return res.data;
};
//get categories
const getCategories = async () => {
	const res = await Api.get("/categories");
	return res.data;
};

// delete category
const deleteCategory = async (_id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await Api.delete(`/categories/${_id}`, config);
	return res.data;
};

const categoriesService = {
	createCategory,
	getCategories,
	deleteCategory,
	editCategory,
};
export default categoriesService;
