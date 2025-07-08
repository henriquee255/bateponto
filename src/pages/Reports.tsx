
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BarChart3, Download, Calendar as CalendarIcon, Users, Clock, CheckCircle, TrendingUp, FileText } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ReportData {
  type: string
  title: string
  value: string | number
  change: string
  isPositive: boolean
}

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedBusiness, setSelectedBusiness] = useState("all")
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: new Date(),
    to: new Date()
  })

  const reportData: ReportData[] = [
    {
      type: "tasks",
      title: "Tarefas Concluídas",
      value: 85,
      change: "+12%",
      isPositive: true
    },
    {
      type: "employees",
      title: "Funcionários Ativos",
      value: 23,
      change: "+3",
      isPositive: true
    },
    {
      type: "hours",
      title: "Horas Trabalhadas",
      value: "1,840h",
      change: "+5.2%",
      isPositive: true
    },
    {
      type: "productivity",
      title: "Produtividade Média",
      value: "92%",
      change: "-2%",
      isPositive: false
    }
  ]

  const taskReports = [
    { department: "Tecnologia", completed: 45, pending: 8, total: 53 },
    { department: "Design", completed: 32, pending: 5, total: 37 },
    { department: "Marketing", completed: 28, pending: 12, total: 40 },
    { department: "Vendas", completed: 35, pending: 3, total: 38 }
  ]

  const employeeReports = [
    { name: "João Silva", tasksCompleted: 15, hoursWorked: "168h", productivity: "95%" },
    { name: "Maria Santos", tasksCompleted: 12, hoursWorked: "160h", productivity: "89%" },
    { name: "Pedro Costa", tasksCompleted: 18, hoursWorked: "172h", productivity: "93%" },
    { name: "Ana Lima", tasksCompleted: 10, hoursWorked: "156h", productivity: "87%" }
  ]

  const handleExportReport = (type: string) => {
    // Simulação de exportação
    console.log(`Exportando relatório: ${type}`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">Análise de dados e métricas de desempenho</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Filtros de Relatório</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Período</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mês</SelectItem>
                  <SelectItem value="quarter">Este trimestre</SelectItem>
                  <SelectItem value="year">Este ano</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Empresa</label>
              <Select value={selectedBusiness} onValueChange={setSelectedBusiness}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as empresas</SelectItem>
                  <SelectItem value="1">Empresa ABC Ltda</SelectItem>
                  <SelectItem value="2">Tech Solutions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="bg-gradient-primary shadow-purple">
                <BarChart3 className="mr-2 h-4 w-4" />
                Gerar Relatório
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reportData.map((item, index) => (
          <Card key={index} className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <div className="text-primary">
                {item.type === "tasks" && <CheckCircle className="h-4 w-4" />}
                {item.type === "employees" && <Users className="h-4 w-4" />}
                {item.type === "hours" && <Clock className="h-4 w-4" />}
                {item.type === "productivity" && <TrendingUp className="h-4 w-4" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="flex items-center space-x-2 text-xs">
                <span className={item.isPositive ? "text-green-600" : "text-red-600"}>
                  {item.isPositive ? "↗" : "↘"} {item.change}
                </span>
                <span className="text-muted-foreground">vs período anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Reports */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Tasks by Department */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Tarefas por Departamento</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleExportReport("tasks-department")}>
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taskReports.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{dept.department}</span>
                    <span className="text-sm text-muted-foreground">
                      {dept.completed}/{dept.total} concluídas
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(dept.completed / dept.total) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{dept.completed} concluídas</span>
                    <span>{dept.pending} pendentes</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Employee Performance */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Desempenho dos Funcionários</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleExportReport("employee-performance")}>
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeeReports.map((employee, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{employee.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{employee.tasksCompleted} tarefas</span>
                      <span>{employee.hoursWorked}</span>
                    </div>
                  </div>
                  <Badge 
                    className={
                      parseInt(employee.productivity) >= 90 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {employee.productivity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Exportar Relatórios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => handleExportReport("complete-report")}
            >
              <FileText className="h-8 w-8 mb-2" />
              <span>Relatório Completo</span>
              <span className="text-xs text-muted-foreground">PDF</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => handleExportReport("timesheet-report")}
            >
              <Clock className="h-8 w-8 mb-2" />
              <span>Relatório de Ponto</span>
              <span className="text-xs text-muted-foreground">Excel</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => handleExportReport("tasks-report")}
            >
              <CheckCircle className="h-8 w-8 mb-2" />
              <span>Relatório de Tarefas</span>
              <span className="text-xs text-muted-foreground">CSV</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => handleExportReport("productivity-report")}
            >
              <TrendingUp className="h-8 w-8 mb-2" />
              <span>Relatório de Produtividade</span>
              <span className="text-xs text-muted-foreground">PDF</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
