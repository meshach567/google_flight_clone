export interface GoogleAirport {
    code: string;
    name: string;
    city: string;
}

export interface GoogleFlightSegment {
    departureTime: string,
    arrivalTime: string,
    duration: number;
    airline: string,
    flightNumber: string,
}

export interface GoogleFlight { 
    id: string;
    price: number;
    departureAirport: GoogleAirport;
    arrivalAirport: GoogleAirport;
    segments: GoogleFlightSegment[];
    stops: number;
    totalDuration: number;
}

export interface GoogleFlightSearchParams {
    origin: string;
    destination: string;
    departureDate: string;
    passengers?: string;
 }
