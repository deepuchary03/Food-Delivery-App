import { Schema, model, Document } from 'mongoose';

interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  restaurant: Schema.Types.ObjectId;
  category: string;
  image: string;
  isVegetarian: boolean;
  isSpicy: boolean;
  customization: {
    name: string;
    options: {
      name: string;
      price: number;
    }[];
  }[];
  isAvailable: boolean;
  preparationTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const menuItemSchema = new Schema<IMenuItem>({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  restaurant: { 
    type: Schema.Types.ObjectId, 
    ref: 'Restaurant', 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String 
  },
  isVegetarian: { 
    type: Boolean, 
    default: false 
  },
  isSpicy: { 
    type: Boolean, 
    default: false 
  },
  customization: [{
    name: String,
    options: [{
      name: String,
      price: Number
    }]
  }],
  isAvailable: { 
    type: Boolean, 
    default: true 
  },
  preparationTime: { 
    type: Number, 
    required: true 
  }
}, { 
  timestamps: true 
});