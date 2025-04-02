import React from "react";
import { ShoppingBag, User, Search, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Logo1 from "./logo1.svg";
import "./common.css";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAuthClick: () => void;
  onCartClick: () => void;
}

export default function Navbar({
  searchQuery,
  setSearchQuery,
  onAuthClick,
  onCartClick,
}: NavbarProps) {
  const { user, logout } = useAuth();
  const { items } = useCart();

  return (
    <header className=" shadow-sm sticky top-0 z-10 container">
      <div className="max-w-7xl mx-auto px-4 py-4 container">
        <div className="flex flex-wrap items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <img src={Logo1} alt="FoodDelivery Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-bold text-gray-900">FoodDelivery</h1>
          </div>

          {/* Search and Actions Section */}
          <div className="flex flex-1 flex-wrap justify-end items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
            {/* Search Input */}
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for restaurants or dishes"
                className="w-full sm:w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <ShoppingBag className="h-6 w-6 text-gray-600" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>

            {/* User Section */}
            {user ? (
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full flex items-center space-x-2">
                  <User className="h-6 w-6 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="p-2 hover:bg-gray-100 rounded-full flex items-center space-x-2"
              >
                <User className="h-6 w-6 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Sign In
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
