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

const newsSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  content: String,
  category: String,
  imageUrl: String,
  status: { type: String, default: 'published' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const News = mongoose.models.News || mongoose.model('News', newsSchema)

export async function GET() {
  try {
    await connectDB()
    const news = await News.find().sort({ createdAt: -1 })
    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json([], { status: 200 })
  }
}
