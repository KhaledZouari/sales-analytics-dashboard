import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Database, Bell, User } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Paramètres</h1>
        <p className="text-muted-foreground mt-1">
          Configurez votre dashboard et vos préférences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Connexion Data Warehouse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">URL de connexion</label>
              <input
                type="text"
                placeholder="postgresql://..."
                className="w-full mt-2 h-10 px-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Intervalle de rafraîchissement</label>
              <select className="w-full mt-2 h-10 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>30 secondes</option>
                <option>1 minute</option>
                <option>5 minutes</option>
                <option>15 minutes</option>
              </select>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Enregistrer
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profil Utilisateur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Nom</label>
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full mt-2 h-10 px-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                placeholder="votre@email.com"
                className="w-full mt-2 h-10 px-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Mettre à jour
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Alertes de seuil</div>
                <div className="text-sm text-muted-foreground">Recevoir des alertes quand un seuil est atteint</div>
              </div>
              <Button variant="outline" size="sm">Activer</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Rapports quotidiens</div>
                <div className="text-sm text-muted-foreground">Recevoir un rapport quotidien par email</div>
              </div>
              <Button variant="outline" size="sm">Activer</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Erreurs ETL</div>
                <div className="text-sm text-muted-foreground">Être notifié des erreurs dans le pipeline ETL</div>
              </div>
              <Button variant="outline" size="sm">Activer</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              Préférences d'Affichage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Format de devise</label>
              <select className="w-full mt-2 h-10 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>EUR (€)</option>
                <option>USD ($)</option>
                <option>GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Format de date</label>
              <select className="w-full mt-2 h-10 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Enregistrer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
