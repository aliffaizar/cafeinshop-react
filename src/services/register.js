import Api from "../config/api";

const registerService = async (userData) => {
	const res = await Api.post("/users", userData);
	return res.data;
};

export default registerService;
