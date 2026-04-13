import axios from 'axios';
import { firebaseAuth } from './firebase';
<<<<<<< Updated upstream

const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
});

api.interceptors.request.use(async (config) => {
  const user = firebaseAuth.currentUser;
  if (user) {
    const token = await user.getIdToken(true);
=======
import * as mockApiLib from './mockApi';

const MOCK_MODE = import.meta.env.VITE_MOCK_MODE === 'true';

if (MOCK_MODE) {
  console.log('🎭 MOCK MODE ENABLED - Using mock API responses');
}

// Real API instance
const realApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
});

// Auto-attach Firebase ID token to every request (force-refresh to handle expiry)
realApi.interceptors.request.use(async (config) => {
  const currentUser = firebaseAuth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken(true); // true = force refresh if expired
>>>>>>> Stashed changes
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response error interceptor
realApi.interceptors.response.use(
  response => response,
  error => {
    const msg = error.response?.data?.error || error.message || 'Network error';
    return Promise.reject(new Error(msg));
  }
);

// Mock API wrapper
const mockApi = {
  get: async (url) => {
    if (url === '/game/session') return { data: await mockApiLib.mockGetSession() };
    if (url === '/game/current') return { data: await mockApiLib.mockGetCurrent() };
    if (url === '/game/result')  return { data: await mockApiLib.mockGetResult() };
    if (url === '/scoreboard')   return { data: await mockApiLib.mockGetLeaderboard() };
    throw new Error(`Mock endpoint not found: ${url}`);
  },
  post: async (url, payload) => {
    if (url === '/game/answer')  return { data: await mockApiLib.mockSubmitAnswer(payload.answer) };
    if (url === '/game/skip')    return { data: await mockApiLib.mockSkipQuestion() };
    if (url === '/game/start')   return { data: await mockApiLib.mockStartGame() };
    if (url === '/game/advance') return { data: await mockApiLib.mockAdvanceRound() };
    if (url === '/game/expire')  return { data: { success: true } };
    if (url === '/auth/register') return { data: { success: true } };
    throw new Error(`Mock endpoint not found: ${url}`);
  },
  put: async (url) => {
    throw new Error(`Mock PUT endpoint not found: ${url}`);
  },
};

// Use mock or real API based on environment
const api = MOCK_MODE ? mockApi : realApi;

export default api;
export { mockApiLib, MOCK_MODE };
