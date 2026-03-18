import express, { Express, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { contactRouter } from './routes/contact.js'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api', contactRouter)

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' })
})

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
})

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`)
  console.log(`📧 Contact endpoint: POST /api/contact`)
  console.log(`💚 Health check: GET /health`)
})
