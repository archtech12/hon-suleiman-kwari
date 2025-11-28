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

const aboutSchema = new mongoose.Schema({
  content: String,
  updatedAt: { type: Date, default: Date.now },
})

const About = mongoose.models.About || mongoose.model('About', aboutSchema)

export async function GET() {
  try {
    await connectDB()
    const about = await About.findOne()
    return NextResponse.json(about || { content: '' })
  } catch (error) {
    console.error('Error fetching about:', error)
    return NextResponse.json({ content: '' }, { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const about = await About.findOneAndUpdate({}, body, { upsert: true, new: true })
    return NextResponse.json(about)
  } catch (error) {
    console.error('Error updating about:', error)
    return NextResponse.json({ error: 'Failed to update about' }, { status: 500 })
  }
}
