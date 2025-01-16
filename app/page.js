'use client'

import { useState, useMemo } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { restaurants as allRestaurants } from '../data/restaurants'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [priceRange, setPriceRange] = useState('')
  
  const filteredRestaurants = useMemo(() => {
    return allRestaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCuisine = !cuisine || restaurant.cuisine === cuisine
      const matchesPrice = !priceRange || restaurant.priceRange === priceRange
      
      return matchesSearch && matchesCuisine && matchesPrice
    })
  }, [searchQuery, cuisine, priceRange])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const uniqueCuisines = [...new Set(allRestaurants.map(r => r.cuisine))]

  return (
    <div className="max-w-7xl mx-auto">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">
          Discover Great Local Restaurants
        </h1>
        <p className="text-gray-600 mb-8">
          Find and review the best dining spots in your area
        </p>
        
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search restaurants..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearch}
            />
            <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Cuisines</option>
              {uniqueCuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
            
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Prices</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              <option value="$$$$">$$$$</option>
            </select>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 px-4">
        {filteredRestaurants.map((restaurant) => (
          <Link 
            key={restaurant.id} 
            href={`/restaurants/${restaurant.id}`}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                <p className="text-gray-600">{restaurant.cuisine}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{restaurant.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-600">{restaurant.priceRange}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
