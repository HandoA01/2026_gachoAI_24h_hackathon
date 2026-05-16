import axios from 'axios';

// 실제 해커톤 백엔드 Base URL
export const API_BASE_URL = 'https://hackathon.gdgoc.net';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
