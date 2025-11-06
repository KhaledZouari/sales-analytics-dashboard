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

    let dateFilter = '';
    if (period === '7d') {
      dateFilter = "AND i.InvoiceDate >= CURRENT_DATE - INTERVAL '7 days'";
    } else if (period === '30d') {
      dateFilter = "AND i.InvoiceDate >= CURRENT_DATE - INTERVAL '30 days'";
    } else if (period === '3m') {
      dateFilter = "AND i.InvoiceDate >= CURRENT_DATE - INTERVAL '3 months'";
    } else if (period === '1y') {
      dateFilter = "AND i.InvoiceDate >= CURRENT_DATE - INTERVAL '1 year'";
    }

    const topClients = await sql`
      SELECT 
        i.CustomerID as name,
        SUM(il.LineTotal) as total
      FROM InvoiceLines il
      JOIN Invoices i ON i.InvoiceID = il.InvoiceID
      WHERE 1=1 ${sql.unsafe(dateFilter)}
      GROUP BY i.CustomerID
      ORDER BY total DESC
      LIMIT 10
    `;

    await sql.end();

    return new Response(
      JSON.stringify(topClients),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in get-top-clients:', error);
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
