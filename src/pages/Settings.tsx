
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { User, Mail, Phone, Lock, Moon, Sun, Bell, Shield, Palette, Camera, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  name: string
  email: string
  phone: string
  avatar: string
  position: string
  department: string
}

interface AppSettings {
  darkMode: boolean
  notifications: boolean
  emailAlerts: boolean
  autoSave: boolean
  compactView: boolean
  showAvatars: boolean
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  sessionTimeout: string
  passwordExpiry: string
  loginNotifications: boolean
}

export default function Settings() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "João Silva",
    email: "joao@empresa.com",
    phone: "(11) 99999-9999",
    avatar: "/placeholder.svg",
    position: "Desenvolvedor Senior",
    department: "Tecnologia"
  })

  const [appSettings, setAppSettings] = useState<AppSettings>({
    darkMode: false,
    notifications: true,
    emailAlerts: true,
    autoSave: true,
    compactView: false,
    showAvatars: true
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginNotifications: true
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleProfileUpdate = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso"
    })
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive"
      })
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Erro", 
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive"
      })
      return
    }

    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setIsPasswordDialogOpen(false)
    
    toast({
      title: "Senha alterada",
      description: "Sua senha foi alterada com sucesso"
    })
  }

  const handleAppSettingChange = (setting: keyof AppSettings, value: boolean) => {
    setAppSettings({ ...appSettings, [setting]: value })
    
    toast({
      title: "Configuração salva",
      description: "Suas preferências foram atualizadas"
    })
  }

  const handleSecuritySettingChange = (setting: keyof SecuritySettings, value: boolean | string) => {
    setSecuritySettings({ ...securitySettings, [setting]: value })
    
    toast({
      title: "Configuração de segurança salva",
      description: "Suas configurações de segurança foram atualizadas"
    })
  }

  const tabs = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "appearance", label: "Aparência", icon: Palette },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "security", label: "Segurança", icon: Shield }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências e configurações da conta</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar Navigation */}
        <Card className="lg:col-span-1 bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback>
                      {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="mr-2 h-4 w-4" />
                      Alterar Foto
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG ou GIF. Máximo 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="position">Cargo</Label>
                    <Input
                      id="position"
                      value={profile.position}
                      onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Lock className="mr-2 h-4 w-4" />
                        Alterar Senha
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Alterar Senha</DialogTitle>
                        <DialogDescription>
                          Digite sua senha atual e a nova senha
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Senha Atual</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">Nova Senha</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handlePasswordChange}>
                          Alterar Senha
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button onClick={handleProfileUpdate} className="bg-gradient-primary shadow-purple">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Aparência e Interface</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center space-x-2">
                      <Moon className="h-4 w-4" />
                      <span>Modo Escuro</span>
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Usar tema escuro em todo o sistema
                    </p>
                  </div>
                  <Switch
                    checked={appSettings.darkMode}
                    onCheckedChange={(checked) => handleAppSettingChange("darkMode", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Visualização Compacta</Label>
                    <p className="text-xs text-muted-foreground">
                      Reduzir espaçamento entre elementos
                    </p>
                  </div>
                  <Switch
                    checked={appSettings.compactView}
                    onCheckedChange={(checked) => handleAppSettingChange("compactView", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mostrar Avatares</Label>
                    <p className="text-xs text-muted-foreground">
                      Exibir fotos de perfil nas listas
                    </p>
                  </div>
                  <Switch
                    checked={appSettings.showAvatars}
                    onCheckedChange={(checked) => handleAppSettingChange("showAvatars", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Salvamento Automático</Label>
                    <p className="text-xs text-muted-foreground">
                      Salvar alterações automaticamente
                    </p>
                  </div>
                  <Switch
                    checked={appSettings.autoSave}
                    onCheckedChange={(checked) => handleAppSettingChange("autoSave", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span>Notificações do Sistema</span>
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Receber notificações no navegador
                    </p>
                  </div>
                  <Switch
                    checked={appSettings.notifications}
                    onCheckedChange={(checked) => handleAppSettingChange("notifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Alertas por Email</span>
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Receber notificações importantes por email
                    </p>
                  </div>
                  <Switch
                    checked={appSettings.emailAlerts}
                    onCheckedChange={(checked) => handleAppSettingChange("emailAlerts", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Segurança da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-xs text-muted-foreground">
                      Adicionar uma camada extra de segurança
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorEnabled}
                    onCheckedChange={(checked) => handleSecuritySettingChange("twoFactorEnabled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações de Login</Label>
                    <p className="text-xs text-muted-foreground">
                      Ser notificado sobre novos logins
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) => handleSecuritySettingChange("loginNotifications", checked)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sessionTimeout">Timeout da Sessão (minutos)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => handleSecuritySettingChange("sessionTimeout", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="passwordExpiry">Expiração da Senha (dias)</Label>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => handleSecuritySettingChange("passwordExpiry", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
