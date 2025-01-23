export interface GoogleFlightLeg {
    origin: string;
    destination: string;
    date: string;
  }
  
  export interface GoogleFlightSearchOptions {
    legs: GoogleFlightLeg[];
    adults: number;
    currency: string;
    locale: string;
    market: string;
    cabinClass: 'economy' | 'business' | 'first';
    countryCode: string;
  }
  
  export interface GoogleFlightDetails {
    id: string;
    price: {
      amount: number;
      currency: string;
    };
    itinerary: {
      legs: {
        origin: string;
        destination: string;
        departureTime: string;
        arrivalTime: string;
        airline: string;
        flightNumber: string;
      }[];
    };
    totalDuration: number;
  }