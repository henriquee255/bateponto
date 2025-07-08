
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MyBusinesses from "./pages/MyBusinesses";
import Tasks from "./pages/Tasks";
import Timesheet from "./pages/Timesheet";
import Employees from "./pages/Employees";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <SidebarProvider>
              <div className="min-h-screen flex w-full">
                <AppSidebar />
                <main className="flex-1">
                  <header className="h-14 border-b border-border bg-background flex items-center px-4">
                    <SidebarTrigger />
                    <h1 className="ml-4 font-semibold text-foreground">Sistema de Bate Ponto</h1>
                  </header>
                  <div className="flex-1">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/businesses" element={<MyBusinesses />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/timesheet" element={<Timesheet />} />
                      <Route path="/employees" element={<Employees />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </main>
              </div>
            </SidebarProvider>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
