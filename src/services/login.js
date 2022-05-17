import Api from "../config/api";

const login = async (userData) => {
	const res = await Api.post("./users/login", userData);
	if (res.data) {
		localStorage.setItem("auth", JSON.stringify(res.data));
	}
	return res.data;
};
const logout = () => {
	localStorage.removeItem("auth");
};
const loginService = {
	login,
	logout,
};
export default loginService;
