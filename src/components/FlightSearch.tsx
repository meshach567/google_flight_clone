import React, {useState} from "react";
import  useFlightSearch  from "../hooks/useFlightSearch";

const FlightSearch: React.FC = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const {performSearch, flights, isLoading} = useFlightSearch();

  const handleSearch = () => {
    performSearch({origin, destination, departureDate});
  };
  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="grid gap-4">
        <h1 className="text-2xl font-bold">Flight Search</h1>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Passengers
          </label>
          <input
            type="text"
            placeholder="Origin"
            value={origin}
            onChange={e => setOrigin(e.target.value)}
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
            onChange={e => setDestination(e.target.value)}
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
            disabled={isLoading}
          >
            Search Flights
          </button>
        </div>
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {flights.map(flight => (
                <li key={flight.id}>
                  {flight.origin} to {flight.destination} on {flight.departureDate}
                </li>
              ))}
            </ul>
          )}
          </div>
      </form>
    </div>
  );
};

export default FlightSearch;
