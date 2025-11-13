import { createContext } from "react";
import type { AxiosInstance } from "axios";

interface HttpInstance extends AxiosInstance {
  id: number;
}

export const HttpContext = createContext<HttpInstance | null>(null);