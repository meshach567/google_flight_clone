import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import FlightSearch from "./components/FlightSearch";

const queryClient = new QueryClient();
import "./App.css";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Flight Search</h1>
        </header>
        <main>
          <FlightSearch />
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default App;
