import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Users, Percent } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { SalesEvolutionChart } from "@/components/dashboard/SalesEvolutionChart";
import { TopClientsChart } from "@/components/dashboard/TopClientsChart";
import { ProductDistributionChart } from "@/components/dashboard/ProductDistributionChart";
import { DateRangeFilter } from "@/components/dashboard/DateRangeFilter";
import { useToast } from "@/hooks/use-toast";

// URL de votre API Express locale
const API_URL = "http://localhost:5000";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [stats, setStats] = useState({ totalSales: 0, avgTaxRate: 0, growth: 0, clientCount: 0 });
  const [salesEvolution, setSalesEvolution] = useState<any[]>([]);
  const [topClients, setTopClients] = useState<any[]>([]);
  const [productDistribution, setProductDistribution] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [selectedPeriod]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Récupérer les ventes mensuelles (pour l'évolution)
      const ventesResponse = await fetch(`${API_URL}/ventes-mensuelles`);
      if (!ventesResponse.ok) throw new Error('Erreur API ventes mensuelles');
      const ventesData = await ventesResponse.json();
      
      // Récupérer les top clients
      const clientsResponse = await fetch(`${API_URL}/ventes-clients`);
      if (!clientsResponse.ok) throw new Error('Erreur API clients');
      const clientsData = await clientsResponse.json();

      // Transformer les données pour les graphiques
      const salesEvolution = ventesData.map((item: any) => ({
        period: `${item.Mois}/${item.Annee}`,
        total: item.TotalMensuel,
        date: new Date(item.Annee, item.Mois - 1)
      }));

      const topClients = clientsData.map((item: any) => ({
        name: `Client ${item.CustomerID}`,
        total: item.TotalVentes
      }));

      // Calculer les stats globales
      const totalSales = ventesData.reduce((sum: number, item: any) => sum + item.TotalMensuel, 0);
      const avgTaxRate = 15.0; // À adapter selon vos données
      const clientCount = clientsData.length;
      
      // Calculer la croissance (dernier mois vs précédent)
      const sortedVentes = [...ventesData].sort((a, b) => 
        (b.Annee * 12 + b.Mois) - (a.Annee * 12 + a.Mois)
      );
      const lastMonth = sortedVentes[0]?.TotalMensuel || 0;
      const previousMonth = sortedVentes[1]?.TotalMensuel || 0;
      const growth = previousMonth > 0 ? ((lastMonth - previousMonth) / previousMonth) * 100 : 0;

      setStats({ totalSales, avgTaxRate, growth, clientCount });
      setSalesEvolution(salesEvolution);
      setTopClients(topClients);
      setProductDistribution([]); // À implémenter selon vos besoins

    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast({
        title: "Erreur de connexion",
        description: "Assurez-vous que votre API Express tourne sur http://localhost:5000",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Chiffre d'affaires total"
          value={loading ? "..." : `${Math.round(stats.totalSales).toLocaleString('fr-FR')} €`}
          icon={DollarSign}
          trend={loading ? undefined : { value: Math.abs(stats.growth), isPositive: stats.growth >= 0 }}
        />
        <KPICard
          title="Taux moyen de taxe"
          value={loading ? "..." : `${stats.avgTaxRate.toFixed(1)}%`}
          icon={Percent}
        />
        <KPICard
          title="Croissance"
          value={loading ? "..." : `${stats.growth > 0 ? '+' : ''}${stats.growth.toFixed(1)}%`}
          icon={TrendingUp}
          trend={loading ? undefined : { value: Math.abs(stats.growth), isPositive: stats.growth >= 0 }}
        />
        <KPICard
          title="Nombre de clients"
          value={loading ? "..." : stats.clientCount.toString()}
          icon={Users}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SalesEvolutionChart data={salesEvolution} />
        <TopClientsChart data={topClients} />
      </div>

      <ProductDistributionChart data={productDistribution} />
    </div>
  );
};

export default Dashboard;
