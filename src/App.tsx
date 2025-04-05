import React, { useState } from "react";
import img from "./components/deepu profile.jpeg";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import RestaurantGrid from "./components/RestaurantGrid";
import Orders from "./components/Orders";
import AuthModal from "./components/AuthModal";
import Cart from "./components/Cart";
import DbStatus from "./components/DbStatus";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [activeTab, setActiveTab] = useState("restaurants");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onAuthClick={() => setIsAuthModalOpen(true)}
            onCartClick={() => setIsCartOpen(true)}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex space-x-4 mb-6 border-b">
              <button
                onClick={() => setActiveTab("restaurants")}
                className={`text-lg font-medium pb-2 ${
                  activeTab === "restaurants"
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Restaurants
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`text-lg font-medium pb-2 ${
                  activeTab === "orders"
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Orders
              </button>
            </div>

            {activeTab === "restaurants" && (
              <RestaurantGrid searchQuery={searchQuery} />
            )}

            {activeTab === "orders" && <Orders />}
          </main>

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />

          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

          <DbStatus />
          <footer
            className="text-center py-2 shadow-md"
            style={{ backgroundColor: "white", color: "#ea580c" }}
          >
            Built with ❤️ by
            <img
              src={img}
              alt="Avatar"
              className="inline-block w-6 h-6 rounded-full mx-2"
            />
            S Pranav (Deepu)
          </footer>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#fff",
                color: "#363636",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                borderRadius: "0.5rem",
                padding: "1rem",
              },
              success: {
                iconTheme: {
                  primary: "#059669",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#dc2626",
                  secondary: "#fff",
                },
              },
            }}
          />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
