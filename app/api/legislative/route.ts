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

const legislativeSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  date: Date,
  createdAt: { type: Date, default: Date.now },
})

const Legislative = mongoose.models.Legislative || mongoose.model('Legislative', legislativeSchema)

export async function GET() {
  try {
    await connectDB()
    const legislative = await Legislative.find().sort({ createdAt: -1 })
    return NextResponse.json(legislative)
  } catch (error) {
    console.error('Error fetching legislative:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const legislative = new Legislative(body)
    await legislative.save()
    return NextResponse.json(legislative, { status: 201 })
  } catch (error) {
    console.error('Error creating legislative:', error)
    return NextResponse.json({ error: 'Failed to create legislative' }, { status: 500 })
  }
}
