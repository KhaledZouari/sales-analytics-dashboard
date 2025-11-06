import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Users, Percent } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { SalesEvolutionChart } from "@/components/dashboard/SalesEvolutionChart";
import { TopClientsChart } from "@/components/dashboard/TopClientsChart";
import { ProductDistributionChart } from "@/components/dashboard/ProductDistributionChart";
import { DateRangeFilter } from "@/components/dashboard/DateRangeFilter";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
      // Fetch sales stats
      const { data: statsData, error: statsError } = await supabase.functions.invoke('get-sales-stats', {
        body: { period: selectedPeriod }
      });
      if (statsError) throw statsError;
      setStats(statsData);

      // Fetch sales evolution
      const { data: evolutionData, error: evolutionError } = await supabase.functions.invoke('get-sales-evolution', {
        body: { period: selectedPeriod }
      });
      if (evolutionError) throw evolutionError;
      setSalesEvolution(evolutionData);

      // Fetch top clients
      const { data: clientsData, error: clientsError } = await supabase.functions.invoke('get-top-clients', {
        body: { period: selectedPeriod }
      });
      if (clientsError) throw clientsError;
      setTopClients(clientsData);

      // Fetch product distribution
      const { data: productsData, error: productsError } = await supabase.functions.invoke('get-product-distribution', {
        body: { period: selectedPeriod }
      });
      if (productsError) throw productsError;
      setProductDistribution(productsData);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de récupérer les données du Data Warehouse",
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
