// src/hooks/useFlightSearch.ts
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchFlights } from '../services/flightApi';
import { GoogleFlight, GoogleFlightSearchOptions } from '../types/googleflight';

export const useFlightSearch = () => {
  const [searchOptions, setSearchOptions] = useState<GoogleFlightSearchOptions | null>(null);

  const { 
    data, 
    isLoading, 
    error, 
    refetch 
  } = useQuery<GoogleFlight[]>({
    queryKey: ['flights', searchOptions],
    queryFn: async () => {
      if (!searchOptions) throw new Error('Search options not set');
      const response = await searchFlights(searchOptions);
      return response?.data?.flights;
    },
    enabled: !!searchOptions
  });

  const performSearch = (options: Omit<GoogleFlightSearchOptions, 'legs'> & { 
    origin: string; 
    destination: string; 
    date: string 
  }) => {
    const searchOptionsPayload: GoogleFlightSearchOptions = {
      ...options,
      legs: [{
        origin: options.origin,
        destination: options.destination,
        date: options.date
      }]
    };
    setSearchOptions(searchOptionsPayload);
    refetch();
  };

  return { 
    flights: data, 
    isLoading, 
    error, 
    performSearch 
  };
};