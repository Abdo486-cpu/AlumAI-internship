// @ts-nocheck
import { serve } from 'https://deno.land/std@0.170.0/http/server.ts' 
import 'https://deno.land/x/xhr@0.2.1/mod.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.5.0'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/genai-node@0.1.3'

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseClient = createClient("https://qqiwyxoyegggabkrsazd.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxaXd5eG95ZWdnZ2Fia3JzYXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMjgwMzEsImV4cCI6MjAzNjkwNDAzMX0.e7IxYrWBiEGw5q0bmbcWKYWW6EjpApi8QcGcKPC4bIw")

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { query } = await req.json()

  const input = query
  console.log(input);

  const apiKey = 'AIzaSyBdAC5ms1f3Sp43AyoMQ26izDEEgimW-JM';

  const genAI = new GoogleGenerativeAI({ apiKey })

  const prompt = stripIndent`${oneLine`
    You are a representative that is very helpful when it comes to talking about Cooper Codes! Only ever answer
    truthfully and be as helpful as you can!"`}
    Context sections:
    ${contextText}
    Question: """
    ${query}
    """
    Answer as simple text:
  `

  const response = await genAI.run({
    prompt,
    model: 'gemini', 
    harmBlockThreshold: 0.9, 
  })

  const { text } = response.data

  return new Response(JSON.stringify({ text }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
