import axios from 'axios';

const api = axios.create({
  // Use Vite proxy in dev: keep API calls relative to `/api`
  baseURL: '',
  withCredentials: true,
  headers: {
    'X-Tunnel-Skip-Anti-Phishing-Page': 'true' // 🔑 Ξεκλειδώνει το dev tunnel για όλα τα αρχεία!
  }
});

export default api; // Αυτό είναι το default export που έλειπε και κράσαρε την οθόνη!
