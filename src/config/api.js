import axios from "axios";

const Api = axios.create({
	baseURL: "https://rest-api-cafein-shop.herokuapp.com",
});

export default Api;
