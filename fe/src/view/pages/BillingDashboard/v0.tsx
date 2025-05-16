"use client"

import { useState } from "react"
import {
  BarChart,
  CalendarDays,
  Download,
  Filter,
  Info,
  Settings,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Chart } from "@/components/ui/chart"

export default function BillingDashboard() {
  const [selectedProbe, setSelectedProbe] = useState<string | null>(null)
  const [selectedProbeData, setSelectedProbeData] = useState<any>(null)
  const [dateRange, setDateRange] = useState("01 de Maio a 15 de Maio")
  const [showAnomalies, setShowAnomalies] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex items-center gap-2 font-semibold text-lg text-teal-700">
          <BarChart className="h-6 w-6" />
          <span>Rig Manager</span>
          <Badge variant="outline" className="ml-2">
            2025
          </Badge>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4" />
            <span>{dateRange}</span>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            <span>Filtros</span>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Configurações</span>
          </Button>
        </div>
      </header>
      <div className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard de Faturamento</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowAnomalies(!showAnomalies)}>
              <AlertTriangle className={`mr-2 h-4 w-4 ${showAnomalies ? "text-red-500" : ""}`} />
              {showAnomalies ? "Ocultar Anomalias" : "Mostrar Anomalias"}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
              <div className="text-teal-700">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Valor total faturado no período selecionado</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 3.256.834,04</div>
              <p className="text-xs text-muted-foreground">Faturamento total no período selecionado</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-green-500">
                <TrendingUp className="h-3 w-3" />
                <span>+5.2% em relação ao período anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Glosa</CardTitle>
              <div className="text-red-500">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                      <Info className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Detalhes da Glosa</DialogTitle>
                      <DialogDescription>Faturamento perdido por processo, logística ou segurança</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div>
                        <h4 className="mb-2 font-medium">Distribuição por Categoria</h4>
                        <div className="h-[200px]">
                          <Chart
                            type="pie"
                            data={{
                              labels: ["Processo", "Logística", "Segurança"],
                              datasets: [
                                {
                                  data: [45, 30, 25],
                                  backgroundColor: ["#f87171", "#fb923c", "#fbbf24"],
                                },
                              ],
                            }}
                            options={{
                              plugins: {
                                legend: {
                                  position: "right",
                                },
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">R$ -125.263,52</div>
              <p className="text-xs text-muted-foreground">Faturamento perdido por processo, logística ou segurança</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-red-500">
                <TrendingUp className="h-3 w-3" />
                <span>+2.3% em relação ao período anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reparo</CardTitle>
              <div className="text-red-500">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Faturamento perdido por reparo de equipamento</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">R$ -177.614,86</div>
              <p className="text-xs text-muted-foreground">Faturamento perdido por reparo de equipamento</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-green-500">
                <TrendingDown className="h-3 w-3" />
                <span>-3.7% em relação ao período anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Parada Comercial</CardTitle>
              <div className="text-red-500">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Faturamento perdido por parada comercial</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">R$ -0,00</div>
              <p className="text-xs text-muted-foreground">Faturamento perdido por parada comercial</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <span>Sem alterações</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Faturamento por Sonda</CardTitle>
                <CardDescription>Gráfico com o faturamento das sondas no período selecionado</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="dtm">DTM</SelectItem>
                    <SelectItem value="repair">Reparo</SelectItem>
                    <SelectItem value="gloss">Glosa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <Chart
                  type="bar"
                  data={{
                    labels: ["SPT 111", "SPT 88", "SPT 61", "SPT 115", "SPT 60", "SPT 76", "SPT 151"],
                    datasets: [
                      {
                        label: "Total Faturado",
                        data: [443144, 984986, 227347, 250372, 443956, 434607, 472418],
                        backgroundColor: "#1c7b7b",
                      },
                      {
                        label: "Faturamento Perdido",
                        data: [25798, 0, 34318, 174352, 0, 29179, 0],
                        backgroundColor: "#f87171",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        stacked: false,
                      },
                      y: {
                        stacked: false,
                        beginAtZero: true,
                      },
                    },
                    onClick: (event, elements) => {
                      if (elements.length > 0) {
                        const index = elements[0].index
                        const labels = ["SPT 111", "SPT 88", "SPT 61", "SPT 115", "SPT 60", "SPT 76", "SPT 151"]
                        const probeId = labels[index]
                        setSelectedProbe(probeId)

                        // Set the selected probe data
                        const probeData = {
                          id: probeId,
                          totalBilling: [443144, 984986, 227347, 250372, 443956, 434607, 472418][index],
                          lostBilling: [25798, 0, 34318, 174352, 0, 29179, 0][index],
                          hasMobilization: [true, false, true, true, false, true, false][index],
                          hasMobilizationOut: [false, false, true, false, false, true, false][index],
                          hasDemobilization: [true, true, true, true, true, true, true][index],
                          hasExtraTrailer: [true, false, false, true, false, true, false][index],
                          hasPowerSwivel: [false, true, false, false, true, false, true][index],
                          hasTruckCartRent: [true, false, true, false, true, false, true][index],
                          hasTransportation: [true, true, false, true, false, true, false][index],
                          truckKmHours: [250, 0, 180, 320, 0, 210, 0][index],
                          bobRentHours: [12, 0, 8, 15, 0, 10, 0][index],
                          hasMixTankMonthRent: [true, false, false, true, false, true, false][index],
                          hasMixTankHourRent: [false, true, false, false, true, false, true][index],
                          hasGeneratorFuel: [true, false, true, false, true, false, true][index],
                          hasMixTankOperator: [true, true, false, true, false, true, false][index],
                          hasMixTankDtm: [false, false, true, false, true, false, true][index],
                          hasMixTankMobilization: [true, false, false, true, false, true, false][index],
                          hasMixTankDemobilization: [true, true, false, true, false, true, false][index],
                          hasSuckingTruck: [false, false, true, false, true, false, true][index],
                          hasTruckTank: [true, false, false, true, false, true, false][index],
                          christmasTreeDisassemblyHours: [8, 0, 6, 10, 0, 7, 0][index],
                          hasMunck: [true, true, false, true, false, true, false][index],
                        }
                        setSelectedProbeData(probeData)
                      }
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            let label = context.dataset.label || ""
                            if (label) {
                              label += ": "
                            }
                            if (context.parsed.y !== null) {
                              label += new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                                context.parsed.y,
                              )
                            }
                            return label
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
              {showAnomalies && (
                <div className="mt-4 rounded-md bg-amber-50 p-3 border border-amber-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <h4 className="font-medium text-amber-700">Anomalias Detectadas</h4>
                  </div>
                  <ul className="mt-2 text-sm space-y-1 text-amber-700">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      SPT 115: Alto índice de perda (41.0% do faturamento total)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      SPT 61: Períodos com dados registrados mas sem faturamento
                    </li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Perdas</CardTitle>
              <CardDescription>Análise das causas de perda de faturamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Chart
                  type="pie"
                  data={{
                    labels: ["Reparo", "Glosa", "Parada Comercial"],
                    datasets: [
                      {
                        data: [177614, 125263, 0],
                        backgroundColor: ["#f87171", "#fb923c", "#fbbf24"],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const label = context.label || ""
                            const value = context.raw
                            const total = context.dataset.data.reduce((a, b) => (a as number) + (b as number), 0)
                            const percentage = (((value as number) / (total as number)) * 100).toFixed(1)
                            return `${label}: ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value as number)} (${percentage}%)`
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {selectedProbe && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Detalhes da Sonda {selectedProbe}</CardTitle>
                <CardDescription>Análise detalhada do faturamento</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedProbe(null)}>
                Fechar
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="summary">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="summary">Resumo</TabsTrigger>
                  <TabsTrigger value="periods">Períodos</TabsTrigger>
                  <TabsTrigger value="efficiency">Eficiência</TabsTrigger>
                  <TabsTrigger value="trends">Tendências</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">R$ 443.144,31</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-red-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Faturamento Perdido</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-red-500">R$ 25.798,27</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Horas Disponíveis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">435h</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Taxa de Eficiência</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">94.2%</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Distribuição de Horas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px]">
                          <Chart
                            type="doughnut"
                            data={{
                              labels: ["Horas Disponíveis", "Horas em Glosa", "Horas em Reparo", "Horas DTM"],
                              datasets: [
                                {
                                  data: [435, 8.9, 16.8, 8.1],
                                  backgroundColor: ["#1c7b7b", "#fb923c", "#f87171", "#a3a3a3"],
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: {
                                  position: "right",
                                },
                              },
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Ocorrências</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">Horas Glosa</p>
                              <p className="text-sm text-muted-foreground">Processo, logística ou segurança</p>
                            </div>
                            <div className="font-medium">R$ 8.935,85</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">Horas em Reparo</p>
                              <p className="text-sm text-muted-foreground">Reparo de equipamento</p>
                            </div>
                            <div className="font-medium">R$ 16.862,42</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">Horas DTM</p>
                              <p className="text-sm text-muted-foreground">Desmontagem, transporte e montagem</p>
                            </div>
                            <div className="font-medium">R$ 8.123,50</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="periods">
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center gap-4">
                      <Input placeholder="Buscar períodos..." className="max-w-sm" />
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filtrar por tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os tipos</SelectItem>
                          <SelectItem value="dtm">DTM</SelectItem>
                          <SelectItem value="repair">Reparo</SelectItem>
                          <SelectItem value="gloss">Glosa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                        <div>Tipo</div>
                        <div>Início</div>
                        <div>Fim</div>
                        <div>Duração</div>
                        <div>Valor</div>
                      </div>
                      <div className="divide-y">
                        <div className="grid grid-cols-5 gap-4 p-4 hover:bg-muted/50">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-red-50 text-red-500">
                              Glosa
                            </Badge>
                          </div>
                          <div>03/05/2025 08:00</div>
                          <div>03/05/2025 12:00</div>
                          <div>4h</div>
                          <div>R$ 4.320,00</div>
                        </div>
                        <div className="grid grid-cols-5 gap-4 p-4 hover:bg-muted/50">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-red-50 text-red-500">
                              Reparo
                            </Badge>
                          </div>
                          <div>05/05/2025 14:00</div>
                          <div>05/05/2025 22:00</div>
                          <div>8h</div>
                          <div>R$ 8.640,00</div>
                        </div>
                        <div className="grid grid-cols-5 gap-4 p-4 hover:bg-muted/50">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-gray-100">
                              DTM
                            </Badge>
                          </div>
                          <div>10/05/2025 06:00</div>
                          <div>10/05/2025 18:00</div>
                          <div>12h</div>
                          <div>R$ 8.123,50</div>
                        </div>
                        {showAnomalies && (
                          <div className="grid grid-cols-5 gap-4 p-4 hover:bg-muted/50 bg-amber-50">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-amber-50 text-amber-500">
                                Anomalia
                              </Badge>
                            </div>
                            <div>12/05/2025 10:00</div>
                            <div>12/05/2025 16:00</div>
                            <div>6h</div>
                            <div className="flex items-center gap-2 text-amber-600">
                              <AlertTriangle className="h-4 w-4" />
                              R$ 0,00
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="efficiency">
                  <div className="mt-4 space-y-4">
                    <div className="rounded-md border">
                      <div className="p-4">
                        <h3 className="font-medium">Métricas de Eficiência</h3>
                        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Taxa de Disponibilidade</div>
                            <div className="text-2xl font-bold">94.2%</div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 rounded-full bg-teal-500" style={{ width: "94.2%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Taxa de Utilização</div>
                            <div className="text-2xl font-bold">87.5%</div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 rounded-full bg-teal-500" style={{ width: "87.5%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Tempo Médio Entre Falhas</div>
                            <div className="text-2xl font-bold">120h</div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 rounded-full bg-teal-500" style={{ width: "80%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <div className="p-4">
                        <h3 className="font-medium">Valores Adicionais</h3>
                        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          <Card className="border-none shadow-none">
                            <CardHeader className="p-0 pb-2">
                              <CardTitle className="text-sm font-medium">Mobilização e Desmobilização</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                              <ul className="space-y-1 text-sm">
                                <li className="flex items-center justify-between">
                                  <span>Mobilização:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasMobilization ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasMobilization ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Mobilização de Saída:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasMobilizationOut ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasMobilizationOut ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Desmobilização:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasDemobilization ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasDemobilization ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="border-none shadow-none">
                            <CardHeader className="p-0 pb-2">
                              <CardTitle className="text-sm font-medium">Equipamentos</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                              <ul className="space-y-1 text-sm">
                                <li className="flex items-center justify-between">
                                  <span>Trailer Extra:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasExtraTrailer ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasExtraTrailer ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Power Swivel:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasPowerSwivel ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasPowerSwivel ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Aluguel de Carretas:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasTruckCartRent ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasTruckCartRent ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="border-none shadow-none">
                            <CardHeader className="p-0 pb-2">
                              <CardTitle className="text-sm font-medium">Transporte</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                              <ul className="space-y-1 text-sm">
                                <li className="flex items-center justify-between">
                                  <span>Transporte:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasTransportation ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasTransportation ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Km de Caminhão:</span>
                                  <span className="font-medium">{selectedProbeData?.truckKmHours || 0} km</span>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Horas de Aluguel Bob:</span>
                                  <span className="font-medium">{selectedProbeData?.bobRentHours || 0}h</span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="border-none shadow-none">
                            <CardHeader className="p-0 pb-2">
                              <CardTitle className="text-sm font-medium">Tanque de Mistura</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                              <ul className="space-y-1 text-sm">
                                <li className="flex items-center justify-between">
                                  <span>Aluguel Mensal:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasMixTankMonthRent ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasMixTankMonthRent ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Aluguel por Hora:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasMixTankHourRent ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasMixTankHourRent ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Operador:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasMixTankOperator ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasMixTankOperator ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="border-none shadow-none">
                            <CardHeader className="p-0 pb-2">
                              <CardTitle className="text-sm font-medium">Tanque de Mistura (Adicional)</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                              <ul className="space-y-1 text-sm">
                                <li className="flex items-center justify-between">
                                  <span>DTM:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasMixTankDtm ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasMixTankDtm ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Mobilização:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasMixTankMobilization ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasMixTankMobilization ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Desmobilização:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasMixTankDemobilization ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasMixTankDemobilization ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="border-none shadow-none">
                            <CardHeader className="p-0 pb-2">
                              <CardTitle className="text-sm font-medium">Outros Equipamentos</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                              <ul className="space-y-1 text-sm">
                                <li className="flex items-center justify-between">
                                  <span>Caminhão de Sucção:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasSuckingTruck ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasSuckingTruck ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Tanque de Caminhão:</span>
                                  <Badge
                                    variant={selectedProbeData?.hasTruckTank ? "default" : "outline"}
                                    className="ml-2"
                                  >
                                    {selectedProbeData?.hasTruckTank ? "Sim" : "Não"}
                                  </Badge>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Horas de Desmontagem de Árvore de Natal:</span>
                                  <span className="font-medium">
                                    {selectedProbeData?.christmasTreeDisassemblyHours || 0}h
                                  </span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Settings className="mr-2 h-4 w-4" />
                            Ver Configuração de Faturamento
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Configuração de Faturamento</DialogTitle>
                            <DialogDescription>
                              Configuração utilizada para calcular o faturamento da sonda {selectedProbe}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="max-h-[60vh] overflow-y-auto pr-6">
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="mb-2 font-medium">Taxas Básicas</h3>
                                  <div className="space-y-2 rounded-md border p-3">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Taxa de Hora Disponível:</span>
                                      <span className="font-medium">R$ 1.080,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Taxa de Hora DTM:</span>
                                      <span className="font-medium">R$ 864,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Taxa de Hora Glosa:</span>
                                      <span className="font-medium">R$ 1.080,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Taxa de Standby:</span>
                                      <span className="font-medium">R$ 540,00</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="mb-2 font-medium">Taxas de Mobilização</h3>
                                  <div className="space-y-2 rounded-md border p-3">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Mobilização:</span>
                                      <span className="font-medium">R$ 25.000,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Mobilização de Saída:</span>
                                      <span className="font-medium">R$ 20.000,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Desmobilização:</span>
                                      <span className="font-medium">R$ 25.000,00</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="mb-2 font-medium">Taxas de DTM por Intervalo</h3>
                                <div className="space-y-2 rounded-md border p-3">
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">DTM &lt; 20:</span>
                                      <span className="font-medium">R$ 15.000,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">DTM 20-50:</span>
                                      <span className="font-medium">R$ 25.000,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">DTM &gt; 50:</span>
                                      <span className="font-medium">R$ 35.000,00</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="mb-2 font-medium">Taxas de Equipamentos</h3>
                                  <div className="space-y-2 rounded-md border p-3">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Trailer Extra:</span>
                                      <span className="font-medium">R$ 5.000,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Power Swivel:</span>
                                      <span className="font-medium">R$ 8.000,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Aluguel de Carretas:</span>
                                      <span className="font-medium">R$ 3.500,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">
                                        Desmontagem de Árvore de Natal:
                                      </span>
                                      <span className="font-medium">R$ 1.200,00/h</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="mb-2 font-medium">Taxas de Transporte</h3>
                                  <div className="space-y-2 rounded-md border p-3">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Transporte:</span>
                                      <span className="font-medium">R$ 12.000,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Km de Caminhão:</span>
                                      <span className="font-medium">R$ 15,00/km</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Aluguel Bob:</span>
                                      <span className="font-medium">R$ 250,00/h</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="mb-2 font-medium">Taxas de Tanque de Mistura</h3>
                                <div className="space-y-2 rounded-md border p-3">
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Aluguel Mensal:</span>
                                      <span className="font-medium">R$ 15.000,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Aluguel por Hora:</span>
                                      <span className="font-medium">R$ 180,00/h</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Combustível Gerador:</span>
                                      <span className="font-medium">R$ 5.000,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Operador:</span>
                                      <span className="font-medium">R$ 8.000,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">DTM:</span>
                                      <span className="font-medium">R$ 6.000,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Mobilização:</span>
                                      <span className="font-medium">R$ 4.500,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Desmobilização:</span>
                                      <span className="font-medium">R$ 4.500,00</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="mb-2 font-medium">Outras Taxas</h3>
                                <div className="space-y-2 rounded-md border p-3">
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Caminhão de Sucção:</span>
                                      <span className="font-medium">R$ 3.800,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Tanque de Caminhão:</span>
                                      <span className="font-medium">R$ 2.500,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Munck:</span>
                                      <span className="font-medium">R$ 4.200,00</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="trends">
                  <div className="mt-4">
                    <div className="rounded-md border">
                      <div className="p-4">
                        <h3 className="font-medium">Tendências de Faturamento</h3>
                        <div className="mt-4 h-[300px]">
                          <Chart
                            type="line"
                            data={{
                              labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
                              datasets: [
                                {
                                  label: "Faturamento Total",
                                  data: [420000, 435000, 410000, 450000, 443144],
                                  borderColor: "#1c7b7b",
                                  backgroundColor: "rgba(28, 123, 123, 0.1)",
                                  fill: true,
                                },
                                {
                                  label: "Faturamento Perdido",
                                  data: [30000, 28000, 32000, 27000, 25798],
                                  borderColor: "#f87171",
                                  backgroundColor: "rgba(248, 113, 113, 0.1)",
                                  fill: true,
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              scales: {
                                y: {
                                  beginAtZero: true,
                                },
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
