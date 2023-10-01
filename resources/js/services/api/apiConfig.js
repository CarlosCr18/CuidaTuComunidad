import axios from 'axios';

const ctcApi = axios.create({
	baseURL: `${process.env.APP_URL}:${process.env.PORT_HTTP}/api/`,
});

export default ctcApi;
