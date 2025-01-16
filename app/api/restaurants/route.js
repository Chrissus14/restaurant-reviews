import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Restaurant from '@/models/Restaurant'

export async function GET(request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const cuisine = searchParams.get('cuisine')
    const priceRange = searchParams.get('priceRange')
    
    let filter = {}
    
    if (query) {
      filter.name = { $regex: query, $options: 'i' }
    }
    
    if (cuisine) {
      filter.cuisine = cuisine
    }
    
    if (priceRange) {
      filter.priceRange = priceRange
    }
    
    const restaurants = await Restaurant.find(filter)
    return NextResponse.json(restaurants)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const restaurant = await Restaurant.create(body)
    
    return NextResponse.json(restaurant, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
