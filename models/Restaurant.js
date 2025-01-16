import mongoose from 'mongoose'

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this restaurant'],
    maxlength: [60, 'Name cannot be more than 60 characters']
  },
  cuisine: {
    type: String,
    required: [true, 'Please specify the cuisine type'],
  },
  priceRange: {
    type: String,
    required: [true, 'Please specify the price range'],
    enum: ['$', '$$', '$$$', '$$$$']
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  address: {
    type: String,
    required: [true, 'Please provide an address']
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number']
  },
  hours: {
    type: String,
    required: [true, 'Please provide operating hours']
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
})

export default mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema)
