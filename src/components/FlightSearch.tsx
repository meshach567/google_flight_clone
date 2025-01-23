import React, {useState} from "react";
import {useFlightSearch} from "../hooks/useFlightSearch";
import {GoogleFlightLeg} from "../types/googleflight";

const FlightSearch: React.FC = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const {performSearch, flights, isLoading} = useFlightSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const legs: GoogleFlightLeg = {
      origin,
      destination,
      date: departureDate,
    };
    performSearch([legs]);
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
