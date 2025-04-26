
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Session {
  user: User;
  expires: string;
}

// Analytics Types
export interface UserActivity {
  timestamp: string;
  count: number;
}

export interface ActivityMetric {
  name: string;
  value: number;
}

export interface DashboardStats {
  activeUsers: number;
  totalPageViews: number;
  averageSessionTime: string;
  bounceRate: string;
}

// WebSocket Types
export type WebSocketStatus = 'connected' | 'connecting' | 'disconnected';

export interface WebSocketMessage {
  type: 'userCount' | 'activity' | 'metrics';
  data: any;
}

export interface ActivityFeedItem {
  id: string;
  user: string;
  action: string;
  page: string;
  timestamp: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  lastActivity: string;
}