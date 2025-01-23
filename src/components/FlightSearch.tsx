import React, {useState} from "react";
import {useFlightSearch} from "../hooks/useFlightSearch";
import {GoogleFlightLeg} from "../types/googleflight";

const FlightSearch: React.FC = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [error, setError] = useState('');

  const {performSearch, flights, isLoading} = useFlightSearch();

  const validateSearch = (): boolean => {
    // Reset previous errors
    setError('');

    // Check if all fields are filled
    if (!origin || !destination || !departureDate) {
      setError('Please fill in all fields');
      return false;
    }

    // Validate airport codes (assuming 3-4 character codes)
    const airportCodeRegex = /^[A-Z]{3,4}$/;
    if (!airportCodeRegex.test(origin) || !airportCodeRegex.test(destination)) {
      setError('Please use valid airport codes (e.g., L , LHR)');
      return false;
    }

    // Validate date is in the future
    const selectedDate = new Date(departureDate);
    const today = new Date();
    if (selectedDate <= today) {
      setError('Please select a future date');
      return false;
    }

    return true;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateSearch()) {
      const leg: GoogleFlightLeg = {
        origin, 
        destination, 
        date: departureDate
      };
      performSearch([leg]);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="grid gap-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Passengers
          </label>
          <input
            type="text"
            placeholder="Origin"
            value={origin}
            onChange={e => setOrigin(e.target.value.toUpperCase())}
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Destination
          </label>
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={e => setDestination(e.target.value.toUpperCase())}
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Departure Date
          </label>
          <input
            type="date"
            value={departureDate}
            onChange={e => setDepartureDate(e.target.value)}
            className="border p-2 rounded"
            placeholder="enter date"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={isLoading}>
            {isLoading ? "Searching..." : "Search Flights"}
          </button>
        </div>
      </form>

      {flights && flights.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Flight Results</h2>
          {flights.map(flight => (
            <div key={flight.id} className="border p-4 mb-4 rounded">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">
                    {flight.itinerary.legs
                      .map(leg => `${leg.origin} → ${leg.destination}`)
                      .join(" | ")}
                  </h3>
                  <p>Airline: {flight.itinerary.legs[0].airline}</p>
                </div>
                <div>
                  <p className="text-xl font-bold">
                    {flight.price.amount} {flight.price.currency}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
