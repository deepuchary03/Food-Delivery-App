import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Clock, Package, Check, X } from "lucide-react";

interface OrderItem {
  id: string; // Add 'id' property to match other usages
  menuItem: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  paymentStatus: "pending" | "completed" | "failed";
  paymentMethod: "card" | "cash" | "upi";
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: string;
}

export default function Orders() {
  const { user, orders } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 text-center">
          Please sign in to view your orders
        </p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 text-center">No orders yet</p>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "confirmed":
      case "preparing":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "out_for_delivery":
        return <Package className="h-5 w-5 text-orange-500" />;
      case "delivered":
        return <Check className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Order Placed";
      case "confirmed":
        return "Order Confirmed";
      case "preparing":
        return "Preparing";
      case "out_for_delivery":
        return "Out for Delivery";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getOrderNumber = (orderId: string) => {
    return orderId && orderId.length >= 6 ? orderId.slice(-6) : orderId;
  };
  return (
    <div className="space-y-6">
      {orders.map((order: Order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div
            className="p-4 cursor-pointer hover:bg-gray-50"
            onClick={() =>
              setSelectedOrder(selectedOrder === order.id ? null : order.id)
            }
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <span className="font-medium">
                  {getStatusText(order.status)}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(order.createdAt)}
              </span>
            </div>
            <div className="mt-2">
              <p className="font-medium">Order #{getOrderNumber(order.id)}</p>
              <p className="text-sm text-gray-600">
                {order.items.length}{" "}
                {order.items.length === 1 ? "item" : "items"} • ₹
                {order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          {selectedOrder === order.id && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <h3 className="font-medium mb-2">Order Details</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <span>{item.quantity}x</span>
                      <span>{item.name}</span>
                    </div>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 font-medium flex justify-between">
                  <span>Total</span>
                  <span>₹{order.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2">Delivery Address</h3>
                <p className="text-sm">
                  {order.deliveryAddress.street}, {order.deliveryAddress.city},{" "}
                  {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2">Payment</h3>
                <p className="text-sm capitalize">
                  {order.paymentMethod} • {order.paymentStatus}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
