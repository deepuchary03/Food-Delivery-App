import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Star, Clock, ChevronDown, ChevronUp } from "lucide-react";

const restaurants = [
  {
    id: "1",
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
    cuisineType: ["Indian", "Chinese"],
    rating: 4.5,
    priceRange: "medium",
    deliveryTime: "30-40",
    menu: [
      {
        id: "item1",
        name: "Butter Chicken",
        price: 349,
        image:
          "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800",
        description: "Tender chicken in a rich buttery tomato gravy",
      },
      {
        id: "item2",
        name: "Paneer Tikka Masala",
        price: 299,
        image:
          "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800",
        description: "Grilled cottage cheese in spicy curry sauce",
      },
    ],
  },
  {
    id: "2",
    name: "Pizza Paradise",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    cuisineType: ["Italian", "American"],
    rating: 4.3,
    priceRange: "medium",
    deliveryTime: "25-35",
    menu: [
      {
        id: "item3",
        name: "Margherita Pizza",
        price: 299,
        image:
          "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800",
        description: "Classic delight with 100% real mozzarella cheese",
      },
      {
        id: "item4",
        name: "Pepperoni Pizza",
        price: 399,
        image:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800",
        description: "Loaded with spicy pepperoni and extra cheese",
      },
    ],
  },
  {
    id: "3",
    name: "Sushi Master",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
    cuisineType: ["Japanese", "Asian"],
    rating: 4.7,
    priceRange: "high",
    deliveryTime: "35-45",
    menu: [
      {
        id: "item5",
        name: "California Roll",
        price: 449,
        image:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
        description: "Crab, avocado, and cucumber roll",
      },
      {
        id: "item6",
        name: "Salmon Nigiri",
        price: 399,
        image:
          "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800",
        description: "Fresh salmon over seasoned rice",
      },
    ],
  },
  {
    id: "4",
    name: "Burger Junction",
    image: "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800",
    cuisineType: ["American", "Fast Food"],
    rating: 4.2,
    priceRange: "low",
    deliveryTime: "20-30",
    menu: [
      {
        id: "item7",
        name: "Classic Cheeseburger",
        price: 199,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
        description: "Juicy beef patty with cheese and fresh veggies",
      },
      {
        id: "item8",
        name: "Chicken Burger",
        price: 179,
        image:
          "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800",
        description: "Crispy fried chicken with special sauce",
      },
    ],
  },
  {
    id: "5",
    name: "Thai Flavors",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    cuisineType: ["Thai", "Asian"],
    rating: 4.4,
    priceRange: "medium",
    deliveryTime: "30-40",
    menu: [
      {
        id: "item9",
        name: "Pad Thai",
        price: 299,
        image:
          "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800",
        description: "Stir-fried rice noodles with shrimp and peanuts",
      },
      {
        id: "item10",
        name: "Green Curry",
        price: 349,
        image:
          "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800",
        description: "Aromatic curry with coconut milk and vegetables",
      },
    ],
  },
  {
    id: "6",
    name: "Mediterranean Delights",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    cuisineType: ["Mediterranean", "Middle Eastern"],
    rating: 4.6,
    priceRange: "medium",
    deliveryTime: "35-45",
    menu: [
      {
        id: "item11",
        name: "Falafel Platter",
        price: 279,
        image:
          "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800",
        description: "Crispy falafel with hummus and pita bread",
      },
      {
        id: "item12",
        name: "Shawarma Wrap",
        price: 249,
        image:
          "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800",
        description: "Grilled meat wrap with garlic sauce",
      },
    ],
  },
  {
    id: "7",
    name: "Mexican Fiesta",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    cuisineType: ["Mexican", "Latin American"],
    rating: 4.3,
    priceRange: "medium",
    deliveryTime: "25-35",
    menu: [
      {
        id: "item13",
        name: "Chicken Tacos",
        price: 299,
        image:
          "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800",
        description: "Soft corn tortillas with grilled chicken",
      },
      {
        id: "item14",
        name: "Beef Burrito",
        price: 349,
        image:
          "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
        description: "Large burrito with seasoned beef and rice",
      },
    ],
  },
  {
    id: "8",
    name: "Chinese Wok",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800",
    cuisineType: ["Chinese", "Asian"],
    rating: 4.4,
    priceRange: "medium",
    deliveryTime: "30-40",
    menu: [
      {
        id: "item15",
        name: "Kung Pao Chicken",
        price: 329,
        image:
          "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800",
        description: "Spicy diced chicken with peanuts",
      },
      {
        id: "item16",
        name: "Vegetable Noodles",
        price: 249,
        image:
          "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800",
        description: "Stir-fried noodles with mixed vegetables",
      },
    ],
  },
  {
    id: "9",
    name: "Health Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
    cuisineType: ["Healthy", "Salads"],
    rating: 4.5,
    priceRange: "high",
    deliveryTime: "20-30",
    menu: [
      {
        id: "item17",
        name: "Quinoa Buddha Bowl",
        price: 399,
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
        description: "Nutrient-rich bowl with quinoa and avocado",
      },
      {
        id: "item18",
        name: "Greek Salad",
        price: 299,
        image:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
        description: "Fresh Mediterranean salad with feta cheese",
      },
    ],
  },
  {
    id: "10",
    name: "Sweet Treats",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800",
    cuisineType: ["Desserts", "Bakery"],
    rating: 4.8,
    priceRange: "medium",
    deliveryTime: "25-35",
    menu: [
      {
        id: "item19",
        name: "Chocolate Lava Cake",
        price: 249,
        image:
          "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800",
        description: "Warm chocolate cake with molten center",
      },
      {
        id: "item20",
        name: "New York Cheesecake",
        price: 299,
        image:
          "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800",
        description: "Classic creamy cheesecake with berry compote",
      },
    ],
  },
];

