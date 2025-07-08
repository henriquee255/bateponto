import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"

interface DashboardCardProps {
  title: string
  value: string | number
  description?: string
  icon?: ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
}

export function DashboardCard({ title, value, description, icon, trend }: DashboardCardProps) {
  return (
    <Card className="bg-gradient-card shadow-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
        {icon && <div className="text-primary">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center space-x-2 text-xs">
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
          {trend && (
            <span className={trend.isPositive ? "text-green-600" : "text-red-600"}>
              {trend.isPositive ? "↗" : "↘"} {trend.value}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}