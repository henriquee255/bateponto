
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Phone } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular validação de login
    try {
      // Validação básica
      if (!password) {
        toast({
          title: "Erro",
          description: "Por favor, digite sua senha",
          variant: "destructive"
        })
        return
      }

      if (loginMethod === "email" && !email) {
        toast({
          title: "Erro", 
          description: "Por favor, digite seu email",
          variant: "destructive"
        })
        return
      }

      if (loginMethod === "phone" && !phone) {
        toast({
          title: "Erro",
          description: "Por favor, digite seu número de celular", 
          variant: "destructive"
        })
        return
      }

      // Simular delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Salvar estado de login no localStorage
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", loginMethod === "email" ? email : phone)

      toast({
        title: "Sucesso",
        description: "Login realizado com sucesso!"
      })

      navigate("/")
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao fazer login. Tente novamente.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Implementar login com Google
    toast({
      title: "Em desenvolvimento",
      description: "Login com Google será implementado em breve"
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20 p-4">
      <Card className="w-full max-w-md bg-card shadow-lg border-border">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary-foreground">BP</span>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Bem-vindo</CardTitle>
          <CardDescription className="text-muted-foreground">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Seletor de método de login */}
            <div className="flex space-x-2 bg-muted p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setLoginMethod("email")}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm transition-colors ${
                  loginMethod === "email" 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("phone")}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm transition-colors ${
                  loginMethod === "phone" 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Phone className="h-4 w-4" />
                <span>Celular</span>
              </button>
            </div>

            {/* Campo de login */}
            <div className="space-y-2">
              <Label htmlFor="login" className="text-foreground">
                {loginMethod === "email" ? "Email" : "Número do celular"}
              </Label>
              <Input
                id="login"
                type={loginMethod === "email" ? "email" : "tel"}
                placeholder={loginMethod === "email" ? "seu@email.com" : "(11) 99999-9999"}
                value={loginMethod === "email" ? email : phone}
                onChange={(e) => loginMethod === "email" ? setEmail(e.target.value) : setPhone(e.target.value)}
                required
                className="bg-background border-border text-foreground"
              />
            </div>

            {/* Campo de senha */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background border-border text-foreground pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Esqueci a senha */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80"
              >
                Esqueci minha senha
              </button>
            </div>

            {/* Botão de login */}
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">ou continue com</span>
            </div>
          </div>

          {/* Login com Google */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full border-border text-foreground hover:bg-accent"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar com Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
