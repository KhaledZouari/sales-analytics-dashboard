import { KPICard } from "@/components/dashboard/KPICard";
import { SalesEvolutionChart } from "@/components/dashboard/SalesEvolutionChart";
import { TopClientsChart } from "@/components/dashboard/TopClientsChart";
import { ProductDistributionChart } from "@/components/dashboard/ProductDistributionChart";
import { Card } from "@/components/ui/card";
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

const Index = () => {
  const totalSales = 820000;
  const avgTaxRate = 18.5;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <Activity className="h-8 w-8 text-primary" />
                Dashboard ETL Analytics
              </h1>
              <p className="text-muted-foreground mt-1">
                Visualisation en temps réel de vos données de vente
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Dernière mise à jour: {new Date().toLocaleString('fr-FR')}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* KPIs */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
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
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <SalesEvolutionChart data={mockSalesEvolution} />
          <TopClientsChart data={mockTopClients} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ProductDistributionChart data={mockProductDistribution} />
          <Card className="border-border/50 p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Connexion au Data Warehouse
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Ce dashboard affiche actuellement des données de démonstration.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <p className="font-medium text-foreground">Pour connecter vos données:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Configurez votre connexion au Data Warehouse</li>
                  <li>Implémentez les requêtes SQL pour chaque métrique</li>
                  <li>Ajoutez la mise à jour en temps réel</li>
                  <li>Remplacez les données mock par vos vraies données</li>
                </ol>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
