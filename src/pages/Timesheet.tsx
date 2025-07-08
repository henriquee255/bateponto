import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Clock, Play, Pause, Square, Coffee, FileText, Calendar, Timer, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TimeRecord {
  id: string
  date: string
  clockIn: string | null
  lunchOut: string | null
  lunchIn: string | null
  clockOut: string | null
  totalHours: string
  observations: string
  status: "incomplete" | "complete" | "late"
}

export default function Timesheet() {
  const { toast } = useToast()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isObservationOpen, setIsObservationOpen] = useState(false)
  const [observation, setObservation] = useState("")
  const [records, setRecords] = useState<TimeRecord[]>([
    {
      id: "1",
      date: "2024-01-15",
      clockIn: "08:30",
      lunchOut: "12:00",
      lunchIn: "13:00",
      clockOut: "17:30",
      totalHours: "8h 00m",
      observations: "",
      status: "complete"
    },
    {
      id: "2",
      date: "2024-01-14",
      clockIn: "08:45",
      lunchOut: "12:15",
      lunchIn: "13:15",
      clockOut: "17:45",
      totalHours: "8h 00m",
      observations: "Atraso devido ao trânsito",
      status: "late"
    }
  ])

  const [todayRecord, setTodayRecord] = useState<TimeRecord>({
    id: "today",
    date: new Date().toISOString().split('T')[0],
    clockIn: null,
    lunchOut: null,
    lunchIn: null,
    clockOut: null,
    totalHours: "0h 00m",
    observations: "",
    status: "incomplete"
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getCurrentTime = () => {
    return currentTime.toTimeString().slice(0, 5)
  }

  const handleClockAction = (action: "clockIn" | "lunchOut" | "lunchIn" | "clockOut") => {
    const time = getCurrentTime()
    const updated = { ...todayRecord, [action]: time }
    
    if (action === "clockOut") {
      updated.status = "complete"
      updated.totalHours = calculateTotalHours(updated)
    }
    
    setTodayRecord(updated)
    
    const actionNames = {
      clockIn: "Entrada",
      lunchOut: "Saída para almoço",
      lunchIn: "Volta do almoço", 
      clockOut: "Saída"
    }
    
    toast({
      title: "Ponto registrado",
      description: `${actionNames[action]} registrada às ${time}`
    })
  }

  const calculateTotalHours = (record: TimeRecord): string => {
    if (!record.clockIn || !record.clockOut) return "0h 00m"
    
    const clockIn = new Date(`2000-01-01T${record.clockIn}:00`)
    const clockOut = new Date(`2000-01-01T${record.clockOut}:00`)
    
    let totalMinutes = (clockOut.getTime() - clockIn.getTime()) / (1000 * 60)
    
    // Subtrair intervalo de almoço se registrado
    if (record.lunchOut && record.lunchIn) {
      const lunchOut = new Date(`2000-01-01T${record.lunchOut}:00`)
      const lunchIn = new Date(`2000-01-01T${record.lunchIn}:00`)
      const lunchMinutes = (lunchIn.getTime() - lunchOut.getTime()) / (1000 * 60)
      totalMinutes -= lunchMinutes
    }
    
    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.floor(totalMinutes % 60)
    
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`
  }

  const handleAddObservation = () => {
    const updated = { ...todayRecord, observations: observation }
    setTodayRecord(updated)
    setObservation("")
    setIsObservationOpen(false)
    
    toast({
      title: "Observação adicionada",
      description: "Observação salva com sucesso"
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete": return "bg-green-100 text-green-800"
      case "late": return "bg-red-100 text-red-800"
      case "incomplete": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "complete": return "Completo"
      case "late": return "Atraso"
      case "incomplete": return "Incompleto"
      default: return "Indefinido"
    }
  }

  const getNextAction = () => {
    if (!todayRecord.clockIn) return { action: "clockIn", label: "Registrar Entrada", icon: Play }
    if (!todayRecord.lunchOut) return { action: "lunchOut", label: "Saída Almoço", icon: Coffee }
    if (!todayRecord.lunchIn) return { action: "lunchIn", label: "Volta Almoço", icon: Coffee }
    if (!todayRecord.clockOut) return { action: "clockOut", label: "Registrar Saída", icon: Square }
    return null
  }

  const nextAction = getNextAction()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bate Ponto</h1>
          <p className="text-muted-foreground">Controle seus horários de trabalho</p>
        </div>
      </div>

      {/* Current Time & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Time Card */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Horário Atual</CardTitle>
            <div className="text-4xl font-mono font-bold text-primary">
              {currentTime.toTimeString().slice(0, 8)}
            </div>
            <p className="text-muted-foreground">
              {currentTime.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </CardHeader>
        </Card>

        {/* Quick Action Card */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Próxima Ação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nextAction ? (
              <Button
                onClick={() => handleClockAction(nextAction.action as any)}
                className="w-full bg-gradient-primary shadow-purple"
                size="lg"
              >
                <nextAction.icon className="mr-2 h-5 w-5" />
                {nextAction.label}
              </Button>
            ) : (
              <div className="text-center text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-600" />
                <p>Todos os pontos registrados hoje!</p>
              </div>
            )}

            <Dialog open={isObservationOpen} onOpenChange={setIsObservationOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Adicionar Observação
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Observação</DialogTitle>
                  <DialogDescription>
                    Adicione uma observação sobre seu horário de hoje
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <Label htmlFor="observation">Observação</Label>
                  <Textarea
                    id="observation"
                    placeholder="Ex: Atraso devido ao trânsito, saída antecipada..."
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsObservationOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddObservation}>
                    Salvar Observação
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Today's Record */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Registro de Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Entrada</p>
              <p className="text-lg font-mono font-bold">
                {todayRecord.clockIn || "--:--"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Saída Almoço</p>
              <p className="text-lg font-mono font-bold">
                {todayRecord.lunchOut || "--:--"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Volta Almoço</p>
              <p className="text-lg font-mono font-bold">
                {todayRecord.lunchIn || "--:--"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Saída</p>
              <p className="text-lg font-mono font-bold">
                {todayRecord.clockOut || "--:--"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Timer className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Total: {todayRecord.totalHours}</span>
            </div>
            <Badge className={getStatusColor(todayRecord.status)}>
              {getStatusText(todayRecord.status)}
            </Badge>
          </div>

          {todayRecord.observations && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Observações:</p>
              <p className="text-sm text-muted-foreground">{todayRecord.observations}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Historical Records */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Histórico de Pontos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {records.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {new Date(record.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {record.clockIn} - {record.clockOut}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{record.totalHours}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(record.status)}>
                    {getStatusText(record.status)}
                  </Badge>
                  {record.observations && (
                    <Badge variant="outline">
                      <FileText className="h-3 w-3 mr-1" />
                      Com observação
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
