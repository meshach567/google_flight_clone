import  { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GoogleFlight, GoogleFlightSearchParams } from '../types/googleflight';
import { searchGoogleFlights } from '../services/flightApi';

const useFlightSearch = () => {
  const [searchParams, setSearchParams] = useState<GoogleFlightSearchParams | null>(null);
  const { data: flights, isLoading, error, refetch } = useQuery<GoogleFlight[]>({
    queryKey: ['flights', searchParams],
    queryFn: () =>  searchGoogleFlights(searchParams!),
      enabled: !!searchParams
});

  const performSearch = (params: GoogleFlightSearchParams) => {
    setSearchParams(params);
    refetch();
  }
  return { 
    flights, 
    isLoading, 
    error, 
    performSearch 
  };
}

export default useFlightSearch