import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

let isConnected = false

async function connectDB() {
  if (isConnected) return
  try {
    await mongoose.connect(process.env.MONGODB_URI || '', {
      serverSelectionTimeoutMS: 10000,
    })
    isConnected = true
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

const mediaSchema = new mongoose.Schema({
  title: String,
  url: String,
  type: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
})

const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema)

export async function GET() {
  try {
    await connectDB()
    const media = await Media.find().sort({ createdAt: -1 })
    return NextResponse.json(media)
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const media = new Media(body)
    await media.save()
    return NextResponse.json(media, { status: 201 })
  } catch (error) {
    console.error('Error creating media:', error)
    return NextResponse.json({ error: 'Failed to create media' }, { status: 500 })
  }
}
