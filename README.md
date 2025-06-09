# FinBot - Personal Finance Manager

A full-stack web application for managing personal finances, built with MERN stack.

## Features

- Transaction tracking
- Income/Expense analytics
- Monthly reports
- CSV import support
- User authentication

## Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/FinBot.git
cd FinBot
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Environment Setup
- Copy `.env.example` to `.env` in both client and server directories
- Update the environment variables with your values

4. Run the application
```bash
# Run server (from server directory)
npm run dev

# Run client (from client directory)
npm start
```

## Tech Stack

- Frontend: React, TailwindCSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT