import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Mail, Phone } from "lucide-react";

const mockClients = [
  { id: 1, name: "Client A", email: "clienta@example.com", phone: "+33 1 23 45 67 89", totalSales: 125000, orders: 45, status: "active" },
  { id: 2, name: "Client B", email: "clientb@example.com", phone: "+33 1 23 45 67 90", totalSales: 98000, orders: 38, status: "active" },
  { id: 3, name: "Client C", email: "clientc@example.com", phone: "+33 1 23 45 67 91", totalSales: 87000, orders: 32, status: "inactive" },
  { id: 4, name: "Client D", email: "clientd@example.com", phone: "+33 1 23 45 67 92", totalSales: 76000, orders: 28, status: "active" },
  { id: 5, name: "Client E", email: "cliente@example.com", phone: "+33 1 23 45 67 93", totalSales: 65000, orders: 24, status: "active" },
];

const Clients = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground mt-1">
            Gérez et analysez vos clients
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Users className="h-4 w-4 mr-2" />
          Ajouter un client
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Clients
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">156</div>
            <p className="text-xs text-accent mt-2">+12 ce mois</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clients Actifs
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">142</div>
            <p className="text-xs text-muted-foreground mt-2">91% du total</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenu Moyen
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">€5,256</div>
            <p className="text-xs text-accent mt-2">+8.2% vs mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Top Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockClients.map((client) => (
              <div
                key={client.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{client.name}</h3>
                      <Badge variant={client.status === "active" ? "default" : "secondary"}>
                        {client.status === "active" ? "Actif" : "Inactif"}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 sm:text-right">
                  <div>
                    <div className="text-sm text-muted-foreground">Ventes totales</div>
                    <div className="text-lg font-bold text-foreground">
                      €{client.totalSales.toLocaleString('fr-FR')}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Commandes</div>
                    <div className="text-lg font-bold text-foreground">{client.orders}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;
