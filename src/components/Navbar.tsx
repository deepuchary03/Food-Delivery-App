import React, { useState } from "react";
import {
  Utensils,
  ShoppingBag,
  User,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-orange-600 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Utensils className="h-8 w-8 text-white" />
            <h1 className="text-xl sm:text-2xl font-bold text-white ml-2">
              FoodDelivery
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for restaurants or dishes"
                className="w-64 lg:w-96 pl-10 pr-4 py-2 border border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-orange-50"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-orange-500" />
            </div>
            <button
              onClick={onCartClick}
              className="p-2 hover:bg-orange-700 rounded-full relative text-white"
            >
              <ShoppingBag className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {items.length}
                </span>
              )}
            </button>
            {user ? (
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-orange-700 rounded-full flex items-center space-x-2 text-white">
                  <User className="h-6 w-6" />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 hover:bg-orange-700 rounded-full text-white"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="p-2 hover:bg-orange-700 rounded-full flex items-center space-x-2 text-white"
              >
                <User className="h-6 w-6" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onCartClick}
              className="p-2 hover:bg-orange-700 rounded-full relative text-white"
            >
              <ShoppingBag className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {items.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-orange-700 rounded-full text-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-orange-50"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-orange-500" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-orange-600 py-4 border-t border-orange-500">
            {user ? (
              <div className="space-y-2">
                <div className="px-4 py-2 text-white flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-white hover:bg-orange-700 flex items-center space-x-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onAuthClick();
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-white hover:bg-orange-700 flex items-center space-x-2"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
