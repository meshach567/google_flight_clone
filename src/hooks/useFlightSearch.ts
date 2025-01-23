// src/hooks/useFlightSearch.ts
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchFlights } from '../services/flightApi';
import { GoogleFlightDetails, GoogleFlightSearchOptions, GoogleFlightLeg } from '../types/googleflight';

export const useFlightSearch = () => {
  const [searchOptions, setSearchOptions] = useState<GoogleFlightSearchOptions | null>(null);

  const { 
    data: flights, 
    isLoading, 
    error, 
    refetch 
  } = useQuery<GoogleFlightDetails[]>({
    queryKey: ['flights', searchOptions],
    queryFn: () => searchFlights(searchOptions!),
    enabled: !!searchOptions
  });

  const performSearch = (legs: GoogleFlightLeg[]) => {
    const defaultOptions: GoogleFlightSearchOptions = {
      legs,
      adults: 1,
      currency: 'USD',
      locale: 'en-US',
      market: 'en-US',
      cabinClass: 'economy',
      countryCode: 'US'
    };

    setSearchOptions(defaultOptions);
    refetch();
  };

  return { 
    flights, 
    isLoading, 
    error, 
    performSearch 
  };
};