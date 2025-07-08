
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Plus, Clock, User, Eye, EyeOff, CheckCircle, AlertCircle, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
  assignedBy: string
  priority: "baixa" | "media" | "alta"
  status: "pendente" | "em-andamento" | "concluida"
  deadline: string
  isVisible: boolean
  isHidden: boolean
  createdAt: string
}

const mockUsers = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Santos" },
  { id: "3", name: "Pedro Costa" },
  { id: "4", name: "Ana Lima" }
]

export default function Tasks() {
  const { toast } = useToast()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Revisar relatório mensal",
      description: "Análise completa dos dados de vendas do mês anterior",
      assignedTo: "João Silva",
      assignedBy: "Admin",
      priority: "alta",
      status: "pendente",
      deadline: "2024-01-20",
      isVisible: true,
      isHidden: false,
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      title: "Atualizar sistema",
      description: "Implementar novas funcionalidades do sistema",
      assignedTo: "Maria Santos",
      assignedBy: "Admin",
      priority: "media",
      status: "em-andamento",
      deadline: "2024-01-25",
      isVisible: true,
      isHidden: false,
      createdAt: "2024-01-16"
    }
  ])

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "media" as "baixa" | "media" | "alta",
    deadline: "",
    isVisible: true,
    isHidden: false
  })

  const handleCreateTask = () => {
    if (!formData.title.trim() || !formData.assignedTo) {
      toast({
        title: "Erro",
        description: "Título e responsável são obrigatórios",
        variant: "destructive"
      })
      return
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      assignedTo: formData.assignedTo,
      assignedBy: "Usuário Atual",
      priority: formData.priority,
      status: "pendente",
      deadline: formData.deadline,
      isVisible: formData.isVisible,
      isHidden: formData.isHidden,
      createdAt: new Date().toISOString().split('T')[0]
    }

    setTasks([...tasks, newTask])
    setFormData({
      title: "",
      description: "",
      assignedTo: "",
      priority: "media",
      deadline: "",
      isVisible: true,
      isHidden: false
    })
    setIsCreateOpen(false)
    
    toast({
      title: "Sucesso",
      description: "Tarefa criada com sucesso!"
    })
  }

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status } : task
    )
    setTasks(updatedTasks)
    
    toast({
      title: "Status atualizado",
      description: `Tarefa marcada como ${status}`
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta": return "bg-red-100 text-red-800"
      case "media": return "bg-yellow-100 text-yellow-800"
      case "baixa": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluida": return "bg-green-100 text-green-800"
      case "em-andamento": return "bg-blue-100 text-blue-800"
      case "pendente": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluida": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "em-andamento": return <Clock className="h-4 w-4 text-blue-600" />
      case "pendente": return <AlertCircle className="h-4 w-4 text-gray-600" />
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredTasks = tasks.filter(task => task.isVisible || !task.isHidden)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tarefas</h1>
          <p className="text-muted-foreground">Gerencie e acompanhe todas as tarefas</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-purple">
              <Plus className="mr-2 h-4 w-4" />
              Nova Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Tarefa</DialogTitle>
              <DialogDescription>
                Preencha as informações para criar uma nova tarefa
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="taskTitle">Título da Tarefa</Label>
                <Input
                  id="taskTitle"
                  placeholder="Digite o título da tarefa"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="taskDescription">Descrição</Label>
                <Textarea
                  id="taskDescription"
                  placeholder="Descreva a tarefa em detalhes"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assignedTo">Responsável</Label>
                  <Select
                    value={formData.assignedTo}
                    onValueChange={(value) => setFormData({ ...formData, assignedTo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockUsers.map((user) => (
                        <SelectItem key={user.id} value={user.name}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: "baixa" | "media" | "alta") => 
                      setFormData({ ...formData, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="deadline">Prazo</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isVisible"
                    checked={formData.isVisible}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, isVisible: checked as boolean })
                    }
                  />
                  <Label htmlFor="isVisible">Visível para todos</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isHidden"
                    checked={formData.isHidden}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, isHidden: checked as boolean })
                    }
                  />
                  <Label htmlFor="isHidden">Tarefa oculta</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateTask}>
                Criar Tarefa
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tasks Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="bg-gradient-card shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(task.status)}
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-1">
                  {task.isHidden ? <EyeOff className="h-4 w-4 text-muted-foreground" /> 
                    : <Eye className="h-4 w-4 text-muted-foreground" />}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{task.description}</p>
              
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{task.assignedTo}</span>
              </div>

              {task.deadline && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{new Date(task.deadline).toLocaleDateString('pt-BR')}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
                <Badge className={getStatusColor(task.status)}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </Badge>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleStatusChange(task.id, "em-andamento")}
                  disabled={task.status === "em-andamento"}
                >
                  Iniciar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleStatusChange(task.id, "concluida")}
                  disabled={task.status === "concluida"}
                >
                  Concluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
