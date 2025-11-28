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

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  status: String,
  year: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
})

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema)

export async function GET() {
  try {
    await connectDB()
    const projects = await Project.find().sort({ createdAt: -1 })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const project = new Project(body)
    await project.save()
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
