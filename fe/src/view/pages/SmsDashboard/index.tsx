import {
  Line,
  LineChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MapPin } from "lucide-react";
import { SmsDashboardContext, SmsDashboardProvider } from "./SmsDashboardContext";
import { Header } from "@/view/components/Header";
import { StatboxContainer } from "./Components/StatboxContainer";
import { BarChartByType } from "./Components/BarChartByType";
import { PieChartByNature } from "./Components/PieChartByNature";

const distribuicaoTemporal = [
  { mes: "Jan", ocorrencias: 10 },
  { mes: "Fev", ocorrencias: 15 },
  { mes: "Mar", ocorrencias: 8 },
  { mes: "Abr", ocorrencias: 12 },
  { mes: "Mai", ocorrencias: 20 },
  { mes: "Jun", ocorrencias: 18 },
];

const acoesPendentes = [
  {
    id: 1,
    descricao: "Implementar novo protocolo de segurança",
    prazo: "2024-04-15",
    status: "Atrasado",
  },
  {
    id: 2,
    descricao: "Treinamento de primeiros socorros",
    prazo: "2024-04-20",
    status: "No prazo",
  },
  { id: 3, descricao: "Auditoria ambiental", prazo: "2024-04-25", status: "No prazo" },
];

export default function SmsDashboard() {
  return (
    <SmsDashboardProvider>
      <SmsDashboardContext.Consumer>
        {() => (
          <div className="container mx-auto p-4">
            <Header
              displayRig
              title="Dashboard de Saúde, Meio Ambiente e Segurança (SMS)"
            >
              <div className="flex gap-2 items-center"></div>
            </Header>

            <StatboxContainer />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <BarChartByType />

              <PieChartByNature />
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Distribuição Temporal de Ocorrências</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={distribuicaoTemporal}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="ocorrencias"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Taxa de Ocorrências por Estado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted">
                    <MapPin className="h-16 w-16 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Mapa de calor indisponível nesta versão
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Índice de Frequência e Gravidade de Acidentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={distribuicaoTemporal}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="ocorrencias"
                          stroke="hsl(var(--primary))"
                          name="Frequência"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="ocorrencias"
                          stroke="hsl(var(--secondary))"
                          name="Gravidade"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Ações Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Prazo</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {acoesPendentes.map((acao) => (
                      <TableRow key={acao.id}>
                        <TableCell>{acao.descricao}</TableCell>
                        <TableCell>{acao.prazo}</TableCell>
                        <TableCell>{acao.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </SmsDashboardContext.Consumer>
    </SmsDashboardProvider>
  );
}
