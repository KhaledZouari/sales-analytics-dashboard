import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import postgres from "https://deno.land/x/postgresjs@v3.4.4/mod.js";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { period } = await req.json();
    const databaseUrl = Deno.env.get('DATA_WAREHOUSE_URL');

    if (!databaseUrl) {
      throw new Error('DATA_WAREHOUSE_URL not configured');
    }

    const sql = postgres(databaseUrl);

    // Calculate date range based on period
    let dateFilter = '';
    if (period === '7d') {
      dateFilter = "AND InvoiceDate >= CURRENT_DATE - INTERVAL '7 days'";
    } else if (period === '30d') {
      dateFilter = "AND InvoiceDate >= CURRENT_DATE - INTERVAL '30 days'";
    } else if (period === '3m') {
      dateFilter = "AND InvoiceDate >= CURRENT_DATE - INTERVAL '3 months'";
    } else if (period === '1y') {
      dateFilter = "AND InvoiceDate >= CURRENT_DATE - INTERVAL '1 year'";
    }

    // Get total sales
    const totalSales = await sql`
      SELECT COALESCE(SUM(LineTotal), 0) as total
      FROM InvoiceLines
      WHERE 1=1 ${sql.unsafe(dateFilter)}
    `;

    // Get average tax rate
    const avgTaxRate = await sql`
      SELECT COALESCE(AVG(TaxRate), 0) as avg_rate
      FROM InvoiceLines
      WHERE 1=1 ${sql.unsafe(dateFilter)}
    `;

    // Get client count
    const clientCount = await sql`
      SELECT COUNT(DISTINCT CustomerID) as count
      FROM Invoices
      WHERE 1=1 ${sql.unsafe(dateFilter)}
    `;

    // Get previous period total for growth calculation
    let previousPeriodFilter = '';
    if (period === '7d') {
      previousPeriodFilter = "AND InvoiceDate >= CURRENT_DATE - INTERVAL '14 days' AND InvoiceDate < CURRENT_DATE - INTERVAL '7 days'";
    } else if (period === '30d') {
      previousPeriodFilter = "AND InvoiceDate >= CURRENT_DATE - INTERVAL '60 days' AND InvoiceDate < CURRENT_DATE - INTERVAL '30 days'";
    } else if (period === '3m') {
      previousPeriodFilter = "AND InvoiceDate >= CURRENT_DATE - INTERVAL '6 months' AND InvoiceDate < CURRENT_DATE - INTERVAL '3 months'";
    } else if (period === '1y') {
      previousPeriodFilter = "AND InvoiceDate >= CURRENT_DATE - INTERVAL '2 years' AND InvoiceDate < CURRENT_DATE - INTERVAL '1 year'";
    }

    const previousSales = await sql`
      SELECT COALESCE(SUM(LineTotal), 0) as total
      FROM InvoiceLines
      WHERE 1=1 ${sql.unsafe(previousPeriodFilter)}
    `;

    const growth = previousSales[0].total > 0 
      ? ((totalSales[0].total - previousSales[0].total) / previousSales[0].total) * 100
      : 0;

    await sql.end();

    return new Response(
      JSON.stringify({
        totalSales: totalSales[0].total,
        avgTaxRate: avgTaxRate[0].avg_rate,
        growth: growth,
        clientCount: clientCount[0].count,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in get-sales-stats:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
