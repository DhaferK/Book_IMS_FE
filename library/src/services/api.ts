import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const likeBook = async (bookId: string, token: string) => {
  console.log('Sending payload:', { book_id: bookId });  // Log the payload
  const response = await apiClient.post(
    '/like',
    { book_id: bookId },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error('Failed to like the book');
  }
  console.log(response.data)
  return response.data;
};





export const unlikeBook = async (bookId: string, token: string) => {
  const response = await apiClient.delete(`/unlike/${bookId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to unlike the book');
  }

  return response.data;
};

export const getUserLikedBooks = async (token: string) => {
  const response = await apiClient.get('/likes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch liked books');
  }

  return response.data; // Ensure this matches the expected format
};

// Get user profile
export const getUserProfile = async (token: string) => {
  const response = await apiClient.get('/users/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch user profile');
  }

  return response.data;
};

// Login user
export const loginUser = async (username: string, password: string) => {
  const response = await apiClient.post('/users/login', { username, password });
  return response.data;
};

// Register user
export const registerUser = async (user: { fname: string; lname: string; email: string; password: string }) => {
  const response = await apiClient.post('/users/register', {
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    hashedpw: user.password,
    role: '0',
  });
  return response.data;
};

// Update user profile (first name, last name)
export const updateUserProfile = async (token: string, userData: { fname: string; lname: string }) => {
  const response = await apiClient.put('/users/me', userData, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to update user profile');
  }

  return response.data;
};

// Reset user password
export const resetUserPassword = async (token: string, currentPassword: string, newPassword: string) => {
  const response = await apiClient.put(
    '/users/me/password',
    { currentPassword, newPassword },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error('Failed to reset password');
  }

  return response.data;
};

export const getAllUsers = async (token: string) => {
  const response = await apiClient.get('/users', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch users');
  }

  return response.data.users; 
};

export const deleteUser = async (email: string, token: string) => {
  const response = await apiClient.delete(`/users/${email}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to delete user');
  }

  return response.data;
};

