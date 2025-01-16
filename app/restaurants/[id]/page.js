'use client'

import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { MapPinIcon, PhoneIcon, ClockIcon } from '@heroicons/react/24/outline'
import { restaurants } from '../../../data/restaurants'
import { useRouter } from 'next/navigation'

export default function RestaurantPage({ params }) {
  const router = useRouter()
  const restaurant = restaurants.find(r => r.id === parseInt(params.id))
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  const [reviews, setReviews] = useState(restaurant?.reviews || [])

  useEffect(() => {
    if (!restaurant) {
      router.push('/')
    }
  }, [restaurant, router])

  if (!restaurant) {
    return null
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    const review = {
      id: reviews.length + 1,
      user: "Current User",
      ...newReview,
      date: new Date().toISOString().split('T')[0]
    }
    setReviews([review, ...reviews])
    setNewReview({ rating: 5, comment: '' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{restaurant.name}</h1>
          <div className="flex items-center mb-4">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 font-semibold">{restaurant.rating}</span>
            <span className="mx-2">•</span>
            <span>{restaurant.cuisine}</span>
            <span className="mx-2">•</span>
            <span>{restaurant.priceRange}</span>
          </div>
          <p className="text-gray-600 mb-6">{restaurant.description}</p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span>{restaurant.phone}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span>{restaurant.hours}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                >
                  {[5, 4, 3, 2, 1].map(num => (
                    <option key={num} value={num}>{num} stars</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Comment</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows="4"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="border rounded p-4">
                <div className="flex items-center mb-2">
                  <span className="font-semibold">{review.user}</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="ml-1">{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{review.comment}</p>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
