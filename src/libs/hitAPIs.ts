import fetch from "node-fetch";

export interface fetchOptions {
  method: "get" | "put" | "post" | "delete";
  body?: string;
  headers?: string[][] | { [key: string]: string };
}

export const fetchData = (url: string, options: fetchOptions) => {
  const { method } = options;

  if (method === "get") return handleGET(url, options);
  else return handlePOST(url, options);
};

const handlePOST = <T>(url: string, options: fetchOptions): Promise<T> => {
  return fetch(url, options).then((res) => res.json() as Promise<T>);
};

const handleGET = <T>(url: string, options: fetchOptions): Promise<T> => {
  return fetch(url, options).then((res) => res.json() as Promise<T>);
};
