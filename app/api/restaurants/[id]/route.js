import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Restaurant from '@/models/Restaurant'

export async function GET(request, { params }) {
  try {
    await dbConnect()
    
    const restaurant = await Restaurant.findById(params.id)
    if (!restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })
    }
    
    return NextResponse.json(restaurant)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const restaurant = await Restaurant.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true
    })
    
    if (!restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })
    }
    
    return NextResponse.json(restaurant)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect()
    
    const restaurant = await Restaurant.findByIdAndDelete(params.id)
    if (!restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Restaurant deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
