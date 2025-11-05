import { useState } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { SalesEvolutionChart } from "@/components/dashboard/SalesEvolutionChart";
import { TopClientsChart } from "@/components/dashboard/TopClientsChart";
import { ProductDistributionChart } from "@/components/dashboard/ProductDistributionChart";
import { DateRangeFilter } from "@/components/dashboard/DateRangeFilter";
import { DollarSign, TrendingUp, Percent, Activity } from "lucide-react";

// Données mock - À remplacer par vos vraies données du Data Warehouse
const mockSalesEvolution = [
  { date: "Jan", sales: 45000 },
  { date: "Fév", sales: 52000 },
  { date: "Mar", sales: 48000 },
  { date: "Avr", sales: 61000 },
  { date: "Mai", sales: 55000 },
  { date: "Juin", sales: 67000 },
  { date: "Juil", sales: 72000 },
  { date: "Août", sales: 68000 },
  { date: "Sep", sales: 78000 },
  { date: "Oct", sales: 85000 },
  { date: "Nov", sales: 91000 },
  { date: "Déc", sales: 98000 },
];

const mockTopClients = [
  { customerName: "Client A", totalSales: 125000 },
  { customerName: "Client B", totalSales: 98000 },
  { customerName: "Client C", totalSales: 87000 },
  { customerName: "Client D", totalSales: 76000 },
  { customerName: "Client E", totalSales: 65000 },
  { customerName: "Client F", totalSales: 54000 },
  { customerName: "Client G", totalSales: 48000 },
  { customerName: "Client H", totalSales: 42000 },
  { customerName: "Client I", totalSales: 38000 },
  { customerName: "Client J", totalSales: 35000 },
];

const mockProductDistribution = [
  { productName: "Produit A", value: 185000 },
  { productName: "Produit B", value: 142000 },
  { productName: "Produit C", value: 128000 },
  { productName: "Produit D", value: 98000 },
  { productName: "Produit E", value: 67000 },
];

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const totalSales = 820000;
  const avgTaxRate = 18.5;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Vue d'ensemble de vos performances
          </p>
        </div>
        <DateRangeFilter 
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
      </div>

      {/* KPIs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Chiffre d'Affaires Total"
          value={totalSales}
          icon={DollarSign}
          prefix="€"
          trend={{ value: 12.5, isPositive: true }}
        />
        <KPICard
          title="Taux Moyen de Taxe"
          value={avgTaxRate}
          icon={Percent}
          suffix="%"
        />
        <KPICard
          title="Croissance"
          value="+12.5"
          icon={TrendingUp}
          suffix="%"
          trend={{ value: 2.3, isPositive: true }}
        />
        <KPICard
          title="Nombre de Clients"
          value={156}
          icon={Activity}
          trend={{ value: 8.1, isPositive: true }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <SalesEvolutionChart data={mockSalesEvolution} />
        </div>
        <TopClientsChart data={mockTopClients} />
        <ProductDistributionChart data={mockProductDistribution} />
      </div>
    </div>
  );
};

export default Dashboard;
