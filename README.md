# FinBot - Personal Finance Manager

A full-stack web application for managing personal finances, built with MERN stack.

## Features

- Transaction tracking
- Income/Expense analytics
- Monthly reports
- CSV import support
- User authentication

## some screenshots

- ![image](https://github.com/user-attachments/assets/26c657b0-e4b0-4faa-9fbf-e9b95d36646f)

- ![image](https://github.com/user-attachments/assets/8e8da9d4-031e-4c73-adf9-f90437c30121)

- ![image](https://github.com/user-attachments/assets/cf077dda-4a17-4d86-8734-2d1d77815df3)




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
