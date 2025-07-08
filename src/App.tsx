import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
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
                      <Route path="/businesses" element={<div className="p-6"><h1 className="text-2xl font-bold">Meus Negócios</h1></div>} />
                      <Route path="/tasks" element={<div className="p-6"><h1 className="text-2xl font-bold">Tarefas</h1></div>} />
                      <Route path="/timesheet" element={<div className="p-6"><h1 className="text-2xl font-bold">Bate Ponto</h1></div>} />
                      <Route path="/employees" element={<div className="p-6"><h1 className="text-2xl font-bold">Funcionários</h1></div>} />
                      <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Relatórios</h1></div>} />
                      <Route path="/notifications" element={<div className="p-6"><h1 className="text-2xl font-bold">Notificações</h1></div>} />
                      <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Configurações</h1></div>} />
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
