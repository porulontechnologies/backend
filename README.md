# Porulon Contact Backend

A standalone Express.js backend service for handling contact form submissions and sending emails via Gmail SMTP.

## 📋 Features

- REST API endpoint for contact form submissions
- Sends professional HTML emails to both company and users
- Built with Express.js and TypeScript
- CORS enabled for frontend integration
- Health check endpoint for monitoring
- Environment-based configuration
- Production-ready for Render deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Gmail account with App Password configured

### Local Development

1. **Install dependencies**:
```bash
npm install
```

2. **Create `.env` file** (copy from `.env.example`):
```bash
cp .env.example .env
```

3. **Configure environment variables**:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
RECIPIENT_EMAIL=porulontechnologies@gmail.com
```

4. **Start development server**:
```bash
npm run dev
```

The server will start at `http://localhost:5000`

## 📝 API Endpoints

### POST `/api/contact`

Submit a contact form message.

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "message": "I'm interested in your services..."
}
```

**Success Response** (200):
```json
{
  "message": "Email sent successfully"
}
```

**Error Responses**:
- 400: Missing required fields or invalid email
- 500: Failed to send email

### GET `/health`

Health check endpoint for monitoring.

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2024-03-12T10:30:00.000Z"
}
```

## 🔑 Gmail App Password Setup

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Find and click on **App passwords**
4. Select **Mail** and **Windows** from the dropdowns
5. Click **Generate**
6. Copy the 16-character password to `SMTP_PASSWORD` in `.env`

## 🌐 Deploying to Render

### Option 1: Using render.yaml (Recommended)

1. Push your code to GitHub (including the `render.yaml` file)
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click **New +** → **Blueprint**
4. Connect your GitHub repo
5. Render will automatically read `render.yaml` and create the service
6. Set environment variables in Render dashboard:
   - `SMTP_EMAIL`
   - `SMTP_PASSWORD`
   - `FRONTEND_URL` (your production frontend URL)

### Option 2: Manual Setup

1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Configure:
   - **Runtime**: Node
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**:
     ```
     NODE_ENV=production
     PORT=5000
     FRONTEND_URL=https://your-frontend-domain.com
     SMTP_EMAIL=your_email@gmail.com
     SMTP_PASSWORD=your_app_password
     RECIPIENT_EMAIL=porulontechnologies@gmail.com
     ```
4. Click **Create Web Service**

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

### Start Production Server

```bash
npm start
```

## 🛠️ Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Email**: Nodemailer
- **CORS**: CORS middleware
- **Environment**: dotenv

## 📊 Project Structure

```
backend/
├── src/
│   ├── server.ts           # Express app setup
│   └── routes/
│       └── contact.ts      # Contact form endpoint
├── dist/                   # Compiled JavaScript (created on build)
├── package.json
├── tsconfig.json
├── .env.example           # Environment variables template
├── render.yaml            # Render deployment config
└── README.md              # This file
```

## 🔒 Security Notes

- Never commit `.env` to version control (included in `.gitignore`)
- Use strong, unique Gmail App Passwords
- Keep `SMTP_PASSWORD` secure in Render environment variables
- Frontend URL is restricted via CORS
- All inputs are validated before processing

## 🐛 Troubleshooting

### 500 Error: "Failed to send email"

- Verify SMTP credentials are correct
- Check that 2-Step Verification is enabled on Gmail account
- Ensure you're using an **App Password**, not your regular Gmail password
- Check Render logs for detailed error messages

### CORS Error

- Verify `FRONTEND_URL` environment variable matches your frontend domain
- For local development, set `FRONTEND_URL=http://localhost:3000`
- For production, update to your deployed frontend URL

### Emails Not Sending

- Check email configuration in environment variables
- Verify the recipient email doesn't have spam filters blocking the sender
- Check that `RECIPIENT_EMAIL` is correct
- Review server logs for detailed error information

## 📧 Email Templates

The backend sends two professional HTML emails:

1. **To Company** - Full submission details
2. **To User** - Confirmation message acknowledging receipt

Both templates include:
- Professional styling with inline CSS
- Clear information hierarchy
- Contact information
- Responsive design

## 🔄 Continuous Deployment

When you push to GitHub:
1. Render automatically detects changes
2. Runs the build command
3. Deploys new version if build succeeds
4. Updates the service automatically

## 📞 Support

For issues or questions, contact Porulon Technologies.

## 📄 License

MIT
