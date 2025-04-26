"use client";

import { useChat } from "@/lib/chat";
import { ChatInterface } from "@/components/chat-interface";
import { BarChart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ChatPage() {
  const { messages, sendMessage, clearChat } = useChat();
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              <span className="font-semibold">Analytics Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href="/dashboard">
                <MessageSquare className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
        <div className="grid w-full max-w-4xl gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="max-md:order-2">
              <div className="flex h-[600px] flex-col rounded-lg border shadow-sm">
                <ChatInterface
                  messages={messages}
                  onSendMessage={sendMessage}
                  onClearChat={clearChat}
                />
              </div>
            </div>
            <div className="space-y-4 max-md:order-1">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Support Chat</h1>
                <p className="text-muted-foreground">
                  Get help with using the Analytics Dashboard
                </p>
              </div>
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">How Can I Help You?</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    Ask about dashboard features
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    Get help with interpreting data
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    Learn about the metrics displayed
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    Troubleshoot connection issues
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">About This Chat</h3>
                <p className="text-sm text-muted-foreground">
                  This support chat provides assistance with using the analytics
                  dashboard. It will proactively reach out if you&apos;re
                  inactive for a period of time. Your chat history is saved
                  locally for your convenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}