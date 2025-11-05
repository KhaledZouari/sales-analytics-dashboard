import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Plus, TrendingUp, TrendingDown } from "lucide-react";

const mockProducts = [
  { id: 1, name: "Produit A", category: "Électronique", price: 299.99, stock: 45, sales: 185000, trend: 12.5 },
  { id: 2, name: "Produit B", category: "Vêtements", price: 79.99, stock: 120, sales: 142000, trend: 8.2 },
  { id: 3, name: "Produit C", category: "Maison", price: 149.99, stock: 67, sales: 128000, trend: -3.1 },
  { id: 4, name: "Produit D", category: "Sports", price: 199.99, stock: 89, sales: 98000, trend: 15.7 },
  { id: 5, name: "Produit E", category: "Électronique", price: 449.99, stock: 23, sales: 67000, trend: -5.4 },
];

const Products = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produits</h1>
          <p className="text-muted-foreground mt-1">
            Gérez votre catalogue de produits
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Produits
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">89</div>
            <p className="text-xs text-accent mt-2">+5 ce mois</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              En Stock
            </CardTitle>
            <Package className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,284</div>
            <p className="text-xs text-muted-foreground mt-2">Unités totales</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valeur Stock
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">€187K</div>
            <p className="text-xs text-accent mt-2">+12.3% ce mois</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Catalogue de Produits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Produit</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Catégorie</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Prix</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Stock</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Ventes</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Tendance</th>
                </tr>
              </thead>
              <tbody>
                {mockProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="secondary">{product.category}</Badge>
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-foreground">
                      €{product.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-medium ${product.stock < 30 ? 'text-destructive' : 'text-foreground'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-foreground">
                      €{product.sales.toLocaleString('fr-FR')}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`flex items-center justify-end gap-1 font-medium ${
                        product.trend > 0 ? 'text-accent' : 'text-destructive'
                      }`}>
                        {product.trend > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {Math.abs(product.trend)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
