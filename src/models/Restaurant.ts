import { Schema, model, Document } from 'mongoose';

interface IRestaurant extends Document {
  name: string;
  description: string;
  cuisineType: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  owner: Schema.Types.ObjectId;
  rating: number;
  reviewCount: number;
  priceRange: 'low' | 'medium' | 'high';
  openingHours: {
    day: string;
    open: string;
    close: string;
  }[];
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new Schema<IRestaurant>({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  cuisineType: [{ 
    type: String, 
    required: true 
  }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    }
  },
  owner: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  rating: { 
    type: Number, 
    default: 0, 
    min: 0, 
    max: 5 
  },
  reviewCount: { 
    type: Number, 
    default: 0 
  },
  priceRange: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    required: true 
  },
  openingHours: [{
    day: { type: String, required: true },
    open: { type: String, required: true },
    close: { type: String, required: true }
  }],
  images: [{ 
    type: String 
  }],
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});