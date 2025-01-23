export interface GoogleLeg {
  origin: string;
  destination: string;
  date: string;
}

export interface GoogleFlightSearchOptions {
  legs: GoogleLeg[];
  adults: number;
  currency: string;
  locale: string;
  market: string;
  cabinClass: string;
  countryCode: string;
}

export interface GoogleFlight {
  id: string;
  price: {
    amount: number;
    currency: string;
  };
  itinerary: {
    outbound: {
      carrier: {
        name: string;
        code: string;
      };
      origin: {
        code: string;
        name: string;
      };
      destination: {
        code: string;
        name: string;
      };
      departureTime: string;
      arrivalTime: string;
    };
  };
  tags: string[];
}

export interface GoogleFlightSearchResponse {
  data: {
    flights: GoogleFlight[];
    status: boolean;
  };
}