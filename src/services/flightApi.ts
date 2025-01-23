import axios from 'axios';
import { GoogleFlightSearchOptions, GoogleFlightDetails } from '../types/googleflight';

const flightApi = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
    'x-rapidapi-host': import.meta.env.VITE_RAPID_API_HOST
  }
});

export const searchFlights = async (options: GoogleFlightSearchOptions): Promise<GoogleFlightDetails[]> => {
  try {
    const response = await flightApi.get('/flights/getFlightDetails', {
      params: {
        ...options,
        legs: JSON.stringify(options.legs)
      }
    });
    return response.data.data || [];
  } catch (error) {
    console.error('Flight search error', error);
    throw error;
  }
};