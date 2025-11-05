import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const Statistics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Statistiques</h1>
        <p className="text-muted-foreground mt-1">
          Analyses détaillées de vos données
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Statistiques Avancées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Statistiques Avancées à Venir
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Cette section contiendra des analyses approfondies de vos données,
              des rapports personnalisés et des visualisations avancées.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
