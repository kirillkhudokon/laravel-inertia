import axios, { AxiosInstance } from "axios";

interface HttpInstance extends AxiosInstance {
  id: number;
}

export default function initHttp(): HttpInstance {
  const http = axios.create({
    baseURL: 'https://faceprog.ru/courseapi/'
  }) as HttpInstance;
  
  http.id = Math.random();
  
  return http;
}

