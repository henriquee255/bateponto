
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Building, Plus, Edit, Copy, Share, Key, Users, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Business {
  id: string
  name: string
  image: string
  accessCode: string
  inviteKey: string
  inviteLink: string
  employeeCount: number
  createdAt: string
}

export default function MyBusinesses() {
  const { toast } = useToast()
  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: "1",
      name: "Empresa ABC Ltda",
      image: "/placeholder.svg",
      accessCode: "ABC123",
      inviteKey: "abc-xyz-789",
      inviteLink: "https://sistema.com/invite/abc-xyz-789",
      employeeCount: 15,
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      name: "Tech Solutions",
      image: "/placeholder.svg",
      accessCode: "TECH456",
      inviteKey: "tech-456-def",
      inviteLink: "https://sistema.com/invite/tech-456-def",
      employeeCount: 8,
      createdAt: "2024-02-10"
    }
  ])

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    image: ""
  })

  const handleCreateBusiness = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "Nome do negócio é obrigatório",
        variant: "destructive"
      })
      return
    }

    const newBusiness: Business = {
      id: Date.now().toString(),
      name: formData.name,
      image: formData.image || "/placeholder.svg",
      accessCode: generateCode(),
      inviteKey: generateInviteKey(),
      inviteLink: `https://sistema.com/invite/${generateInviteKey()}`,
      employeeCount: 1,
      createdAt: new Date().toISOString().split('T')[0]
    }

    setBusinesses([...businesses, newBusiness])
    setFormData({ name: "", image: "" })
    setIsCreateOpen(false)
    
    toast({
      title: "Sucesso",
      description: "Negócio criado com sucesso!"
    })
  }

  const handleEditBusiness = () => {
    if (!selectedBusiness || !formData.name.trim()) return

    const updatedBusinesses = businesses.map(business =>
      business.id === selectedBusiness.id
        ? { ...business, name: formData.name, image: formData.image || business.image }
        : business
    )

    setBusinesses(updatedBusinesses)
    setIsEditOpen(false)
    setSelectedBusiness(null)
    setFormData({ name: "", image: "" })
    
    toast({
      title: "Sucesso",
      description: "Negócio atualizado com sucesso!"
    })
  }

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const generateInviteKey = () => {
    return Math.random().toString(36).substring(2, 15)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado!",
      description: `${type} copiado para a área de transferência`
    })
  }

  const openEditDialog = (business: Business) => {
    setSelectedBusiness(business)
    setFormData({ name: business.name, image: business.image })
    setIsEditOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meus Negócios</h1>
          <p className="text-muted-foreground">Gerencie seus negócios e empresas</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-purple">
              <Plus className="mr-2 h-4 w-4" />
              Novo Negócio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Negócio</DialogTitle>
              <DialogDescription>
                Preencha as informações para criar um novo negócio
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Nome do Negócio</Label>
                <Input
                  id="businessName"
                  placeholder="Digite o nome do negócio"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="businessImage">URL da Imagem (opcional)</Label>
                <Input
                  id="businessImage"
                  placeholder="https://exemplo.com/imagem.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateBusiness}>
                Criar Negócio
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Business Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {businesses.map((business) => (
          <Card key={business.id} className="bg-gradient-card shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{business.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {business.employeeCount} funcionários
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEditDialog(business)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Código de Acesso:</span>
                  <div className="flex items-center space-x-2">
                    <code className="bg-muted px-2 py-1 rounded text-sm">
                      {business.accessCode}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(business.accessCode, "Código de acesso")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Chave de Convite:</span>
                  <div className="flex items-center space-x-2">
                    <code className="bg-muted px-2 py-1 rounded text-sm">
                      {business.inviteKey}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(business.inviteKey, "Chave de convite")}
                    >
                      <Key className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Link de Convite:</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(business.inviteLink, "Link de convite")}
                  >
                    <Share className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-2 pt-3">
                <Button variant="outline" className="flex-1" size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Funcionários
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Negócio</DialogTitle>
            <DialogDescription>
              Atualize as informações do seu negócio
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editBusinessName">Nome do Negócio</Label>
              <Input
                id="editBusinessName"
                placeholder="Digite o nome do negócio"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editBusinessImage">URL da Imagem</Label>
              <Input
                id="editBusinessImage"
                placeholder="https://exemplo.com/imagem.jpg"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditBusiness}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
