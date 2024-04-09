import axios from 'axios'

const BASE_URL = 'https://api.tixrush.com/api/v1'
let apiKey = null;
let isFetchingApiKey = false; // Add a flag to track if an API key fetch is in progress

// Function to fetch the apiKey if it's not already fetched
const getApiKey = async () => {
  if (!apiKey && !isFetchingApiKey) {
    isFetchingApiKey = true; // Set the flag to prevent concurrent API key fetches
    try {
      const data = {
        name: 'Deniyi Femi',
        email: 'holarfemilekan049@gmail.com'
      }
      const response = await axios.post(`${BASE_URL}/apiKey/generate`, data)
      apiKey = response.data.data.key;
    } catch (err) {
      // Handle errors
      console.error('Error fetching apiKey:', err);
    } finally {
      isFetchingApiKey = false; // Reset the flag after API key fetch attempt
    }
  }
  return apiKey;
}


const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

Axios.interceptors.request.use(async (config) => {
  const apikey = await getApiKey();
  config.headers['x-api-key'] = apikey;
  return config;
});


export default Axios
