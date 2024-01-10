import axios from "axios";

const instance = axios.create({
	baseURL: "http://45.13.132.197:5000/api",
});

instance.interceptors.request.use(async (config) => {
	if (config.shouldAddAuth) {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = token;
		}
	}
	return config;
});

export default instance;
