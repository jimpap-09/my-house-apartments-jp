import axios from 'axios';

const api = axios.create({
  // configure the base URL for your API
  baseURL: 'https://nkdjf5sn-5000.euw.devtunnels.ms', // replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
    // add any additional headers if needed, e.g., for authentication
    'X-Tunnel-Skip-Anti-Phishing-Page': 'true' 
  }
});

export default api;