import React, { useState, useEffect } from "react";
import { Database, Database as DatabaseOff } from "lucide-react";

export default function DbStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDbStatus = async () => {
      try {
        const response = await fetch(
          "https://food-delivery-app-gr7r.onrender.com/api/health"
        );
        const data = await response.json();
        setIsConnected(data.status === "connected");
      } catch (error) {
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial check
    checkDbStatus();

    // Check every 30 seconds
    const interval = setInterval(checkDbStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center space-x-2 rounded-full px-4 py-2 shadow-lg transition-colors ${
        isConnected
          ? "bg-green-50 ring-1 ring-green-500/20"
          : "bg-red-50 ring-1 ring-red-500/20"
      }`}
    >
      {isConnected ? (
        <>
          <Database className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium text-green-700 hidden">
            Database Connected
          </span>
        </>
      ) : (
        <>
          <DatabaseOff className="h-5 w-5 text-red-600" />
          <span className="text-sm font-medium text-red-700 hidden">
            Database Disconnected
          </span>
        </>
      )}
    </div>
  );
}
