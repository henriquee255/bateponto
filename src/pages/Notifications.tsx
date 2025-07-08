
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, BellOff, Check, X, Clock, User, CheckCircle, AlertTriangle, Info, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: string
  isRead: boolean
  category: "task" | "timesheet" | "system" | "employee"
}

interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  taskReminders: boolean
  timesheetAlerts: boolean
  systemUpdates: boolean
  employeeUpdates: boolean
}

export default function Notifications() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Nova tarefa atribuída",
      message: "Você recebeu uma nova tarefa: 'Revisar relatório mensal'",
      type: "info",
      timestamp: "2024-01-20T10:30:00",
      isRead: false,
      category: "task"
    },
    {
      id: "2",
      title: "Ponto registrado com sucesso",
      message: "Sua entrada foi registrada às 08:30",
      type: "success",
      timestamp: "2024-01-20T08:30:00",
      isRead: true,
      category: "timesheet"
    },
    {
      id: "3",
      title: "Prazo se aproximando",
      message: "A tarefa 'Atualizar sistema' vence em 2 dias",
      type: "warning",
      timestamp: "2024-01-19T15:45:00",
      isRead: false,
      category: "task"
    },
    {
      id: "4",
      title: "Novo funcionário registrado",
      message: "Ana Silva foi cadastrada no sistema",
      type: "info",
      timestamp: "2024-01-19T14:20:00",
      isRead: false,
      category: "employee"
    },
    {
      id: "5",
      title: "Sistema atualizado",
      message: "O sistema foi atualizado para a versão 2.1.0",
      type: "success",
      timestamp: "2024-01-18T09:00:00",
      isRead: true,
      category: "system"
    }
  ])

  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    timesheetAlerts: true,
    systemUpdates: false,
    employeeUpdates: true
  })

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ))
    
    toast({
      title: "Notificação marcada como lida",
      description: "A notificação foi marcada como lida"
    })
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })))
    
    toast({
      title: "Todas as notificações marcadas como lidas",
      description: "Todas as notificações foram marcadas como lidas"
    })
  }

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId))
    
    toast({
      title: "Notificação removida",
      description: "A notificação foi removida com sucesso"
    })
  }

  const handleSettingChange = (setting: keyof NotificationSettings, value: boolean) => {
    setSettings({ ...settings, [setting]: value })
    
    toast({
      title: "Configuração atualizada",
      description: "Suas preferências de notificação foram salvas"
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning": return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "error": return <X className="h-5 w-5 text-red-600" />
      default: return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "task": return <CheckCircle className="h-4 w-4" />
      case "timesheet": return <Clock className="h-4 w-4" />
      case "employee": return <User className="h-4 w-4" />
      case "system": return <Settings className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Agora há pouco"
    if (diffInHours < 24) return `Há ${diffInHours} horas`
    return date.toLocaleDateString('pt-BR')
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notificações</h1>
          <p className="text-muted-foreground">
            Gerencie suas notificações e alertas {unreadCount > 0 && `(${unreadCount} não lidas)`}
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="outline">
            <Check className="mr-2 h-4 w-4" />
            Marcar todas como lidas
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notificações Recentes</span>
                {unreadCount > 0 && (
                  <Badge variant="destructive">{unreadCount}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${
                      notification.isRead 
                        ? "border-border bg-background/50" 
                        : "border-primary/20 bg-primary/5"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-foreground">
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              {getCategoryIcon(notification.category)}
                              <span className="capitalize">{notification.category}</span>
                            </div>
                            <span>{formatTimestamp(notification.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Configurações</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por Email</Label>
                    <p className="text-xs text-muted-foreground">
                      Receber notificações no seu email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações Push</Label>
                    <p className="text-xs text-muted-foreground">
                      Receber notificações no navegador
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lembretes de Tarefas</Label>
                    <p className="text-xs text-muted-foreground">
                      Alertas sobre prazos de tarefas
                    </p>
                  </div>
                  <Switch
                    checked={settings.taskReminders}
                    onCheckedChange={(checked) => handleSettingChange("taskReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas de Ponto</Label>
                    <p className="text-xs text-muted-foreground">
                      Notificações sobre bate ponto
                    </p>
                  </div>
                  <Switch
                    checked={settings.timesheetAlerts}
                    onCheckedChange={(checked) => handleSettingChange("timesheetAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Atualizações do Sistema</Label>
                    <p className="text-xs text-muted-foreground">
                      Informações sobre atualizações
                    </p>
                  </div>
                  <Switch
                    checked={settings.systemUpdates}
                    onCheckedChange={(checked) => handleSettingChange("systemUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Atualizações de Funcionários</Label>
                    <p className="text-xs text-muted-foreground">
                      Mudanças na equipe
                    </p>
                  </div>
                  <Switch
                    checked={settings.employeeUpdates}
                    onCheckedChange={(checked) => handleSettingChange("employeeUpdates", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
