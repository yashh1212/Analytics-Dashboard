# Analytics Dashboard

A real-time analytics dashboard built with Next.js, WebSocket, and Tailwind CSS. Monitor your website's performance with live data and instant insights.


## Features

- 📊 Real-time analytics tracking
- 🌓 Dark/Light mode support
- 📱 Responsive design
- 💬 Support chat interface
- 📈 Interactive charts and visualizations
- 🔄 WebSocket-powered live updates
- 🔒 Simple authentication system

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Real-time**: WebSocket
- **Authentication**: Local storage (demo purposes)
- **Theme**: Next-themes

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/analytics-dashboard.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── chat/            # Chat interface
│   ├── dashboard/       # Dashboard pages
│   └── login/           # Authentication
├── components/          # React components
│   ├── ui/             # UI components
│   └── dashboard-components.tsx
├── lib/                 # Utility functions
└── types/              # TypeScript types
```

## Key Components

- **Dashboard**: Main analytics view with real-time stats
- **Analytics**: Detailed metrics and charts
- **Chat**: Support chat interface with auto-responses
- **Authentication**: Simple login system (demo credentials provided)

## Authentication

For demo purposes, use these credentials:
- Email: admin@example.com
- Password: admin123

## Features in Detail

### Real-time Analytics
- Active user tracking
- Page view counting
- Session duration monitoring
- Bounce rate calculation

### Interactive Charts
- Active users timeline
- Activity metrics visualization
- Real-time data updates

### Support Chat
- Auto-responses based on keywords
- Chat history persistence
- Proactive messaging system

### Theme Support
- System theme detection
- Manual theme switching
- Persistent theme preference