interface RestaurantGridProps {
  searchQuery: string;
}

export default function RestaurantGrid({ searchQuery }: RestaurantGridProps) {
  const { addToCart } = useCart();
  const [expandedRestaurant, setExpandedRestaurant] = useState<string | null>(
    null
  );

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisineType.some((cuisine) =>
        cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      restaurant.menu.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const toggleRestaurantMenu = (id: string) => {
    setExpandedRestaurant(expandedRestaurant === id ? null : id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRestaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {restaurant.name}
              </h3>
              <p className="text-white text-sm mt-1">
                {restaurant.cuisineType.join(", ")}
              </p>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-medium">{restaurant.rating}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{restaurant.deliveryTime} mins</span>
              </div>
              <div
                className={`text-sm ${
                  restaurant.priceRange === "low"
                    ? "text-green-600"
                    : restaurant.priceRange === "medium"
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              >
                {restaurant.priceRange === "low"
                  ? "₹"
                  : restaurant.priceRange === "medium"
                  ? "₹₹"
                  : "₹₹₹"}
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleRestaurantMenu(restaurant.id)}
              >
                <h4 className="font-medium">Menu</h4>
                {expandedRestaurant === restaurant.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>

              {expandedRestaurant === restaurant.id && (
                <div className="mt-3 space-y-4">
                  {restaurant.menu.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row justify-between border-b pb-4"
                    >
                      <div className="flex space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-gray-600 text-sm">
                            {item.description}
                          </p>
                          <p className="text-gray-800 mt-1">₹{item.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                        }}
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors mt-2 sm:mt-0 sm:self-center"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {!expandedRestaurant && (
                <div className="mt-2 space-y-2">
                  {restaurant.menu.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border rounded p-2"
                    >
                      <div className="flex items-center space-x-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-gray-600">₹{item.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                        }}
                        className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {filteredRestaurants.length === 0 && (
        <div className="col-span-full bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 text-lg">
            No restaurants or dishes found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}
