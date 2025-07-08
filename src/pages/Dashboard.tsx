import { DashboardCard } from "@/components/DashboardCard"
import { Clock, ClipboardList, Users, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo ao sistema de controle de ponto e tarefas</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Bater Ponto
          </Button>
          <Button className="bg-gradient-primary shadow-purple">
            <ClipboardList className="mr-2 h-4 w-4" />
            Nova Tarefa
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Tarefas Pendentes"
          value="12"
          description="3 vencendo hoje"
          icon={<AlertCircle className="h-4 w-4" />}
          trend={{ value: "+2", isPositive: false }}
        />
        <DashboardCard
          title="Tarefas Concluídas"
          value="45"
          description="Esta semana"
          icon={<CheckCircle className="h-4 w-4" />}
          trend={{ value: "+8", isPositive: true }}
        />
        <DashboardCard
          title="Funcionários Ativos"
          value="8"
          description="Trabalhando agora"
          icon={<Users className="h-4 w-4" />}
        />
        <DashboardCard
          title="Produtividade"
          value="92%"
          description="Média mensal"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: "+5%", isPositive: true }}
        />
      </div>

      {/* Grid de Conteúdo */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Tarefas Recentes */}
        <Card className="lg:col-span-2 bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Tarefas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { task: "Revisar relatório mensal", assignee: "João Silva", status: "Pendente", priority: "Alta" },
                { task: "Atualizar sistema", assignee: "Maria Santos", status: "Em andamento", priority: "Média" },
                { task: "Reunião com cliente", assignee: "Pedro Costa", status: "Concluída", priority: "Alta" },
                { task: "Backup dos dados", assignee: "Ana Lima", status: "Pendente", priority: "Baixa" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{item.task}</p>
                    <p className="text-sm text-muted-foreground">Responsável: {item.assignee}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.priority === "Alta" ? "bg-red-100 text-red-800" :
                      item.priority === "Média" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {item.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.status === "Concluída" ? "bg-green-100 text-green-800" :
                      item.status === "Em andamento" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Notificações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Nova tarefa atribuída</p>
                  <p className="text-xs text-muted-foreground">Há 5 minutos</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Tarefa concluída por João</p>
                  <p className="text-xs text-muted-foreground">Há 15 minutos</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Prazo se aproximando</p>
                  <p className="text-xs text-muted-foreground">Há 1 hora</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Novo funcionário registrado</p>
                  <p className="text-xs text-muted-foreground">Há 2 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}