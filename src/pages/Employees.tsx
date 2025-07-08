
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Plus, Edit, Mail, Phone, Building, Shield, UserCheck, UserX, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  role: "admin" | "manager" | "employee"
  status: "active" | "inactive"
  avatar: string
  joinDate: string
  businessId: string
}

const mockBusinesses = [
  { id: "1", name: "Empresa ABC Ltda" },
  { id: "2", name: "Tech Solutions" }
]

export default function Employees() {
  const { toast } = useToast()
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao@empresa.com",
      phone: "(11) 99999-9999",
      position: "Desenvolvedor Senior",
      department: "Tecnologia",
      role: "employee",
      status: "active",
      avatar: "/placeholder.svg",
      joinDate: "2023-01-15",
      businessId: "1"
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@empresa.com", 
      phone: "(11) 88888-8888",
      position: "Gerente de Projetos",
      department: "Gestão",
      role: "manager",
      status: "active",
      avatar: "/placeholder.svg",
      joinDate: "2022-08-10",
      businessId: "1"
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@empresa.com",
      phone: "(11) 77777-7777",
      position: "Designer UI/UX",
      department: "Design",
      role: "employee",
      status: "inactive",
      avatar: "/placeholder.svg",
      joinDate: "2023-05-20",
      businessId: "2"
    }
  ])

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    role: "employee" as "admin" | "manager" | "employee",
    businessId: "",
    avatar: ""
  })

  const handleCreateEmployee = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.businessId) {
      toast({
        title: "Erro",
        description: "Nome, email e empresa são obrigatórios",
        variant: "destructive"
      })
      return
    }

    const newEmployee: Employee = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      department: formData.department,
      role: formData.role,
      status: "active",
      avatar: formData.avatar || "/placeholder.svg",
      joinDate: new Date().toISOString().split('T')[0],
      businessId: formData.businessId
    }

    setEmployees([...employees, newEmployee])
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      role: "employee",
      businessId: "",
      avatar: ""
    })
    setIsCreateOpen(false)
    
    toast({
      title: "Sucesso",
      description: "Funcionário cadastrado com sucesso!"
    })
  }

  const handleEditEmployee = () => {
    if (!selectedEmployee || !formData.name.trim() || !formData.email.trim()) return

    const updatedEmployees = employees.map(employee =>
      employee.id === selectedEmployee.id
        ? { 
            ...employee, 
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            position: formData.position,
            department: formData.department,
            role: formData.role,
            avatar: formData.avatar || employee.avatar
          }
        : employee
    )

    setEmployees(updatedEmployees)
    setIsEditOpen(false)
    setSelectedEmployee(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      role: "employee",
      businessId: "",
      avatar: ""
    })
    
    toast({
      title: "Sucesso",
      description: "Funcionário atualizado com sucesso!"
    })
  }

  const handleStatusToggle = (employeeId: string) => {
    const updatedEmployees = employees.map(employee =>
      employee.id === employeeId
        ? { ...employee, status: employee.status === "active" ? "inactive" : "active" as "active" | "inactive" }
        : employee
    )
    
    setEmployees(updatedEmployees)
    
    const employee = employees.find(e => e.id === employeeId)
    const newStatus = employee?.status === "active" ? "inativo" : "ativo"
    
    toast({
      title: "Status atualizado",
      description: `Funcionário marcado como ${newStatus}`
    })
  }

  const openEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee)
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      position: employee.position,
      department: employee.department,
      role: employee.role,
      businessId: employee.businessId,
      avatar: employee.avatar
    })
    setIsEditOpen(true)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800"
      case "manager": return "bg-blue-100 text-blue-800"
      case "employee": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin": return "Administrador"
      case "manager": return "Gerente"
      case "employee": return "Funcionário"
      default: return "Indefinido"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const getBusinessName = (businessId: string) => {
    const business = mockBusinesses.find(b => b.id === businessId)
    return business?.name || "Empresa não encontrada"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Funcionários</h1>
          <p className="text-muted-foreground">Gerencie sua equipe e colaboradores</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-purple">
              <Plus className="mr-2 h-4 w-4" />
              Novo Funcionário
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Funcionário</DialogTitle>
              <DialogDescription>
                Preencha as informações para cadastrar um novo funcionário
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeName">Nome Completo</Label>
                  <Input
                    id="employeeName"
                    placeholder="Digite o nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="employeeEmail">Email</Label>
                  <Input
                    id="employeeEmail"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeePhone">Telefone</Label>
                  <Input
                    id="employeePhone"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="employeePosition">Cargo</Label>
                  <Input
                    id="employeePosition"
                    placeholder="Ex: Desenvolvedor, Analista..."
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeDepartment">Departamento</Label>
                  <Input
                    id="employeeDepartment"
                    placeholder="Ex: TI, RH, Vendas..."
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="employeeRole">Nível de Acesso</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: "admin" | "manager" | "employee") => 
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Funcionário</SelectItem>
                      <SelectItem value="manager">Gerente</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="employeeBusiness">Empresa</Label>
                <Select
                  value={formData.businessId}
                  onValueChange={(value) => setFormData({ ...formData, businessId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBusinesses.map((business) => (
                      <SelectItem key={business.id} value={business.id}>
                        {business.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="employeeAvatar">URL do Avatar (opcional)</Label>
                <Input
                  id="employeeAvatar"
                  placeholder="https://exemplo.com/avatar.jpg"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateEmployee}>
                Cadastrar Funcionário
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Employees Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <Card key={employee.id} className="bg-gradient-card shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback>
                      {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEditDialog(employee)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{employee.email}</span>
                </div>
                
                {employee.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{employee.phone}</span>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{getBusinessName(employee.businessId)}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Desde {new Date(employee.joinDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge className={getRoleColor(employee.role)}>
                  <Shield className="h-3 w-3 mr-1" />
                  {getRoleText(employee.role)}
                </Badge>
                <Badge className={getStatusColor(employee.status)}>
                  {employee.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleStatusToggle(employee.id)}
                >
                  {employee.status === "active" ? (
                    <>
                      <UserX className="mr-2 h-4 w-4" />
                      Desativar
                    </>
                  ) : (
                    <>
                      <UserCheck className="mr-2 h-4 w-4" />
                      Ativar
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Funcionário</DialogTitle>
            <DialogDescription>
              Atualize as informações do funcionário
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editEmployeeName">Nome Completo</Label>
                <Input
                  id="editEmployeeName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="editEmployeeEmail">Email</Label>
                <Input
                  id="editEmployeeEmail"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editEmployeePhone">Telefone</Label>
                <Input
                  id="editEmployeePhone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="editEmployeePosition">Cargo</Label>
                <Input
                  id="editEmployeePosition"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editEmployeeDepartment">Departamento</Label>
                <Input
                  id="editEmployeeDepartment"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="editEmployeeRole">Nível de Acesso</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: "admin" | "manager" | "employee") => 
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Funcionário</SelectItem>
                    <SelectItem value="manager">Gerente</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditEmployee}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
