// API service for fetching content from the backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Generic fetch function
const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// About content
export const getAboutContent = () => {
  return fetchApi('/about');
};

export const updateAboutContent = (data, token) => {
  return fetchApi('/about', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

// Projects
export const getProjects = () => {
  return fetchApi('/projects');
};

export const createProject = (data, token) => {
  return fetchApi('/projects', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const updateProject = (id, data, token) => {
  return fetchApi(`/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const deleteProject = (id, token) => {
  return fetchApi(`/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// News
export const getNews = () => {
  return fetchApi('/news');
};

export const createNews = (data, token) => {
  return fetchApi('/news', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const updateNews = (id, data, token) => {
  return fetchApi(`/news/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const deleteNews = (id, token) => {
  return fetchApi(`/news/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Constituency
export const getConstituencyContent = () => {
  return fetchApi('/constituency');
};

// Legislative
export const getLegislativeContent = () => {
  return fetchApi('/legislative');
};

// Contact
export const getContactInfo = () => {
  return fetchApi('/contact');
};

// Media
export const getMedia = (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `/media?${queryString}` : '/media';
  return fetchApi(url);
};

export const uploadMedia = (formData, token) => {
  return fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  }).then(response => response.json());
};