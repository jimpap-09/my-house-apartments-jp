import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nkdjf5sn-5000.euw.devtunnels.ms', // Το backend devtunnel URL σου
  withCredentials: true, 
  headers: {
    'X-Tunnel-Skip-Anti-Phishing-Page': 'true' // 🔑 Ξεκλειδώνει το dev tunnel για όλα τα αρχεία!
  }
});

export default api; // Αυτό είναι το default export που έλειπε και κράσαρε την οθόνη!