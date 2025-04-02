import { Schema, model, Document } from 'mongoose';

interface IReview extends Document {
  user: Schema.Types.ObjectId;
  restaurant: Schema.Types.ObjectId;
  order: Schema.Types.ObjectId;
  rating: number;
  comment: string;
  images: string[];
  likes: Schema.Types.ObjectId[];
  reply: {
    comment: string;
    createdAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>({
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
  order: { 
    type: Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: { 
    type: String, 
    required: true 
  },
  images: [{ 
    type: String 
  }],
  likes: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  reply: {
    comment: String,
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }
}, { 
  timestamps: true 
});