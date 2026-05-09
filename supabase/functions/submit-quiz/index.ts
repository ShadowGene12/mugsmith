import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// --- SCORING LOGIC PORTED FROM FRONTEND ---
type ArchetypeId = 'MIN' | 'BLD' | 'NGT' | 'STO' | 'RIT' | 'ROM' | 'MAV';

const quizQuestions = [
  { id: "q1", options: [{ id: "q1-a", scores: { MIN: 3, STO: 1 } }, { id: "q1-b", scores: { RIT: 3, ROM: 2 } }, { id: "q1-c", scores: { BLD: 3, STO: 2 } }, { id: "q1-d", scores: { MAV: 3, ROM: 1 } }] },
  { id: "q2", options: [{ id: "q2-a", scores: { RIT: 3, STO: 2, MIN: 1 } }, { id: "q2-b", scores: { STO: 3, BLD: 2, MIN: 1 } }, { id: "q2-c", scores: { NGT: 3, BLD: 1 } }, { id: "q2-d", scores: { MAV: 3, ROM: 2, NGT: 1 } }] },
  { id: "q3", options: [{ id: "q3-a", scores: { MIN: 3, STO: -1 } }, { id: "q3-b", scores: { STO: 3, MIN: -1 } }, { id: "q3-c", scores: { RIT: 3, ROM: 2, NGT: 1 } }, { id: "q3-d", scores: { MAV: 3, ROM: 1, NGT: 1 } }] },
  { id: "q4", options: [{ id: "q4-a", scores: { MIN: 3 } }, { id: "q4-b", scores: { RIT: 3, BLD: 2, STO: 1 } }, { id: "q4-c", scores: { ROM: 3, NGT: 1 } }, { id: "q4-d", scores: { BLD: 3, MAV: 2 } }] },
  { id: "q5", options: [{ id: "q5-a", scores: { MIN: 3, STO: 1 } }, { id: "q5-b", scores: { RIT: 3, ROM: 2 } }, { id: "q5-c", scores: { NGT: 3, STO: 2, BLD: 1 } }, { id: "q5-d", scores: { MAV: 3, ROM: 1 } }] },
  { id: "q6", options: [{ id: "q6-a", scores: { BLD: 3, MIN: 1, STO: 1 } }, { id: "q6-b", scores: { STO: 3, RIT: 2, MIN: 1 } }, { id: "q6-c", scores: { ROM: 3, MAV: 2, NGT: 1 } }, { id: "q6-d", scores: { MAV: 3, BLD: 1 } }] },
  { id: "q7", options: [{ id: "q7-a", scores: { MIN: 3, STO: 1 } }, { id: "q7-b", scores: { BLD: 3, STO: 2 } }, { id: "q7-c", scores: { NGT: 3, STO: 1 } }, { id: "q7-d", scores: { MAV: 3, ROM: 1 } }, { id: "q7-e", scores: { RIT: 3, ROM: 2 } }, { id: "q7-f", scores: { ROM: 3, MIN: 1 } }] },
  { id: "q8", options: [{ id: "q8-a", scores: { MIN: 2, STO: 1 } }, { id: "q8-b", scores: { BLD: 2, NGT: 1, STO: 1 } }, { id: "q8-c", scores: { RIT: 2, ROM: 1, MIN: 1 } }, { id: "q8-d", scores: { MAV: 2, ROM: 2, NGT: 1 } }] },
];

function calculateQuizResult(answers: Record<string, string>) {
  const scores: Record<ArchetypeId, number> = { MIN: 0, BLD: 0, NGT: 0, STO: 0, RIT: 0, ROM: 0, MAV: 0 };
  let tiebreaker_used = null;

  quizQuestions.forEach((question) => {
    const answerId = answers[question.id];
    const selectedOption = question.options.find(opt => opt.id === answerId);
    if (selectedOption && selectedOption.scores) {
      Object.entries(selectedOption.scores).forEach(([identity, score]) => {
        if (score) scores[identity as ArchetypeId] += score;
      });
    }
  });

  const maxScore = Math.max(...Object.values(scores));
  const tiedArchetypes = (Object.keys(scores) as ArchetypeId[]).filter(id => scores[id] === maxScore);
  let winningIdentity = tiedArchetypes[0];

  if (tiedArchetypes.length > 1) {
    const q7AnswerId = answers["q7"];
    const q7Option = quizQuestions.find(q => q.id === "q7")?.options.find(opt => opt.id === q7AnswerId);
    let q7Winner: ArchetypeId | null = null;
    let maxQ7Score = -Infinity;
    
    if (q7Option && q7Option.scores) {
      tiedArchetypes.forEach(arch => {
        const score = (q7Option.scores as any)[arch] || 0;
        if (score > maxQ7Score) { maxQ7Score = score; q7Winner = arch; }
      });
    }
    
    const q7Ties = tiedArchetypes.filter(arch => ((q7Option?.scores as any)?.[arch] || 0) === maxQ7Score);
    
    if (q7Ties.length === 1 && q7Winner) {
      winningIdentity = q7Winner;
      tiebreaker_used = "q7";
    } else {
      const q3AnswerId = answers["q3"];
      const q3Option = quizQuestions.find(q => q.id === "q3")?.options.find(opt => opt.id === q3AnswerId);
      let q3Winner: ArchetypeId | null = null;
      let maxQ3Score = -Infinity;
      
      if (q3Option && q3Option.scores) {
        q7Ties.forEach(arch => {
          const score = (q3Option.scores as any)[arch] || 0;
          if (score > maxQ3Score) { maxQ3Score = score; q3Winner = arch; }
        });
      }
      
      const q3Ties = q7Ties.filter(arch => ((q3Option?.scores as any)?.[arch] || 0) === maxQ3Score);
      
      if (q3Ties.length === 1 && q3Winner) {
        winningIdentity = q3Winner;
        tiebreaker_used = "q3";
      } else {
        const fallbackPriority: Record<ArchetypeId, number> = { NGT: 7, STO: 6, MIN: 5, RIT: 4, ROM: 3, BLD: 2, MAV: 1 };
        winningIdentity = q3Ties.reduce((a, b) => fallbackPriority[a] > fallbackPriority[b] ? a : b);
        tiebreaker_used = "fallback";
      }
    }
  }

  return { identity: winningIdentity, scores, tiebreaker_used };
}
// --- END SCORING LOGIC ---

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { email, answers, turnstile_token } = await req.json();

    if (!email || !answers) {
      return new Response(JSON.stringify({ error: 'Email and answers are required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // TODO: Verify Turnstile Token (Stubbed for now)
    const turnstileVerified = true;

    // Calculate Result
    const { identity, scores, tiebreaker_used } = calculateQuizResult(answers);

    // Save to Database
    const { data: responseRecord, error: insertError } = await supabaseClient
      .from('quiz_responses')
      .insert({
        email,
        archetype: identity,
        answers,
        scores,
        tiebreaker_used,
        turnstile_verified: turnstileVerified,
        ip_address: req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for'),
        user_agent: req.headers.get('user-agent'),
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return new Response(JSON.stringify({ error: 'Failed to save response' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    // Trigger n8n Webhook asynchronously (Fail-open)
    const n8nWebhookUrl = Deno.env.get('N8N_WEBHOOK_URL');
    if (n8nWebhookUrl) {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quiz_response_id: responseRecord.id,
          email,
          archetype: identity,
        }),
      }).catch((err) => console.error('Failed to trigger n8n:', err));
    }

    return new Response(JSON.stringify({ archetype: identity }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
