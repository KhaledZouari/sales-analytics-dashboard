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
    let groupByFormat = '';
    
    if (period === '7d') {
      dateFilter = "AND il.InvoiceDate >= CURRENT_DATE - INTERVAL '7 days'";
      groupByFormat = "TO_CHAR(il.InvoiceDate, 'DD/MM')";
    } else if (period === '30d') {
      dateFilter = "AND il.InvoiceDate >= CURRENT_DATE - INTERVAL '30 days'";
      groupByFormat = "TO_CHAR(il.InvoiceDate, 'DD/MM')";
    } else if (period === '3m') {
      dateFilter = "AND il.InvoiceDate >= CURRENT_DATE - INTERVAL '3 months'";
      groupByFormat = "TO_CHAR(il.InvoiceDate, 'YYYY-WW')";
    } else if (period === '1y') {
      dateFilter = "AND il.InvoiceDate >= CURRENT_DATE - INTERVAL '1 year'";
      groupByFormat = "TO_CHAR(il.InvoiceDate, 'YYYY-MM')";
    }

    const salesEvolution = await sql`
      SELECT 
        ${sql.unsafe(groupByFormat)} as period,
        SUM(il.LineTotal) as total,
        il.InvoiceDate as date
      FROM InvoiceLines il
      WHERE 1=1 ${sql.unsafe(dateFilter)}
      GROUP BY period, il.InvoiceDate
      ORDER BY il.InvoiceDate ASC
      LIMIT 100
    `;

    await sql.end();

    return new Response(
      JSON.stringify(salesEvolution),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in get-sales-evolution:', error);
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
