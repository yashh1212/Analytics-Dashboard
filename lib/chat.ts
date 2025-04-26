"use client";

import { useState, useEffect, useCallback } from "react";
import { ChatMessage, ChatSession } from "@/types";

// Mock responses for the chatbot
const botResponses = [
  { trigger: "hello", response: "Hello! How can I help you today?" },
  { trigger: "help", response: "I'm here to help! What do you need assistance with?" },
  { trigger: "dashboard", response: "The dashboard shows real-time analytics about your website traffic and user activity." },
  { trigger: "metrics", response: "We track various metrics including active users, page views, bounce rate, and average session duration." },
  { trigger: "chart", response: "Charts visualize your data to help you understand trends over time." },
  { trigger: "users", response: "The active users chart shows how many users are currently on your site." },
  { trigger: "websocket", response: "We use WebSockets to provide real-time updates without requiring you to refresh the page." },
  { trigger: "login", response: "You can log in using the credentials provided by your administrator." },
  { trigger: "dark mode", response: "You can toggle between dark and light mode using the switch in the top navigation bar." },
  { trigger: "export", response: "Currently, exporting data is not available in this version, but we're working on adding this feature soon!" },
];


const proactiveMessages = [
  "Need any help with the analytics dashboard?",
  "Did you know you can toggle between dark and light mode?",
  "Have questions about any of the charts or metrics?",
  "I'm here if you need assistance with understanding the data.",
  "Feel free to ask about any features of the dashboard!",
];

export function useChat() {
  const [session, setSession] = useState<ChatSession>(() => {
    if (typeof window !== "undefined") {
      const savedSession = localStorage.getItem("chatSession");
      if (savedSession) {
        return JSON.parse(savedSession);
      }
    }
    

    return {
      id: Math.random().toString(36).substring(2, 9),
      messages: [],
      lastActivity: new Date().toISOString(),
    };
  });
  
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Save session to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatSession", JSON.stringify(session));
    }
  }, [session]);
  
  // Set up inactivity timer for proactive messaging
  useEffect(() => {
    // Clear existing timer
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    // Set new timer for 30 seconds of inactivity
    const timer = setTimeout(() => {
      sendProactiveMessage();
    }, 30000);
    
    setInactivityTimer(timer);
    
    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [session.lastActivity]);
  
  const sendMessage = useCallback((text: string) => {
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: "user",
      text,
      timestamp: new Date().toISOString(),
    };
    
    setSession(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      lastActivity: new Date().toISOString(),
    }));
    
    // Generate bot response
    setTimeout(() => {
      // Look for a matching response
      const lowercaseText = text.toLowerCase();
      let responseText = "I'm not sure I understand. Can you rephrase your question?";
      
      for (const resp of botResponses) {
        if (lowercaseText.includes(resp.trigger)) {
          responseText = resp.response;
          break;
        }
      }
      
      const botMessage: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        sender: "bot",
        text: responseText,
        timestamp: new Date().toISOString(),
      };
      
      setSession(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        lastActivity: new Date().toISOString(),
      }));
    }, 1000);
  }, []);
  
  const sendProactiveMessage = useCallback(() => {
    // Only send proactive message if there are already messages in the conversation
    // and the last message was not from the bot
    const lastMessage = session.messages[session.messages.length - 1];
    if (session.messages.length > 0 && (!lastMessage || lastMessage.sender !== "bot")) {
      const randomIndex = Math.floor(Math.random() * proactiveMessages.length);
      const messageText = proactiveMessages[randomIndex];
      
      const botMessage: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        sender: "bot",
        text: messageText,
        timestamp: new Date().toISOString(),
      };
      
      setSession(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        lastActivity: new Date().toISOString(),
      }));
    }
  }, [session.messages]);
  
  const clearChat = useCallback(() => {
    setSession({
      id: Math.random().toString(36).substring(2, 9),
      messages: [],
      lastActivity: new Date().toISOString(),
    });
  }, []);
  
  return {
    messages: session.messages,
    sendMessage,
    clearChat,
  };
}