const API_BASE = "/api/v1";

async function request(url, options = {}) {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || "Request failed");
  }

  return data;
}

export const postsApi = {
  getAll: () => request("/posts/"),
  getById: (id) => request(`/posts/${id}`),
  create: (body) =>
    request("/posts/create", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) =>
    request(`/posts/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (id) => request(`/posts/${id}`, { method: "DELETE" }),
};

export const usersApi = {
  register: (body) =>
    request("/users/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) =>
    request("/users/login", { method: "POST", body: JSON.stringify(body) }),
  logout: (body) =>
    request("/users/logout", { method: "POST", body: JSON.stringify(body) }),
};
