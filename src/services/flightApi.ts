import axios from 'axios';

import { GoogleFlight, GoogleFlightSearchParams } from '../types/googleflight';

const flightApi =  axios.create({
 baseURL: 'https://api.sandbox.google.com/flights/v1',
  headers: { 
    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
    'x-rapidapi-host': import.meta.env.VITE_RAPID_API_HOST,
  }
});

export const searchGoogleFlights  = async (params: GoogleFlightSearchParams): Promise<GoogleFlight[]> => {
    try {
        const response = await flightApi.get('/search', { params });
        return response.data.flights;
    } catch (error) {
        console.error('Flight search not found', error);

        throw new Error('Failed to fetch flight data');
    }
}