import { Schema, model, Document } from 'mongoose';

interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  restaurant: Schema.Types.ObjectId;
  items: {
    menuItem: Schema.Types.ObjectId;
    quantity: number;
    customizations: {
      name: string;
      option: string;
      price: number;
    }[];
    price: number;
  }[];
  totalAmount: number;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod: 'card' | 'cash' | 'upi';
  deliveryInstructions: string;
  estimatedDeliveryTime: Date;
  actualDeliveryTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  restaurant: { 
    type: Schema.Types.ObjectId, 
    ref: 'Restaurant', 
    required: true 
  },
  items: [{
    menuItem: { 
      type: Schema.Types.ObjectId, 
      ref: 'MenuItem', 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true, 
      min: 1 
    },
    customizations: [{
      name: String,
      option: String,
      price: Number
    }],
    price: { 
      type: Number, 
      required: true 
    }
  }],
  totalAmount: { 
    type: Number, 
    required: true 
  },
  deliveryAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'],
    default: 'pending' 
  },
  paymentMethod: { 
    type: String, 
    enum: ['card', 'cash', 'upi'],
    required: true 
  },
  deliveryInstructions: { 
    type: String 
  },
  estimatedDeliveryTime: { 
    type: Date 
  },
  actualDeliveryTime: { 
    type: Date 
  }
}, { 
  timestamps: true 
});