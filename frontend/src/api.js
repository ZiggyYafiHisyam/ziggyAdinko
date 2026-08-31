const apiBase = '/api';

export const fetchApi = async (resource, options = {}) => {
  const isFormData = options.body instanceof FormData;
  const headers = isFormData 
    ? { ...options.headers } 
    : { 'Content-Type': 'application/json', ...options.headers };

  const response = await fetch(`${apiBase}${resource}`, {
    credentials: 'include',
    headers,
    ...options,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: `Request failed with status ${response.status}` };
    }
    const error = new Error(errorData.message || `API request failed: ${response.status}`);
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  return response.json();
};

export const getRows = async (resource) => {
  const result = await fetchApi(resource);
  return Array.isArray(result.data) ? result.data : [];
};

export const createRow = async (resource, data) => {
  return fetchApi(resource, {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateRow = async (resource, id, data) => {
  const path = id ? `${resource}/${id}` : resource;
  return fetchApi(path, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const deleteRow = async (resource, id) => {
  return fetchApi(`${resource}/${id}`, {
    method: 'DELETE'
  });
};

export const uploadFile = async (files) => {
  const formData = new FormData();
  if (files instanceof FileList || Array.isArray(files)) {
    for (let i = 0; i < files.length; i++) {
      formData.append('pictures', files[i]);
    }
  } else {
    formData.append('pictures', files);
  }
  return fetchApi('/upload', {
    method: 'POST',
    body: formData
  });
};