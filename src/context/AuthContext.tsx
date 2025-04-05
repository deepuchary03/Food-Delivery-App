import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import {
  loginUser,
  registerUser,
  getUserOrders,
  createOrder as apiCreateOrder,
} from "../api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: DeliveryAddress;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  paymentStatus: "pending" | "completed" | "failed";
  paymentMethod: "card" | "cash" | "upi";
  createdAt: string;
}

interface OrderInput {
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: DeliveryAddress;
  paymentMethod: string;
}

interface AuthContextType {
  user: User | null;
  orders: Order[];
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  placeOrder: (orderData: OrderInput) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [token, setToken] = useState<string | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Fetch orders when user is logged in
  useEffect(() => {
    if (user && token) {
      fetchOrders();
    }
  }, [user, token]);

  const fetchOrders = async () => {
    try {
      const response = await getUserOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser({ email, password });
      const { user, token } = response.data;

      setUser(user);
      setToken(token);

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Fetch user's orders
      await fetchOrders();
      toast.success("Welcome back!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid credentials");
      throw new Error("Login failed");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await registerUser({ name, email, password });
      const { user, token } = response.data;

      setUser(user);
      setToken(token);

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      setOrders([]);
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setOrders([]);

    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success("Logged out successfully");
  };

  const placeOrder = async (orderData: OrderInput) => {
    try {
      const response = await apiCreateOrder(orderData);
      const newOrder = response.data;

      setOrders((prevOrders) => [newOrder, ...prevOrders]);
      toast.success("Order placed successfully!");
      return;
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
      throw new Error("Failed to place order");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, orders, login, register, logout, placeOrder }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
