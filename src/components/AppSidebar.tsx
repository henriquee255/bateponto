
import { Building, Users, ClipboardList, Clock, Settings, Bell, Home, BarChart3, LogOut } from "lucide-react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import logo from "@/assets/logo.png"
import { useToast } from "@/hooks/use-toast"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Meus Negócios", url: "/businesses", icon: Building },
  { title: "Tarefas", url: "/tasks", icon: ClipboardList },
  { title: "Bate Ponto", url: "/timesheet", icon: Clock },
  { title: "Funcionários", url: "/employees", icon: Users },
  { title: "Relatórios", url: "/reports", icon: BarChart3 },
  { title: "Notificações", url: "/notifications", icon: Bell },
  { title: "Configurações", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const currentPath = location.pathname

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true
    if (path !== "/" && currentPath.startsWith(path)) return true
    return false
  }

  const getNavCls = (path: string) =>
    isActive(path) 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"

  const handleLogout = () => {
    // Remover dados de login do localStorage
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso"
    })
    
    // Redirecionar para login
    navigate("/login")
  }

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar">
        <div className="p-4 flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
          {state !== "collapsed" && (
            <h2 className="text-lg font-bold text-sidebar-foreground">Bate Ponto</h2>
          )}
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Seção de logout */}
        <div className="mt-auto p-4">
          <SidebarMenuButton 
            onClick={handleLogout}
            className="w-full text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            {state !== "collapsed" && <span>Sair</span>}
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
