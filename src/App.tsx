import React, { useState } from "react";
//import { Utensils } from "lucide-react";
import Navbar from "./components/Navbar";
import RestaurantGrid from "./components/RestaurantGrid";
import Orders from "./components/Orders";
import AuthModal from "./components/AuthModal";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import "./components/common.css";

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

          <main className="max-w-7xl mx-auto px-4 py-8">
            {/* Tab Navigation */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <button
                onClick={() => setActiveTab("restaurants")}
                className={`text-lg font-medium ${
                  activeTab === "restaurants"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Restaurants
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`text-lg font-medium ${
                  activeTab === "orders"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Orders
              </button>
            </div>

            {/* Content */}
            {activeTab === "restaurants" && (
              <RestaurantGrid searchQuery={searchQuery} />
            )}

            {activeTab === "orders" && <Orders />}
          </main>

          {/* Modals */}
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />

          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
