import { BarChart, FileText, MessagesSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto flex min-h-screen flex-col px-4">
          <header className="flex h-14 items-center justify-between border-b py-4">
            <div className="flex items-center space-x-2">
              <BarChart className="h-6 w-6" />
              <span className="text-xl font-bold">Analytics Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button asChild variant="outline">
                <Link href="/chat">
                  <MessagesSquare className="mr-2 h-4 w-4" />
                  Support Chat
                </Link>
              </Button>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </header>
          <main className="flex flex-1 flex-col items-center justify-center py-12">
            <div className="mx-auto max-w-2xl space-y-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Real-time Analytics Dashboard
              </h1>
              <p className="text-xl text-muted-foreground">
                Monitor your website performance with live data and instant insights
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/login">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/chat">
                    <MessagesSquare className="mr-2 h-5 w-5" />
                    Get Support
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Real-time Data</h3>
                <p className="mt-2 text-muted-foreground">
                  See live user activity and metrics with WebSocket-powered updates
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Visual Analytics</h3>
                <p className="mt-2 text-muted-foreground">
                  Interactive charts and visualizations to help understand user behavior
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MessagesSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Proactive Support</h3>
                <p className="mt-2 text-muted-foreground">
                  Get help when you need it with our intelligent support chatbot
                </p>
              </div>
            </div>
          </main>
          <footer className="border-t py-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Analytics Dashboard. All rights reserved.
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}