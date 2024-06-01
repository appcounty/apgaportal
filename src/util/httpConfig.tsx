export const HTTPMethods = {
  POST: "POST",
  GET: "GET",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

type HTTPMethod = keyof typeof HTTPMethods;

// const apiUrl = "http://localhost:4000";
 const apiUrl = "https://apga-server.onrender.com";

interface HeadersPayload {
  [key: string]: string;
}

interface RequestOptions {
  method: string;
  headers: {
    "Content-Type": string;
    [key: string]: string;
  };
  body?: string;
}

export const makeRequest = async (
  url: string,
  method: HTTPMethod,
  payload?: {} | undefined,
  headersPayload: HeadersPayload = {}
) => {
  const options: RequestOptions = {
    method: HTTPMethods[method],
    headers: {
      "Content-Type": "application/json",
      ...headersPayload,
    },
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(`${apiUrl}${url}`, options);
  return await response.json();
};
