const apiBase = '/api';

export const fetchApi = async (resource, options = {}) => {
  const response = await fetch(`${apiBase}${resource}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
};

export const getRows = async (resource) => {
  const result = await fetchApi(resource);
  return Array.isArray(result.data) ? result.data : [];
};