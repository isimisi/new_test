
export const baseUrl = 'http://127.0.0.1:3333';

export const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});
