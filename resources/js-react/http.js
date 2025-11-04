import axios from "axios";

export default function initHttp(){
	const http = axios.create({
		baseURL: 'https://faceprog.ru/courseapi/'
	});
	
	http.id = Math.random();
	
	return http;
}

