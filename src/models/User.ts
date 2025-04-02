import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string[];
  role: 'user' | 'admin' | 'restaurant';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  address: [{ 
    type: String 
  }],
  role: { 
    type: String, 
    enum: ['user', 'admin', 'restaurant'], 
    default: 'user' 
  }
}, { 
  timestamps: true 
});

export const User = model<IUser>('User', userSchema);