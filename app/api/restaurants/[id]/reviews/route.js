import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import dbConnect from '@/lib/mongodb'
import Restaurant from '@/models/Restaurant'

export async function POST(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    
    const body = await request.json()
    const restaurant = await Restaurant.findById(params.id)
    
    if (!restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })
    }
    
    restaurant.reviews.push({
      user: session.user.id,
      rating: body.rating,
      comment: body.comment
    })
    
    // Update average rating
    const totalRating = restaurant.reviews.reduce((sum, review) => sum + review.rating, 0)
    restaurant.rating = totalRating / restaurant.reviews.length
    
    await restaurant.save()
    
    return NextResponse.json(restaurant, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
