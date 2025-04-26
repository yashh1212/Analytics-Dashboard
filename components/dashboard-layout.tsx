"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { ThemeProvider } from "next-themes";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ConnectionStatus } from "@/components/connection-status";
import { WebSocketStatus } from "@/types";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardLayoutProps {
  children: React.ReactNode;
  status?: WebSocketStatus;
}

export function DashboardLayout({
  children,
  status = "disconnected",
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
    { name: "Support", href: "/chat", icon: MessageSquare },
  ];

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex h-screen flex-col overflow-hidden bg-background">
        {/* Mobile Nav */}
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static md:px-6 lg:hidden">
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="lg:hidden">
              <div className="flex h-full flex-col">
                <div className="px-2 py-2">
                  <Link href="/" className="flex items-center">
                    <span className="text-xl font-bold">Analytics</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <div className="flex-1">
                  <nav className="flex flex-col gap-2 p-2">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
                <div className="p-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BarChart className="h-5 w-5" />
            <span>Analytics Dashboard</span>
          </Link>

          <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
            <ThemeToggle />
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 border-r lg:block">
            <div className="flex h-full flex-col">
              <div className="px-6 py-4">
                <Link href="/" className="flex items-center gap-2">
                  <BarChart className="h-6 w-6" />
                  <span className="text-xl font-bold">Analytics</span>
                </Link>
              </div>
              <div className="flex-1">
                <nav className="flex flex-col gap-1 px-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="px-2 py-4">
                <div className="flex items-center justify-between px-3 py-2">
                  <div>
                    <ConnectionStatus status={status} />
                  </div>
                  <ThemeToggle />
                </div>
                <Button variant="outline" className="w-full mt-2" asChild>
                  <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Link>
                </Button>
              </div>
            </div>
          </aside>


          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
