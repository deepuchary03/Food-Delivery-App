import React, { useState } from "react";

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
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
