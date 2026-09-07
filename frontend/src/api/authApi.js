import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add Token Automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const registerUser = (data) => API.post('api/auth/register', data);

export const loginUser = (data) => API.post('api/auth/login', data);

export const getCurrentUser = () => API.get('api/auth/me');

export const logoutUser = () => API.get('api/auth/logout');

// Get my Courses
export const getMyCourses = async () => {
  const token = localStorage.getItem('token');

  const response = await API.get('api/auth/my-courses', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// =========================
// GET PROFILE
// =========================
export const getProfile = async () => {
  try {
    const response = await API.get('api/auth/profile');

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: 'Failed to fetch profile',
      }
    );
  }
};

// =========================
// UPDATE PROFILE
// =========================
export const updateProfile = async (formData) => {
  try {
    const response = await API.put('api/auth/profile/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: 'Failed to update profile',
      }
    );
  }
};

// =========================
// UPDATE PASSWORD
// =========================
export const updatePassword = async (passwordData) => {
  try {
    const response = await API.put('api/auth/update-password', passwordData);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: 'Failed to update password',
      }
    );
  }
};


// =========================
// PROGRESS APIs
// =========================

export const markLessonComplete = async (courseId,lessonId) => {
  const response = await API.post(`api/progress/${courseId}/lesson/${lessonId}`);

  return response.data;
};

export const getCourseProgress = async (courseId) => {
  const response = await API.get(
    `api/progress/${courseId}`
  );

  return response.data;
};

// =========================
// Forgot Password
// =========================
export const forgotPassword = (email) => API.post('api/auth/forgot-password', { email });


// =========================
// ChatBoat Api
// =========================
export const askChatbot = async (message) => {
  const { data } = await API.post('/api/chatbot/ask', { message });
  return data;
};
